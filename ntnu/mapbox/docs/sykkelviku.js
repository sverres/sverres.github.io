/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 09.05.2022
 */


map.on('load', function () {

  map.addLayer({
    'id': 'venabygd',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': 'venabygd.geojson'
    },
    'layout': {
      "line-join": "round",
      "line-cap": "round"
    },
    'paint': {
      "line-color": "rgba(204,0,153,0.6)",
      "line-width": 5
    }
  });

  map.addLayer({
    'id': 'baksia',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': 'baksia.geojson'
    },
    'layout': {
      "line-join": "round",
      "line-cap": "round"
    },
    'paint': {
      "line-color": "rgba(204,0,153,0.6)",
      "line-width": 5
    }
  });

  map.addLayer({
    'id': 'strutsberg',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': 'strutsberg.geojson'
    },
    'layout': {
      "line-join": "round",
      "line-cap": "round"
    },
    'paint': {
      "line-color": "rgba(204,0,153,0.6)",
      "line-width": 5
    }
  });

  map.addLayer({
    'id': 'ekspressen',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': 'ekspressen.geojson'
    },
    'layout': {
      "line-join": "round",
      "line-cap": "round"
    },
    'paint': {
      "line-color": "rgba(204,0,153,0.6)",
      "line-width": 5
    }
  });

});