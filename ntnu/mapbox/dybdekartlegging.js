/**
 * Mapbox GeoJSON-layer from OGC API
 * 
 * sverre.stikbakke 04.03.2025
*/


map.on('load', function () {

  map.addLayer({
    'id': 'survey_coverages',
    'type': 'fill',
    'source': {
      'type': 'geojson',
      'data': 'https://hybasapi.atgcp1-prod.kartverket.cloud/collections/surveys/items?f=json'
    },
    'layout': {},
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.6,
      'fill-outline-color': '#000'
    }
  });
});


