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
        layerId: 'water_intake',
        minZoomThreshold: 4,
        serviceUrl: mapservices.mattilsynet_wms,
        layers: 'Mattilsynet_Vannverk_Inntakspunkter',
        styles: 'default',
    };

    GIFTWIN.ogcLayers.addOgcLayer(options);
});
