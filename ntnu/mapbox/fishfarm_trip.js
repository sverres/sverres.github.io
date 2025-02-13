/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


map.on('load', function () {

  map.addLayer({
    'id': 'fishfarm_trip',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': 'fishfarm_trip.geojson'
    },
    'layout': {
      "line-join": "round",
      "line-cap": "round"
    },
    'paint': {
      "line-color": "rgba(204,0,153,0.8)",
      "line-width": 3
    }
  });

});
