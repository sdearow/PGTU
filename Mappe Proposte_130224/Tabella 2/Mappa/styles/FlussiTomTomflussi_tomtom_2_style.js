var size = 0;
var placement = 'point';

var style_FlussiTomTomflussi_tomtom_2 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("Flussi Giornalieri");
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
    if (value >= 5001.576923 && value <= 5822.293269) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(255,90,90,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 4.787999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 5822.293269 && value <= 6836.653846) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(239,78,77,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 4.787999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 6836.653846 && value <= 7783.802885) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(222,65,64,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 4.787999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 7783.802885 && value <= 8970.230769) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(206,52,52,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 4.787999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 8970.230769 && value <= 10982.278846) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(189,40,39,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 4.787999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 10982.278846 && value <= 14484.778842) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(173,27,26,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 4.787999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 14484.778842 && value <= 22268.394233) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(156,15,13,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 4.787999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 22268.394233 && value <= 77502.687500) {
            style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(140,2,0,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 4.787999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    };

    return style;
};
