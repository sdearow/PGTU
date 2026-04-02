# Confronto spaziale: Shapefile Grande Viabilità vs Grafo 2026

Questo report confronta **geometricamente** lo shapefile della Grande Viabilità (GRANDE_VIAB_REV26012019.shp) con il Grafo 2026, per identificare quali tratti della rete di Grande Viabilità non sono presenti nel grafo.

Buffer di sovrapposizione utilizzato: **30m**

## Statistiche generali

| Metrica | Valore |
|---------|--------|
| Segmenti GV totali | 1990 |
| Lunghezza totale GV | 1534.6 km |
| Ben coperti (>80%) | 1414 segmenti (1156.2 km, 75.3%) |
| Parzialmente coperti (20-80%) | 302 segmenti (275.3 km, 17.9%) |
| **Non coperti (<20%)** | **274 segmenti (103.1 km, 6.7%)** |

## A) Segmenti GV NON coperti dal Grafo 2026 (274 segmenti, 103.1 km)

Raggruppati per strada del Grafo 2026 più vicina (entro 100m, o 500m se isolati).

| Strada vicina (Grafo 2026) | Segmenti | Lunghezza non coperta |
|---------------------------|----------|----------------------|
| Via Cristoforo Colombo (Caracalla-Pontina) | 46 | 18.67 km |
| Via Ardeatina (Appia Antica-GRA) | 2 | 8.49 km |
| Viale dell'Umanesimo | 7 | 5.23 km |
| Viale dell'Oceano Atlantico | 5 | 4.64 km |
| Viale Umberto Tupini | 7 | 4.04 km |
| Viale Egeo | 5 | 4.01 km |
| Via Frassineto | 2 | 3.91 km |
| (~500m) Via della Magliana | 1 | 3.82 km |
| (~500m) Via Cristoforo Colombo (Caracalla-Pontina) | 19 | 3.61 km |
| Viale dell'Oceano Pacifico | 8 | 3.47 km |
| Via Flaminia | 2 | 3.22 km |
| Via Laurentina (Viale del Tintoretto-GRA) | 4 | 3.18 km |
| Viale Beethoven | 9 | 2.87 km |
| Via di Casal de' Pazzi | 6 | 2.57 km |
| Via delle Tre Fontane | 2 | 2.55 km |
| Viale dei Primati Sportivi | 2 | 2.54 km |
| Viale dell'Aeronautica | 3 | 2.53 km |
| Via Nola | 2 | 2.30 km |
| Viale Carlo Felice | 10 | 2.29 km |
| Via Emanuele Filiberto (Manzoni-Carlo Felice) | 10 | 2.29 km |
| (~500m) Viale Europa | 7 | 2.12 km |
| Via Flaminia (GRA-Prima Porta) | 1 | 1.96 km |
| Via della Villa di Livia (Via Frassineto-Via Flamina) | 1 | 1.96 km |
| Viale della Tecnica | 2 | 1.83 km |
| Via Appia Nuova (P.le Appio-GRA) | 5 | 1.80 km |
| (~500m) Viale delle Terme di Caracalla | 3 | 1.76 km |
| Via di San Claudio | 2 | 1.73 km |
| Via Casilina (Primavera-Togliatti) | 1 | 1.69 km |
| (~500m) Via di Tor Carbone | 1 | 1.67 km |
| Piazza Pia | 3 | 1.65 km |
| Via San Pio X | 3 | 1.65 km |
| Via della Traspontina | 3 | 1.65 km |
| Lungotevere Vaticano (sottopasso) | 3 | 1.65 km |
| Lungotevere Marzio | 3 | 1.52 km |
| Viale Europa | 6 | 1.49 km |
| Via Flaminia Nuova (Corso di Francia-Via Flaminia) | 2 | 1.40 km |
| Via del Trullo | 2 | 1.39 km |
| Via della Magliana | 2 | 1.39 km |
| Via Prenestina (GRA-confine comunale) | 2 | 1.35 km |
| Via Tiburtina (Monti Tiburtini-fine Municipio) | 5 | 1.33 km |
| Ponte Cavour | 1 | 1.32 km |
| Lungotevere in Augusta | 1 | 1.32 km |
| Piazza Augusto Imperatore | 1 | 1.32 km |
| Via Tomacelli | 1 | 1.32 km |
| Via Ciro il Grande | 4 | 1.31 km |
| (~500m) Via Francesco Crispi | 4 | 1.29 km |
| Via Celio Vibenna | 4 | 1.27 km |
| Viale delle Terme di Caracalla | 6 | 1.27 km |
| Circonvallazione Ostiense | 2 | 1.27 km |
| Via Flaminia (Flaminia Nuova-Tor di Quinto) | 1 | 1.26 km |
| Via Tiburtina (P.le Tiburtino-Fiorentini) | 6 | 1.22 km |
| Viale America | 5 | 1.20 km |
| Via Magna Grecia | 1 | 1.15 km |
| Via La Spezia (Nola-Appio) | 1 | 1.15 km |
| Viale Castrense | 1 | 1.15 km |
| Via di Mezzocammino (Ostiense-Cefalonia) | 1 | 1.11 km |
| Via Cristoforo Colombo | 1 | 1.11 km |
| Viale della Civiltà del Lavoro | 3 | 1.07 km |
| (~500m) Largo Chigi | 4 | 1.03 km |
| Lungotevere Maresciallo Diaz (D'Aosta-S.Giuliano) | 5 | 1.03 km |
| Via Borghesiana | 1 | 0.97 km |
| Corso Neostiense | 1 | 0.97 km |
| (~500m) Viale Egeo | 3 | 0.91 km |
| Via Appia Pignatelli (Appia Antica-Quarto Miglio) | 1 | 0.90 km |
| Via dell'Almone | 1 | 0.90 km |
| Lungotevere Maresciallo Cadorna | 5 | 0.88 km |
| Largo Chigi | 1 | 0.87 km |
| Via del Corso | 1 | 0.87 km |
| Viale del Tintoretto | 1 | 0.86 km |
| Viale Bruno Pelizzi | 1 | 0.84 km |
| Via di Torre Spaccata (Pelizzi-Casilina) | 1 | 0.84 km |
| Viale Giulio Cesare | 2 | 0.83 km |
| Via di San Gregorio | 2 | 0.81 km |
| Lungotevere Maresciallo Diaz (S.Giuliano-p.Milvio) | 2 | 0.80 km |
| Via Gregorio VII | 5 | 0.79 km |
| Piazzale Ferruccio Parri | 1 | 0.79 km |
| Viale Palmiro Togliatti | 2 | 0.78 km |
| Via dei Fori Imperiali | 3 | 0.78 km |
| (~500m) Ponte Regina Margherita | 2 | 0.77 km |
| Via Anastasio II | 4 | 0.74 km |
| Via Leone XIII | 4 | 0.74 km |
| Via della Magliana (Viadotto della Magliana) | 2 | 0.72 km |
| (~500m) Viale di Val Fiorita | 2 | 0.70 km |
| Via del Tempio degli Arvali | 1 | 0.70 km |
| Via Ciciliano | 1 | 0.67 km |
| Ponte Duca d'Aosta | 4 | 0.67 km |
| Via Costantino (Tito-Colombo) | 2 | 0.65 km |
| Viale dell'Agricoltura | 2 | 0.64 km |
| Via Stefano Porcari | 1 | 0.64 km |
| Via Crescenzio | 1 | 0.64 km |
| Via Cola di Rienzo | 1 | 0.64 km |
| Viale dello Stadio Olimpico | 6 | 0.62 km |
| Viale della Primavera | 2 | 0.59 km |
| Via Francesco de Suppé | 1 | 0.57 km |
| Via della Lega Lombarda | 2 | 0.57 km |
| Viale dell'Arte | 1 | 0.53 km |
| Viale del Muro Torto | 1 | 0.50 km |
| Via Luisa di Savoia | 1 | 0.50 km |
| Circonvallazione Salaria | 3 | 0.48 km |
| Via delle Fornaci | 1 | 0.46 km |
| Via di Porta Cavalleggeri | 1 | 0.46 km |
| Galleria Principe Amedeo Savoia Aosta | 1 | 0.46 km |
| Viale di Porta Ardeatina | 1 | 0.45 km |
| Viale di Tor di Quinto (Ponte Milvio-Via del Foro Italico) | 1 | 0.44 km |
| Via Cassia (Cassia Nuova-ponte Milvio) | 1 | 0.44 km |
| Via Civita Castellana | 1 | 0.44 km |
| Via Prenestina (Porta Maggiore-GRA) | 2 | 0.44 km |
| Viale di Tor Marancia | 2 | 0.43 km |
| Via Giovanni Genocchi | 2 | 0.43 km |
| Via del Foro Italico | 3 | 0.41 km |
| Viale Angelico | 2 | 0.41 km |
| Viale Eritrea | 1 | 0.39 km |
| Via di Novella | 1 | 0.39 km |
| Via Nemorense | 1 | 0.39 km |
| Circonvallazione Gianicolense (stazione Trastevere-Colli Portuensi) | 1 | 0.38 km |
| Via Nicola Salvi | 1 | 0.37 km |
| Via degli Annibaldi | 1 | 0.37 km |
| Viale Antonino di San Giuliano | 1 | 0.36 km |
| Viale dell'Atletica | 1 | 0.36 km |
| Via Nomentana (Menenio Agrippa-GRA) | 1 | 0.34 km |
| via Guido Mazzoni | 1 | 0.33 km |
| via Arduino | 1 | 0.33 km |
| Viale delle Milizie | 2 | 0.31 km |
| (~500m) Ponte Cavour | 1 | 0.28 km |
| Viale Etiopia | 2 | 0.28 km |
| Nuova Circonvallazione Interna | 1 | 0.27 km |
| Viale Guglielmo Marconi (Piazzale della Radio-via E. Fermi) | 2 | 0.26 km |
| Via Orazio Pulvillo | 1 | 0.25 km |
| Via Tuscolana (Cave-fine Municipio) | 1 | 0.25 km |
| Via Triboniano | 1 | 0.24 km |
| Piazza Cavour (p.za Adriana-Crescenzio) | 1 | 0.24 km |
| Piazza Adriana | 1 | 0.24 km |
| Via di Tor Carbone | 1 | 0.23 km |
| Via di Casal Bianco | 1 | 0.23 km |
| Via di Salone | 1 | 0.23 km |
| Via Colli sul Velino | 1 | 0.23 km |
| Via di Settebagni | 1 | 0.22 km |
| Via Filippo Corridoni | 1 | 0.21 km |
| Lungotevere della Vittoria | 1 | 0.21 km |
| Via della Maglianella | 1 | 0.21 km |
| Via di Boccea | 1 | 0.21 km |
| Viale dei Colli Portuensi (Gianicolense-Newton) | 1 | 0.20 km |
| Via Salaria (Foro Italico-GRA) | 1 | 0.19 km |
| Via Trionfale | 2 | 0.19 km |
| Viale Guglielmo Marconi (Via E. Fermi-via Cristoforo Colombo) | 1 | 0.19 km |
| Via Francesco Grimaldi | 1 | 0.19 km |
| (~500m) Via Borghesiana | 1 | 0.19 km |
| (~500m) Via di Vigna Murata | 2 | 0.18 km |
| Via Furio Cicogna | 1 | 0.18 km |
| (~500m) Viale dell'Umanesimo | 1 | 0.18 km |
| (~500m) Viale di Tor di Quinto (Via del Foro Italico-Via Flaminia) | 1 | 0.18 km |
| Viale Giuseppe Mazzini (Piazzale Clodio- Piazza Mazzini) | 2 | 0.18 km |
| Viale Giovanni Falcone e Paolo Borsellino | 2 | 0.18 km |
| Circonvallazione Clodia | 2 | 0.18 km |
| Galleria Giovanni XXIII | 1 | 0.17 km |
| Via del Forte Trionfale | 1 | 0.17 km |
| (~500m) Viale Cesare Pavese | 1 | 0.17 km |
| Viale dei Bastioni di Michelangelo | 1 | 0.16 km |
| Viale dei Gladiatori | 4 | 0.16 km |
| (~500m) Via Giuseppe Zanardelli | 1 | 0.16 km |
| Viadotto Giovanni Gronchi | 1 | 0.15 km |
| Via Matera | 1 | 0.14 km |
| Via Tuscolana (Piazza Asti-Cave) | 1 | 0.14 km |
| (~500m) Via Casilina (Primavera-Togliatti) | 1 | 0.14 km |
| Via Cassia Nuova | 1 | 0.14 km |
| Via di Vigna Stelluti | 1 | 0.14 km |
| Corso di Francia (Vigna Stelluti-p.te Flaminio) | 1 | 0.14 km |
| Via di Villa Severini | 1 | 0.14 km |
| Via Monte Subasio | 1 | 0.13 km |
| Via Maiella | 1 | 0.13 km |
| Via Gargano | 1 | 0.13 km |
| Corso Sempione | 1 | 0.13 km |
| Via Giuseppe Zanardelli | 1 | 0.12 km |
| Ponte Umberto I | 1 | 0.12 km |
| Lungotevere Tor di Nona | 1 | 0.12 km |
| Via di Acqua Bullicante | 1 | 0.12 km |
| (~500m) Via Leone IV | 1 | 0.12 km |
| Via delle Sette Chiese (Colombo-Ardeatina) | 1 | 0.12 km |
| Ponte Giacomo Matteotti | 1 | 0.11 km |
| Lungotevere Michelangelo | 1 | 0.11 km |
| Lungotevere delle Armi | 1 | 0.11 km |
| Via Luigi Settembrini | 1 | 0.11 km |
| (~500m) Via Faenza | 2 | 0.11 km |
| (~500m) Viale Egidio Galbani | 1 | 0.11 km |
| (~500m) Viale dell'Oceano Pacifico | 1 | 0.10 km |
| Viale di Trastevere | 1 | 0.10 km |
| Viale Aventino (Circo Massimo-Cerchi) | 1 | 0.08 km |
| Via Nomentana (Porta Pia-Nomentana Nuova) | 1 | 0.07 km |
| Via Tembien | 1 | 0.07 km |
| Via Oderisi da Gubbio | 1 | 0.07 km |
| Via Domenico Fontana | 1 | 0.06 km |
| Viale di Tor di Quinto (Via del Foro Italico-Via Flaminia) | 1 | 0.05 km |
| (~500m) Via Labicana | 1 | 0.05 km |

## B) Strade parzialmente coperte (20-80%, tratti >500m) (286 strade)

Queste strade del Grafo 2026 hanno una sovrapposizione parziale con la GV: il tracciato coincide solo in parte.

| Strada (Grafo 2026) | Segmenti GV | Lunghezza GV | Copertura media |
|---------------------|-------------|-------------|-----------------|
| Via Cristoforo Colombo | 5 | 71.46 km | 56% |
| Via di Boccea (Via Villa del Bosco-Via Casalnoceto) | 2 | 56.78 km | 23% |
| Via Braccianese Claudia (Via Cassia-Via Paolo Ferrari) | 2 | 41.35 km | 32% |
| Via di Boccea (Via Morsasco-Via di Selva Nera) | 2 | 41.35 km | 32% |
| Via Cristoforo Colombo (Pontina-GRA) | 5 | 41.23 km | 67% |
| Via di Acilia | 3 | 39.55 km | 67% |
| Via Bruno Brandellero | 3 | 38.06 km | 66% |
| Via Cristoforo Colombo (Caracalla-Pontina) | 28 | 36.00 km | 48% |
| Via di Malafede | 2 | 35.68 km | 61% |
| Via Carmelo Maestrini | 2 | 35.68 km | 61% |
| Via di Mezzocammino (Ostiense-Cefalonia) | 2 | 35.68 km | 61% |
| Viale Bartolomeo Caveceppi | 2 | 35.68 km | 61% |
| Via del Ponte Pisano | 2 | 31.15 km | 64% |
| Via di Pantan Monastero | 1 | 28.39 km | 23% |
| Via di Casal Selce (Via G. Lazzati-altezza civico 461) | 1 | 28.39 km | 23% |
| Via del Canale della Lingua | 1 | 24.31 km | 74% |
| Via di Casal Palocco | 1 | 24.31 km | 74% |
| Via Pindaro | 1 | 24.31 km | 74% |
| Via Pietro Romani | 1 | 24.31 km | 74% |
| Via del Martin Pescatore | 1 | 24.31 km | 74% |
| Via del Lido di Castel Porziano | 1 | 24.31 km | 74% |
| Viale della Villa di Plinio | 1 | 24.31 km | 74% |
| Via Ermanno Wolf Ferrari | 1 | 24.31 km | 74% |
| Via di Boccea (Piazza Irnerio-Via Morsasco) | 5 | 22.22 km | 38% |
| Via di Selva Candida | 1 | 20.68 km | 32% |
| Via di Casalotti | 1 | 20.68 km | 32% |
| Via dell'Isola Farnese | 1 | 20.68 km | 32% |
| Via Cassia (Via Cassia Nuova-SP12a) | 1 | 20.68 km | 32% |
| Via della Cellulosa | 1 | 20.68 km | 32% |
| Via Ulrico Hoepli | 1 | 20.68 km | 32% |
| Viale dei Colli Portuensi (Newton-La Loggia) | 2 | 17.57 km | 57% |
| Viale Isacco Newton (Piazzale E. Morelli-via Portuense) | 2 | 17.57 km | 57% |
| Via del Trullo | 1 | 17.40 km | 67% |
| Viale Isacco Newton (Via Portuense-via della Magliana) | 1 | 17.40 km | 67% |
| Via della Casetta Mattei | 1 | 17.40 km | 67% |
| Viale Giuseppe Sirtori | 1 | 17.40 km | 67% |
| Via Quirino Majorana | 1 | 17.40 km | 67% |
| Via del Fosso della Magliana | 1 | 17.40 km | 67% |
| Via Bernardino Ramazzini | 1 | 17.40 km | 67% |
| Via Portuense (Via Antonio Pacinotti-GRA) | 1 | 17.40 km | 67% |
| Via di Acqua Acetosa Ostiense | 4 | 16.92 km | 66% |
| Via di Brava | 2 | 14.59 km | 69% |
| Via di Decima (Via Ostiense-Via Cristoforo Colombo) | 3 | 14.49 km | 64% |
| Via di Bravetta | 1 | 13.75 km | 60% |
| Via Aurelia Antica | 1 | 13.75 km | 60% |
| Via della Pisana (Via di Bravetta-GRA) | 1 | 13.75 km | 60% |
| Via dei Matteini | 1 | 13.75 km | 60% |
| Via della Magliana (Viadotto della Magliana) | 12 | 12.90 km | 51% |
| Viale dell'Umanesimo | 9 | 11.37 km | 53% |
| Circonvallazione Nomentana | 8 | 10.56 km | 59% |
| Via di Torricola | 2 | 10.09 km | 57% |
| Via Ardeatina (Appia Antica-GRA) | 2 | 10.09 km | 57% |
| Via di Casal Rotondo | 1 | 9.91 km | 41% |
| Viale dell'Arte | 4 | 9.82 km | 47% |
| Viale dell'Aeronautica | 3 | 9.28 km | 55% |
| Via Laurentina (Viale del Tintoretto-GRA) | 4 | 8.87 km | 57% |
| Via di Vigna Murata | 2 | 8.70 km | 68% |
| Via Francesco de Suppé | 1 | 8.14 km | 74% |
| Via dei Corazzieri | 1 | 8.14 km | 74% |
| Via dell'Acquedotto del Peschiera | 3 | 7.83 km | 70% |
| Via Trionfale | 5 | 6.98 km | 48% |
| Via Tiburtina (P.le Tiburtino-Fiorentini) | 10 | 6.98 km | 50% |
| Viale Europa | 11 | 6.92 km | 47% |
| Via Tiburtina (Monti Tiburtini-fine Municipio) | 10 | 6.64 km | 54% |
| Via Tuscolana (Cave-fine Municipio) | 6 | 5.83 km | 60% |
| Via di Casal del Marmo | 2 | 5.39 km | 53% |
| Viale America | 6 | 5.31 km | 40% |
| Via Ipogeo degli Ottavi | 1 | 5.23 km | 77% |
| Via Eugenio di Mattei | 1 | 5.23 km | 77% |
| Via dei Fori Imperiali | 6 | 5.21 km | 61% |
| via Guido Mazzoni | 3 | 5.18 km | 66% |
| Via Ostiense (Marconi-Vasco De Gama) | 5 | 5.16 km | 77% |
| Viale Guglielmo Marconi (Via E. Fermi-via Cristoforo Colombo) | 9 | 5.04 km | 41% |
| Via Frassineto | 2 | 4.76 km | 42% |
| Via delle Tre Fontane | 3 | 4.71 km | 58% |
| Nuova Circonvallazione Interna | 4 | 4.55 km | 45% |
| Via della Magliana | 8 | 4.44 km | 60% |
| Via di Tor Vergata | 1 | 4.31 km | 77% |
| Via di Casal Morena | 1 | 4.31 km | 77% |
| Viale Palmiro Togliatti | 5 | 4.29 km | 46% |
| Viale Giuseppe Mazzini (Piazzale Clodio- Piazza Mazzini) | 6 | 4.28 km | 57% |
| Circonvallazione Clodia | 5 | 4.09 km | 57% |
| Viale Angelico | 6 | 4.08 km | 61% |
| Via Casilina (Togliatti-GRA) | 1 | 4.08 km | 52% |
| Viale Bruno Pelizzi | 1 | 4.08 km | 52% |
| Via del Fosso di Santa Maura (Torre Maura-T.Spaccata) | 1 | 4.08 km | 52% |
| Via di Tor Tre Teste | 1 | 4.08 km | 52% |
| Via di Torre Spaccata (Pelizzi-Casilina) | 1 | 4.08 km | 52% |
| Viale di Torre Maura | 1 | 4.08 km | 52% |
| Viale dei Romanisti | 1 | 4.08 km | 52% |
| Via Casilina (P.zza Pigneto-Primavera) | 4 | 4.07 km | 67% |
| Viale dei Romagnoli (Centro Giano-Ostia Antica) | 2 | 3.91 km | 77% |
| Viale dell'Atletica | 4 | 3.89 km | 38% |
| Viale dell'Oceano Atlantico | 2 | 3.87 km | 68% |
| Via di Ponte Ladrone | 1 | 3.86 km | 78% |
| Via di Macchia Saponara | 1 | 3.86 km | 78% |
| Circonvallazione Tiburtina (Prenestina-N.C.I.) | 2 | 3.68 km | 62% |
| Viale Giovanni Falcone e Paolo Borsellino | 4 | 3.55 km | 52% |
| Viale della Primavera | 4 | 3.29 km | 58% |
| Via Casilina (Primavera-Togliatti) | 3 | 3.19 km | 64% |
| Viale del Pattinaggio | 4 | 3.15 km | 52% |
| Via dei Prati Fiscali | 4 | 3.13 km | 50% |
| Viale delle Terme di Caracalla | 7 | 3.02 km | 52% |
| Via Luigi Settembrini | 4 | 3.00 km | 64% |
| Via Flaminia | 4 | 2.91 km | 52% |
| Via Appia Nuova (P.le Appio-GRA) | 9 | 2.91 km | 42% |
| Via di Acquafredda | 4 | 2.78 km | 42% |
| Via della Pineta Sacchetti | 4 | 2.73 km | 67% |
| Viale Beethoven | 5 | 2.62 km | 40% |
| Galleria Giovanni XXIII | 2 | 2.60 km | 67% |
| Viale delle Milizie | 4 | 2.56 km | 49% |
| Via degli Annibaldi | 3 | 2.52 km | 63% |
| Via Salaria (Foro Italico-GRA) | 5 | 2.51 km | 47% |
| Viale di Val Fiorita | 2 | 2.49 km | 65% |
| Viale dell'Oceano Pacifico | 1 | 2.38 km | 76% |
| Viale Carlo Levi | 1 | 2.38 km | 76% |
| Via Paride Stefanini | 1 | 2.38 km | 76% |
| Via Flaminia (GRA-Prima Porta) | 1 | 2.38 km | 42% |
| Via Tiberina (Via della Giustiniana-Via della Torretta Tiberina) | 1 | 2.38 km | 42% |
| Via della Villa di Livia (Via Frassineto-Via Flamina) | 1 | 2.38 km | 42% |
| Via Bellagio | 1 | 2.38 km | 42% |
| Via di Settebagni | 2 | 2.29 km | 52% |
| Via Laurentina (Colombo-Ostiense) | 1 | 2.22 km | 45% |
| Via Laurentina (Tintoretto-Colombo) | 1 | 2.22 km | 45% |
| Via Magna Grecia | 8 | 2.19 km | 50% |
| Via di Porta San Sebastiano | 2 | 2.19 km | 68% |
| Via Druso | 2 | 2.19 km | 68% |
| Via Prenestina (Porta Maggiore-GRA) | 6 | 2.15 km | 54% |
| Viale Umberto Tupini | 2 | 2.14 km | 62% |
| Circonvallazione Ostiense | 4 | 2.02 km | 45% |
| Viale Egeo | 1 | 1.99 km | 56% |
| Piazzale Ferruccio Parri | 1 | 1.99 km | 56% |
| Corso Neostiense | 2 | 1.96 km | 61% |
| Via del Foro Italico | 6 | 1.95 km | 62% |
| Circonvallazione Salaria | 6 | 1.93 km | 44% |
| Via della Maglianella | 2 | 1.90 km | 51% |
| Viale Regina Elena | 4 | 1.88 km | 57% |
| Via Giuseppe Ferrari | 3 | 1.85 km | 63% |
| Via Cesare De Lollis | 3 | 1.82 km | 64% |
| Via Gregorio VII | 3 | 1.82 km | 55% |
| Viale Giuseppe Mazzini (Piazza Mazzini-Lungotevere) | 5 | 1.80 km | 54% |
| Via di San Claudio | 2 | 1.79 km | 59% |
| Lungotevere delle Armi | 5 | 1.79 km | 52% |
| Via Labicana | 1 | 1.78 km | 75% |
| Via Nicola Salvi | 1 | 1.78 km | 75% |
| Piazza del Colosseo | 1 | 1.78 km | 75% |
| Viale di Tor Marancia | 1 | 1.77 km | 74% |
| Via Giovanni Genocchi | 1 | 1.77 km | 74% |
| Via delle Sette Chiese (Colombo-Ardeatina) | 1 | 1.77 km | 74% |
| Lungotevere in Augusta | 4 | 1.77 km | 61% |
| Via Solferino | 3 | 1.74 km | 42% |
| Via San Martino della Battaglia | 3 | 1.74 km | 42% |
| Via Anagnina (Fino a confine comunale) | 2 | 1.73 km | 69% |
| Via della Giuliana | 2 | 1.73 km | 47% |
| Via di Centocelle | 1 | 1.72 km | 79% |
| Via dei Gordiani | 1 | 1.72 km | 79% |
| Vicolo delle Sette Chiese | 1 | 1.71 km | 46% |
| Vicolo della Basilica | 1 | 1.71 km | 46% |
| Via Appia Pignatelli (Appia Antica-Quarto Miglio) | 1 | 1.71 km | 46% |
| Via Appia Antica (San Sebastiano-Sette Chiese) | 1 | 1.71 km | 46% |
| Via Appia Antica | 1 | 1.71 km | 46% |
| Via di San Sebastiano | 1 | 1.71 km | 46% |
| Via Furio Cicogna | 3 | 1.63 km | 55% |
| Via Aurelia (Salle-p.le Gregorio VII) | 2 | 1.63 km | 70% |
| Lungotevere Michelangelo | 4 | 1.60 km | 58% |
| Viale Carlo Felice | 4 | 1.57 km | 44% |
| Via Emanuele Filiberto (Manzoni-Carlo Felice) | 4 | 1.57 km | 44% |
| Via Luigi Arbib Pascucci | 1 | 1.54 km | 63% |
| Via Tomacelli | 3 | 1.53 km | 40% |
| Via Colli sul Velino | 2 | 1.53 km | 67% |
| Viale Jonio | 2 | 1.53 km | 64% |
| Lungotevere Salvo D'Acquisto | 5 | 1.52 km | 60% |
| Via Aurelia (Aurelia Antica-GRA) | 2 | 1.51 km | 70% |
| Ponte del Risorgimento | 3 | 1.51 km | 50% |
| Lungotevere Guglielmo Oberdan | 3 | 1.51 km | 50% |
| Via Livorno | 1 | 1.51 km | 73% |
| Ponte Giacomo Matteotti | 3 | 1.50 km | 59% |
| Via Franco Corelli | 1 | 1.50 km | 32% |
| Via Casilina (Porta Maggiore-Pigneto) | 2 | 1.47 km | 63% |
| Corso di Francia (Pilsudski-p.te Flaminio) | 4 | 1.44 km | 69% |
| Lungotevere dell'Acqua Acetosa | 4 | 1.44 km | 69% |
| Via dei Campi Sportivi | 2 | 1.44 km | 50% |
| Ponte Cavour | 2 | 1.43 km | 48% |
| Lungotevere Marzio | 2 | 1.43 km | 48% |
| Via Anastasio II | 1 | 1.43 km | 63% |
| Via Leone XIII | 1 | 1.43 km | 63% |
| Via Giovanni Lanza | 2 | 1.41 km | 49% |
| Ponte Flaminio | 3 | 1.38 km | 71% |
| Viale Guglielmo Marconi (Piazzale della Radio-via E. Fermi) | 7 | 1.35 km | 36% |
| Via della Lega Lombarda | 1 | 1.34 km | 47% |
| Viale delle Provincie | 1 | 1.34 km | 47% |
| Via Merulana | 5 | 1.32 km | 54% |
| Viale Tirreno | 2 | 1.32 km | 72% |
| Via Salaria (Liegi-Tangenziale) | 3 | 1.28 km | 44% |
| Circonvallazione Cornelia | 3 | 1.28 km | 38% |
| Lungotevere Maresciallo Diaz (S.Giuliano-p.Milvio) | 4 | 1.27 km | 36% |
| Via Giuseppe Zanardelli | 4 | 1.22 km | 46% |
| Viale di Tor di Quinto (Ponte Milvio-Via del Foro Italico) | 3 | 1.21 km | 40% |
| Via Cassia (Cassia Nuova-ponte Milvio) | 3 | 1.21 km | 40% |
| Lungotevere Tor di Nona | 2 | 1.21 km | 53% |
| Via Domenico Tardini | 2 | 1.20 km | 35% |
| Via Oderisi da Gubbio | 5 | 1.18 km | 38% |
| Via di Casal de' Pazzi | 4 | 1.15 km | 65% |
| Piazza Augusto Imperatore | 3 | 1.12 km | 54% |
| Via L'Aquila | 2 | 1.12 km | 67% |
| Viale Pantelleria | 1 | 1.10 km | 71% |
| Via di Valle Melaina | 1 | 1.10 km | 71% |
| Ponte Umberto I | 2 | 1.09 km | 43% |
| Viale della Serenissima | 2 | 1.07 km | 67% |
| Via Ostiense (P.le Ostiense-Sernesi) | 6 | 1.07 km | 57% |
| Via Stefano Porcari | 3 | 1.07 km | 33% |
| Via Crescenzio | 3 | 1.07 km | 33% |
| Via del Forte Trionfale | 1 | 1.06 km | 70% |
| Via del Tritone (Traforo-Barberini) | 2 | 1.05 km | 66% |
| Via dell'Amba Aradam | 2 | 1.05 km | 39% |
| Via Otello Stefanini | 2 | 1.05 km | 56% |
| Viale Giulio Cesare | 1 | 1.04 km | 20% |
| Via degli Orti della Farnesina | 2 | 1.03 km | 50% |
| Via di Boccea (Piazza Giureconsulti-Piazza Irnerio) | 2 | 1.02 km | 41% |
| VIa dell'Ara Pacis | 2 | 1.01 km | 69% |
| Via Val d'Ala | 1 | 0.99 km | 60% |
| Via Faenza | 2 | 0.99 km | 58% |
| Via Taranto | 2 | 0.99 km | 58% |
| Via La Spezia (Nola-Appio) | 2 | 0.99 km | 58% |
| Via Domenico Fontana | 4 | 0.99 km | 61% |
| Via di Casal Bianco | 1 | 0.98 km | 54% |
| Via di Salone | 1 | 0.98 km | 54% |
| Via Filippo Fiorentini | 1 | 0.95 km | 63% |
| Via Giuseppe Antonio Andriulli | 1 | 0.95 km | 63% |
| Via Alberto Bergamini | 1 | 0.95 km | 63% |
| Corso Vittorio Emanuele II | 5 | 0.95 km | 62% |
| Via Tuscolana (Piazza Asti-Cave) | 2 | 0.94 km | 59% |
| Via Nostra Signora di Lourdes | 1 | 0.94 km | 38% |
| Via Vincenzo Giudice | 1 | 0.93 km | 61% |
| Via Statilia | 3 | 0.93 km | 51% |
| Via di Porta Maggiore | 3 | 0.93 km | 51% |
| Via Pinerolo | 2 | 0.91 km | 41% |
| Via Aosta | 2 | 0.91 km | 41% |
| Viale dei Bastioni di Michelangelo | 2 | 0.91 km | 27% |
| Largo Chigi | 1 | 0.90 km | 59% |
| Via Francesco Crispi | 1 | 0.90 km | 59% |
| Via del Tritone (Chigi-Traforo) | 1 | 0.90 km | 59% |
| Via del Traforo | 1 | 0.90 km | 59% |
| Viale delle Medaglie d'Oro | 3 | 0.89 km | 40% |
| Piazza del Pigneto | 1 | 0.88 km | 78% |
| Via Ugo Guido Mondolfo | 2 | 0.86 km | 56% |
| Lungotevere degli Inventori | 4 | 0.84 km | 40% |
| Via Eleniana | 2 | 0.83 km | 54% |
| Viale Franco Arcali | 1 | 0.79 km | 72% |
| Via La Spezia (Lodi-Nola) | 1 | 0.77 km | 66% |
| Via Nola | 1 | 0.77 km | 66% |
| Via Monza | 1 | 0.77 km | 66% |
| Via Nemorense | 4 | 0.76 km | 41% |
| Via Salvino Sernesi | 2 | 0.75 km | 80% |
| Via Cavour (p.za Cinquecento-Annibaldi) | 2 | 0.75 km | 57% |
| Via Domenico Jachino | 1 | 0.74 km | 67% |
| Via dei Laterani | 1 | 0.71 km | 56% |
| Viale dello Stadio Olimpico | 4 | 0.70 km | 61% |
| Via Cola di Rienzo | 2 | 0.70 km | 36% |
| Viale dello Scalo San Lorenzo | 2 | 0.69 km | 46% |
| Via del Serafico | 2 | 0.68 km | 43% |
| Via di Porta San Lorenzo | 3 | 0.67 km | 70% |
| Viale dei Gladiatori | 2 | 0.66 km | 43% |
| Via Triboniano | 2 | 0.66 km | 40% |
| Viale dei Colli Portuensi (Gianicolense-Newton) | 3 | 0.64 km | 46% |
| Viale Etiopia | 3 | 0.63 km | 54% |
| Viale della Piramide Cestia | 2 | 0.63 km | 61% |
| Via Francesco Grimaldi | 2 | 0.62 km | 35% |
| Via Prisciano | 2 | 0.61 km | 26% |
| Via delle Valli | 3 | 0.61 km | 72% |
| Ponte Vittorio Emanuele II | 2 | 0.58 km | 59% |
| Lungotevere dei Fiorentini | 2 | 0.58 km | 59% |
| Lungotevere degli Altoviti | 2 | 0.58 km | 59% |
| Via dei Cerchi | 2 | 0.56 km | 74% |
| Viale della Civiltà del Lavoro | 1 | 0.55 km | 67% |
| Via Ciro il Grande | 1 | 0.55 km | 67% |
| Viale dell'Agricoltura | 1 | 0.55 km | 67% |
| Via Barberini | 3 | 0.55 km | 72% |
| Via Vittor Pisani | 2 | 0.55 km | 73% |
| Via XX Settembre | 3 | 0.54 km | 74% |
| Viale Somalia | 3 | 0.53 km | 60% |
| Corso del Rinascimento | 3 | 0.53 km | 52% |
| Piazza Venezia | 6 | 0.52 km | 60% |
| Ponte Principe Amedeo Savoia Aosta | 1 | 0.52 km | 78% |
| Lungotevere dei Sangallo | 1 | 0.52 km | 78% |
| Via di San Marco | 5 | 0.51 km | 61% |

## C) Riepilogo

Su 1534.6 km totali di Grande Viabilità (shapefile), **103.1 km (6.7%)** non sono coperti dal Grafo 2026, e **275.3 km (17.9%)** sono coperti solo parzialmente.

Le principali aree di Grande Viabilità non coperte dal Grafo 2026 includono:

- **Via Cristoforo Colombo (Caracalla-Pontina)**: 18.67 km non coperti
- **Via Ardeatina (Appia Antica-GRA)**: 8.49 km non coperti
- **Viale dell'Umanesimo**: 5.23 km non coperti
- **Viale dell'Oceano Atlantico**: 4.64 km non coperti
- **Viale Umberto Tupini**: 4.04 km non coperti
- **Viale Egeo**: 4.01 km non coperti
- **Via Frassineto**: 3.91 km non coperti
- **(~500m) Via della Magliana**: 3.82 km non coperti
- **(~500m) Via Cristoforo Colombo (Caracalla-Pontina)**: 3.61 km non coperti
- **Viale dell'Oceano Pacifico**: 3.47 km non coperti
- **Via Flaminia**: 3.22 km non coperti
- **Via Laurentina (Viale del Tintoretto-GRA)**: 3.18 km non coperti
- **Viale Beethoven**: 2.87 km non coperti
- **Via di Casal de' Pazzi**: 2.57 km non coperti
- **Via delle Tre Fontane**: 2.55 km non coperti

### File generati

- `gv_non_coperte_grafo2026.geojson`: segmenti GV non coperti (<20%)
- `gv_parzialmente_coperte_grafo2026.geojson`: segmenti GV parzialmente coperti (20-80%)
