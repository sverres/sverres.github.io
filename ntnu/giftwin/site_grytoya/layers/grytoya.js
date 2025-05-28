/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', function () {

  map.addLayer({
    'id': 'grytoya',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': './site_grytoya/data/grytoya.geojson'
    },
    'layout': {
      "line-join": "round",
      "line-cap": "round",
      "visibility": "none"
    },
    'paint': {
      "line-color": "rgba(219,3,7,0.7)",
      "line-width": 4
    }
  });
  //console.log("layer loaded: grytoya");
});
