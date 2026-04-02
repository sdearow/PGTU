#!/usr/bin/env python3
"""
Confronto spaziale tra lo Shapefile della Grande Viabilità e il Grafo 2026.

Identifica quali segmenti della Grande Viabilità (shapefile) NON sono
coperti geometricamente dal Grafo 2026, indipendentemente dal flag
grande_viabilita Si/No presente nella tabella.

Output:
- CONFRONTO_GV_SHAPEFILE_GRAFO2026.md: report dettagliato
- gv_non_coperte_grafo2026.geojson: segmenti GV non coperti (<20%)
- gv_parzialmente_coperte_grafo2026.geojson: segmenti GV parzialmente coperti (20-80%)
"""

import geopandas as gpd
import json
from shapely.ops import unary_union
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).parent
BUFFER_M = 30   # buffer di sovrapposizione in metri
NEAR_M = 100    # distanza per trovare strade vicine
FAR_M = 500     # distanza estesa per segmenti isolati


def load_data():
    print("Caricamento shapefile Grande Viabilità...")
    gv = gpd.read_file(ROOT / "Grande viabilita" / "GRANDE_VIAB_REV26012019.shp")
    gv = gv.to_crs(epsg=4326)

    print("Caricamento Grafo 2026...")
    g2026 = gpd.read_file(ROOT / "2a.PGTU_Grafo_2026.geojson")

    return gv, g2026


def spatial_analysis(gv, g2026):
    # Proietta in sistema metrico per calcoli accurati
    gv_proj = gv.to_crs(epsg=3857)
    g2026_proj = g2026.to_crs(epsg=3857)

    # Unione di tutte le geometrie del Grafo 2026 con buffer
    print("Creazione buffer del Grafo 2026...")
    g2026_union = unary_union(g2026_proj.geometry.buffer(BUFFER_M))

    # Calcola copertura per ogni segmento GV
    print("Analisi copertura spaziale...")
    gv_proj["length_m"] = gv_proj.geometry.length
    gv_proj["covered_length"] = 0.0

    for idx, row in gv_proj.iterrows():
        geom = row.geometry
        if geom is None or geom.is_empty:
            continue
        intersection = geom.intersection(g2026_union)
        if not intersection.is_empty:
            gv_proj.at[idx, "covered_length"] = intersection.length

    gv_proj["coverage_pct"] = (
        gv_proj["covered_length"] / gv_proj["length_m"] * 100
    ).clip(0, 100)

    # Classifica segmenti
    not_covered = gv_proj[gv_proj["coverage_pct"] < 20].copy()
    partially = gv_proj[
        (gv_proj["coverage_pct"] >= 20) & (gv_proj["coverage_pct"] < 80)
    ].copy()
    well_covered = gv_proj[gv_proj["coverage_pct"] >= 80].copy()

    # Trova strade vicine per segmenti non coperti
    print("Identificazione strade vicine ai segmenti non coperti...")
    nearby_map = defaultdict(list)
    for idx, row in not_covered.iterrows():
        geom = row.geometry
        if geom is None or geom.is_empty:
            continue
        buffered = geom.buffer(NEAR_M)
        nearby = g2026_proj[g2026_proj.geometry.intersects(buffered)]
        for _, r in nearby.iterrows():
            nearby_map[r["nome"]].append(idx)

    # Per segmenti isolati, cerca più lontano
    covered_indices = set()
    for indices in nearby_map.values():
        covered_indices.update(indices)
    isolated_idx = [i for i in not_covered.index if i not in covered_indices]

    for idx in isolated_idx:
        geom = not_covered.at[idx, "geometry"]
        if geom is None or geom.is_empty:
            continue
        buffered = geom.buffer(FAR_M)
        nearby = g2026_proj[g2026_proj.geometry.intersects(buffered)]
        if len(nearby) > 0:
            closest = nearby.iloc[0]["nome"]
            nearby_map[f"(~500m) {closest}"].append(idx)

    # Strade parzialmente coperte
    print("Analisi strade parzialmente coperte...")
    partial_roads = defaultdict(list)
    for idx, row in partially.iterrows():
        geom = row.geometry
        if geom is None or geom.is_empty:
            continue
        buffered = geom.buffer(NEAR_M)
        nearby = g2026_proj[g2026_proj.geometry.intersects(buffered)]
        for _, r in nearby.iterrows():
            partial_roads[r["nome"]].append(
                (idx, row["length_m"], row["coverage_pct"])
            )

    return {
        "gv_proj": gv_proj,
        "not_covered": not_covered,
        "partially": partially,
        "well_covered": well_covered,
        "nearby_map": nearby_map,
        "partial_roads": partial_roads,
        "g2026_proj": g2026_proj,
    }


def generate_report(results):
    gv = results["gv_proj"]
    nc = results["not_covered"]
    pc = results["partially"]
    wc = results["well_covered"]
    nearby_map = results["nearby_map"]
    partial_roads = results["partial_roads"]

    total_len = gv["length_m"].sum()
    nc_len = nc["length_m"].sum()
    pc_len = pc["length_m"].sum()
    wc_len = wc["length_m"].sum()

    lines = []
    lines.append(
        "# Confronto spaziale: Shapefile Grande Viabilità vs Grafo 2026\n"
    )
    lines.append(
        "Questo report confronta **geometricamente** lo shapefile della Grande Viabilità "
        "(GRANDE_VIAB_REV26012019.shp) con il Grafo 2026, per identificare quali tratti "
        "della rete di Grande Viabilità non sono presenti nel grafo.\n"
    )
    lines.append(
        f"Buffer di sovrapposizione utilizzato: **{BUFFER_M}m**\n"
    )

    # Statistiche
    lines.append("## Statistiche generali\n")
    lines.append("| Metrica | Valore |")
    lines.append("|---------|--------|")
    lines.append(f"| Segmenti GV totali | {len(gv)} |")
    lines.append(f"| Lunghezza totale GV | {total_len/1000:.1f} km |")
    lines.append(
        f"| Ben coperti (>80%) | {len(wc)} segmenti ({wc_len/1000:.1f} km, {wc_len/total_len*100:.1f}%) |"
    )
    lines.append(
        f"| Parzialmente coperti (20-80%) | {len(pc)} segmenti ({pc_len/1000:.1f} km, {pc_len/total_len*100:.1f}%) |"
    )
    lines.append(
        f"| **Non coperti (<20%)** | **{len(nc)} segmenti ({nc_len/1000:.1f} km, {nc_len/total_len*100:.1f}%)** |"
    )
    lines.append("")

    # A) Segmenti NON coperti raggruppati per strada vicina
    lines.append(
        f"## A) Segmenti GV NON coperti dal Grafo 2026 ({len(nc)} segmenti, {nc_len/1000:.1f} km)\n"
    )
    lines.append(
        "Raggruppati per strada del Grafo 2026 più vicina (entro 100m, o 500m se isolati).\n"
    )

    road_stats = {}
    for road_name, indices in nearby_map.items():
        total = sum(nc.at[i, "length_m"] for i in indices if i in nc.index)
        road_stats[road_name] = (len(indices), total)

    lines.append("| Strada vicina (Grafo 2026) | Segmenti | Lunghezza non coperta |")
    lines.append("|---------------------------|----------|----------------------|")
    for name in sorted(road_stats.keys(), key=lambda x: road_stats[x][1], reverse=True):
        cnt, length = road_stats[name]
        if length >= 50:  # minimo 50m per essere significativo
            lines.append(f"| {name} | {cnt} | {length/1000:.2f} km |")
    lines.append("")

    # B) Strade parzialmente coperte significative
    significant_partial = {}
    for road_name, entries in partial_roads.items():
        total_len_road = sum(e[1] for e in entries)
        if total_len_road > 500:
            avg_cov = sum(e[2] for e in entries) / len(entries)
            significant_partial[road_name] = (
                len(entries),
                total_len_road,
                avg_cov,
            )

    lines.append(
        f"## B) Strade parzialmente coperte (20-80%, tratti >500m) ({len(significant_partial)} strade)\n"
    )
    lines.append(
        "Queste strade del Grafo 2026 hanno una sovrapposizione parziale con la GV: "
        "il tracciato coincide solo in parte.\n"
    )
    lines.append(
        "| Strada (Grafo 2026) | Segmenti GV | Lunghezza GV | Copertura media |"
    )
    lines.append("|---------------------|-------------|-------------|-----------------|")
    for name in sorted(
        significant_partial.keys(),
        key=lambda x: significant_partial[x][1],
        reverse=True,
    ):
        cnt, length, cov = significant_partial[name]
        lines.append(f"| {name} | {cnt} | {length/1000:.2f} km | {cov:.0f}% |")
    lines.append("")

    # C) Riepilogo
    lines.append("## C) Riepilogo\n")
    lines.append(
        f"Su {total_len/1000:.1f} km totali di Grande Viabilità (shapefile), "
        f"**{nc_len/1000:.1f} km ({nc_len/total_len*100:.1f}%)** non sono coperti "
        f"dal Grafo 2026, e **{pc_len/1000:.1f} km ({pc_len/total_len*100:.1f}%)** "
        f"sono coperti solo parzialmente.\n"
    )
    lines.append(
        "Le principali aree di Grande Viabilità non coperte dal Grafo 2026 includono:\n"
    )

    # Top 15 corridoi non coperti
    top_roads = sorted(road_stats.items(), key=lambda x: x[1][1], reverse=True)[:15]
    for name, (cnt, length) in top_roads:
        lines.append(f"- **{name}**: {length/1000:.2f} km non coperti")
    lines.append("")

    lines.append("### File generati\n")
    lines.append("- `gv_non_coperte_grafo2026.geojson`: segmenti GV non coperti (<20%)")
    lines.append(
        "- `gv_parzialmente_coperte_grafo2026.geojson`: segmenti GV parzialmente coperti (20-80%)"
    )
    lines.append("")

    return "\n".join(lines)


def main():
    gv, g2026 = load_data()
    results = spatial_analysis(gv, g2026)

    # Genera report
    report = generate_report(results)
    out_md = ROOT / "CONFRONTO_GV_SHAPEFILE_GRAFO2026.md"
    out_md.write_text(report, encoding="utf-8")
    print(f"\nReport generato: {out_md}")

    # Esporta GeoJSON dei segmenti non coperti (in WGS84)
    nc = results["not_covered"].to_crs(epsg=4326)
    nc_out = nc[["EntityHand", "length_m", "coverage_pct", "geometry"]]
    nc_out.to_file(ROOT / "gv_non_coperte_grafo2026.geojson", driver="GeoJSON")
    print(f"Esportato: gv_non_coperte_grafo2026.geojson ({len(nc)} segmenti)")

    pc = results["partially"].to_crs(epsg=4326)
    pc_out = pc[["EntityHand", "length_m", "coverage_pct", "geometry"]]
    pc_out.to_file(
        ROOT / "gv_parzialmente_coperte_grafo2026.geojson", driver="GeoJSON"
    )
    print(
        f"Esportato: gv_parzialmente_coperte_grafo2026.geojson ({len(pc)} segmenti)"
    )

    print(f"\n{report[:1000]}")


if __name__ == "__main__":
    main()
