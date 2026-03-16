# PGTU Roma - Mappa Interattiva delle Proposte di Modifica

## Documentazione Completa

---

## Indice

1. [Panoramica del Progetto](#1-panoramica-del-progetto)
2. [Struttura dei File](#2-struttura-dei-file)
3. [Architettura Tecnica](#3-architettura-tecnica)
4. [Sorgenti Dati e Formati](#4-sorgenti-dati-e-formati)
5. [Interfaccia Utente - Layout](#5-interfaccia-utente---layout)
6. [Layer della Mappa](#6-layer-della-mappa)
7. [Sistema di Ricerca](#7-sistema-di-ricerca)
8. [Pannello Dati Tabellari](#8-pannello-dati-tabellari)
9. [Strumento di Misura](#9-strumento-di-misura)
10. [Sistema Proposte - Panoramica](#10-sistema-proposte---panoramica)
11. [Modalità Eliminazione](#11-modalità-eliminazione)
12. [Modalità Inserimento](#12-modalità-inserimento)
13. [Modalità Punto](#13-modalità-punto)
14. [Modalità Disegna Linea](#14-modalità-disegna-linea)
15. [Il Modale di Inserimento](#15-il-modale-di-inserimento)
16. [Classificazione Stradale](#16-classificazione-stradale)
17. [Gestione Proposte Esistenti](#17-gestione-proposte-esistenti)
18. [Export e Import](#18-export-e-import)
19. [Generazione Report](#19-generazione-report)
20. [Grafo 2026 - Layer Editabile](#20-grafo-2026---layer-editabile)
21. [Analisi di Rete - Disconnessioni e Discontinuità](#21-analisi-di-rete---disconnessioni-e-discontinuità)
22. [Esporta/Importa Layer](#22-esportaimporta-layer)
23. [Struttura Dati delle Proposte](#23-struttura-dati-delle-proposte)
24. [Scorciatoie da Tastiera](#24-scorciatoie-da-tastiera)
25. [Dipendenze Esterne](#25-dipendenze-esterne)
26. [Limitazioni Note](#26-limitazioni-note)

---

## 1. Panoramica del Progetto

**PGTU Roma - Mappa Interattiva** è un'applicazione web client-side per la visualizzazione, analisi e pianificazione di modifiche alla rete stradale di Roma Capitale nell'ambito del Piano Generale del Traffico Urbano (PGTU).

L'applicazione consente di:

- **Visualizzare** la rete stradale PGTU con classificazione funzionale
- **Analizzare** i flussi di traffico giornalieri (bassi ed elevati) da dati TomTom
- **Consultare** le linee del trasporto pubblico ATAC e la rete TPL con sovrapposizioni
- **Visualizzare** strade extraurbane, provinciali e centri abitati
- **Creare proposte** di eliminazione o inserimento di archi stradali nella rete
- **Disegnare** nuovi archi stradali direttamente sulla mappa
- **Editare il Grafo 2026**: layer editabile che combina Annesso D + proposte
- **Analizzare la rete**: rilevamento automatico di disconnessioni e discontinuità di classificazione
- **Identificare mismatch**: confronto tra rete TPL 5+ e Annesso D
- **Generare report** dettagliati per municipio in HTML, Word ed Excel
- **Esportare** le proposte e i singoli layer in formato JSON, GeoJSON, Shapefile o ZIP

L'applicazione è interamente client-side: non richiede un server backend e funziona aprendo il file `index.html` in un browser moderno. I dati delle proposte vengono salvati nel `localStorage` del browser.

---

## 2. Struttura dei File

```
PGTU/
├── index.html                              # Applicazione principale (singolo file HTML+CSS+JS)
├── data_tabella1.js                        # Dati tabellari flussi bassi per municipio
├── data_tabella2.js                        # Dati tabellari flussi elevati per municipio
├── data_proposte.js                        # File template per proposte (non utilizzato attivamente)
├── data_disconnessioni.js                  # Dati disconnessioni di rete pre-calcolate
├── data_centri_abitati.js                  # Perimetrazione centri abitati (~1.8 MB)
├── data_rete_tpl_3.js                      # Rete TPL sovrapposizione 3+ linee bus (~1.6 MB)
├── data_rete_tpl_5.js                      # Rete TPL sovrapposizione 5+ linee bus (~868 KB)
├── data_strade_provinciali.js              # Strade provinciali (~3.0 MB)
├── data_extraurbane.js                     # Strade extraurbane (~412 KB)
├── intersezioni.geojson                    # Intersezioni stradali (354 KB)
├── convert_excel_to_js.py                  # Script Python per convertire Excel → JS
├── ATAC_FEB25_LINE.shp                     # Shapefile originale linee ATAC (Feb 2025)
├── Strade_Extraurbane.gpkg                 # GeoPackage strade extraurbane (612 KB)
│
└── Mappe Proposte_130224/                  # Dati geospaziali (export QGIS del 13/02/2024)
    ├── Tabella 1/                          # Rete principale (flussi bassi)
    │   ├── Tabella_Sintesi_1_v2.xlsx       # Foglio Excel originale
    │   └── Mappa/
    │       ├── layers/
    │       │   ├── Municipi_1.js           # Confini 15 municipi (MultiPolygon)
    │       │   ├── PGTUAnnessoD_5.js       # Rete stradale PGTU (~3.9 MB)
    │       │   ├── FlussiTomTomflussi_tomtom_3.js  # Flussi bassi (LineString)
    │       │   ├── LineeATAC_4.js          # Linee trasporto pubblico
    │       │   ├── PGTU_senza_dati_2.js    # Strade PGTU senza dati (non usato)
    │       │   └── layers.js               # Configurazione layer QGIS
    │       ├── styles/                     # Stili QGIS (non usati dall'app)
    │       │   └── legend/                 # Immagini legenda QGIS
    │       ├── resources/                  # Librerie QGIS web export
    │       └── webfonts/                   # Font Awesome
    │
    └── Tabella 2/                          # Rete secondaria (flussi elevati)
        ├── Tabella_Sintesi_2_050126.xlsx   # Foglio Excel originale
        └── Mappa/
            ├── layers/
            │   ├── FlussiTomTomflussi_tomtom_2.js  # Flussi elevati (LineString)
            │   ├── Municipi_1.js           # Confini municipi (copia)
            │   ├── PGTUAnnessoD_4.js       # Rete PGTU (copia)
            │   ├── ATAC_3.js               # Linee ATAC (copia)
            │   └── layers.js
            ├── styles/                     # Stili QGIS
            └── resources/                  # Librerie QGIS
```

### File principali usati dall'applicazione

| File | Dimensione | Descrizione |
|------|-----------|-------------|
| `index.html` | ~5700 righe | App completa: HTML + CSS + JavaScript |
| `Municipi_1.js` | ~1 MB | GeoJSON confini 15 municipi di Roma |
| `PGTUAnnessoD_5.js` | ~3.9 MB | GeoJSON rete stradale PGTU (Annesso D) |
| `FlussiTomTomflussi_tomtom_3.js` | ~2 MB | GeoJSON flussi bassi (Tabella 1) |
| `FlussiTomTomflussi_tomtom_2.js` | ~1.5 MB | GeoJSON flussi elevati (Tabella 2) |
| `LineeATAC_4.js` | ~4 MB | GeoJSON linee ATAC (caricamento lazy) |
| `data_tabella1.js` | ~90 KB | Dati Excel Tab 1 convertiti in JS |
| `data_tabella2.js` | ~150 KB | Dati Excel Tab 2 convertiti in JS |
| `data_strade_provinciali.js` | ~3.0 MB | GeoJSON strade provinciali |
| `data_extraurbane.js` | ~412 KB | GeoJSON strade extraurbane |
| `data_centri_abitati.js` | ~1.8 MB | GeoJSON perimetrazione centri abitati |
| `data_rete_tpl_3.js` | ~1.6 MB | GeoJSON rete TPL sovrapposizione 3+ linee |
| `data_rete_tpl_5.js` | ~868 KB | GeoJSON rete TPL sovrapposizione 5+ linee |
| `data_disconnessioni.js` | ~9.4 KB | GeoJSON disconnessioni di rete pre-calcolate |

---

## 3. Architettura Tecnica

### Stack tecnologico

- **Frontend**: HTML5, CSS3, JavaScript vanilla (ES5 compatibile)
- **Mappa**: Leaflet.js 1.9.4
- **Tile server**: OpenStreetMap (openstreetmap.org)
- **Geocoding**: OpenStreetMap Nominatim API
- **Persistenza**: localStorage del browser
- **Export Shapefile**: shp-write 0.3.2 (caricato on-demand da CDN)
- **Export Excel**: SheetJS (xlsx 0.20.3, caricato on-demand da CDN)
- **Export ZIP**: JSZip 3.10.1 (caricato on-demand da CDN)

### Flusso dati

```
File GeoJSON (.js)  →  Leaflet L.geoJSON()  →  Layer sulla mappa
                                              →  Popup al click
                                              →  Indice di ricerca

File Excel (.js)    →  Oggetti JavaScript    →  Tabelle nel pannello dati

Azioni utente       →  Oggetti proposta      →  localStorage
                                              →  Layer proposte sulla mappa
                                              →  Export JSON/GeoJSON/SHP
                                              →  Report HTML con canvas
```

### Persistenza

I dati vengono salvati nel `localStorage` del browser con le seguenti chiavi:

| Chiave | Contenuto |
|--------|-----------|
| `pgtu_proposte_manual` | Proposte di eliminazione e inserimento |
| `pgtu_grafo_2026` | Archi del Grafo 2026 (rete editabile) |
| `pgtu_resolved_disc` | Disconnessioni di rete risolte/ignorate |
| `pgtu_resolved_disc_class` | Discontinuità di classificazione risolte |
| `pgtu_resolved_disc_estrema` | Discontinuità estreme risolte |

**Attenzione**: I dati vengono persi se si cancella la cache del browser. Usare la funzione di esportazione per fare backup regolari.

---

## 4. Sorgenti Dati e Formati

### 4.1 Confini Municipi (`Municipi_1.js`)

- **Formato**: GeoJSON FeatureCollection
- **CRS**: CRS84 (WGS84, longitudine-latitudine)
- **Geometria**: MultiPolygon
- **Proprietà**:
  - `Name`: Nome completo (es. "Municipio III (ex IV)")
  - `Attuale`: Numero romano (es. "III")
  - `Numero`: Numero arabo (es. "3")
- **Elementi**: 15 municipi

### 4.2 Rete Stradale PGTU (`PGTUAnnessoD_5.js`)

- **Formato**: GeoJSON FeatureCollection
- **Geometria**: MultiLineString
- **Proprietà principali**:
  - `Toponomast` / `Nome`: Nome della strada
  - `Classifica`: Classificazione funzionale (A, S, IQ, Q, IZ)
  - `Municipio`: Numero municipio
  - `Cod_prog`: Codice progressivo
  - `Limiti`: Limiti dell'arco stradale
  - `Grande_Via`: Grande viabilità (Sì/No)
  - `TPL`: Trasporto Pubblico Locale (Sì/No)
  - `Note_2025`: Note aggiornate al 2025

### 4.3 Flussi Bassi - Tabella 1 (`FlussiTomTomflussi_tomtom_3.js`)

Strade della rete principale con flussi giornalieri relativamente bassi.

- **Geometria**: LineString / MultiLineString
- **Proprietà principali**:
  - `Toponomast` / `Nome Strad` / `Toponom`: Nome strada
  - `Flussi Gio`: Flussi giornalieri (veicoli/giorno)
  - `Flusso Med`: Flusso medio
  - `CF`: Classificazione funzionale
  - `Municipio`: Numero municipio
  - `Is_ATAC`: Presenza linea ATAC (true/false)
  - `Is_GrandeV`: Grande viabilità (true/false)
  - `Is_Annesso`: Presente in Annesso D (true/false)

### 4.4 Flussi Elevati - Tabella 2 (`FlussiTomTomflussi_tomtom_2.js`)

Strade fuori dalla rete principale con flussi elevati.

- **Geometria**: LineString / MultiLineString
- **Proprietà principali**:
  - `Toponomastica` / `Nome Strada` / `Toponom`: Nome strada
  - `Flussi Giornalieri`: Flussi giornalieri
  - `Flusso Medio`: Flusso medio
  - `CF`: Classificazione funzionale
  - `Municipio`: Numero municipio
  - `Is_ATAC`, `Is_GrandeViabilita`, `Is_AnnessoD`: Flag booleani

### 4.5 Linee ATAC (`LineeATAC_4.js`)

- **Geometria**: LineString / MultiLineString
- **Caricamento**: Lazy (solo quando attivato il toggle)
- **Proprietà principali**:
  - `SiglaL_Ute` / `SiglaUtent`: Sigla linea (es. "60", "H")
  - `NomeEsteso`: Nome completo del percorso
  - `Lunghezza`: Lunghezza in metri
  - `NodiSupp`: Numero fermate
  - `Az_Linea`: Azienda operatrice
  - `Attivo`: Stato attivo (TRUE/FALSE)

### 4.6 Strade Provinciali (`data_strade_provinciali.js`)

- **Formato**: GeoJSON FeatureCollection
- **Geometria**: LineString / MultiLineString
- **Dimensione**: ~3.0 MB
- **Proprietà principali**:
  - `Nome`: Nome della strada provinciale
  - `Codice`: Codice identificativo della strada provinciale
- **Filtraggio**: I segmenti vengono filtrati spazialmente per mostrare solo quelli all'interno dei confini dei Municipi di Roma

### 4.7 Strade Extraurbane (`data_extraurbane.js`)

- **Formato**: GeoJSON FeatureCollection
- **Geometria**: LineString / MultiLineString
- **Dimensione**: ~412 KB
- **Proprietà principali**:
  - `Toponomastica` / `Nome`: Nome della strada
  - `Classificazione`: Classificazione funzionale
  - `Limiti`: Limiti di velocità
  - `Municipio`: Numero municipio
  - `Grande_Viabilità_2019`: Flag grande viabilità
  - `TPL`: Trasporto pubblico locale
  - `Note_2025`: Note aggiornate al 2025

### 4.8 Centri Abitati (`data_centri_abitati.js`)

- **Formato**: GeoJSON FeatureCollection
- **Geometria**: LineString (convertiti in Polygon per la visualizzazione)
- **Dimensione**: ~1.8 MB
- **Descrizione**: Perimetrazione dei centri abitati di Roma utilizzata come riferimento per la classificazione stradale

### 4.9 Rete TPL - Sovrapposizione 3+ linee (`data_rete_tpl_3.js`)

- **Formato**: GeoJSON FeatureCollection
- **Geometria**: LineString / MultiLineString
- **Dimensione**: ~1.6 MB
- **Descrizione**: Segmenti stradali su cui transitano 3 o più linee di trasporto pubblico ATAC
- **Proprietà principali**:
  - Numero di linee sovrapposte (utilizzato per la colorazione per fasce)

### 4.10 Rete TPL - Sovrapposizione 5+ linee (`data_rete_tpl_5.js`)

- **Formato**: GeoJSON FeatureCollection
- **Geometria**: LineString / MultiLineString
- **Dimensione**: ~868 KB
- **Descrizione**: Segmenti stradali su cui transitano 5 o più linee di trasporto pubblico ATAC

### 4.11 Dati Tabellari (`data_tabella1.js`, `data_tabella2.js`)

Struttura JavaScript organizzata per municipio:

```javascript
var dataTabella1 = {
    "1": [  // Municipio 1
        {
            "Identificazione Strada": "Via Roma",
            "Is_PGTU": "Si",
            "Classificazione": "S",
            "% PGTU": 0.85,
            "Flusso medio": 12500,
            "Flusso Min": 8000,
            "Flusso Max": 17000,
            "Is_TPL": "Si",
            "Is_GV": "No"
        },
        // ... altre strade
    ],
    "2": [...],
    // ... fino al municipio 15
};
```

---

## 5. Interfaccia Utente - Layout

### Disposizione generale

```
┌──────────────────────────────────────────────────────┐
│ [Banner modalità edit - appare solo in editing]       │
├────────────────────────────────┬─────────────────────┤
│                                │  PANNELLO CONTROLLO  │
│                                │  ┌─────────────────┐│
│                                │  │ 🔍 Cerca strada ││
│                                │  ├─────────────────┤│
│                                │  │ Seleziona       ││
│        MAPPA LEAFLET           │  │ Municipio  ▼    ││
│                                │  ├─────────────────┤│
│     (OpenStreetMap tiles)      │  │ ☑ PGTU Annesso D││
│                                │  │ ☑ Flussi Bassi  ││
│                                │  │ ☑ Flussi Elevati││
│                                │  │ ☐ Linee ATAC    ││
│                                │  │ ☑ Prop. Elim.   ││
│                                │  │ ☑ Prop. Ins.    ││
│                                │  ├─────────────────┤│
│                                │  │ [+ Elim] [+ Ins]││
│                                │  │ [Punto] [Disegna]│
│                                │  │ Proposte: 3 Elim││
│                                │  ├─────────────────┤│
│                                │  │ [JSON][GeoJ][SHP]│
│                                │  │ [Report]        ││
│                                │  │ [Importa][Canc.] │
│                                │  └─────────────────┘│
├────────────────────────────────┴─────────────────────┤
│ ═══════════ RESIZE HANDLE (trascinabile) ════════════│
├──────────────────────────────────────────────────────┤
│ Dati - Municipio I                          [Chiudi] │
│ ┌────────┐ ┌────────┐ ┌────────┐                    │
│ │ 42     │ │ 8.234  │ │ 3 Elim │                    │
│ │ Strade │ │ Media  │ │ Prop.  │                    │
│ └────────┘ └────────┘ └────────┘                    │
│ [Tab 1: Flussi Bassi] [Tab 2: Flussi Elevati]       │
│ ┌────────────────────────────────────────────────┐   │
│ │ Strada          │ Class │ Flusso │ Min │ Max   │   │
│ │ Via Roma        │ S     │ 12.500 │ 8k  │ 17k   │   │
│ └────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

### Pannello di controllo (destra)

Il pannello di controllo a destra contiene tutte le funzionalità organizzate in sezioni:

1. **Barra di ricerca** - Campo di testo per cercare strade
2. **Selettore municipio** - Dropdown per filtrare per municipio
3. **Toggle layer** - 6 checkbox per mostrare/nascondere i layer
4. **Legende** - Legenda colori per ogni layer attivo
5. **Pulsanti editing** - 4 pulsanti per le modalità di modifica
6. **Contatore proposte** - Mostra il numero di proposte salvate
7. **Pulsanti azione** - Export, import, report, cancella

---

## 6. Layer della Mappa

### 6.1 Layer base: OpenStreetMap (scala di grigi)

- Tile server: `https://tile.openstreetmap.org/{z}/{x}/{y}.png`
- **Filtro CSS**: Scala di grigi (brightness 0.85) per migliorare la leggibilità dei layer tematici
- Centro iniziale: Roma (41.9028, 12.4964)
- Zoom iniziale: 11
- Attribuzione: © OpenStreetMap contributors

### 6.2 Confini Municipi

- **Toggle**: Sempre visibile
- **Stile default**: Bordo grigio (#555), riempimento azzurro trasparente
- **Stile evidenziato**: Bordo blu (#0050aa), 4px, riempimento più intenso
- **Stile attenuato**: Bordo grigio chiaro, riempimento quasi trasparente
- **Interazione**: Click per selezionare il municipio → evidenzia il confine e attenua gli altri

### 6.3 Rete Stradale PGTU (Annesso D)

- **Toggle**: `☑ Rete Stradale PGTU` (attivo di default)
- **Colori per classificazione**:

| Codice | Nome | Colore | Hex |
|--------|------|--------|-----|
| A | Autostrade | Nero | `#000000` |
| S | Scorrimento | Blu | `#007bff` |
| IQ | Interquartiere | Ciano | `#27f1ff` |
| Q | Quartiere | Arancione | `#ff9400` |
| IZ | Interzonali | Giallo | `#e4ff00` |
| EX | Extraurbana | Marrone | `#8B4513` |

- **Spessore**: 2.5px, linea continua
- **Click**: Mostra popup con nome, classificazione, limiti, codice, municipio, note
- **In modalità edit**: Click aggiunge la strada come proposta

### 6.4 Flussi Bassi (Tabella 1)

- **Toggle**: `☑ Flussi Bassi (Tab. 1)` (attivo di default)
- **Scala colori** (gradiente verde):

| Range veicoli/giorno | Colore | RGB |
|----------------------|--------|-----|
| 100 - 2.200 | Verde scuro | `rgb(0,138,10)` |
| 2.200 - 4.160 | Verde | `rgb(64,167,72)` |
| 4.160 - 6.810 | Verde chiaro | `rgb(128,197,133)` |
| 6.810 - 15.640 | Verde pallido | `rgb(191,226,194)` |
| 15.640 - 57.830 | Grigio | `rgb(220,220,220)` |

- **Spessore**: 5px
- **Click**: Mostra popup con flussi giornalieri, media, classificazione, municipio

### 6.5 Flussi Elevati (Tabella 2)

- **Toggle**: `☑ Flussi Elevati (Tab. 2)` (attivo di default)
- **Scala colori** (gradiente rosso, 8 classi):

| Range veicoli/giorno | Colore | RGB |
|----------------------|--------|-----|
| 5.000 - 5.822 | Rosso chiaro | `rgb(255,90,90)` |
| 5.822 - 6.837 | Rosso | `rgb(239,78,77)` |
| 6.837 - 7.784 | Rosso medio | `rgb(222,65,64)` |
| 7.784 - 8.970 | Rosso intenso | `rgb(206,52,52)` |
| 8.970 - 10.982 | Rosso scuro | `rgb(189,40,39)` |
| 10.982 - 14.485 | Cremisi | `rgb(173,27,26)` |
| 14.485 - 22.268 | Bordeaux | `rgb(156,15,13)` |
| 22.268 - 77.500 | Rosso molto scuro | `rgb(140,2,0)` |

- **Spessore**: 4px

### 6.6 Linee ATAC

- **Toggle**: `☐ Linee ATAC` (disattivo di default, caricamento lazy)
- **Colore**: Rosso scuro `#8b1a1a`
- **Spessore**: 1.5px, opacità 0.7
- **Click**: Mostra sigla linea, nome percorso, lunghezza, fermate, operatore

### 6.7 Strade Extraurbane

- **Toggle**: `☐ Strade Extraurbane` (disattivo di default)
- **Colore**: Marrone `#8B4513`
- **Spessore**: 3px, opacità 0.8
- **Dati**: `data_extraurbane.js`
- **Click**: Mostra popup con nome, denominazione, classificazione, limiti, municipio, grande viabilità, TPL, note

### 6.8 Strade Provinciali

- **Toggle**: `☐ Strade Provinciali` (disattivo di default)
- **Colore**: Verde `#008000`
- **Spessore**: 2.5px, opacità 0.7
- **Dati**: `data_strade_provinciali.js`
- **Filtraggio**: Segmenti filtrati spazialmente all'interno dei confini dei Municipi
- **Click**: Mostra popup con nome e codice

### 6.9 Centri Abitati

- **Toggle**: `☐ Centri Abitati` (disattivo di default)
- **Colore**: Viola scuro `#4A0E4E`
- **Spessore**: 2px, opacità 0.8
- **Posizionamento**: Pane di sfondo (dietro tutti gli altri layer)
- **Dati**: `data_centri_abitati.js`
- **Geometria**: LineString convertiti in Polygon per la visualizzazione

### 6.10 Rete TPL (3+ linee)

- **Toggle**: `☐ Rete TPL 3+` (disattivo di default)
- **Dati**: `data_rete_tpl_3.js`
- **Scala colori per fasce**:

| Fasce linee | Colore | Hex |
|-------------|--------|-----|
| 3-4 linee | Giallo | `#fdd835` |
| 5-6 linee | Arancione | `#ff9800` |
| 7-9 linee | Rosso | `#f44336` |
| 10-14 linee | Viola | `#9c27b0` |
| 15+ linee | Blu scuro | `#1a237e` |

- **Spessore**: 3.5px, opacità 0.85, estremità arrotondate

### 6.11 Rete TPL (5+ linee)

- **Toggle**: `☐ Rete TPL 5+` (disattivo di default)
- **Dati**: `data_rete_tpl_5.js`
- **Scala colori**: Identica alla Rete TPL 3+ (vedi tabella sopra)
- **Spessore**: 3.5px, opacità 0.85, estremità arrotondate

### 6.12 TPL 5+ non in Annesso D (Mismatch)

- **Toggle**: `☐ TPL 5+ non in Annesso D` (disattivo di default)
- **Colore**: Arancione scuro `#e65100`
- **Stile**: Linea tratteggiata (dashArray 8,4), spessore 4px, opacità 0.85
- **Contatore**: Mostra il numero di segmenti trovati
- **Descrizione**: Evidenzia i segmenti con 5+ linee TPL che non sono presenti nell'Annesso D della rete PGTU

### 6.13 Annesso D non in TPL 5+ (Mismatch)

- **Toggle**: `☐ Annesso D non in TPL 5+` (disattivo di default)
- **Colore**: Blu medio `#1565c0`
- **Stile**: Linea tratteggiata (dashArray 8,4), spessore 4px, opacità 0.85
- **Contatore**: Mostra il numero di segmenti trovati
- **Descrizione**: Evidenzia i segmenti dell'Annesso D che non sono coperti da 5+ linee TPL

### 6.14 Grafo 2026

- **Toggle**: `☑ Grafo 2026` (vedi [sezione 20](#20-grafo-2026---layer-editabile) per dettagli completi)
- **Colori**: Stessi colori della classificazione stradale (incluso EX marrone)
- **Descrizione**: Layer editabile che combina l'Annesso D con le proposte di modifica

### 6.15 Disconnessioni e Discontinuità

- Vedi [sezione 21](#21-analisi-di-rete---disconnessioni-e-discontinuità) per dettagli completi sui layer di analisi di rete

### 6.16 Proposte Eliminazione

- **Toggle**: `☑ Proposte Elim.` (attivo di default)
- **Linee**: Tratteggiate (dash 12,8), spessore 8px, opacità 0.9
  - Colore: rosso `#e74c3c` oppure colore della classificazione se impostata
- **Punti**: Cerchio 9px, bordo 3px, riempimento 0.7 opacità, sempre rosso

### 6.17 Proposte Inserimento

- **Toggle**: `☑ Proposte Ins.` (attivo di default)
- **Linee**: Tratteggiate (dash 12,8), spessore 8px, opacità 0.9
  - Colore: verde scuro `#006400` oppure colore della classificazione se impostata
- **Punti**: Cerchio 9px, bordo 3px, riempimento 0.7 opacità, sempre verde

### Ordine Z dei layer (dal fronte al fondo)

1. Proposte Inserimento (sempre in primo piano)
2. Proposte Eliminazione
3. Disconnessioni / Discontinuità (marker circolari)
4. Grafo 2026
5. Rete PGTU
6. Flussi Bassi / Flussi Elevati
7. TPL Mismatch layers
8. Rete TPL 3+ / 5+
9. Strade Extraurbane / Strade Provinciali
10. Linee ATAC
11. Centri Abitati (pane di sfondo)
12. Confini Municipi (sempre sul fondo)

---

## 7. Sistema di Ricerca

### 7.1 Ricerca locale

La barra di ricerca in alto nel pannello di controllo cerca in tempo reale tra tutte le strade caricate:

1. **Digitare almeno 2 caratteri** nel campo "Cerca strada o indirizzo..."
2. L'app cerca nei nomi di tutte le strade di:
   - Rete PGTU (Annesso D)
   - Flussi Bassi (Tabella 1)
   - Flussi Elevati (Tabella 2)
3. I risultati appaiono in un dropdown, raggruppati per fonte
4. **Click su un risultato** → la mappa:
   - Si centra sulla strada trovata
   - Evidenzia la strada con un effetto lampeggiante magenta
   - Mostra il popup informativo

### 7.2 Ricerca OpenStreetMap

Se si digitano almeno 3 caratteri, l'app cerca anche su **OpenStreetMap Nominatim**:

- Query: `"{testo digitato}, Roma"`
- Limiti: viewport centrato su Roma
- I risultati OSM appaiono sotto quelli locali, separati da un divisore
- Click su un risultato OSM → la mappa si centra sulla posizione trovata

### 7.3 Ricerca dalla tabella

Nella tabella dati in basso, i nomi delle strade sono **cliccabili**:

- Click sul nome → cerca la strada nei layer della mappa
- Se trovata, la mappa si centra e lampeggia la strada
- Se non trovata, nessuna azione

---

## 8. Pannello Dati Tabellari

### Attivazione

Il pannello si apre selezionando un municipio dal dropdown "Seleziona Municipio".

### Componenti

1. **Titolo**: "Dati - Municipio [Nome]"
2. **Card statistiche**:
   - Numero strade nel municipio
   - Flusso medio giornaliero
   - Numero proposte per quel municipio
3. **Tab 1: Flussi Bassi** - Dati dalla Tabella di Sintesi 1
4. **Tab 2: Flussi Elevati** - Dati dalla Tabella di Sintesi 2

### Colonne Tab 1

| Colonna | Descrizione |
|---------|-------------|
| Identificazione Strada | Nome della strada (cliccabile per navigare) |
| PGTU | Se la strada è nella rete PGTU |
| Class. | Classificazione funzionale |
| % PGTU | Percentuale di copertura PGTU |
| Flusso Medio | Flusso medio giornaliero |
| Flusso Min | Flusso minimo |
| Flusso Max | Flusso massimo |
| TPL | Presenza trasporto pubblico |
| GV | Grande viabilità |

### Colonne Tab 2

| Colonna | Descrizione |
|---------|-------------|
| Identificazione Strada | Nome della strada (cliccabile) |
| PGTU | Se presente nella rete |
| Flusso Medio | Flusso medio giornaliero |
| Flusso Min | Flusso minimo |
| Flusso Max | Flusso massimo |
| TPL | Trasporto pubblico locale |
| GV | Grande viabilità |

### Ridimensionamento

La barra blu tra mappa e tabella è **trascinabile**:
- Trascinare verso l'alto → tabella più grande, mappa più piccola
- Trascinare verso il basso → mappa più grande, tabella più piccola
- Altezza minima mappa: 100px
- Altezza minima tabella: 80px

---

## 9. Strumento di Misura

### Attivazione

Pulsante con icona righello (📏) nell'angolo in alto a sinistra della mappa.

### Utilizzo

1. **Click** sul pulsante misura per attivarlo (diventa blu)
2. **Click sulla mappa** per posizionare il primo punto
3. **Click successivi** aggiungono punti e mostrano:
   - Distanza del singolo segmento
   - Distanza totale cumulativa
4. **Click** di nuovo sul pulsante per disattivare e cancellare le misure

### Formato distanze

- Se < 1000m: mostra in metri (es. "320 m")
- Se ≥ 1000m: mostra in km (es. "2.35 km")

---

## 10. Sistema Proposte - Panoramica

Il sistema proposte è il cuore dell'applicazione. Permette di creare, modificare, eliminare e esportare proposte di modifica alla rete stradale.

### Tipi di proposta

| Tipo | Colore | Significato |
|------|--------|-------------|
| **Eliminazione** | Rosso `#e74c3c` | Proposta di rimozione di un arco dalla rete PGTU |
| **Inserimento** | Verde `#006400` | Proposta di aggiunta di un arco alla rete PGTU |

### Modalità di creazione

| Modalità | Descrizione | Risultato |
|----------|-------------|-----------|
| **Click su strada** | Click su una strada esistente | LineString/MultiLineString copiato |
| **Punto** | Click sulla mappa in un punto | Punto (marker circolare) |
| **Disegna Linea** | Click multipli per vertici | LineString personalizzato |

### Dati salvati per ogni proposta

Ogni proposta memorizza:
- **Tipo**: eliminazione o inserimento
- **Nome**: nome della strada o nome personalizzato
- **Fonte**: da quale layer proviene (o "Punto manuale" / "Disegno manuale")
- **Classificazione**: A, S, IQ, Q, IZ (editabile)
- **Lunghezza**: calcolata automaticamente in km (formula Haversine)
- **Flussi**: flussi giornalieri (se disponibili dal layer sorgente)
- **Municipio**: assegnato automaticamente in base alla posizione
- **Note**: testo libero inserito dall'utente
- **Geometria**: GeoJSON (Point, LineString, o MultiLineString)
- **Data creazione**: timestamp ISO

---

## 11. Modalità Eliminazione

### Attivazione

1. Click sul pulsante **"Aggiungi Eliminazione"** (rosso) nel pannello di controllo
2. Il pulsante si evidenzia con sfondo rosso
3. Appare un banner in alto: **"MODO ELIMINAZIONE - Clicca su una strada per aggiungerla come proposta di eliminazione"**
4. Il cursore diventa a croce

### Utilizzo

1. **Click su una strada** di qualsiasi layer visibile (PGTU, Flussi Bassi, Flussi Elevati)
2. Si apre il **modale** con:
   - Nome della strada pre-compilato
   - Badge "Eliminazione" (rosso)
   - Dropdown classificazione pre-compilata dalla strada originale
   - Campo note
3. **Modificare la classificazione** se necessario
4. **Inserire le note** (opzionale)
5. Click **"Salva"**
6. La strada appare sulla mappa come **linea tratteggiata** con il colore della classificazione

### Disattivazione

- Click di nuovo su "Aggiungi Eliminazione"
- Oppure premere **Esc**

---

## 12. Modalità Inserimento

Funziona esattamente come la modalità Eliminazione, ma:

- Pulsante **"Aggiungi Inserimento"** (verde)
- Banner: **"MODO INSERIMENTO"**
- Badge modale: "Inserimento" (verde)
- Linea tratteggiata verde (o colore classificazione)

---

## 13. Modalità Punto

### Attivazione

1. **Prima** attivare una modalità (Eliminazione o Inserimento)
2. **Poi** click sul pulsante **"Punto"**
3. Il pulsante si evidenzia con colore corrispondente (rosso o verde)
4. Banner: **"MODO PUNTO ELIMINAZIONE/INSERIMENTO - Clicca sulla mappa per aggiungere un punto"**

### Utilizzo

1. **Click su qualsiasi punto della mappa**
2. Si apre il modale con:
   - Coordinate (Lat, Lon) visualizzate
   - Campo **"Nome strada"** (editabile - non presente nelle altre modalità)
   - Campo note
3. **Inserire il nome della strada** (opzionale, default: "Punto Eliminazione/Inserimento")
4. **Inserire le note** (opzionale)
5. Click **"Salva"**
6. Appare un **marker circolare** sulla mappa (rosso o verde)

### Disattivazione

- Click di nuovo su "Punto"
- Oppure premere **Esc**

---

## 14. Modalità Disegna Linea

### Attivazione

1. **Prima** attivare una modalità (Eliminazione o Inserimento)
2. **Poi** click sul pulsante **"Disegna Linea"** (blu)
3. Banner: **"DISEGNA LINEA ELIMINAZIONE/INSERIMENTO - Clicca per aggiungere vertici, doppio-clic per terminare"**

### Utilizzo

1. **Click sulla mappa** per posizionare il primo vertice (cerchietto bianco/colorato)
2. **Muovere il mouse** → appare una linea di anteprima tratteggiata
3. **Click successivi** aggiungono vertici collegati da segmenti
4. **Doppio-click** per terminare il disegno
5. Si apre il modale con:
   - Informazione: "Linea disegnata (N vertici, X.XX km)"
   - Dropdown **classificazione** (selezionabile)
   - Campo note
6. Click **"Salva"**
7. La linea appare sulla mappa come **tratteggiata** con colore della classificazione

### Annullamento durante il disegno

- Premere **Esc** → cancella tutti i vertici disegnati e ritorna alla modalità edit

---

## 15. Il Modale di Inserimento

Il modale si presenta in modi diversi a seconda del contesto:

### Click su strada esistente

```
┌────────────────────────────────┐
│ Aggiungi Proposta              │
│                                │
│ Via Tuscolana                  │
│ [Inserimento]                  │
│                                │
│ Classificazione:               │
│ [▼ Scorrimento (S)         ]  │
│                                │
│ Note:                          │
│ ┌────────────────────────────┐ │
│ │                            │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│          [Annulla]  [Salva]    │
└────────────────────────────────┘
```

### Modo Punto

```
┌────────────────────────────────┐
│ Aggiungi Proposta              │
│                                │
│ Lat: 41.89350, Lon: 12.48250  │
│ [Eliminazione]                 │
│                                │
│ Nome strada:                   │
│ [Via Esempio________________]  │
│                                │
│ Note:                          │
│ ┌────────────────────────────┐ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│          [Annulla]  [Salva]    │
└────────────────────────────────┘
```

### Modifica proposta esistente

```
┌────────────────────────────────┐
│ Modifica Proposta              │
│                                │
│ Via Tuscolana                  │
│ [Inserimento]                  │
│                                │
│ Classificazione:               │
│ [▼ Quartiere (Q)            ]  │
│                                │
│ Note:                          │
│ ┌────────────────────────────┐ │
│ │ Note esistenti qui...      │ │
│ └────────────────────────────┘ │
│                                │
│          [Annulla]  [Salva]    │
└────────────────────────────────┘
```

---

## 16. Classificazione Stradale

### Codici e colori

| Codice | Nome completo | Colore linea | Hex |
|--------|--------------|-------------|-----|
| A | Autostrade | Nero | `#000000` |
| S | Scorrimento | Blu | `#007bff` |
| IQ | Interquartiere | Ciano | `#27f1ff` |
| Q | Quartiere | Arancione | `#ff9400` |
| IZ | Interzonali | Giallo | `#e4ff00` |
| EX | Extraurbana | Marrone | `#8B4513` |

### Gerarchia classificazione

Per l'analisi delle discontinuità, le classificazioni seguono una gerarchia:

| Livello | Codice | Nome |
|---------|--------|------|
| 0 | A | Autostrade |
| 1 | S | Scorrimento |
| 2 | IQ | Interquartiere |
| 3 | Q | Quartiere |
| 4 | IZ | Interzonali |

### Comportamento

- Quando si clicca su una **strada esistente**, la classificazione viene **pre-compilata** dal dato originale della strada (proprietà `Classifica` per PGTU, `CF` per flussi)
- L'utente può **modificarla** prima di salvare tramite il dropdown nel modale
- Quando si **disegna una linea** nuova, la classificazione è vuota ma selezionabile
- La classificazione determina il **colore della linea** sulla mappa (mantenendo il pattern tratteggiato)
- Se la classificazione non è impostata, la linea usa il colore del tipo (rosso per eliminazione, verde per inserimento)
- Il dropdown mostra un **bordo colorato** a sinistra che cambia in base alla selezione

---

## 17. Gestione Proposte Esistenti

### Popup delle proposte

Click su una proposta sulla mappa per vedere il popup con:

- **Nome** della strada
- **Badge** tipo (Eliminazione/Inserimento)
- **Tabella informazioni**:
  - Fonte (PGTU Annesso D, Flussi Bassi, ecc.)
  - Classificazione (se impostata)
  - Lunghezza (km)
  - Flussi giornalieri (se disponibili)
  - Municipio
- **Note** (se presenti, su sfondo giallo)
- **Pulsanti**:
  - **"Modifica"** → apre il modale con note e classificazione pre-compilate
  - **"Elimina"** → rimuove la proposta con conferma

### Contatore

Nel pannello di controllo, sotto i pulsanti edit:
```
Proposte salvate: 3 Elim. / 5 Ins.
```

Il contatore si aggiorna automaticamente a ogni modifica.

---

## 18. Export e Import

### 18.1 Esporta JSON

- **Pulsante**: "Esporta JSON"
- **Formato**: Array JSON delle proposte (formato interno dell'app)
- **Nome file**: `pgtu_proposte_YYYY-MM-DD.json`
- **Utilizzo**: Backup, condivisione tra colleghi, re-importazione

### 18.2 Esporta GeoJSON

- **Pulsante**: "Esporta GeoJSON" (verde)
- **Formato**: GeoJSON FeatureCollection standard
- **CRS**: CRS84 (WGS84)
- **Nome file**: `pgtu_proposte_YYYY-MM-DD.geojson`
- **Proprietà esportate per feature**:
  - `id`, `tipo`, `nome`, `fonte`
  - `classificazione`, `lunghezza_km`
  - `flussi`, `municipio`
  - `note`, `data_creazione`
- **Utilizzo**: Importare direttamente in **QGIS** (Layer → Aggiungi Layer Vettoriale → selezionare il file .geojson)

### 18.3 Esporta Shapefile

- **Pulsante**: "Esporta SHP" (blu)
- **Formato**: ZIP contenente Shapefile (.shp, .shx, .dbf, .prj)
- **Dipendenza**: Libreria `shp-write` caricata on-demand da CDN
- **Layer generati**:
  - `punti_proposte` - Tutte le proposte di tipo Point
  - `archi_proposte` - Tutte le proposte di tipo LineString
- **Proprietà**:
  - `id`, `tipo`, `nome`, `fonte`
  - `classif` (max 10 char per compatibilità DBF)
  - `km`, `flussi`, `municipio`
  - `note` (troncate a 254 char per limite DBF)
  - `data` (solo YYYY-MM-DD)
- **Utilizzo**: Importare in QGIS, ArcGIS, o altri software GIS
- **Nota**: Richiede connessione internet per il primo caricamento della libreria

### 18.4 Importa

- **Pulsante**: "Importa"
- **Formato accettato**: JSON (stesso formato dell'esportazione JSON)
- **Comportamento**:
  - Le proposte importate vengono **aggiunte** a quelle esistenti (non sostituite)
  - Vengono assegnati **nuovi ID** per evitare conflitti
  - Messaggio di conferma con numero di proposte importate

### 18.5 Esporta Report Word

- **Pulsante**: "Report Word"
- **Formato**: File Microsoft Word (.doc)
- **Nome file**: `report_pgtu_YYYY-MM-DD.doc`
- **Contenuto**:
  - Pagina di copertina con data e ora di generazione
  - Proposte di Eliminazione raggruppate per municipio
  - Proposte di Inserimento raggruppate per municipio
  - Elenco completo archi Grafo 2026 per municipio con:
    - Conteggio archi e km totali per municipio
    - Tabella con: # | Nome Strada | Classificazione | Km | Municipio | Note
- **Stile**: Font Calibri 11pt, tabelle formattate con intestazioni

### 18.6 Esporta Report Excel

- **Pulsante**: "Report Excel"
- **Formato**: File Excel (.xlsx)
- **Nome file**: `report_pgtu_YYYY-MM-DD.xlsx`
- **Libreria**: SheetJS (xlsx 0.20.3, caricata on-demand da CDN)
- **Fogli generati**:
  - Foglio copertina con statistiche riepilogative
  - Un foglio per municipio con dati Grafo 2026
  - Ogni foglio contiene: intestazione con nome municipio, conteggio archi, km totali, e tabella dettagliata

### 18.7 Cancella Tutto

- **Pulsante**: "Cancella"
- **Comportamento**: Chiede conferma → elimina TUTTE le proposte dal localStorage
- **Irreversibile**: I dati non possono essere recuperati se non si è fatto un export prima

---

## 19. Generazione Report

### Attivazione

Click sul pulsante **"Report"** (sfondo scuro, testo bianco).

### Processo

1. L'app raccoglie tutte le proposte dal localStorage
2. Assegna automaticamente il **municipio** alle proposte che non ce l'hanno (basato sulla posizione geometrica)
3. Raggruppa le proposte per municipio
4. **Unisce** le proposte di arco stradale con lo stesso nome sotto un'unica riga (mantenendo le note diverse)
5. Per ogni municipio, **genera un'immagine** della mappa:
   - Carica le tile OSM come sfondo
   - Disegna il confine del municipio
   - Disegna le proposte con i relativi colori
   - Aggiunge una legenda
6. Calcola le **statistiche avanzate** (km totali, distribuzione per classificazione)
7. Genera un file **HTML completo** e lo scarica

### Struttura del Report

```
┌──────────────────────────────────┐
│   Report Proposte di Modifica    │
│   PGTU Roma Capitale             │
│   Generato il DD mese YYYY      │
├──────────────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐   │
│  │ 15 │ │ 8  │ │ 7  │ │ 12 │   │
│  │Tot.│ │Elim│ │Ins.│ │Archi│   │
│  └────┘ └────┘ └────┘ └────┘   │
│  ┌────┐ ┌────┐                   │
│  │ 3  │ │ 5  │                   │
│  │Punti│ │Mun.│                  │
│  └────┘ └────┘                   │
├──────────────────────────────────┤
│ ╔══════════════════════════════╗ │
│ ║ STATISTICHE AVANZATE        ║ │
│ ╠══════════════════════════════╣ │
│ ║ ┌────┐  ┌────┐  ┌────┐     ║ │
│ ║ │45.2│  │22.1│  │23.1│     ║ │
│ ║ │Km  │  │Elim│  │Ins │     ║ │
│ ║ └────┘  └────┘  └────┘     ║ │
│ ║                              ║ │
│ ║ Distribuzione per Class.     ║ │
│ ║ ┌──────┬───┬────┬────┬───┐ ║ │
│ ║ │Class.│Cod│Prop│Km  │%  │ ║ │
│ ║ │Scorr.│ S │ 5  │18.2│40%│ ║ │
│ ║ │Quart.│ Q │ 3  │12.1│27%│ ║ │
│ ║ │Inter.│IQ │ 4  │10.5│23%│ ║ │
│ ║ │Autost│ A │ 1  │ 4.4│10%│ ║ │
│ ║ └──────┴───┴────┴────┴───┘ ║ │
│ ╚══════════════════════════════╝ │
├──────────────────────────────────┤
│ Per ogni municipio:              │
│ ╔══════════════════════════════╗ │
│ ║ MUNICIPIO I - Centro Storico ║ │
│ ║ [3 Elim.] [2 Inserim.]      ║ │
│ ╠══════════════════════════════╣ │
│ ║ [========= MAPPA ==========]║ │
│ ║ [  OSM tiles + confine      ]║ │
│ ║ [  + proposte colorate      ]║ │
│ ║ [  + legenda                ]║ │
│ ╠══════════════════════════════╣ │
│ ║ Proposte di Eliminazione (3) ║ │
│ ║ ┌──┬────┬────┬───┬──┬──┬──┐║ │
│ ║ │# │Nome│Tipo│Cl.│Km│Fl│No│║ │
│ ║ │1 │Via │Arco│ S │2.│5k│..│║ │
│ ║ │  │Roma│x3  │   │1 │  │  │║ │
│ ║ └──┴────┴────┴───┴──┴──┴──┘║ │
│ ║                              ║ │
│ ║ Proposte di Inserimento (2)  ║ │
│ ║ ┌──┬────┬────┬───┬──┬──┬──┐║ │
│ ║ │# │Nome│Tipo│Cl.│Km│Fl│No│║ │
│ ║ └──┴────┴────┴───┴──┴──┴──┘║ │
│ ╚══════════════════════════════╝ │
│                                  │
│ [Ripetuto per ogni municipio]    │
├──────────────────────────────────┤
│ Report generato da PGTU Roma     │
└──────────────────────────────────┘
```

### Colonne tabella report

| Colonna | Descrizione |
|---------|-------------|
| # | Numero progressivo |
| Nome / Descrizione | Nome strada (grassetto), coordinate per punti |
| Tipo | Badge: "Arco Stradale", "Punto", "Disegnato", con conteggio segmenti |
| Class. | Classificazione funzionale (nome completo) |
| Km | Lunghezza in km (segmenti stessa strada sommati) |
| Fonte | Da quale layer proviene |
| Flussi | Flussi giornalieri |
| Note | Tutte le note distinte, separate da linea tratteggiata |

### Unione strade con stesso nome

Nel report, più proposte per la stessa strada (ad es. 3 segmenti diversi di "Via Tuscolana") vengono **unite in un'unica riga**:

- Il nome appare una sola volta
- Il badge mostra "×3 segmenti"
- Le lunghezze vengono **sommate**
- Le note diverse vengono **tutte mantenute**, separate da un divisore
- La classificazione e i flussi vengono presi dal primo segmento con valore non vuoto

### Immagine mappa

Per ogni municipio il report include un'immagine PNG 860×400px generata con Canvas:

- **Sfondo**: tile OpenStreetMap (zoom automatico)
- **Confine municipio**: contorno blu con riempimento semi-trasparente
- **Proposte eliminazione**: linee tratteggiate (colore classificazione o rosso) / punti rossi
- **Proposte inserimento**: linee tratteggiate (colore classificazione o verde) / punti verdi
- **Legenda**: in basso a sinistra
- **Attribuzione**: "© OpenStreetMap contributors" in basso a destra

### Conteggi nel report

I conteggi nelle card di riepilogo considerano le **strade uniche**:
- Frammenti con lo stesso nome contano come **1** proposta
- Punti e linee disegnate manualmente contano singolarmente

---

## 20. Grafo 2026 - Layer Editabile

### Panoramica

Il Grafo 2026 è un layer editabile che rappresenta la rete stradale proposta per il 2026. Viene generato combinando automaticamente l'Annesso D attuale con tutte le proposte di modifica (eliminazioni e inserimenti).

### Attivazione

- **Toggle**: Checkbox `Grafo 2026` nella sezione "Rete Stradale Principale" del pannello di controllo
- **Persistenza**: Le modifiche vengono salvate nel `localStorage` con chiave `pgtu_grafo_2026`

### Funzionalità

1. **Generazione automatica**: Unisce l'Annesso D con le proposte correnti:
   - Rimuove gli archi presenti nelle proposte di eliminazione
   - Aggiunge gli archi delle proposte di inserimento
2. **Disegno archi**: Pulsante "Disegna Arco" per aggiungere nuovi archi direttamente nel Grafo 2026
   - Click sulla mappa per posizionare vertici
   - Doppio-click per terminare il disegno
   - **Esc** per annullare il disegno in corso
3. **Modifica classificazione**: Click su un arco del Grafo 2026 per cambiarne la classificazione tramite popup
4. **Modifica nome strada**: Possibilità di modificare il nome della strada direttamente dal popup
5. **Export GeoJSON**: Pulsante per esportare il Grafo 2026 completo in formato GeoJSON
6. **Reset**: Pulsante per ripristinare il Grafo 2026 allo stato iniziale (Annesso D + proposte)

### Colori

Stessi colori della classificazione stradale (A nero, S blu, IQ ciano, Q arancione, IZ giallo, EX marrone).

### Sincronizzazione con Proposte

Le modifiche alle proposte (aggiunta, eliminazione, modifica) vengono sincronizzate automaticamente nel Grafo 2026.

---

## 21. Analisi di Rete - Disconnessioni e Discontinuità

### Panoramica

L'applicazione include strumenti di analisi automatica della rete stradale per identificare problemi di connettività e coerenza nella classificazione.

### 21.1 Disconnessioni Grafo

- **Toggle**: Checkbox `Disconnessioni` (etichetta rossa) nel pannello di controllo
- **Contatore**: Mostra il numero di punti di disconnessione trovati
- **Pulsante Reset**: Ripristina le disconnessioni precedentemente risolte/ignorate

**Funzionamento**:
1. Estrae tutti gli endpoint degli archi del Grafo 2026
2. Costruisce una griglia spaziale con celle di dimensione 2×SNAP
3. Identifica gli endpoint senza endpoint vicini entro la tolleranza
4. Mostra marker circolari nei punti di disconnessione

**Parametri**:
- **Tolleranza SNAP**: 0.000225 gradi (~25 metri)
- **Metodo**: Controllo distanza endpoint-a-segmento (non solo endpoint-a-endpoint)

**Stile marker**:
- Raggio: 6px
- Colore riempimento: Verde `#27ae60`
- Contorno: Blu scuro `#0d47a1`
- Opacità: 0.9

**Interazione**: Click su un marker per visualizzare dettagli e opzione per ignorarlo/risolverlo.

### 21.2 Discontinuità Classificazione

- **Toggle**: Checkbox `Disc. Classificazione` (etichetta blu) nel pannello di controllo
- **Contatore**: Mostra il numero di discontinuità trovate
- **Pulsante Reset**: Ripristina le discontinuità risolte

**Funzionamento**: Identifica le intersezioni dove strade adiacenti hanno classificazioni incompatibili (es. una strada A che si collega direttamente a una Q senza passare per S e IQ).

**Stile marker**:
- Raggio: 6px
- Colore riempimento: Blu `#1565c0`
- Contorno: Blu scuro `#0d47a1`
- Opacità: 0.9

### 21.3 Discontinuità Estreme

- **Toggle**: Checkbox `Disc. Estreme` (etichetta rosso scuro) nel pannello di controllo
- **Contatore**: Mostra il numero di discontinuità estreme trovate
- **Pulsante Reset**: Ripristina le discontinuità estreme risolte

**Funzionamento**: Evidenzia le intersezioni dove la classificazione stradale salta 2 o più livelli gerarchici. Ad esempio, una strada di classificazione A che si collega direttamente a una Q (saltando S e IQ).

**Stile marker**:
- Raggio: 6px
- Colore riempimento: Rosso scuro `#b71c1c`
- Contorno: Blu scuro `#0d47a1`
- Opacità: 0.9

### Ricalcolo

Le analisi vengono ricalcolate automaticamente quando il Grafo 2026 o le proposte vengono modificati.

---

## 22. Esporta/Importa Layer

### 22.1 Esporta Layer Individuali

Sezione "Esporta Layer" nel pannello di controllo. Ogni layer può essere esportato individualmente in formato GeoJSON.

**Layer esportabili**:

| Layer | Descrizione |
|-------|-------------|
| Municipi | Confini dei 15 municipi |
| PGTU - Annesso D | Rete stradale PGTU originale |
| PGTU - Grafo 2026 | Rete stradale proposta 2026 |
| Strade Provinciali | Strade provinciali filtrate |
| Strade Extraurbane | Strade extraurbane |
| Flussi Bassi (Tab. 1) | Flussi di traffico bassi |
| Flussi Elevati (Tab. 2) | Flussi di traffico elevati |
| Linee ATAC | Linee trasporto pubblico |
| Rete TPL (3+ linee) | Sovrapposizione 3+ linee bus |
| Rete TPL (5+ linee) | Sovrapposizione 5+ linee bus |
| Proposte | Proposte eliminazione + inserimento |
| TPL 5+ non in Annesso D | Segmenti mismatch TPL→PGTU |
| Annesso D non in TPL 5+ | Segmenti mismatch PGTU→TPL |
| Disconnessioni Grafo | Punti di disconnessione rete |
| Disc. Classificazione | Discontinuità classificazione |
| Centri Abitati | Perimetrazione centri abitati |

### 22.2 Esporta Tutti i Layer (ZIP)

- **Pulsante**: "Esporta Tutti"
- **Formato**: File ZIP contenente tutti i layer come file GeoJSON individuali
- **Libreria**: JSZip 3.10.1 (caricata on-demand da CDN)

### 22.3 Importa Layer

- **Sezione**: "Importa Layer" nel pannello di controllo
- **Formato accettato**: GeoJSON (.geojson, .json)
- **Selezione**: Dropdown per scegliere il layer da sovrascrivere

**Layer importabili**:
- PGTU - Annesso D
- Strade Provinciali
- Strade Extraurbane
- Centri Abitati
- Rete TPL (3+ linee)
- Rete TPL (5+ linee)
- Disconnessioni Grafo
- Disconnessioni Classificazione

**Comportamento**:
- Il file GeoJSON viene validato prima dell'importazione
- Il layer selezionato viene **sovrarscritto** completamente con i dati importati
- I layer dipendenti (disconnessioni, mismatch) vengono ricalcolati automaticamente
- Messaggio di conferma con il numero di feature importate

---

## 23. Struttura Dati delle Proposte

### Oggetto proposta completo

```javascript
{
    id: "m1abc2def3",              // ID univoco (timestamp36 + random)
    type: "eliminazione",           // "eliminazione" | "inserimento"
    name: "Via Tuscolana",          // Nome strada o nome personalizzato
    source: "PGTU Annesso D",      // Origine del dato:
                                    //   "PGTU Annesso D"
                                    //   "Flussi Bassi (Tab. 1)"
                                    //   "Flussi Elevati (Tab. 2)"
                                    //   "Punto manuale"
                                    //   "Disegno manuale"
    flussi: "12.345",              // Flussi giornalieri (stringa formattata)
    classificazione: "S",           // Codice classificazione: "A"|"S"|"IQ"|"Q"|"IZ"|""
    lunghezza: 2.347,              // Lunghezza in km (numero, 0 per punti)
    municipio: "7",                // Numero municipio (stringa) o ""
    notes: "Strada da eliminare per...",  // Note utente (testo libero)
    geometry: {                     // GeoJSON geometry
        type: "LineString",         // "Point" | "LineString" | "MultiLineString"
        coordinates: [              // [lng, lat] per Point
            [12.496, 41.889],       // [[lng, lat], ...] per LineString
            [12.497, 41.890],       // [[[lng, lat], ...], ...] per MultiLineString
            [12.498, 41.891]
        ]
    },
    created: "2025-03-01T14:30:00.000Z"  // Data creazione ISO 8601
}
```

### GeoJSON esportato

```javascript
{
    type: "FeatureCollection",
    name: "PGTU_Proposte",
    crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
    },
    features: [
        {
            type: "Feature",
            properties: {
                id: "m1abc2def3",
                tipo: "eliminazione",
                nome: "Via Tuscolana",
                fonte: "PGTU Annesso D",
                classificazione: "S",
                lunghezza_km: 2.347,
                flussi: "12.345",
                municipio: "7",
                note: "Strada da eliminare per...",
                data_creazione: "2025-03-01T14:30:00.000Z"
            },
            geometry: {
                type: "LineString",
                coordinates: [[12.496, 41.889], [12.497, 41.890]]
            }
        }
    ]
}
```

---

## 24. Scorciatoie da Tastiera

| Tasto | Contesto | Azione |
|-------|----------|--------|
| **Esc** | Modale aperto | Chiude il modale |
| **Esc** | Disegno linea proposte in corso | Annulla il disegno (rimuove vertici) |
| **Esc** | Disegno arco Grafo 2026 in corso | Annulla il disegno |
| **Esc** | Modalità edit attiva | Disattiva la modalità edit |

---

## 25. Dipendenze Esterne

### Librerie caricate all'avvio

| Libreria | Versione | Fonte | Utilizzo |
|----------|---------|-------|----------|
| Leaflet CSS | 1.9.4 | unpkg CDN | Stili mappa |
| Leaflet JS | 1.9.4 | unpkg CDN | Libreria mappa interattiva |

### Librerie caricate on-demand

| Libreria | Versione | Fonte | Utilizzo |
|----------|---------|-------|----------|
| shp-write | 0.3.2 | unpkg CDN | Export Shapefile (caricata al primo click su "Esporta SHP") |
| SheetJS (xlsx) | 0.20.3 | cdn.sheetjs.com | Export report Excel (.xlsx) |
| JSZip | 3.10.1 | cdnjs.cloudflare.com | Export tutti i layer come file ZIP |

### API esterne

| Servizio | Endpoint | Utilizzo |
|----------|----------|----------|
| OpenStreetMap Tiles | `tile.openstreetmap.org` | Mappa base + immagini report |
| OpenStreetMap Nominatim | `nominatim.openstreetmap.org` | Ricerca indirizzi |

### File dati locali (caricati come tag `<script>`)

- `Municipi_1.js` - Confini municipi
- `PGTUAnnessoD_5.js` - Rete stradale PGTU
- `FlussiTomTomflussi_tomtom_3.js` - Flussi bassi
- `FlussiTomTomflussi_tomtom_2.js` - Flussi elevati
- `LineeATAC_4.js` - Linee ATAC (caricamento lazy)
- `data_tabella1.js` - Dati tabellari Tab 1
- `data_tabella2.js` - Dati tabellari Tab 2
- `data_strade_provinciali.js` - Strade provinciali
- `data_extraurbane.js` - Strade extraurbane
- `data_centri_abitati.js` - Centri abitati
- `data_rete_tpl_3.js` - Rete TPL sovrapposizione 3+ linee
- `data_rete_tpl_5.js` - Rete TPL sovrapposizione 5+ linee
- `data_disconnessioni.js` - Disconnessioni di rete

---

## 26. Limitazioni Note

### Persistenza dati
- Le proposte sono salvate nel **localStorage del browser**
- La cancellazione della cache del browser **elimina tutti i dati**
- Non c'è sincronizzazione tra browser o dispositivi diversi
- **Raccomandazione**: esportare regolarmente in JSON o GeoJSON come backup

### Prestazioni
- I file GeoJSON sono di grandi dimensioni (~15 MB totali con i nuovi layer)
- Il caricamento iniziale può richiedere alcuni secondi
- Il layer ATAC viene caricato in modo lazy per non rallentare il caricamento
- Il ricalcolo delle disconnessioni può richiedere qualche secondo su reti estese

### Compatibilità browser
- Richiede un browser moderno con supporto ES5+, Canvas, localStorage
- Testato su Chrome, Firefox, Edge
- Non ottimizzato per dispositivi mobili (layout fisso)

### Export Shapefile
- Richiede connessione internet per il primo caricamento della libreria shp-write
- I campi di testo sono troncati a 254 caratteri (limite formato DBF)
- I nomi dei campi sono abbreviati per compatibilità (max 10 caratteri)

### Report
- La generazione delle immagini mappa richiede connessione internet (caricamento tile OSM)
- Il file HTML generato può essere di grandi dimensioni se ci sono molti municipi (immagini PNG inline)
- Le immagini sono a risoluzione fissa 860×400px
- L'export Word ed Excel richiedono connessione internet per il caricamento delle librerie (SheetJS)

### Multi-utente
- L'applicazione è mono-utente (nessun sistema di login o collaborazione)
- Per condividere le proposte, usare la funzione Export/Import JSON

### Analisi di rete
- La tolleranza di snap per le disconnessioni è fissa a ~25 metri (0.000225 gradi)
- Il rilevamento delle discontinuità si basa sulla gerarchia A > S > IQ > Q > IZ; la classificazione EX non è inclusa nella gerarchia
- Le disconnessioni risolte/ignorate vengono salvate nel localStorage e possono essere resettate

---

*Documentazione generata per PGTU Roma - Mappa Interattiva delle Proposte di Modifica*
*Piano Generale del Traffico Urbano - Roma Capitale*
