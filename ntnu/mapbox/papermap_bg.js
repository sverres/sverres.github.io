/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


 map.on('load', function () {

    var minZoomThreshold = 4;
  
    map.addLayer({
      'id': 'papermap_bg',
      'type': 'raster',
      'minzoom': minZoomThreshold,
      'source': {
        'type': 'raster',
        'tiles': [
        'https://cache.kartverket.no/v1/wmts'
        + '?Service=WMTS'
        + '&Version=1.0.0'
        + '&Request=GetTile'
        + '&Format=image/png'
        + '&Style=default'
        + '&Layer=toporaster'
        + '&TileMatrixSet=webmercator'
        + '&TileMatrix={z}'
        + '&TileCol={x}'
        + '&TileRow={y}'
        ],
        'tileSize': 256
      },
      'layout': {
        'visibility': 'none'
      },
      'paint': {}
    });
  });
