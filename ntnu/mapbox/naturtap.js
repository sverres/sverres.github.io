/**
 * Mapbox geojson layer
 * 
 * sverre.stikbakke 19.02.2025
 */


map.on('load', function () {

  map.addLayer({
    'id': 'naturtap',
    'type': 'fill',
    'source': {
      'type': 'geojson',
      'data': 'naturtap.geojson'
    },
    'layout': {},
    "paint": {
      'fill-color': [
          'step',
          ['get', 'endring_natur'],
          '#b10026',
          -1.5, '#e31a1c',
          -1.0, '#fc4e2a',
          -0.5, '#fd8d3c',
          -0.0, '#feb24c',
           0.5, '#fed976',
           1.0, '#ffffb2',
      ],
      "fill-outline-color": "#000",
      "fill-opacity": 0.75,
  }
  });
});
