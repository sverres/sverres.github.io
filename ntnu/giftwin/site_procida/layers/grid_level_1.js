/**
 * Mapbox geojson layer
 * 
 * sverre.stikbakke 04.11.2021
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', function () {

  map.addLayer({
    'id': 'grid_level_1',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': './site_procida/data/grid_level_1.geojson'
    },
    'layout': {
      "line-join": "round",
      "line-cap": "round",
      "visibility": "none"
    },
    'paint': {
      "line-color": "rgba(5,112,176,0.9)",
      "line-width": 1.2
    }
  });
});
