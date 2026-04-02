#!/usr/bin/env python3
"""
Confronto tra Grande Viabilità, Grafo 2026 e Grafo 2015 (Annesso D).

Produce un report Markdown con:
A) Strade della Grande Viabilità presenti nel Grafo 2026
B) Strade GV nel Grafo 2015 ma non nel Grafo 2026 (per nome esatto)
C) Strade GV nel 2015, presenti nel 2026 ma non più marcate GV
D) Strade nel Grafo 2026 ma non nel Grafo 2015 (nuove)
E) Strade nel Grafo 2015 ma non nel Grafo 2026 (rimosse)
"""

import json
from pathlib import Path

ROOT = Path(__file__).parent


def load_geojson(path):
    with open(path) as f:
        return json.load(f)


def load_js_geojson(path):
    with open(path) as f:
        content = f.read()
    idx = content.index("{")
    json_str = content[idx:].rstrip().rstrip(";")
    return json.loads(json_str)


def extract_roads_2026(data):
    roads = {}
    for feat in data["features"]:
        p = feat["properties"]
        name = (p.get("nome") or "").strip()
        if name:
            roads[name] = {
                "classifica": p.get("classifica"),
                "grande_viabilita": p.get("grande_viabilita"),
                "municipio": p.get("municipio"),
                "fonte": p.get("fonte"),
            }
    return roads


def extract_roads_2015(data):
    roads = {}
    for feat in data["features"]:
        p = feat["properties"]
        name = (p.get("Nome") or p.get("Toponomast") or "").strip()
        if name:
            roads[name] = {
                "classifica": p.get("Classifica"),
                "grande_viabilita": p.get("Grande_Via"),
                "municipio": p.get("Municipio"),
            }
    return roads


def make_report(roads_2026, roads_2015):
    lines = []

    gv_in_2026 = {n: v for n, v in roads_2026.items() if v["grande_viabilita"] == "Si"}
    gv_2015_names = {n for n, v in roads_2015.items() if v["grande_viabilita"] == "Si"}
    gv_2026_names = set(gv_in_2026.keys())

    gv_in_2015_not_2026 = gv_2015_names - set(roads_2026.keys())
    gv_lost = {
        n
        for n in (gv_2015_names & set(roads_2026.keys()))
        if roads_2026[n]["grande_viabilita"] != "Si"
    }

    only_2026 = set(roads_2026.keys()) - set(roads_2015.keys())
    only_2015 = set(roads_2015.keys()) - set(roads_2026.keys())

    lines.append("# Confronto Grande Viabilità / Grafo 2026 / Grafo 2015\n")
    lines.append("## Statistiche\n")
    lines.append(f"| Dataset | Strade |")
    lines.append(f"|---------|--------|")
    lines.append(f"| Grafo 2026 | {len(roads_2026)} |")
    lines.append(f"| Grafo 2015 (Annesso D) | {len(roads_2015)} |")
    lines.append(f"| Strade GV nel Grafo 2026 | {len(gv_in_2026)} |")
    lines.append(f"| Strade GV nel Grafo 2015 | {len(gv_2015_names)} |")
    lines.append("")

    # A
    lines.append(f"## A) Strade Grande Viabilità presenti nel Grafo 2026 ({len(gv_in_2026)})\n")
    lines.append("| Strada | Classifica | Municipio |")
    lines.append("|--------|------------|-----------|")
    for n in sorted(gv_in_2026.keys()):
        v = gv_in_2026[n]
        lines.append(f"| {n} | {v['classifica']} | {v['municipio']} |")
    lines.append("")

    # B
    lines.append(
        f"## B) Strade GV nel Grafo 2015 ma assenti dal Grafo 2026 ({len(gv_in_2015_not_2026)})\n"
    )
    lines.append(
        "Nota: queste strade nel 2015 avevano un nome generico (es. 'Via Aurelia') "
        "e nel 2026 sono state suddivise in tratti specifici (es. 'Via Aurelia (Aurelia Antica-GRA)').\n"
    )
    lines.append("| Strada | Classifica 2015 | Municipio |")
    lines.append("|--------|----------------|-----------|")
    for n in sorted(gv_in_2015_not_2026):
        v = roads_2015[n]
        lines.append(f"| {n} | {v['classifica']} | {v['municipio']} |")
    lines.append("")

    # C
    lines.append(
        f"## C) Strade GV nel 2015, presenti nel 2026 ma non più marcate GV ({len(gv_lost)})\n"
    )
    lines.append("| Strada | Classifica 2015 | Classifica 2026 |")
    lines.append("|--------|----------------|-----------------|")
    for n in sorted(gv_lost):
        lines.append(
            f"| {n} | {roads_2015[n]['classifica']} | {roads_2026[n]['classifica']} |"
        )
    lines.append("")

    # D
    lines.append(f"## D) Strade nel Grafo 2026 ma non nel Grafo 2015 - nuove ({len(only_2026)})\n")
    lines.append("| Strada | Classifica | Municipio | Fonte |")
    lines.append("|--------|------------|-----------|-------|")
    for n in sorted(only_2026):
        v = roads_2026[n]
        lines.append(f"| {n} | {v['classifica']} | {v['municipio']} | {v['fonte']} |")
    lines.append("")

    # E
    lines.append(
        f"## E) Strade nel Grafo 2015 ma non nel Grafo 2026 - rimosse ({len(only_2015)})\n"
    )
    lines.append("| Strada | Classifica | Municipio |")
    lines.append("|--------|------------|-----------|")
    for n in sorted(only_2015):
        v = roads_2015[n]
        lines.append(f"| {n} | {v['classifica']} | {v['municipio']} |")
    lines.append("")

    return "\n".join(lines)


if __name__ == "__main__":
    grafo2026 = load_geojson(ROOT / "2a.PGTU_Grafo_2026.geojson")
    grafo2015 = load_geojson(ROOT / "1a.PGTU_Annesso_D_2015.geojson")

    roads_2026 = extract_roads_2026(grafo2026)
    roads_2015 = extract_roads_2015(grafo2015)

    report = make_report(roads_2026, roads_2015)

    out = ROOT / "CONFRONTO_GRAFI_GV.md"
    out.write_text(report, encoding="utf-8")
    print(f"Report generato: {out}")
    print(report[:500])
