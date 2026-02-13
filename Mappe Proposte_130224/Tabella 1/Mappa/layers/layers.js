ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:3004").setExtent([2308257.347195, 4632619.194588, 2315552.213631, 4638466.039162]);
var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_Municipi_1 = new ol.format.GeoJSON();
var features_Municipi_1 = format_Municipi_1.readFeatures(json_Municipi_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3004'});
var jsonSource_Municipi_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Municipi_1.addFeatures(features_Municipi_1);
var lyr_Municipi_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Municipi_1, 
                style: style_Municipi_1,
                popuplayertitle: 'Municipi',
                interactive: false,
                title: '<img src="styles/legend/Municipi_1.png" /> Municipi'
            });
var format_PGTU_senza_dati_2 = new ol.format.GeoJSON();
var features_PGTU_senza_dati_2 = format_PGTU_senza_dati_2.readFeatures(json_PGTU_senza_dati_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3004'});
var jsonSource_PGTU_senza_dati_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_PGTU_senza_dati_2.addFeatures(features_PGTU_senza_dati_2);
var lyr_PGTU_senza_dati_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_PGTU_senza_dati_2, 
                style: style_PGTU_senza_dati_2,
                popuplayertitle: 'PGTU_senza_dati',
                interactive: true,
                title: '<img src="styles/legend/PGTU_senza_dati_2.png" /> PGTU_senza_dati'
            });
var format_FlussiTomTomflussi_tomtom_3 = new ol.format.GeoJSON();
var features_FlussiTomTomflussi_tomtom_3 = format_FlussiTomTomflussi_tomtom_3.readFeatures(json_FlussiTomTomflussi_tomtom_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3004'});
var jsonSource_FlussiTomTomflussi_tomtom_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FlussiTomTomflussi_tomtom_3.addFeatures(features_FlussiTomTomflussi_tomtom_3);
var lyr_FlussiTomTomflussi_tomtom_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_FlussiTomTomflussi_tomtom_3, 
                style: style_FlussiTomTomflussi_tomtom_3,
                popuplayertitle: 'Flussi TomTom — flussi_tomtom',
                interactive: true,
    title: 'Flussi TomTom — flussi_tomtom<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_3_0.png" /> 101 - 2200<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_3_1.png" /> 2200 - 4159<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_3_2.png" /> 4159 - 6814<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_3_3.png" /> 6814 - 15638<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_3_4.png" /> 15638 - 57833<br />' });
var format_LineeATAC_4 = new ol.format.GeoJSON();
var features_LineeATAC_4 = format_LineeATAC_4.readFeatures(json_LineeATAC_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3004'});
var jsonSource_LineeATAC_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LineeATAC_4.addFeatures(features_LineeATAC_4);
var lyr_LineeATAC_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LineeATAC_4, 
                style: style_LineeATAC_4,
                popuplayertitle: 'Linee ATAC',
                interactive: false,
                title: '<img src="styles/legend/LineeATAC_4.png" /> Linee ATAC'
            });
var format_PGTUAnnessoD_5 = new ol.format.GeoJSON();
var features_PGTUAnnessoD_5 = format_PGTUAnnessoD_5.readFeatures(json_PGTUAnnessoD_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3004'});
var jsonSource_PGTUAnnessoD_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_PGTUAnnessoD_5.addFeatures(features_PGTUAnnessoD_5);
var lyr_PGTUAnnessoD_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_PGTUAnnessoD_5, 
                style: style_PGTUAnnessoD_5,
                popuplayertitle: 'PGTU - Annesso D',
                interactive: true,
    title: 'PGTU - Annesso D<br />\
    <img src="styles/legend/PGTUAnnessoD_5_0.png" /> Autostrade<br />\
    <img src="styles/legend/PGTUAnnessoD_5_1.png" /> Scorrimento<br />\
    <img src="styles/legend/PGTUAnnessoD_5_2.png" /> Interquartiere<br />\
    <img src="styles/legend/PGTUAnnessoD_5_3.png" /> Quartiere<br />\
    <img src="styles/legend/PGTUAnnessoD_5_4.png" /> Interzonali<br />' });

lyr_OpenStreetMap_0.setVisible(true);lyr_Municipi_1.setVisible(true);lyr_PGTU_senza_dati_2.setVisible(true);lyr_FlussiTomTomflussi_tomtom_3.setVisible(true);lyr_LineeATAC_4.setVisible(true);lyr_PGTUAnnessoD_5.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_Municipi_1,lyr_PGTU_senza_dati_2,lyr_FlussiTomTomflussi_tomtom_3,lyr_LineeATAC_4,lyr_PGTUAnnessoD_5];
lyr_Municipi_1.set('fieldAliases', {'Name': 'Name', 'Attuale': 'Attuale', 'Numero': 'Numero', });
lyr_PGTU_senza_dati_2.set('fieldAliases', {'fid': 'fid', 'OBJECTID': 'OBJECTID', 'Id': 'Id', 'Classifica': 'Classifica', 'Limiti': 'Limiti', 'Cod_prog': 'Cod_prog', 'Toponomast': 'Toponomast', 'Note_2025': 'Note_2025', 'Nome': 'Nome', 'Grande_Via': 'Grande_Via', 'TPL': 'TPL', 'Municipio': 'Municipio', 'Shape_Leng': 'Shape_Leng', 'layer': 'layer', 'path': 'path', });
lyr_FlussiTomTomflussi_tomtom_3.set('fieldAliases', {'fid': 'fid', 'Id': 'Id', 'Nome Strad': 'Nome Strad', 'Flussi Gio': 'Flussi Gio', 'Id Segment': 'Id Segment', 'Id PGTU': 'Id PGTU', 'Toponomast': 'Toponomast', 'Lunghezza_': 'Lunghezza_', 'Lunghezz_1': 'Lunghezz_1', 'pgtu_geom_': 'pgtu_geom_', 'Is_ATAC': 'Is_ATAC', 'Is_GrandeV': 'Is_GrandeV', 'Nome Str_1': 'Nome Str_1', 'CF': 'CF', 'Municipio': 'Municipio', 'Is_Annesso': 'Is_Annesso', 'Toponom': 'Toponom', 'Flusso Med': 'Flusso Med', 'a': 'a', });
lyr_LineeATAC_4.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'SiglaUtent': 'SiglaUtent', 'NomeEsteso': 'NomeEsteso', 'Attivo': 'Attivo', 'ChiaveLine': 'ChiaveLine', 'SiglaL_Ute': 'SiglaL_Ute', 'Carteggio': 'Carteggio', 'ID_MTRAM': 'ID_MTRAM', 'ID_SIT': 'ID_SIT', 'Lunghezza': 'Lunghezza', 'NodiSupp': 'NodiSupp', 'Az_Linea': 'Az_Linea', 'AVM_Percor': 'AVM_Percor', 'Cimiteri_P': 'Cimiteri_P', 'Circolari_': 'Circolari_', 'Collegamen': 'Collegamen', 'Disabili_P': 'Disabili_P', 'Elettriche': 'Elettriche', 'Esatte_Per': 'Esatte_Per', 'Estive_Per': 'Estive_Per', 'Express_Pe': 'Express_Pe', 'Ferrovie_c': 'Ferrovie_c', 'Ferrovie_r': 'Ferrovie_r', 'Filobus_Pe': 'Filobus_Pe', 'Immissioni': 'Immissioni', 'Metropolit': 'Metropolit', 'Notturne_P': 'Notturne_P', 'Rete_festi': 'Rete_festi', 'Sostitutiv': 'Sostitutiv', 'Temporanei': 'Temporanei', 'Tramviarie': 'Tramviarie', 'Urbana_Per': 'Urbana_Per', 'Urbana_fes': 'Urbana_fes', 'Shape_Leng': 'Shape_Leng', });
lyr_PGTUAnnessoD_5.set('fieldAliases', {'fid': 'fid', 'OBJECTID': 'OBJECTID', 'Id': 'Id', 'Classifica': 'Classifica', 'Limiti': 'Limiti', 'Cod_prog': 'Cod_prog', 'Toponomast': 'Toponomast', 'Note_2025': 'Note_2025', 'Nome': 'Nome', 'Grande_Via': 'Grande_Via', 'TPL': 'TPL', 'Municipio': 'Municipio', 'Shape_Leng': 'Shape_Leng', 'layer': 'layer', 'path': 'path', });
lyr_Municipi_1.set('fieldImages', {'Name': 'TextEdit', 'Attuale': 'TextEdit', 'Numero': 'TextEdit', });
lyr_PGTU_senza_dati_2.set('fieldImages', {'fid': '', 'OBJECTID': 'TextEdit', 'Id': 'TextEdit', 'Classifica': 'TextEdit', 'Limiti': 'TextEdit', 'Cod_prog': 'Range', 'Toponomast': 'TextEdit', 'Note_2025': 'TextEdit', 'Nome': 'TextEdit', 'Grande_Via': 'TextEdit', 'TPL': 'TextEdit', 'Municipio': 'TextEdit', 'Shape_Leng': 'TextEdit', 'layer': 'TextEdit', 'path': 'TextEdit', });
lyr_FlussiTomTomflussi_tomtom_3.set('fieldImages', {'fid': 'TextEdit', 'Id': 'Range', 'Nome Strad': 'TextEdit', 'Flussi Gio': 'TextEdit', 'Id Segment': 'TextEdit', 'Id PGTU': 'Range', 'Toponomast': 'TextEdit', 'Lunghezza_': 'TextEdit', 'Lunghezz_1': 'TextEdit', 'pgtu_geom_': 'TextEdit', 'Is_ATAC': 'CheckBox', 'Is_GrandeV': 'CheckBox', 'Nome Str_1': 'TextEdit', 'CF': 'TextEdit', 'Municipio': 'Range', 'Is_Annesso': 'CheckBox', 'Toponom': 'TextEdit', 'Flusso Med': 'TextEdit', 'a': 'Range', });
lyr_LineeATAC_4.set('fieldImages', {'OBJECTID': 'Range', 'SiglaUtent': 'TextEdit', 'NomeEsteso': 'TextEdit', 'Attivo': 'TextEdit', 'ChiaveLine': 'TextEdit', 'SiglaL_Ute': 'TextEdit', 'Carteggio': 'TextEdit', 'ID_MTRAM': 'TextEdit', 'ID_SIT': 'TextEdit', 'Lunghezza': 'TextEdit', 'NodiSupp': 'TextEdit', 'Az_Linea': 'TextEdit', 'AVM_Percor': 'TextEdit', 'Cimiteri_P': 'TextEdit', 'Circolari_': 'TextEdit', 'Collegamen': 'TextEdit', 'Disabili_P': 'TextEdit', 'Elettriche': 'TextEdit', 'Esatte_Per': 'TextEdit', 'Estive_Per': 'TextEdit', 'Express_Pe': 'TextEdit', 'Ferrovie_c': 'TextEdit', 'Ferrovie_r': 'TextEdit', 'Filobus_Pe': 'TextEdit', 'Immissioni': 'TextEdit', 'Metropolit': 'TextEdit', 'Notturne_P': 'TextEdit', 'Rete_festi': 'TextEdit', 'Sostitutiv': 'TextEdit', 'Temporanei': 'TextEdit', 'Tramviarie': 'TextEdit', 'Urbana_Per': 'TextEdit', 'Urbana_fes': 'TextEdit', 'Shape_Leng': 'TextEdit', });
lyr_PGTUAnnessoD_5.set('fieldImages', {'fid': '', 'OBJECTID': 'TextEdit', 'Id': 'TextEdit', 'Classifica': 'TextEdit', 'Limiti': 'TextEdit', 'Cod_prog': 'Range', 'Toponomast': '', 'Note_2025': 'TextEdit', 'Nome': 'TextEdit', 'Grande_Via': '', 'TPL': 'TextEdit', 'Municipio': 'TextEdit', 'Shape_Leng': '', 'layer': '', 'path': '', });
lyr_Municipi_1.set('fieldLabels', {'Name': 'no label', 'Attuale': 'no label', 'Numero': 'no label', });
lyr_PGTU_senza_dati_2.set('fieldLabels', {'fid': 'no label', 'OBJECTID': 'hidden field', 'Id': 'hidden field', 'Classifica': 'inline label - visible with data', 'Limiti': 'inline label - visible with data', 'Cod_prog': 'inline label - visible with data', 'Toponomast': 'inline label - visible with data', 'Note_2025': 'hidden field', 'Nome': 'hidden field', 'Grande_Via': 'hidden field', 'TPL': 'hidden field', 'Municipio': 'inline label - visible with data', 'Shape_Leng': 'hidden field', 'layer': 'hidden field', 'path': 'hidden field', });
lyr_FlussiTomTomflussi_tomtom_3.set('fieldLabels', {'fid': 'hidden field', 'Id': 'hidden field', 'Nome Strad': 'inline label - visible with data', 'Flussi Gio': 'inline label - visible with data', 'Id Segment': 'hidden field', 'Id PGTU': 'hidden field', 'Toponomast': 'hidden field', 'Lunghezza_': 'hidden field', 'Lunghezz_1': 'hidden field', 'pgtu_geom_': 'hidden field', 'Is_ATAC': 'hidden field', 'Is_GrandeV': 'hidden field', 'Nome Str_1': 'hidden field', 'CF': 'hidden field', 'Municipio': 'hidden field', 'Is_Annesso': 'hidden field', 'Toponom': 'inline label - visible with data', 'Flusso Med': 'inline label - visible with data', 'a': 'hidden field', });
lyr_LineeATAC_4.set('fieldLabels', {'OBJECTID': 'hidden field', 'SiglaUtent': 'hidden field', 'NomeEsteso': 'hidden field', 'Attivo': 'hidden field', 'ChiaveLine': 'hidden field', 'SiglaL_Ute': 'hidden field', 'Carteggio': 'hidden field', 'ID_MTRAM': 'hidden field', 'ID_SIT': 'hidden field', 'Lunghezza': 'hidden field', 'NodiSupp': 'hidden field', 'Az_Linea': 'hidden field', 'AVM_Percor': 'hidden field', 'Cimiteri_P': 'hidden field', 'Circolari_': 'hidden field', 'Collegamen': 'hidden field', 'Disabili_P': 'hidden field', 'Elettriche': 'hidden field', 'Esatte_Per': 'hidden field', 'Estive_Per': 'hidden field', 'Express_Pe': 'hidden field', 'Ferrovie_c': 'hidden field', 'Ferrovie_r': 'hidden field', 'Filobus_Pe': 'hidden field', 'Immissioni': 'hidden field', 'Metropolit': 'hidden field', 'Notturne_P': 'hidden field', 'Rete_festi': 'hidden field', 'Sostitutiv': 'hidden field', 'Temporanei': 'hidden field', 'Tramviarie': 'no label', 'Urbana_Per': 'no label', 'Urbana_fes': 'no label', 'Shape_Leng': 'no label', });
lyr_PGTUAnnessoD_5.set('fieldLabels', {'fid': 'no label', 'OBJECTID': 'hidden field', 'Id': 'hidden field', 'Classifica': 'inline label - visible with data', 'Limiti': 'inline label - visible with data', 'Cod_prog': 'inline label - visible with data', 'Toponomast': 'inline label - visible with data', 'Note_2025': 'hidden field', 'Nome': 'hidden field', 'Grande_Via': 'hidden field', 'TPL': 'hidden field', 'Municipio': 'inline label - visible with data', 'Shape_Leng': 'hidden field', 'layer': 'hidden field', 'path': 'hidden field', });
lyr_PGTUAnnessoD_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});