/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 09.05.2022
 */


 map.on('load', function () {
 
    map.addLayer({
      'id': 'lygna',
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': 'track.geojson'
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