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
        layerId: 'norway_bg',
        minZoomThreshold: 8,
        serviceUrl: mapservices.topo_wmts,
        layer: 'topo',
        style: 'default',
    };

    GIFTWIN.ogcLayers.addOgcLayer(options);
});
