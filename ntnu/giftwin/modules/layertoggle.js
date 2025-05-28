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
 * Module layertoggle
 * ===================
 * 
 * Function for turning on and off layers
 * 
 * sverre.stikbakke@ntnu.no 31.03.2020
 */


import { toggleMapWindow } from "./togglemapwindows.js";
import { toggleMarkers } from "./togglemarkers.js";
import { toggleMapLayer } from "./togglemaplayers.js";
import { toggleFuncGeneratedLayer } from "./togglefuncgeneratedlayers.js";
import { toggleSection } from "./togglesections.js";


const toggleLayer = layer => {

    const layerTypes = [
        "maplayer",
        "mapwindow",
        "markers",
        "plotlayer",
        "tablelayer",
        "section",
    ];

    switch (layer.layerType) {

        case "maplayer":
            toggleMapLayer(layer);
            break;

        case "mapwindow":
            toggleMapWindow(layer);
            break;

        case "marker":
            toggleMarkers(layer);
            break;

        case "plotlayer":
        case "tablelayer":
        case "scriptlayer":
            toggleFuncGeneratedLayer(layer);
            break;

        case "section":
            toggleSection(layer);
            break;

        default:

            const acceptedLayerType = false;
        
            const errMsg = ` Module layertoggle, layer: ${layer.layerId}, ` +
                `layerType: ${layer.layerType}, not found in ${layerTypes}`;
                
            console.assert(acceptedLayerType, errMsg);
    };
};


export { toggleLayer };
