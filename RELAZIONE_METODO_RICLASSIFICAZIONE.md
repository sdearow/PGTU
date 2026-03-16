# Relazione sul Metodo di Riclassificazione della Viabilità Principale del PGTU di Roma Capitale

---

## Indice

1. [Premessa e obiettivi](#1-premessa-e-obiettivi)
2. [Quadro normativo e di pianificazione](#2-quadro-normativo-e-di-pianificazione)
3. [Fonti dati utilizzate](#3-fonti-dati-utilizzate)
4. [Analisi esplorativa dei flussi di traffico](#4-analisi-esplorativa-dei-flussi-di-traffico)
5. [Processo di matching lineare TomTom–PGTU](#5-processo-di-matching-lineare-tomtompgtu)
6. [Matching TomTom–Rete ATAC](#6-matching-tomtomrete-atac)
7. [Matching TomTom–Grande Viabilità](#7-matching-tomtomgrande-viabilità)
8. [Costruzione delle Tabelle di Sintesi](#8-costruzione-delle-tabelle-di-sintesi)
9. [Casi d'uso per la riclassificazione](#9-casi-duso-per-la-riclassificazione)
10. [Costruzione del Grafo 2026](#10-costruzione-del-grafo-2026)
11. [Analisi di coerenza della rete proposta](#11-analisi-di-coerenza-della-rete-proposta)
12. [Analisi della rete TPL e confronto con la viabilità principale](#12-analisi-della-rete-tpl-e-confronto-con-la-viabilità-principale)
13. [Integrazione con dati territoriali](#13-integrazione-con-dati-territoriali)
14. [Sintesi del metodo e risultati attesi](#14-sintesi-del-metodo-e-risultati-attesi)

---

## 1. Premessa e obiettivi

Il Piano Generale del Traffico Urbano (PGTU) di Roma Capitale definisce la classificazione funzionale della rete stradale principale, organizzata secondo una gerarchia che va dalle Autostrade (A) fino alle strade Interzonali (IZ). L'Annesso D del PGTU vigente (revisione 2015) individua 1.301 archi stradali classificati in cinque livelli gerarchici.

L'aggiornamento della classificazione della viabilità principale richiede un metodo rigoroso, fondato su dati oggettivi e verificabili, che consenta di:

- **Verificare la coerenza** tra la classificazione attuale e i flussi di traffico realmente osservati sulla rete;
- **Identificare le strade non classificate** che presentano volumi di traffico tali da giustificarne l'inserimento nella rete principale;
- **Individuare le strade classificate** che non presentano più flussi significativi e per le quali potrebbe essere opportuna una rimozione o declassificazione;
- **Valutare la coerenza** tra la rete della viabilità principale, la rete del trasporto pubblico locale (ATAC) e la rete della Grande Viabilità;
- **Verificare la continuità topologica e gerarchica** della rete proposta, identificando disconnessioni e salti di classificazione incompatibili.

Il metodo adottato si basa sull'integrazione di più fonti dati — flussi di traffico TomTom, rete PGTU, linee ATAC, Grande Viabilità 2019 — attraverso tecniche di matching spaziale e analisi geospaziale, culminando nella costruzione di un Grafo 2026 che rappresenta la rete stradale principale proposta.

---

## 2. Quadro normativo e di pianificazione

### La classificazione funzionale della rete stradale

Il Codice della Strada (D.Lgs. 285/1992) e le Direttive ministeriali per la redazione dei Piani Urbani del Traffico definiscono una gerarchia funzionale della rete stradale urbana. Nel contesto del PGTU di Roma Capitale, tale gerarchia è articolata nei seguenti livelli:

| Livello | Codice | Denominazione | Funzione |
|---------|--------|---------------|----------|
| 0 | A | Autostrade | Collegamento a lunga distanza, traffico di attraversamento |
| 1 | S | Scorrimento | Collegamento tra settori urbani, elevata capacità |
| 2 | IQ | Interquartiere | Collegamento tra quartieri, distribuzione primaria |
| 3 | Q | Quartiere | Distribuzione locale, collegamento tra zone |
| 4 | IZ | Interzonali | Penetrazione e distribuzione capillare |

La classificazione non è statica: l'evoluzione dei flussi di traffico, le modifiche alla rete di trasporto pubblico, i nuovi sviluppi urbanistici e le trasformazioni della mobilità rendono necessario un aggiornamento periodico che rifletta le condizioni di esercizio effettive della rete.

### L'Annesso D del PGTU

L'Annesso D del PGTU vigente costituisce il riferimento ufficiale per la classificazione della viabilità principale di Roma. Si compone di 1.301 archi stradali georiferiti, ciascuno caratterizzato da:

- **Toponomastica**: denominazione della strada
- **Classificazione funzionale**: codice gerarchico (A, S, IQ, Q, IZ)
- **Limiti**: estremi dell'arco stradale
- **Codice progressivo**: identificativo univoco
- **Municipio** di appartenenza
- **Grande Viabilità**: appartenenza alla rete di Grande Viabilità (2019)
- **TPL**: presenza di linee di trasporto pubblico locale

---

## 3. Fonti dati utilizzate

### 3.1 Rete stradale TomTom con flussi di traffico

La fonte primaria per i dati di traffico è costituita dal geodatabase **TT_FLOW_H24.gdb**, contenente il layer **TOT_FLOW_RM_H24_06**: la rete stradale TomTom del territorio di Roma con flussi veicolari medi giornalieri feriali (H24).

**Caratteristiche del dataset:**

| Parametro | Valore |
|-----------|--------|
| Numero archi | 94.148 |
| Sistema di riferimento | EPSG:3004 |
| Variabile chiave | VEIC_DAY_TOT (veicoli/giorno, media feriale H24) |
| Chiave identificativa | Id (94.148 valori unici, nessun nullo, nessuna duplicazione) |

Il dataset TomTom rappresenta una copertura pressoché completa della rete stradale di Roma, con una granularità molto superiore a quella del grafo PGTU: ogni segmento stradale è suddiviso in archi elementari di lunghezza variabile, ciascuno associato a un valore di flusso veicolare.

**Campi principali della tabella TomTom:**
- `Id`: identificativo univoco dell'arco
- `Segment_Id`: identificativo del segmento TomTom
- `Length`: lunghezza geometrica dell'arco
- `StreetName`: denominazione della strada
- `VEIC_DAY_TOMTOM`: flusso veicolare giornaliero (dato TomTom nativo)
- `VEIC_DAY_TOT`: flusso veicolare giornaliero totale (variabile utilizzata nelle analisi)

### 3.2 Rete PGTU 2015 (Annesso D)

Il geodatabase **REV_PGTU2015.gdb** contiene il layer **PGTU2015_REV01**, che rappresenta la rete della viabilità principale del PGTU vigente.

**Caratteristiche del dataset:**

| Parametro | Valore |
|-----------|--------|
| Numero archi (segmenti) | 1.301 |
| Sistema di riferimento | EPSG:3004 |
| Geometria | MultiLineString |

**Campi principali:**
- `Id`: identificativo della strada
- `Classifica`: classificazione funzionale (A, S, IQ, Q, IZ)
- `Toponomastica`: denominazione ufficiale della strada
- `Nome`: denominazione alternativa
- `Grande_Viabilità_2019`: appartenenza alla Grande Viabilità (Sì/No)
- `TPL`: presenza di Trasporto Pubblico Locale (Sì/No)

L'allineamento del sistema di riferimento tra le due reti (entrambe in EPSG:3004) ha consentito di procedere direttamente alle analisi spaziali senza necessità di riproiezione.

### 3.3 Linee ATAC (Trasporto Pubblico Locale)

La rete del trasporto pubblico locale è stata acquisita dallo shapefile delle linee ATAC aggiornato a febbraio 2025 (**ATAC_FEB25_LINE.shp**).

**Caratteristiche del dataset:**

| Parametro | Valore |
|-----------|--------|
| Elementi totali | 2.186 linee |
| Linee attive | 902 |
| Geometria | LineString / MultiLineString |

Per ciascuna linea sono disponibili: sigla identificativa, nome esteso del percorso, lunghezza, numero di fermate, azienda operatrice e stato di attivazione.

### 3.4 Grande Viabilità 2019

La rete della Grande Viabilità 2019 è stata estratta dagli attributi della rete PGTU (campo `Grande_Viabilità_2019`), identificando i segmenti stradali che ricadono nella rete di grande viabilità definita a livello comunale.

### 3.5 Ulteriori fonti dati territoriali

Per completare il quadro analitico sono stati inoltre integrati:

- **Strade Provinciali**: rete delle strade provinciali del territorio di Roma (~3.0 MB di dati georiferiti), filtrate spazialmente all'interno dei confini dei Municipi
- **Strade Extraurbane**: rete stradale extraurbana (~412 KB), con classificazione funzionale, limiti di velocità, appartenenza alla Grande Viabilità e al TPL
- **Centri Abitati**: perimetrazione dei centri abitati di Roma (~1.8 MB), utilizzata come riferimento per distinguere i contesti urbani da quelli extraurbani nella classificazione
- **Rete TPL con sovrapposizione 3+ linee**: segmenti stradali serviti da 3 o più linee bus ATAC (~1.6 MB)
- **Rete TPL con sovrapposizione 5+ linee**: segmenti stradali serviti da 5 o più linee bus ATAC (~868 KB)

---

## 4. Analisi esplorativa dei flussi di traffico

### 4.1 Distribuzione generale dei flussi

La variabile VEIC_DAY_TOT (flusso veicolare medio giornaliero per arco) è stata analizzata su tutti i 94.148 archi della rete TomTom. Le statistiche sintetiche evidenziano una distribuzione fortemente asimmetrica:

| Statistica | Valore (veicoli/giorno) |
|------------|------------------------|
| Minimo | 0 |
| 25° percentile | ~1.200 |
| Mediana | ~4.500 |
| 75° percentile | ~11.300 |
| Massimo | ~90.980 |

La distribuzione presenta una componente consistente di archi a bassa intensità (strade locali, residenziali) e una coda significativa di archi ad elevato flusso corrispondenti alla viabilità principale.

### 4.2 Distribuzione per classi di flusso

L'analisi per classi consente di apprezzare la struttura della rete:

| Classe di flusso (veicoli/giorno) | Numero archi | Quota |
|-----------------------------------|-------------|-------|
| 0 – 100 | 6.843 | 7,3% |
| 100 – 500 | 8.726 | 9,3% |
| 500 – 1.000 | 5.982 | 6,4% |
| 1.000 – 3.000 | 16.633 | 17,7% |
| 3.000 – 5.000 | 11.191 | 11,9% |
| 5.000 – 10.000 | 18.178 | 19,3% |
| > 10.000 | 26.595 | 28,2% |

**Osservazioni chiave:**
- Circa il 23% della rete (21.551 archi) presenta flussi inferiori a 1.000 veicoli/giorno, corrispondente alla viabilità locale non rilevante ai fini della classificazione principale.
- Il segmento tra 1.000 e 5.000 veicoli/giorno (27.824 archi, 29,6%) rappresenta una fascia intermedia di strade con funzione distributiva locale.
- Oltre 44.000 archi (47,5%) superano i 5.000 veicoli/giorno, identificando un esteso sottosistema di assi ad elevata intensità.
- Più di 26.000 archi (28,2%) superano i 10.000 veicoli/giorno, confermando una rete molto ampia di assi ad elevata domanda.

### 4.3 Soglia di selezione degli archi ad alto flusso

Per le analisi successive è stata definita una soglia operativa di **5.000 veicoli/giorno**, che individua:

- **44.773 archi** con VEIC_DAY_TOT ≥ 5.000 (47,5% della rete)
- **49.375 archi** con VEIC_DAY_TOT < 5.000 (52,5% della rete)

La distribuzione fine degli archi sopra soglia evidenzia:

| Classe (veicoli/giorno) | Archi |
|--------------------------|-------|
| 5.000 – 6.000 | 4.640 |
| 6.000 – 7.000 | 4.030 |
| 7.000 – 8.000 | 3.778 |
| 8.000 – 9.000 | 3.102 |
| 9.000 – 10.000 | 2.628 |
| 10.000 – 15.000 | 9.688 |
| 15.000 – 20.000 | 5.460 |
| > 20.000 | 11.447 |

Le ultime quattro classi (oltre 10.000 veicoli/giorno) da sole rappresentano più di 26.000 archi, confermando una rete molto estesa di assi ad elevata intensità che costituisce il nucleo della viabilità principale.

### 4.4 Rappresentazione cartografica

La distribuzione spaziale dei flussi è stata rappresentata mediante mappe tematiche:

- **Mappa degli archi ad alto flusso**: archi con flusso ≥ 5.000 veicoli/giorno evidenziati in rosso su sfondo grigio chiaro (archi sotto soglia), permettendo di visualizzare la struttura della rete più caricata.
- **Mappa per classi di flusso**: archi sopra soglia colorati con palette graduata (dal giallo chiaro al rosso scuro) in funzione dell'intensità di flusso, consentendo di distinguere i diversi livelli di carico sulla rete.

---

## 5. Processo di matching lineare TomTom–PGTU

Il cuore del metodo di analisi consiste nell'associazione sistematica tra gli archi della rete TomTom (con i relativi flussi di traffico) e i segmenti della rete PGTU (con la relativa classificazione funzionale). Questo processo di **matching lineare** consente di trasferire le informazioni di traffico sulla rete pianificatoria e, viceversa, di valutare il livello di copertura del PGTU rispetto alla rete effettivamente caricata.

### 5.1 Preselezione degli archi TomTom

Non tutti gli archi TomTom sono rilevanti ai fini del matching. Sono stati definiti criteri di preselezione:

- **Flusso giornaliero > 1.000 veicoli/giorno**: esclude la viabilità locale a bassissima intensità, non pertinente per la rete principale
- **Lunghezza ≥ 5 metri**: esclude micro-archi (svincoli, raccordi) che non rappresentano segmenti stradali significativi

Risultati della preselezione:
- Archi totali: 94.148
- Archi con flusso > 1.000 veicoli/giorno: 72.597
- Archi sopra soglia di flusso e lunghezza ≥ 5 m: **71.711** (utilizzati nel matching)
- Archi esclusi per lunghezza < 5 m: 886

Gli archi sotto soglia non vengono eliminati dal dataset, ma sono mantenuti con campi PGTU vuoti per preservare l'integrità della rete TomTom complessiva.

### 5.2 Preparazione della rete PGTU

Per ogni segmento PGTU vengono create due rappresentazioni geometriche:

1. **Buffer di 30 metri**: un'area di tolleranza attorno alla geometria lineare del segmento PGTU, utilizzata per individuare gli archi TomTom spazialmente compatibili. La scelta di 30 metri tiene conto delle imprecisioni geometriche tra le due reti, della larghezza delle carreggiate e delle eventuali differenze di digitalizzazione.

2. **Geometria lineare originaria**: conservata per il calcolo dei parametri metrici e angolari di precisione.

### 5.3 Individuazione dei segmenti candidati (Spatial Join)

Gli archi TomTom preselezionati vengono intersecati con i buffer PGTU: questa operazione identifica, per ogni arco TomTom, tutti i segmenti PGTU che si trovano entro 30 metri dalla sua geometria. Il risultato è un insieme di **96.222 coppie TT–PGTU candidate**, che rappresentano tutte le associazioni geometricamente plausibili.

### 5.4 Filtro 1: Calcolo della sovrapposizione metrica

Per ogni coppia candidata vengono calcolati:

- La **lunghezza di sovrapposizione effettiva** dell'arco TomTom all'interno del buffer PGTU
- La **percentuale di copertura dell'arco TomTom** rispetto alla propria lunghezza totale
- La **percentuale relativa alla lunghezza del segmento PGTU**

Vengono mantenuti solo i candidati che rispettano vincoli stringenti:

| Criterio | Soglia |
|----------|--------|
| Sovrapposizione assoluta | ≥ 3 metri |
| Copertura dell'arco TomTom | ≥ 50% |

Risultato: **65.283 candidati validi** (su 96.222 iniziali).

La distribuzione del numero di segmenti PGTU candidati per singolo arco TomTom mostra che nella maggioranza dei casi l'associazione è univoca:

| Candidati per arco TT | Casi |
|------------------------|------|
| 1 candidato | 38.422 |
| 2 candidati | 7.455 |
| 3 candidati | 2.801 |
| 4+ candidati | rari (max 7) |

### 5.5 Filtro 2: Vincolo angolare locale

Per ogni match geometrico plausibile viene calcolato l'**angolo locale** tra le direzioni dell'arco TomTom e del segmento PGTU. Il calcolo utilizza:

- Il **punto di minima distanza** tra i due segmenti
- L'**orientamento locale** basato sulla derivata direzionale della geometria lineare in quel punto

Il match è considerato valido solo se:

> **Δangolo ≤ 45°**

Questo filtro è fondamentale per garantire che vengano associati solo archi effettivamente **collineari o coerenti nella direzione di percorrenza**, escludendo le false corrispondenze che possono verificarsi in corrispondenza di incroci, svincoli o strade parallele ravvicinate.

Risultato: **52.653 candidati validi** (su 65.283 dopo il filtro metrico).

### 5.6 Matching semantico basato sulla toponomastica

Come ulteriore livello di verifica, si procede al **confronto toponomastico** tra:

- Il nome strada TomTom (`StreetName`)
- La toponomastica PGTU (`Toponomastica`)

Il confronto avviene attraverso l'analisi delle **parole significative** presenti nelle due denominazioni, escludendo forme generiche quali "via", "viale", "piazza", "largo", "di", "del", "della", ecc.

Se il miglior match geometrico non presenta compatibilità semantica ma esiste un altro candidato con un overlap nominativo significativo, il sistema **sostituisce automaticamente** il primo con il secondo. Questo meccanismo correttivo è particolarmente efficace in corrispondenza di strade parallele ravvicinate dove il solo criterio geometrico potrebbe risultare ambiguo.

### 5.7 Selezione del best match

Per ogni arco TomTom viene infine selezionato:

1. Il **miglior candidato geometrico** (massima percentuale di sovrapposizione)
2. Se necessario, il **miglior candidato semantico** compatibile

### 5.8 Risultati del matching TomTom–PGTU

| Indicatore | Valore |
|------------|--------|
| Archi TomTom totali | 94.148 |
| Archi TomTom utilizzati per il matching (>1.000 veic/g, ≥5 m) | 71.711 |
| **Match accettati** | **42.786 (59,7%)** |
| Non matchati | 28.925 (40,3%) |

**Copertura lato PGTU:**

| Indicatore | Valore |
|------------|--------|
| Segmenti PGTU totali | 1.301 |
| Segmenti PGTU con almeno un arco TomTom associato | 1.243 |
| Segmenti PGTU senza corrispondente TomTom sopra soglia | 58 |
| **Tasso di copertura PGTU** | **~95–96%** |

La rete PGTU risulta quindi coperta dai dati TomTom per circa il 95–96% dei segmenti, con una quota residuale di 58 archi privi di corrispondente nella rete TomTom ad alto flusso. Questi ultimi richiedono una verifica specifica (potrebbero corrispondere a strade con volumi di traffico effettivamente bassi, oppure a segmenti con problemi di geometria nella rete TomTom).

### 5.9 Flusso medio TomTom lungo la rete PGTU

Per i segmenti PGTU associati ad almeno un arco TomTom è stato calcolato il **flusso medio VEIC_DAY_TOT per Id strada**, ottenendo una mappa in cui la grande viabilità e gli assi principali risultano chiaramente distinti dai rami di distribuzione locale.

### 5.10 Analisi degli archi non matchati ad alto flusso

Una delle analisi più significative riguarda gli **archi TomTom non associati al PGTU ma con flussi elevati**: questi rappresentano strade ad alta domanda di traffico non intercettate dal grafo PGTU vigente, e dunque candidati prioritari per l'inserimento nella rete principale.

Le mappe prodotte evidenziano:
- Archi non associati al PGTU con flusso ≥ **10.000** veicoli/giorno: 4.925 archi
- Archi non associati al PGTU con flusso ≥ **5.000** veicoli/giorno
- Archi non associati al PGTU con flusso ≥ **3.000** veicoli/giorno

Queste rappresentazioni permettono di individuare in modo mirato gli assi a forte domanda di traffico non intercettati dal grafo PGTU, fornendo una base oggettiva per le proposte di inserimento.

---

## 6. Matching TomTom–Rete ATAC

### 6.1 Obiettivo

L'associazione tra archi TomTom e linee ATAC consente di:

- Valutare la **copertura del trasporto pubblico** sulla rete ad alto flusso
- Identificare strade con elevata presenza TPL non classificate nel PGTU
- Verificare la coerenza tra la classificazione TPL dell'Annesso D e l'effettiva presenza di linee bus

### 6.2 Preparazione dei dati

| Dataset | Elementi |
|---------|----------|
| Archi TomTom con geometria valida | 94.148 |
| Linee ATAC totali | 2.186 |
| Linee ATAC attive (utilizzate nel matching) | 902 |

Le geometrie sono state allineate in EPSG:3004 e le linee ATAC attive sono state **bufferizzate di 30 metri** per rappresentare il corridoio influenzato dal trasporto pubblico.

### 6.3 Processo di matching

Il matching segue lo stesso schema metodologico utilizzato per il PGTU:

1. **Preselezione**: solo archi TomTom con flusso > 1.000 veicoli/giorno e lunghezza ≥ 5 m (71.711 archi)
2. **Spatial Join**: individuazione dei buffer ATAC candidati tramite indice spaziale
3. **Vincolo angolare**: calcolo dell'orientamento locale di TomTom e ATAC nel punto di minima distanza (finestra ±5 m); accettazione solo se Δangolo ≤ 45°
4. **Vincolo di overlap**: lunghezza di intersezione TT–buffer ≥ 3 m
5. **Calcolo copertura**: percentuale dell'arco coperta dal buffer ATAC (`overlap_pct_atac30m`); per ogni arco TT si mantiene il valore massimo
6. **Early-stop**: il ciclo si interrompe se si raggiunge almeno il 60% di overlap

### 6.4 Risultati

| Indicatore | Valore |
|------------|--------|
| Archi TomTom analizzati (sopra soglia) | 71.711 |
| **Associati a una linea ATAC** | **51.040 (71,2%)** |
| Non associati | 20.671 (28,8%) |

La mediana di overlap per gli archi associati è pari al **100%**, con valori elevati soprattutto sulle infrastrutture ad alta domanda.

### 6.5 Confronto con la classificazione TPL dell'Annesso D

| Indicatore | Valore |
|------------|--------|
| Archi TPL (IS_TPL=1) sopra soglia | 38.290 |
| Di cui associati a linea ATAC | 34.521 **(90,2%)** |
| Archi TPL non coperti da ATAC | 3.769 (9,8%) |

Il 9,8% residuale rappresenta segmenti classificati come TPL nell'Annesso D che non rientrano nel buffer ATAC, e costituisce una potenziale discrepanza da verificare.

### 6.6 Output cartografici

Le mappe prodotte consentono di individuare:

- **Mappa A**: archi TomTom associati vs non associati alla rete ATAC
- **Mappa B**: archi classificati TPL (IS_TPL=1) ma non coperti da ATAC — potenziali errori di classificazione o linee soppresse
- **Mappa C**: archi non classificati TPL (IS_TPL=0) ma coperti da ATAC — potenziali candidati per l'aggiornamento della classificazione TPL

---

## 7. Matching TomTom–Grande Viabilità

### 7.1 Obiettivo

L'analisi della Grande Viabilità 2019 consente di valutare la coerenza tra la rete PGTU e la classificazione di grande viabilità, identificando:

- Strade della Grande Viabilità non presenti nel PGTU
- Strade PGTU non appartenenti alla Grande Viabilità

### 7.2 Processo di matching

È stato applicato lo stesso schema di matching geometrico utilizzato per ATAC e PGTU:

- Buffer di 30 m attorno alla rete di Grande Viabilità
- Overlap minimo 3 m
- Soglia di copertura sull'arco TomTom ≥ 60%
- Coerenza angolare locale Δ ≤ 45°

### 7.3 Risultati

| Indicatore | Valore |
|------------|--------|
| Archi TomTom con geometria valida | 94.148 |
| Archi TomTom utilizzati per il matching (sopra soglia) | 71.711 |
| Archi con Is_GrandeViabilita = 1 | **26.237** |
| Archi con Is_GrandeViabilita = 0 | **67.986** |

### 7.4 Output

Sono state prodotte:

- **Mappa di confronto** tra archi TomTom associati e non associati alla Grande Viabilità
- **Mappa dei disallineamenti** tra la classificazione IS_GV (da Annesso D) e il flag Is_GrandeViabilita (da matching geometrico)
- **Shapefile di hotspot** per l'ispezione in ambiente GIS degli archi con flag discordanti

---

## 8. Costruzione delle Tabelle di Sintesi

### 8.1 Finalità

Le Tabelle di Sintesi rappresentano lo strumento operativo centrale per la riclassificazione: aggregano tutte le informazioni raccolte a livello di **singola strada** (unità toponomastica), consentendo analisi comparative e l'individuazione sistematica delle criticità.

### 8.2 Esportazione del database integrato

I risultati del matching sono stati consolidati in un file Excel unico (**Confronto_PGTU_TOMTOM_new.xlsx**, foglio "Database"), in cui ogni riga corrisponde a un arco TomTom o a un segmento PGTU senza corrispondenza TomTom.

**Informazioni TomTom per ogni record:**
- Id arco TomTom
- Nome Strada (da StreetName)
- Flussi Giornalieri (VEIC_DAY_TOT)
- Lunghezza arco TomTom in metri
- Geometria in formato WKT

**Informazioni PGTU per ogni record:**
- Id Segmento PGTU
- Id PGTU (Id strada originario)
- Toponomastica
- Classificazione funzionale
- Lunghezza segmento PGTU in metri
- Geometria in formato WKT

**Flag strutturali:**
- `Is_PGTU`: indica se l'arco è associato a un segmento PGTU
- `IS_TPL`: indica se il segmento è classificato come asse TPL
- `IS_GV`: indica se il segmento appartiene alla Grande Viabilità 2019
- `Is_ATAC`: indica se l'arco risulta servito da una linea ATAC entro 30 m
- `Is_GrandeViabilita`: indica se l'arco è compatibile geometricamente con la Grande Viabilità

**Flag sulle soglie di flusso** (per identificare rapidamente gli archi ad alto flusso non classificati):
- `Flag_over_soglia1_noPGTU`: flusso ≥ 10.000 e Is_PGTU = 0
- `Flag_over_soglia2_noPGTU`: flusso ≥ 5.000 e Is_PGTU = 0
- `Flag_over_soglia3_noPGTU`: flusso ≥ 3.000 e Is_PGTU = 0

**Controllo toponomastico:**
- `Flag_nome_da_verificare`: assume valore 1 se le denominazioni TomTom e PGTU non condividono parole significative, segnalando potenziali incoerenze da verificare manualmente.

### 8.3 Struttura della Tabella di Sintesi

La Tabella di Sintesi aggrega le informazioni a livello di strada, con i seguenti indicatori:

| Colonna | Descrizione |
|---------|-------------|
| **Identificazione Strada** | Nome unificato (da Toponomastica PGTU se disponibile, altrimenti da StreetName TomTom) |
| **Is_PGTU** | Appartiene alla rete PGTU (Sì/No) |
| **Classificazione** | Classificazione funzionale PGTU (A, S, IQ, Q, IZ) |
| **% PGTU** | Percentuale della lunghezza della strada coperta da archi TomTom appartenenti al PGTU |
| **Flusso medio pesato** | Media dei flussi giornalieri TomTom, pesata per la lunghezza dei singoli archi |
| **Flusso Min** | Valore minimo di flusso giornaliero tra gli archi della strada |
| **Flusso Max** | Valore massimo di flusso giornaliero tra gli archi della strada |
| **% > Soglia Flussi** | Percentuale della lunghezza della strada in cui il flusso supera la soglia parametrica (es. 5.000 veicoli/giorno) |
| **Is_TPL** | Presenza di archi TomTom associati alla rete ATAC (Sì/No) |
| **% TPL** | Percentuale della lunghezza servita da ATAC |
| **Is_GV** | Presenza di archi associati alla Grande Viabilità (Sì/No) |
| **% GV** | Percentuale della lunghezza nella Grande Viabilità |

La soglia flussi è un **parametro variabile** (cella B2 del foglio), impostato di default a 5.000 veicoli/giorno ma modificabile dall'utente per esplorare scenari diversi.

### 8.4 Tabelle per Municipio

Le Tabelle di Sintesi sono state prodotte in due versioni, suddivise per municipio (dal I al XV):

- **Tabella 1 (Flussi Bassi)**: strade della rete principale con flussi giornalieri relativamente bassi. Contiene le strade già classificate nel PGTU con i relativi flussi, classificazione, percentuali di copertura PGTU, TPL e GV.

- **Tabella 2 (Flussi Elevati)**: strade fuori dalla rete principale con flussi elevati. Contiene le strade non classificate nel PGTU che presentano flussi significativi, con i relativi indicatori di traffico e appartenenza a TPL e GV.

---

## 9. Casi d'uso per la riclassificazione

Le Tabelle di Sintesi consentono di applicare **filtri combinati** per individuare sistematicamente le diverse tipologie di criticità. Sono stati definiti sette casi d'uso principali.

### Caso d'uso 1 — Strade PGTU senza copertura TomTom

**Obiettivo**: Identificare le strade classificate nel PGTU per cui non sono disponibili dati di traffico utilizzabili.

**Filtri**: Is_PGTU = "Sì" e Flusso medio = vuoto

Queste strade potrebbero corrispondere a:
- Archi con volumi di traffico talmente bassi da non essere rilevati da TomTom (sotto i 1.000 veicoli/giorno)
- Problemi di geometria nella rete TomTom (arco non presente o non correttamente digitalizzato)
- Strade di recente apertura non ancora coperte dal dataset TomTom

### Caso d'uso 2 — Strade NON PGTU con forti flussi TomTom

**Obiettivo**: Identificare le strade non presenti nel PGTU che mostrano flussi significativi — candidati prioritari per l'inserimento nella rete principale.

**Filtri**: Is_PGTU = "No" e Flusso medio > soglia (es. > 5.000 veicoli/giorno)

Un ulteriore filtro su **% Lunghezza > Soglia Flussi > 50%** permette di individuare strade con flussi alti consistenti lungo l'intero tracciato, escludendo i casi in cui solo un breve tratto presenta flussi elevati.

### Caso d'uso 3 — Strade non PGTU con valori di flusso estremi

**Obiettivo**: Identificare strade non PGTU che presentano valori di flusso minimo o massimo elevati, utili per individuare tratti critici o colli di bottiglia.

**Filtri**: Is_PGTU = "No", Flusso Max > soglia (es. > 10.000 veicoli/giorno) e Flusso Medio < soglia

Questo caso d'uso è complementare al precedente: individua strade con picchi di flusso localizzati che potrebbero indicare criticità puntuali.

### Caso d'uso 4 — Strade servite da ATAC ma non presenti nel PGTU

**Obiettivo**: Identificare strade percorse da linee ATAC ma non classificate nella viabilità principale. Queste strade assumono rilevanza funzionale grazie al servizio di trasporto pubblico.

**Filtri**: Is_PGTU = "No" e Is_ATAC = "Sì"

### Caso d'uso 5 — Strade PGTU senza copertura ATAC

**Obiettivo**: Identificare strade classificate nel PGTU che non risultano attraversate da linee ATAC.

**Filtri**: Is_PGTU = "Sì" e Is_ATAC = "No" (oppure % ATAC = 0%)

Queste strade potrebbero richiedere una verifica della classificazione o un rafforzamento del servizio TPL.

### Caso d'uso 6 — Strade della Grande Viabilità non presenti nel PGTU

**Obiettivo**: Identificare strade della Grande Viabilità 2019 non classificate nel PGTU.

**Filtri**: Is_GV = "Sì" e Is_PGTU = "No"

La coerenza tra Grande Viabilità e rete PGTU è un requisito di pianificazione: strade che appartengono alla Grande Viabilità dovrebbero tendenzialmente essere incluse nella rete principale.

### Caso d'uso 7 — Strade PGTU non nella Grande Viabilità

**Obiettivo**: Identificare strade della rete PGTU che non appartengono alla Grande Viabilità 2019.

**Filtri**: Is_PGTU = "Sì" e Is_GV = "No"

Queste strade potrebbero richiedere una verifica della loro permanenza nella rete principale, soprattutto se i flussi di traffico risultano bassi.

---

## 10. Costruzione del Grafo 2026

### 10.1 Dal dato analitico alla proposta di rete

L'insieme delle analisi descritte nei capitoli precedenti fornisce la base informativa per formulare proposte concrete di modifica alla rete della viabilità principale. Queste proposte si traducono in due tipologie di intervento:

- **Proposte di eliminazione**: rimozione di archi dalla rete PGTU vigente, motivata da flussi insufficienti, perdita di funzione gerarchica o incoerenza con la rete pianificata
- **Proposte di inserimento**: aggiunta di nuovi archi alla rete, motivata da flussi elevati, presenza di TPL, appartenenza alla Grande Viabilità o necessità di continuità della rete

### 10.2 Il Grafo 2026

Il Grafo 2026 rappresenta la **rete stradale principale proposta** per l'aggiornamento del PGTU. Viene generato combinando:

1. L'**Annesso D vigente** (1.301 archi della rete PGTU 2015)
2. Le **proposte di eliminazione** (archi da rimuovere)
3. Le **proposte di inserimento** (archi da aggiungere)

Il risultato è un grafo editabile che incorpora tutte le modifiche proposte e che può essere ulteriormente affinato attraverso:

- **Disegno di nuovi archi** direttamente sulla mappa
- **Modifica della classificazione** di archi esistenti
- **Modifica della toponomastica**

### 10.3 Classificazione del Grafo 2026

Il Grafo 2026 utilizza una classificazione funzionale estesa rispetto all'Annesso D vigente, con l'aggiunta della categoria **Extraurbana (EX)** per le strade che, pur avendo una funzione rilevante nella rete, si trovano in contesto extraurbano:

| Codice | Denominazione | Contesto |
|--------|---------------|----------|
| A | Autostrade | Urbano/extraurbano |
| S | Scorrimento | Urbano |
| IQ | Interquartiere | Urbano |
| Q | Quartiere | Urbano |
| IZ | Interzonali | Urbano |
| EX | Extraurbana | Extraurbano |

### 10.4 Dati associati a ciascuna proposta

Ogni proposta di modifica (eliminazione o inserimento) è corredata da:

- **Nome della strada**: denominazione toponomastica
- **Fonte**: provenienza del dato (Annesso D, Flussi Bassi, Flussi Elevati, disegno manuale, punto manuale)
- **Classificazione funzionale**: assegnata o proposta
- **Lunghezza**: calcolata automaticamente dalla geometria (formula di Haversine)
- **Flussi giornalieri**: trasferiti dal matching TomTom quando disponibili
- **Municipio**: assegnato automaticamente in base alla posizione spaziale
- **Note**: motivazione testuale della proposta
- **Geometria**: GeoJSON (Point, LineString o MultiLineString)

### 10.5 Aggregazione per Municipio

Le proposte e il Grafo 2026 sono organizzati per municipio (I–XV), consentendo:

- L'analisi delle modifiche per singolo ambito territoriale
- La generazione di report dettagliati per municipio (in formato HTML, Word ed Excel)
- Il calcolo di statistiche aggregate: numero di archi, km totali, distribuzione per classificazione

---

## 11. Analisi di coerenza della rete proposta

### 11.1 Obiettivo

Una volta costruito il Grafo 2026, è fondamentale verificare che la rete risultante sia **topologicamente coerente** e **gerarchicamente consistente**. A tal fine sono stati sviluppati tre livelli di analisi automatica.

### 11.2 Disconnessioni di rete

L'analisi delle disconnessioni identifica i **punti della rete in cui un arco termina senza connettersi ad alcun altro arco**, rivelando interruzioni nella continuità topologica.

**Metodo:**
1. Si estraggono tutti gli endpoint (punti iniziale e finale) di ogni arco del Grafo 2026
2. Si costruisce una griglia spaziale con celle di dimensione adeguata alla tolleranza di snap
3. Per ogni endpoint si verifica se esiste un altro endpoint o un segmento di arco entro la **tolleranza di 25 metri** (~0,000225 gradi)
4. Gli endpoint isolati vengono segnalati come punti di disconnessione

Questa analisi è particolarmente importante per verificare che:
- Le proposte di eliminazione non creino interruzioni nella rete
- Le proposte di inserimento si raccordino correttamente con la rete esistente
- Non vi siano archi "orfani" privi di connessione con il resto del grafo

### 11.3 Discontinuità di classificazione

L'analisi delle discontinuità di classificazione identifica le **intersezioni in cui strade adiacenti hanno classificazioni incompatibili**, ad esempio una strada di Scorrimento (S) che si collega direttamente a una strada Interzonale (IZ) senza passare per i livelli intermedi (IQ e Q).

La gerarchia di riferimento è: A (livello 0) → S (livello 1) → IQ (livello 2) → Q (livello 3) → IZ (livello 4).

Una discontinuità si verifica quando il salto tra due livelli adiacenti è superiore a 1.

### 11.4 Discontinuità estreme

Un sottoinsieme particolarmente critico delle discontinuità di classificazione è rappresentato dai casi in cui il salto gerarchico è di **2 o più livelli**. Ad esempio:

- Una strada di classificazione A che si collega direttamente a una Q (saltando S e IQ)
- Una strada S che si collega a una IZ (saltando IQ e Q)

Queste situazioni sono indicative di errori nella classificazione o di lacune nella rete che richiedono interventi prioritari.

---

## 12. Analisi della rete TPL e confronto con la viabilità principale

### 12.1 Sovrapposizione delle linee bus

Oltre al matching binario TomTom–ATAC, l'analisi comprende la mappatura dei segmenti stradali in base al **numero di linee bus che vi transitano simultaneamente**:

| Fascia | Colore nella mappa | Significato |
|--------|-------------------|-------------|
| 3–4 linee | Giallo | Sovrapposizione moderata |
| 5–6 linee | Arancione | Sovrapposizione significativa |
| 7–9 linee | Rosso | Elevata concentrazione TPL |
| 10–14 linee | Viola | Concentrazione molto elevata |
| 15+ linee | Blu scuro | Corridoio TPL principale |

I segmenti con 5 o più linee sovrapposte identificano i **corridoi TPL principali** della città, la cui presenza (o assenza) nella rete della viabilità principale è un indicatore chiave per la riclassificazione.

### 12.2 Analisi di mismatch TPL–Annesso D

Un'analisi specifica è dedicata al confronto tra la rete TPL con 5+ linee e l'Annesso D:

- **TPL 5+ non in Annesso D**: segmenti con forte presenza di trasporto pubblico (5 o più linee bus) che non figurano nella rete della viabilità principale. Questi segmenti sono candidati prioritari per l'inserimento, poiché la concentrazione di linee bus indica una rilevanza funzionale elevata.

- **Annesso D non in TPL 5+**: segmenti della rete PGTU che non sono coperti da 5 o più linee bus. Questo non implica necessariamente una criticità (molte strade principali hanno funzioni diverse dal TPL), ma l'informazione è utile per una valutazione complessiva.

---

## 13. Integrazione con dati territoriali

### 13.1 Centri abitati

La perimetrazione dei centri abitati fornisce un'informazione fondamentale per la classificazione funzionale: essa consente di distinguere tra contesto **urbano** (interno ai centri abitati) e contesto **extraurbano** (esterno), influenzando direttamente l'attribuzione della classificazione. In particolare, strade in contesto extraurbano che svolgono funzione di collegamento con la rete principale possono essere classificate come **Extraurbane (EX)**.

### 13.2 Strade provinciali

La rete delle strade provinciali, filtrata spazialmente all'interno dei confini dei Municipi di Roma, rappresenta un ulteriore livello di riferimento per:

- Identificare strade di rilevanza sovracomunale non incluse nel PGTU
- Valutare la coerenza tra classificazione provinciale e classificazione PGTU
- Individuare potenziali candidati per l'inserimento nella rete principale

### 13.3 Strade extraurbane

La rete stradale extraurbana fornisce informazioni su classificazione, limiti di velocità, appartenenza alla Grande Viabilità e presenza di TPL per le strade in contesto non urbano, integrando la base informativa per la proposta di classificazione EX.

---

## 14. Sintesi del metodo e risultati attesi

### 14.1 Flusso metodologico complessivo

Il metodo di riclassificazione della viabilità principale del PGTU si articola nelle seguenti fasi:

```
┌─────────────────────────────────────────────────────────────────┐
│ FASE 1 — ACQUISIZIONE E PREPARAZIONE DATI                       │
│                                                                   │
│  Rete TomTom (94.148 archi con flussi H24)                      │
│  Rete PGTU Annesso D (1.301 segmenti classificati)              │
│  Linee ATAC (902 linee attive)                                   │
│  Grande Viabilità 2019                                           │
│  Strade Provinciali, Extraurbane, Centri Abitati                 │
├─────────────────────────────────────────────────────────────────┤
│ FASE 2 — MATCHING SPAZIALE                                       │
│                                                                   │
│  Matching TomTom → PGTU  (copertura 95-96%)                     │
│  Matching TomTom → ATAC  (71,2% degli archi sopra soglia)       │
│  Matching TomTom → GV    (26.237 archi associati)               │
├─────────────────────────────────────────────────────────────────┤
│ FASE 3 — ANALISI INTEGRATA                                       │
│                                                                   │
│  Costruzione database integrato PGTU–TomTom–ATAC–GV             │
│  Aggregazione per strada (Tabelle di Sintesi)                    │
│  Suddivisione per Municipio (I–XV)                               │
│  Applicazione dei 7 casi d'uso di riclassificazione             │
├─────────────────────────────────────────────────────────────────┤
│ FASE 4 — FORMULAZIONE PROPOSTE                                   │
│                                                                   │
│  Proposte di eliminazione (archi da rimuovere dal PGTU)          │
│  Proposte di inserimento (archi da aggiungere al PGTU)           │
│  Classificazione EX per contesto extraurbano                     │
│  Analisi mismatch TPL 5+ / Annesso D                            │
├─────────────────────────────────────────────────────────────────┤
│ FASE 5 — COSTRUZIONE E VERIFICA GRAFO 2026                      │
│                                                                   │
│  Generazione Grafo 2026 (Annesso D + proposte)                  │
│  Verifica disconnessioni di rete (tolleranza 25 m)              │
│  Verifica discontinuità di classificazione                       │
│  Verifica discontinuità estreme (salto ≥ 2 livelli)             │
├─────────────────────────────────────────────────────────────────┤
│ FASE 6 — PRODUZIONE REPORT E EXPORT                              │
│                                                                   │
│  Report per Municipio (HTML con mappe, Word, Excel)              │
│  Export GeoJSON/Shapefile per analisi in QGIS                    │
│  Export layer individuali e combinati                            │
└─────────────────────────────────────────────────────────────────┘
```

### 14.2 Punti di forza del metodo

1. **Oggettività**: la riclassificazione si fonda su dati di flusso veicolare misurati (TomTom), non su stime o valutazioni soggettive.

2. **Completezza**: l'integrazione di più fonti (traffico, TPL, Grande Viabilità, contesto territoriale) consente una visione multicriteriale della rilevanza funzionale di ciascuna strada.

3. **Rigore geometrico**: il matching spaziale multi-filtro (sovrapposizione metrica, vincolo angolare, verifica toponomastica) garantisce l'affidabilità delle associazioni tra reti diverse.

4. **Sistematicità**: l'applicazione dei casi d'uso su Tabelle di Sintesi per municipio consente un'analisi esaustiva e replicabile, che copre tutte le possibili configurazioni di criticità.

5. **Verificabilità**: il Grafo 2026 viene sottoposto a verifiche automatiche di coerenza topologica e gerarchica, evidenziando le criticità residue prima della finalizzazione.

6. **Trasparenza**: tutti i dati intermedi e finali sono esportabili in formati standard (GeoJSON, Shapefile, Excel) per consentire verifiche indipendenti e analisi complementari in ambiente GIS.

### 14.3 Risultati attesi

Il processo produce:

- Un **Grafo 2026** aggiornato della rete della viabilità principale, completo di classificazione funzionale per ogni arco
- **Report dettagliati per municipio** con elenco delle modifiche proposte, mappe e statistiche
- Una **base dati integrata** che documenta le motivazioni (flussi, TPL, GV) alla base di ogni proposta
- Una **rete topologicamente e gerarchicamente verificata**, con evidenza delle eventuali criticità residue

Il metodo è stato concepito per essere iterativo: le proposte possono essere affinate, le verifiche ripetute e i report rigenerati fino al raggiungimento di una configurazione di rete soddisfacente e coerente con gli obiettivi di pianificazione del PGTU di Roma Capitale.

---

*Relazione elaborata sulla base dei materiali di analisi e della documentazione del sistema PGTU Roma — Mappa Interattiva delle Proposte di Modifica.*
*Piano Generale del Traffico Urbano — Roma Capitale*
