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
        layerId: 'water_depth',
        minZoomThreshold: 4,
        serviceUrl: mapservices.nve_wms_innsjo,
        layers: 'DybdePunkt',
        styles: 'default',
    };

    GIFTWIN.ogcLayers.addOgcLayer(options);
});
