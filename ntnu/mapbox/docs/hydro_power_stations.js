/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


map.on('load', function () {

    map.addLayer({
      'id': 'hydro_power_stations',
      'type': 'raster',
      'source': {
        'type': 'raster',
        'tiles': [
          'https://nve.geodataonline.no/arcgis/services/Vannkraft1/MapServer/WmsServer'
          + '?bbox={bbox-epsg-3857}'
          + '&format=image/png'
          + '&service=WMS'
          + '&version=1.3.0'
          + '&request=GetMap'
          + '&crs=EPSG:3857'
          + '&width=256'
          + '&height=256'
          + '&layers=Vannkraftverk'
          + '&styles='
          + '&transparent=true'
        ],
        'tileSize': 256
      },
      'layout': {},
      'paint': {}
    });
  });