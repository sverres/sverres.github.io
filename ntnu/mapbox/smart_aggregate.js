/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


map.on('load', function () {

  map.addLayer({
    'id': 'smart_aggregate',
    'type': 'fill',
    'source': {
      'type': 'geojson',
      'data': 'smart_aggregate.geojson'
    },
    'layout': {
      "visibility": "none"
    },
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.6
    }
  });

});
