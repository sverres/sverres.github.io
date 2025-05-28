/**
 * Mapbox geojson layer
 * 
 * sverre.stikbakke 25.06.2019
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', () => {

    const layerId = 'smartmeter_locations';
    const layerDataSource = './site_grytoya/data/smartmeters.geojson';
    const visibility = "none";

    map.addLayer({
        "id": layerId,
        "type": "circle",
        'source': {
            'type': 'geojson',
            'data': layerDataSource
        },
        'layout': {
            'visibility': visibility
        },
        "paint": {
            "circle-radius": 8,
            "circle-color": "rgba(0,51,255,0.8)"
        }
    });
});
