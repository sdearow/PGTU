ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:3004").setExtent([2297528.650158, 4629406.630242, 2329047.796117, 4654669.265159]);
var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'CartoDB Dark',
            'opacity': 1.000000,


            source: new ol.source.XYZ({
            attributions: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
                url: 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
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
var format_FlussiTomTomflussi_tomtom_2 = new ol.format.GeoJSON();
var features_FlussiTomTomflussi_tomtom_2 = format_FlussiTomTomflussi_tomtom_2.readFeatures(json_FlussiTomTomflussi_tomtom_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3004'});
var jsonSource_FlussiTomTomflussi_tomtom_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FlussiTomTomflussi_tomtom_2.addFeatures(features_FlussiTomTomflussi_tomtom_2);
var lyr_FlussiTomTomflussi_tomtom_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_FlussiTomTomflussi_tomtom_2, 
                style: style_FlussiTomTomflussi_tomtom_2,
                popuplayertitle: 'Flussi TomTom — flussi_tomtom',
                interactive: true,
    title: 'Flussi TomTom — flussi_tomtom<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_2_0.png" /> 5002 - 5822<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_2_1.png" /> 5822 - 6837<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_2_2.png" /> 6837 - 7784<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_2_3.png" /> 7784 - 8970<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_2_4.png" /> 8970 - 10982<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_2_5.png" /> 10982 - 14485<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_2_6.png" /> 14485 - 22268<br />\
    <img src="styles/legend/FlussiTomTomflussi_tomtom_2_7.png" /> 22268 - 77503<br />' });
var format_ATAC_3 = new ol.format.GeoJSON();
var features_ATAC_3 = format_ATAC_3.readFeatures(json_ATAC_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3004'});
var jsonSource_ATAC_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ATAC_3.addFeatures(features_ATAC_3);
var lyr_ATAC_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_ATAC_3, 
                style: style_ATAC_3,
                popuplayertitle: 'ATAC',
                interactive: false,
                title: '<img src="styles/legend/ATAC_3.png" /> ATAC'
            });
var format_PGTUAnnessoD_4 = new ol.format.GeoJSON();
var features_PGTUAnnessoD_4 = format_PGTUAnnessoD_4.readFeatures(json_PGTUAnnessoD_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3004'});
var jsonSource_PGTUAnnessoD_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_PGTUAnnessoD_4.addFeatures(features_PGTUAnnessoD_4);
var lyr_PGTUAnnessoD_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_PGTUAnnessoD_4, 
                style: style_PGTUAnnessoD_4,
                popuplayertitle: 'PGTU - Annesso D',
                interactive: true,
    title: 'PGTU - Annesso D<br />\
    <img src="styles/legend/PGTUAnnessoD_4_0.png" /> Autostrade<br />\
    <img src="styles/legend/PGTUAnnessoD_4_1.png" /> Scorrimento<br />\
    <img src="styles/legend/PGTUAnnessoD_4_2.png" /> Interquartiere<br />\
    <img src="styles/legend/PGTUAnnessoD_4_3.png" /> Quartiere<br />\
    <img src="styles/legend/PGTUAnnessoD_4_4.png" /> Interzonali<br />' });

lyr_OpenStreetMap_0.setVisible(true);lyr_Municipi_1.setVisible(true);lyr_FlussiTomTomflussi_tomtom_2.setVisible(true);lyr_ATAC_3.setVisible(true);lyr_PGTUAnnessoD_4.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_Municipi_1,lyr_FlussiTomTomflussi_tomtom_2,lyr_ATAC_3,lyr_PGTUAnnessoD_4];
lyr_Municipi_1.set('fieldAliases', {'fid': 'fid', 'Name': 'Name', 'Attuale': 'Attuale', 'Numero': 'Numero', });
lyr_FlussiTomTomflussi_tomtom_2.set('fieldAliases', {'fid': 'fid', 'Id': 'Id', 'Nome Strada': 'Nome Strada', 'Flussi Giornalieri': 'Flussi Giornalieri', 'Toponomastica': 'Toponomastica', 'Lunghezza_TT_m': 'Lunghezza_TT_m', 'Lunghezza_PGTU_m': 'Lunghezza_PGTU_m', 'pgtu_geom_wkt': 'pgtu_geom_wkt', 'Is_ATAC': 'Is_ATAC', 'Is_GrandeViabilita': 'Is_GrandeViabilita', 'Nome Strada DB': 'Nome Strada DB', 'CF': 'CF', 'Municipio': 'Municipio', 'Is_AnnessoD': 'Is_AnnessoD', 'Toponom': 'Toponom', 'Flusso Medio': 'Flusso Medio', });
lyr_ATAC_3.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'SiglaUtent': 'SiglaUtent', 'NomeEsteso': 'NomeEsteso', 'Attivo': 'Attivo', 'ChiaveLine': 'ChiaveLine', 'SiglaL_Ute': 'SiglaL_Ute', 'Carteggio': 'Carteggio', 'ID_MTRAM': 'ID_MTRAM', 'ID_SIT': 'ID_SIT', 'Lunghezza': 'Lunghezza', 'NodiSupp': 'NodiSupp', 'Az_Linea': 'Az_Linea', 'AVM_Percor': 'AVM_Percor', 'Cimiteri_P': 'Cimiteri_P', 'Circolari_': 'Circolari_', 'Collegamen': 'Collegamen', 'Disabili_P': 'Disabili_P', 'Elettriche': 'Elettriche', 'Esatte_Per': 'Esatte_Per', 'Estive_Per': 'Estive_Per', 'Express_Pe': 'Express_Pe', 'Ferrovie_c': 'Ferrovie_c', 'Ferrovie_r': 'Ferrovie_r', 'Filobus_Pe': 'Filobus_Pe', 'Immissioni': 'Immissioni', 'Metropolit': 'Metropolit', 'Notturne_P': 'Notturne_P', 'Rete_festi': 'Rete_festi', 'Sostitutiv': 'Sostitutiv', 'Temporanei': 'Temporanei', 'Tramviarie': 'Tramviarie', 'Urbana_Per': 'Urbana_Per', 'Urbana_fes': 'Urbana_fes', 'Shape_Leng': 'Shape_Leng', });
lyr_PGTUAnnessoD_4.set('fieldAliases', {'fid': 'fid', 'OBJECTID': 'OBJECTID', 'Id': 'Id', 'Classifica': 'Classifica', 'Limiti': 'Limiti', 'Cod_prog': 'Cod_prog', 'Toponomast': 'Toponomast', 'Note_2025': 'Note_2025', 'Nome': 'Nome', 'Grande_Via': 'Grande_Via', 'TPL': 'TPL', 'Municipio': 'Municipio', 'Shape_Leng': 'Shape_Leng', 'layer': 'layer', 'path': 'path', });
lyr_Municipi_1.set('fieldImages', {'fid': '', 'Name': 'TextEdit', 'Attuale': 'TextEdit', 'Numero': 'TextEdit', });
lyr_FlussiTomTomflussi_tomtom_2.set('fieldImages', {'fid': 'TextEdit', 'Id': 'Range', 'Nome Strada': 'TextEdit', 'Flussi Giornalieri': 'TextEdit', 'Toponomastica': 'TextEdit', 'Lunghezza_TT_m': 'TextEdit', 'Lunghezza_PGTU_m': 'TextEdit', 'pgtu_geom_wkt': 'TextEdit', 'Is_ATAC': 'CheckBox', 'Is_GrandeViabilita': 'CheckBox', 'Nome Strada DB': 'TextEdit', 'CF': 'TextEdit', 'Municipio': 'Range', 'Is_AnnessoD': 'CheckBox', 'Toponom': 'TextEdit', 'Flusso Medio': 'TextEdit', });
lyr_ATAC_3.set('fieldImages', {'OBJECTID': 'Range', 'SiglaUtent': 'TextEdit', 'NomeEsteso': 'TextEdit', 'Attivo': 'TextEdit', 'ChiaveLine': 'TextEdit', 'SiglaL_Ute': 'TextEdit', 'Carteggio': 'TextEdit', 'ID_MTRAM': 'TextEdit', 'ID_SIT': 'TextEdit', 'Lunghezza': 'TextEdit', 'NodiSupp': 'TextEdit', 'Az_Linea': 'TextEdit', 'AVM_Percor': 'TextEdit', 'Cimiteri_P': 'TextEdit', 'Circolari_': 'TextEdit', 'Collegamen': 'TextEdit', 'Disabili_P': 'TextEdit', 'Elettriche': 'TextEdit', 'Esatte_Per': 'TextEdit', 'Estive_Per': 'TextEdit', 'Express_Pe': 'TextEdit', 'Ferrovie_c': 'TextEdit', 'Ferrovie_r': 'TextEdit', 'Filobus_Pe': 'TextEdit', 'Immissioni': 'TextEdit', 'Metropolit': 'TextEdit', 'Notturne_P': 'TextEdit', 'Rete_festi': 'TextEdit', 'Sostitutiv': 'TextEdit', 'Temporanei': 'TextEdit', 'Tramviarie': 'TextEdit', 'Urbana_Per': 'TextEdit', 'Urbana_fes': 'TextEdit', 'Shape_Leng': 'TextEdit', });
lyr_PGTUAnnessoD_4.set('fieldImages', {'fid': '', 'OBJECTID': 'TextEdit', 'Id': 'TextEdit', 'Classifica': 'TextEdit', 'Limiti': 'TextEdit', 'Cod_prog': 'Range', 'Toponomast': '', 'Note_2025': 'TextEdit', 'Nome': 'TextEdit', 'Grande_Via': '', 'TPL': 'TextEdit', 'Municipio': 'TextEdit', 'Shape_Leng': '', 'layer': '', 'path': '', });
lyr_Municipi_1.set('fieldLabels', {'fid': 'no label', 'Name': 'no label', 'Attuale': 'no label', 'Numero': 'no label', });
lyr_FlussiTomTomflussi_tomtom_2.set('fieldLabels', {'fid': 'hidden field', 'Id': 'hidden field', 'Nome Strada': 'inline label - visible with data', 'Flussi Giornalieri': 'inline label - visible with data', 'Toponomastica': 'hidden field', 'Lunghezza_TT_m': 'hidden field', 'Lunghezza_PGTU_m': 'hidden field', 'pgtu_geom_wkt': 'hidden field', 'Is_ATAC': 'hidden field', 'Is_GrandeViabilita': 'hidden field', 'Nome Strada DB': 'hidden field', 'CF': 'hidden field', 'Municipio': 'inline label - visible with data', 'Is_AnnessoD': 'hidden field', 'Toponom': 'hidden field', 'Flusso Medio': 'inline label - visible with data', });
lyr_ATAC_3.set('fieldLabels', {'OBJECTID': 'hidden field', 'SiglaUtent': 'hidden field', 'NomeEsteso': 'hidden field', 'Attivo': 'hidden field', 'ChiaveLine': 'hidden field', 'SiglaL_Ute': 'hidden field', 'Carteggio': 'hidden field', 'ID_MTRAM': 'hidden field', 'ID_SIT': 'hidden field', 'Lunghezza': 'hidden field', 'NodiSupp': 'hidden field', 'Az_Linea': 'hidden field', 'AVM_Percor': 'hidden field', 'Cimiteri_P': 'hidden field', 'Circolari_': 'hidden field', 'Collegamen': 'hidden field', 'Disabili_P': 'hidden field', 'Elettriche': 'hidden field', 'Esatte_Per': 'hidden field', 'Estive_Per': 'hidden field', 'Express_Pe': 'hidden field', 'Ferrovie_c': 'hidden field', 'Ferrovie_r': 'hidden field', 'Filobus_Pe': 'hidden field', 'Immissioni': 'hidden field', 'Metropolit': 'hidden field', 'Notturne_P': 'hidden field', 'Rete_festi': 'hidden field', 'Sostitutiv': 'hidden field', 'Temporanei': 'hidden field', 'Tramviarie': 'no label', 'Urbana_Per': 'no label', 'Urbana_fes': 'no label', 'Shape_Leng': 'no label', });
lyr_PGTUAnnessoD_4.set('fieldLabels', {'fid': 'hidden field', 'OBJECTID': 'hidden field', 'Id': 'hidden field', 'Classifica': 'inline label - visible with data', 'Limiti': 'inline label - visible with data', 'Cod_prog': 'inline label - visible with data', 'Toponomast': 'inline label - visible with data', 'Note_2025': 'hidden field', 'Nome': 'hidden field', 'Grande_Via': 'hidden field', 'TPL': 'hidden field', 'Municipio': 'inline label - visible with data', 'Shape_Leng': 'hidden field', 'layer': 'hidden field', 'path': 'hidden field', });
lyr_PGTUAnnessoD_4.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});