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
 * Module configreader
 * ====================
 * 
 * Reads configuration file into [key, value] collection
 * with layerId as key and calls 
 * 
 * - applyConfig and
 * - verifyConfig
 * 
 * sverre.stikbakke@ntnu.no 31.03.2020
 */


import { applyConfig } from "./configimplementer.js";
import { verifyConfig } from "./configverifier.js";


let layers = new Map(); // javascript [key, value] collection


const copyLayers = async layers => {
    GIFTWIN.layers = new Map(JSON.parse(
        JSON.stringify(Array.from(layers))
    ));
};


const getLayers = async layers => {

    const layersConfigUrl = GIFTWIN.site.layersConfigUrl;
    const layersConfigResponse = await fetch(layersConfigUrl);

    if (layersConfigResponse.ok) {

        const allLayers = await layersConfigResponse.json();
        for (const [layerId, layer] of Object.entries(allLayers)) {
            layers.set(layerId, layer);
        };

        const errMsg = ` Module configreader: layers has ${layers.size} ` +
            `entries, i.e. configuration file is empty`;
        console.assert(layers.size > 0, errMsg);

        copyLayers(layers);
        applyConfig(layers);
        //verifyConfig(layers);

    } else {

        const errMsg = ` Module configreader: ` +
            `${layersConfigUrl} is not found`;
        throw new Error(errMsg);
    };
};


export { layers, getLayers };
