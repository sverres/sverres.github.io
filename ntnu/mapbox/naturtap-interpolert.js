/**
 * Mapbox geojson layer
 * 
 * sverre.stikbakke 19.02.2025
 */


map.on('load', function () {

  map.addLayer({
    "id": "naturtap",
    "type": "fill",
    'source': {
      'type': 'geojson',
      'data': 'naturtap.geojson'
    },
    "layout": {},
    "paint": {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'endring_natur'],
        -2, 'darkslategrey',
        2, 'whitesmoke'
      ],
      "fill-outline-color": "#000",
      "fill-opacity": 0.7,
    }
  });
});

