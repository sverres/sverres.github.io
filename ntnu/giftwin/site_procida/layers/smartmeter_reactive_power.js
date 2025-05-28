/**
 * Mapbox geojson layer
 * 
 * sverre.stikbakke 25.06.2019
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', () => {

    const layerId = 'smartmeter_reactive_power';
    const layerDataSource = './site_procida/data/smartmeters.geojson';
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


    map.on('click', layerId, e => GIFTWIN.esb.plot.linePlotPresentDay.plotFeature(layerId, e));

    GIFTWIN.mapUtils.updateCursorType(layerId);

});
