/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


map.on('load', function () {

  var minZoomThreshold = 5;

  map.addLayer({
    "id": "thon_hotel",
    "type": "circle",
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [16.543338, 68.801768]
          }
        }]
      }
    },
    'layout': {
      'visibility': 'none'
    },
    "paint": {
      "circle-radius": 14,
      "circle-color": "rgba(0,51,255,0.8)"
    }
  });

});
