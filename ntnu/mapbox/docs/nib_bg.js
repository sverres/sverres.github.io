/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 09.11.2025
 */


 map.on('load', function () {

    var minZoomThreshold = 4;
  
    map.addLayer({
      'id': 'nib_bg',
      'type': 'raster',
      'minzoom': minZoomThreshold,
      'source': {
        'type': 'raster',
        'tiles': [
        'https://opencache.statkart.no/gatekeeper/gk/gk.open_nib_web_mercator_wmts_v2'
        + '?Service=WMTS'
        + '&Version=1.0.0'
        + '&Request=GetTile'
        + '&Format=image/png'
        + '&Style=default'
        + '&Layer=Nibcache_web_mercator_v2'
        + '&TileMatrixSet=default028mm'
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
