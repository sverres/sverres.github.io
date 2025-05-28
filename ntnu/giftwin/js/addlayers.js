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
 * addlayers.js
 * =============
 * 
 * Creates and fires loadLayersTrigger event
 * 
 * Defers map.addlayer calls
 * in maplayer files until
 * 
 * - mapbox base map is loaded (map.loaded)
 * - all maplayer files are added to DOM (numberOfLayers)
 * - loadLayersTrigger event is fired
 * 
 * sverre.stikbakke@ntnu.no 03.12.2020
 */


"use strict";


GIFTWIN.fireAddLayerEvent = (() => {

    const mapWindow = GIFTWIN.mapWindow;
    const mapLoadTimeouts = GIFTWIN.mapLoadTimeouts;
    const numberOfLayers = GIFTWIN.site.numberOfLayers;
    const loadLayersTrigger = new Event('addlayer');
    let loadLayersTriggerFired = false;

    const safelyLoadLayers = () => {
        if (map.loaded()
            && GIFTWIN.layerCount >= numberOfLayers
            && !loadLayersTriggerFired) {
            return true;
        } else {
            return false;
        };
    };

    for (const timeOut of mapLoadTimeouts) {
        setTimeout(() => {
            if (safelyLoadLayers()) {
                console.log('loadEventTimeout: ', timeOut, 'ms');
                console.log('GIFTWIN.site.numberOfLayers: ' + numberOfLayers);
                console.log('map layer files loaded: ' + GIFTWIN.layerCount);
                loadLayersTriggerFired = true;
                console.log('dispatchEvent, loadLayersTrigger:' + mapWindow.dispatchEvent(loadLayersTrigger));
                console.log('map layers available in map.style:');
                console.log(map.style._order.slice(-map.style._numSymbolLayers + 1));
            }
        }, timeOut);
    };
})();
