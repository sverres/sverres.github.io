/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 08.12.2020
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', () => {

    const options = {
        ogcLayerType: 'WMTS',
        layerId: 'papermap_bg',
        minZoomThreshold: 5,
        serviceUrl: mapservices.toporaster_wmts,
        layer: 'toporaster',
        style: 'default',
    };

    GIFTWIN.ogcLayers.addOgcLayer(options);
});
