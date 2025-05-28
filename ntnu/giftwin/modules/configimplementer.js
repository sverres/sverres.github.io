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
 * Module configimplementer
 * =========================
 * 
 * Generate menu and user interaction functions
 * from layers
 * 
 * sverre.stikbakke@ntnu.no 31.03.2020
 */


import {
    addMenuItem,
    addMenuItemEventListener
}
    from "./menuconfigurators.js";

import {
    addMapStyleItem,
    addStyleSwapEventListener,
}
    from "./mapstyleconfigurators.js";

import {
    addScriptItem
}
    from "./layerscriptconfigurator.js";

import {
    addInfoSection
}
    from "./infolayerconfigurator.js";

import {
    addFeatureInfoLayer
}
    from "./featureinfolayerconfigurator.js";


const applyConfig = layers => {

    for (const layer of layers.values()) {

        switch (layer.layerType) {

            case "style":
                addMapStyleItem(layer);
                addStyleSwapEventListener(layer);
                break;

            case "maplayer":
                addMenuItem(layer);
                addMenuItemEventListener(layer);
                addScriptItem(layer);
                addFeatureInfoLayer(layer);
                break;

            case "plotlayer":
            case "scriptlayer":
            case "tablelayer":
                addInfoSection(layer);
                addScriptItem(layer);
                addMenuItem(layer);
                addMenuItemEventListener(layer);
                break;

            case "mapwindow":
            case "section":
            case "marker":
                addMenuItem(layer);
                addMenuItemEventListener(layer);
                break;

            default:

        };
    };
};


export { applyConfig };
