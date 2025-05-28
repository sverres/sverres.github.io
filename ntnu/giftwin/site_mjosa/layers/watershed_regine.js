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
        layerId: 'watershed_regine',
        minZoomThreshold: 4,
        serviceUrl: mapservices.nve_wms_nedborfelt,
        layers: 'REGINE_enhet',
        styles: 'default',
    };

    GIFTWIN.ogcLayers.addOgcLayer(options);
});
