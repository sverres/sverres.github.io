/**
 * Mapbox geojson layer
 * 
 * sverre.stikbakke 04.11.2021
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', function () {

  map.addLayer({
    'id': 'observability_ids',
    'type': 'symbol',
    'source': {
      'type': 'geojson',
      'data': './site_grytoya/data/smartmeters.geojson'
    },
    'layout': {
      'text-field': ['get', 'SensorID'],
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto',
      "visibility": "none"
    }
  });
});
