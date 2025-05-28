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
        layerId: 'fishfarms',
        minZoomThreshold: 8,
        serviceUrl: mapservices.fiskeridir_wms,
        layers: 'flate_ihht_akvakulturregisteret',
        styles: 'default',
    };

    GIFTWIN.ogcLayers.addOgcLayer(options);
});
