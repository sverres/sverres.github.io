/**
 * Mapbox geojson layer
 * 
 * sverre.stikbakke 05.05.2020
 */


map.on('load', function () {

  var minZoomThreshold = 5;

  map.addLayer({
    'id': 'distribution_grid',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': './site_procida/data/distribution_grid.geojson'
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
});
