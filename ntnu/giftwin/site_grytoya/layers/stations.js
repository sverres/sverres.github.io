/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 08.12.2020
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', () => {

    const options = {
        ogcLayerType: 'WMS',
        layerId: 'stations',
        minZoomThreshold: 8,
        serviceUrl: mapservices.nve_wms,
        layers: 'Transformatorstasjoner',
        styles: 'default',
    };

    GIFTWIN.ogcLayers.addOgcLayer(options);
});
