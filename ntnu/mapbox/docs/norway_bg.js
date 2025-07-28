/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


 map.on('load', function () {

    var minZoomThreshold = 4;
  
    map.addLayer({
      'id': 'norway_bg',
      'type': 'raster',
      'minzoom': minZoomThreshold,
      'source': {
        'type': 'raster',
        'tiles': [
        'https://cache.kartverket.no/v1/service'
        + '?Service=WMTS'
        + '&Version=1.0.0'
        + '&Request=GetTile'
        + '&Format=image/png'
        + '&Style=default'
        + '&Layer=topo'
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
