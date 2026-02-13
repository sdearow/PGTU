var size = 0;
var placement = 'point';

var style_FlussiTomTomflussi_tomtom_3 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("Flussi Gio");
    var labelFont = "10px, sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'line';
    if ("" !== null) {
        labelText = String("");
    }
    if (value >= 100.846154 && value <= 2199.576923) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,138,10,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 7.827999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 2199.576923 && value <= 4158.692308) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(64,167,72,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 7.827999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 4158.692308 && value <= 6814.269231) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(128,197,133,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 7.827999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 6814.269231 && value <= 15638.307690) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(191,226,194,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 7.827999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 15638.307690 && value <= 57832.730770) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 7.827999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    };

    return style;
};
