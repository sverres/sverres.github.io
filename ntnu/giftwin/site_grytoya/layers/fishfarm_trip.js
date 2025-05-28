/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', function () {

  map.addLayer({
    'id': 'fishfarm_trip',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': './site_grytoya/data/fishfarm_trip.geojson'
    },
    'layout': {
      "line-join": "round",
      "line-cap": "round",
      "visibility": "none"
    },
    'paint': {
      "line-color": "rgba(204,0,153,0.8)",
      "line-width": 3
    }
  });
  //console.log("layer loaded: fishfarm_trip");
});
