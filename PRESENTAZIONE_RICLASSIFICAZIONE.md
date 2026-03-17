# Riclassificazione della Viabilità Principale del PGTU di Roma Capitale
### Presentazione sintetica del metodo e dei risultati

---

## Contesto e obiettivi

Il PGTU vigente (revisione 2015) classifica **1.301 archi stradali** in 5 livelli gerarchici (A, S, IQ, Q, IZ).

**Perché aggiornare?**
- I flussi di traffico sono cambiati
- La rete TPL si è evoluta
- Nuovi sviluppi urbanistici hanno modificato la domanda di mobilità

**Cosa abbiamo fatto:**
Sviluppato un metodo data-driven per verificare, aggiornare e integrare la classificazione della rete stradale principale, basato su **dati oggettivi e verificabili**.

---

## Le fonti dati integrate

| Fonte | Contenuto | Dimensione |
|-------|-----------|------------|
| **TomTom** | Flussi veicolari medi H24 | 94.148 archi |
| **Annesso D PGTU** | Rete classificata vigente | 1.301 segmenti |
| **ATAC** | Linee TPL attive (feb. 2025) | 902 linee |
| **Grande Viabilità 2019** | Rete di grande viabilità | Da attributi PGTU |
| **Dati territoriali** | Strade provinciali, extraurbane, centri abitati | Complementari |

Tutte le fonti sono allineate in **EPSG:3004**, consentendo analisi spaziali dirette senza riproiezioni.

---

## Analisi esplorativa dei flussi

La rete TomTom evidenzia una distribuzione fortemente asimmetrica:

- **23%** della rete ha flussi < 1.000 veicoli/giorno (viabilità locale)
- **47,5%** supera i 5.000 veicoli/giorno (viabilità ad alta intensità)
- **28,2%** supera i 10.000 veicoli/giorno (nucleo della rete principale)

**Soglia operativa adottata: 5.000 veicoli/giorno** — individua 44.773 archi (quasi la metà della rete) che costituiscono il bacino di riferimento per la classificazione principale.

---

## Il matching spaziale: il cuore del metodo

Abbiamo sviluppato un algoritmo di **matching lineare multi-filtro** per associare le diverse reti tra loro:

### I 4 filtri successivi

1. **Preselezione** — Solo archi TomTom con flusso > 1.000 veic/g e lunghezza ≥ 5 m → **71.711 archi**
2. **Sovrapposizione metrica** — Buffer 30 m, copertura ≥ 50%, overlap ≥ 3 m → **65.283 candidati**
3. **Vincolo angolare** — Δangolo ≤ 45° (solo archi collineari) → **52.653 candidati**
4. **Verifica toponomastica** — Confronto semantico nomi strada → **best match finale**

### Risultati del matching TomTom–PGTU

| | Valore |
|---|---|
| Match accettati | **42.786 (59,7%)** degli archi TomTom sopra soglia |
| Copertura lato PGTU | **95–96%** dei segmenti PGTU ha almeno un arco TomTom associato |
| Segmenti PGTU senza corrispondenza | Solo 58 su 1.301 |

---

## Matching con rete ATAC e Grande Viabilità

### TomTom–ATAC
- **71,2%** degli archi sopra soglia è associato a una linea ATAC
- Il **90,2%** degli archi classificati TPL nell'Annesso D risulta effettivamente coperto da ATAC
- Il restante 9,8% rappresenta potenziali discrepanze da verificare

### TomTom–Grande Viabilità
- **26.237 archi** risultano associati alla Grande Viabilità
- Identificati disallineamenti tra la classificazione ufficiale e il matching geometrico

---

## Le Tabelle di Sintesi: lo strumento operativo

Per ogni strada, abbiamo aggregato tutti gli indicatori in un unico cruscotto:

- **Flusso medio pesato** per lunghezza degli archi
- **% della strada coperta dal PGTU**, da ATAC, dalla Grande Viabilità
- **% della strada con flusso > soglia** (parametro variabile, default 5.000 veic/g)
- Classificazione funzionale, municipio di appartenenza

Le tabelle sono state prodotte **per ciascuno dei 15 Municipi** in due versioni:
- **Tabella Flussi Bassi** — Strade PGTU con flussi relativamente bassi (candidati alla rimozione)
- **Tabella Flussi Elevati** — Strade fuori PGTU con flussi alti (candidati all'inserimento)

---

## I 7 casi d'uso per la riclassificazione

| # | Caso d'uso | Cosa identifica |
|---|------------|----------------|
| 1 | Strade PGTU senza dati TomTom | Archi classificati ma senza flussi misurabili |
| 2 | Strade NON PGTU con forti flussi | **Candidati prioritari per l'inserimento** |
| 3 | Strade NON PGTU con picchi di flusso | Colli di bottiglia e criticità localizzate |
| 4 | Strade con ATAC ma non in PGTU | Assi TPL non riconosciuti nella rete principale |
| 5 | Strade PGTU senza ATAC | Possibile carenza di servizio TPL |
| 6 | Grande Viabilità non in PGTU | Incoerenza tra reti pianificatorie |
| 7 | PGTU non in Grande Viabilità | Verifica della permanenza nella rete principale |

Questi filtri combinati consentono un'analisi **sistematica e esaustiva** di tutte le possibili criticità.

---

## Il Grafo 2026: la rete proposta

Il Grafo 2026 nasce dalla combinazione di:

**Annesso D vigente** (1.301 archi) **+** Proposte di inserimento **−** Proposte di eliminazione

### Novità nella classificazione

Aggiunta la categoria **Extraurbana (EX)** per strade in contesto non urbano con funzione di collegamento:

| Codice | Livello | Denominazione |
|--------|---------|---------------|
| A | 0 | Autostrade |
| S | 1 | Scorrimento |
| IQ | 2 | Interquartiere |
| Q | 3 | Quartiere |
| IZ | 4 | Interzonali |
| **EX** | — | **Extraurbana** (nuova) |

Ogni proposta è corredata da: nome strada, fonte, classificazione, flussi, municipio, note e geometria GeoJSON.

---

## Verifiche automatiche di coerenza

Il Grafo 2026 è stato sottoposto a tre livelli di controllo:

### 1. Disconnessioni di rete
Identificazione degli endpoint isolati (tolleranza 25 m) — punti in cui la rete si interrompe senza connessione ad altri archi.

### 2. Discontinuità di classificazione
Intersezioni con salti gerarchici > 1 livello (es. da S direttamente a IZ, saltando IQ e Q).

### 3. Discontinuità estreme
Salti di 2+ livelli — criticità prioritarie che richiedono intervento immediato.

---

## Punti di forza del metodo

- **Oggettività** — Basato su dati di flusso misurati, non su valutazioni soggettive
- **Completezza** — Visione multicriteriale: traffico + TPL + Grande Viabilità + territorio
- **Rigore geometrico** — Matching multi-filtro (metrico, angolare, toponomastico)
- **Sistematicità** — 7 casi d'uso applicati su 15 Municipi
- **Verificabilità** — Controlli automatici di coerenza topologica e gerarchica
- **Trasparenza** — Tutti i dati esportabili in GeoJSON, Shapefile, Excel

---

## Output prodotti

| Prodotto | Formato |
|----------|---------|
| Grafo 2026 della rete proposta | GeoJSON / Shapefile |
| Database integrato TomTom–PGTU–ATAC–GV | Excel |
| Tabelle di Sintesi per Municipio (I–XV) | Excel |
| Report per Municipio con mappe | HTML / Word |
| Mappe tematiche dei flussi | Cartografia interattiva |
| Layer individuali per analisi GIS | Shapefile / GeoJSON |

---

## In sintesi

> Abbiamo costruito un **sistema analitico completo** che, partendo da 94.148 archi TomTom con flussi reali, li ha incrociati con la rete PGTU, il TPL e la Grande Viabilità attraverso un matching spaziale rigoroso, producendo un **Grafo 2026** aggiornato, verificato e documentato per ciascuno dei 15 Municipi di Roma Capitale.

Il metodo è **iterativo**: le proposte possono essere affinate, le verifiche ripetute e i report rigenerati fino al raggiungimento di una configurazione di rete coerente con gli obiettivi di pianificazione del PGTU.

---

*Piano Generale del Traffico Urbano — Roma Capitale*
