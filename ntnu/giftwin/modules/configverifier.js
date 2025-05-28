/**
 * GIFT - Geographical Islands FlexibiliTy
 * 
 * This project has received funding from 
 * the European Union's Horizon 2020 
 * research and innovation program under 
 * grant agreement No 824410.
 * 
 * Part of deliverable D3.10 GIS digital twin
 * 
 * NTNU - Norway
 * 
 * Module configverifier
 * ======================
 * 
 * Report missing properties in configuration file
 * 
 * sverre.stikbakke@ntnu.no 04.05.2020
 */


const styleProperties = new Set([
    "layerId",
    "menuText",
    "targetMenu",
    "layerType",
    "visible"
]);

const mapLayerProperties = new Set([
    "layerId",
    "layerUrl",
    "layerType",
    "menuText",
    "targetMenu",
]);

const mapWindowProperties = new Set([
    "layerId",
    "menuText",
    "targetMenu",
    "layerType",
    "sectionsToShowHide",
    "visible",
]);

const markerProperties = new Set([
    "layerId",
    "menuText",
    "targetMenu",
    "layerType",
    "visible",
]);

const plotLayerProperties = new Set([
    "layerId",
    "menuText",
    "targetMenu",
    "layerType",
    "targetSectionId",
    "sectionId",
    "sectionCssClass",
    "layerUrl",
    "plotFunction",
    "visible",
]);

const tableLayerProperties = new Set([
    "layerId",
    "menuText",
    "targetMenu",
    "layerType",
    "targetSectionId",
    "sectionId",
    "sectionCssClass",
    "cssClass",
    "tableFunction",
    "visible",
]);

const scriptLayerProperties = new Set([
    "layerId",
    "layerUrl",
    "menuText",
    "targetMenu",
    "layerType",
    "targetSectionId",
    "sectionId",
    "sectionCssClass",
    "visible",
]);

const sectionProperties = new Set([
    "layerId",
    "menuText",
    "targetMenu",
    "sectionId",
    "layerType",
    "visible",
]);


const difference = (setA, setB) => {

    let _difference = new Set(setA);
    for (let elem of setB) {
        _difference.delete(elem)
    };
    return _difference;
};


const verifyProperties = (verifySet, layer) => {

    const layerProperties = new Set(Object.keys(layer));
    const missingProperties = difference(verifySet, layerProperties);

    const missingPropertiesFormatted = JSON.stringify(
        new Array(...missingProperties));

    const errMsg = ` Missing properties in layer configuration: ` +
        `${missingPropertiesFormatted}, ${layer.layerId}`;

    console.assert(missingProperties.size == 0, errMsg);
}


const verifyConfig = layers => {

    for (const layer of layers.values()) {

        switch (layer.layerType) {

            case "style":
                verifyProperties(styleProperties, layer);
                break;

            case "mapwindow":
                verifyProperties(mapWindowProperties, layer);
                break;

            case "marker":
                verifyProperties(markerProperties, layer);
                break;

            case "maplayer":
                verifyProperties(mapLayerProperties, layer);
                break;

            case "plotlayer":
                verifyProperties(plotLayerProperties, layer);
                break;

            case "tablelayer":
                verifyProperties(tableLayerProperties, layer);
                break;

            case "scriptlayer":
                verifyProperties(scriptLayerProperties, layer);
                break;

            case "section":
                verifyProperties(sectionProperties, layer);
                break;

            default:
                console.log(layer.layerId, "no layerType match in verifyer", layer.layerType);
        };
    };
};


export { verifyConfig };
