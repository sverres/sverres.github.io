/**
 * Mapbox geojson layer
 * 
 * sverre.stikbakke 04.11.2021
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', function () {

  map.addLayer({
    'id': 'grid_level_1_labels',
    'type': 'symbol',
    'source': {
      'type': 'geojson',
      'data': './site_procida/data/grid_level_1.geojson'
    },
    'layout': {
      'text-field': ['get', 'IDINFRATEL'],
      'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      'text-radial-offset': 0.5,
      'text-justify': 'auto',
      "visibility": "none"
    }
  });
});
