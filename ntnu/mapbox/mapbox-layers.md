# Flere kartlag i Mapbox

## WMS-lag

*hydro_power_stations.js:*

```javascript
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
```

Dette er kode som legger til et WMS-lag over basis-kartet i Mapbox. Legg merke til:
- hele koden er "pakket inn" i funksjonen *on* på som ligger som en member på Map-objektet gjennom variabelen *map*.
- addLayer-funksjonen som også ligger på Map-objektet
- parametrene i objektet som sendes inn til addLayer-funksjonen:
    - 'id' - et navn på laget som settes av deg
    - 'type' - her raster, se andre typer i andre eksempler
    - 'source' - beskriver hvor kartlaget hentes fra
    - 'layout' - denne er tom her, ettersom dette er et bildeformat
    - 'paint' - også tom for WMS-bilder
- source-objektet har igjen sine parametre:
    - 'type' - her raster
    - 'tiles' - beskriver hvor bildefilene finnes, her fra WMS-kall
- WMS-kallet ligger som et javascript array
    - bbox={bbox-epsg-3857}' - dette er ikke standard WMS-verdi for BBOX, men det er Mapbox sin mekanisme for å angi at BBOX skal regnes ut av Mapbox selv.
	
[hydro_power_stations.html](hydro_power_stations.html)


## WMTS-lag

*papermap_bg.js:*

```javascript
/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


map.on('load', function () {

  map.addLayer({
    'id': 'papermap_bg',
    'type': 'raster',
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
    'layout': {},
    'paint': {}
  });
});
```

Legg merke til hvordan x, y og z er angitt. z angir zoom-nivået. x- og y angir henholdsvis kolonne- og radnummer i den aktuelle *tilematrix*. Bortsett fra at WMTS-parametrene er annerledes, så er denne WMTS-koden bygd opp på samme måte som WMS-koden.

[toporaster.html](toporaster.html)

## GeoJSON-fil - linje

*fishfarm_trip.js:*

```javascript
/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


map.on('load', function () {

  map.addLayer({
    'id': 'fishfarm_trip',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': 'fishfarm_trip.geojson'
    },
    'layout': {
      "line-join": "round",
      "line-cap": "round"
    },
    'paint': {
      "line-color": "rgba(204,0,153,0.8)",
      "line-width": 3
    }
  });

});
```
Legg merke til hvordan *type, source, layout og paint* er angitt her.
GeoJSON-filen må ligge i samme mappe som javascript-filen.

[fishfarm_trip.html](fishfarm_trip.html)

## GeoJSON-fil - flate

*smart_aggregate.js:*

```javascript
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
    'layout': {},
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.6
    }
  });

});
```
Legg merke til forskjellen under *paint* mellom dette og foregående eksempel.

[smart_aggregate.html](smart_aggregate.html)

## GeoJSON - punkt

*thon_hotel.js:*

```javascript
/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


map.on('load', function () {

  map.addLayer({
    "id": "thon_hotel",
    "type": "circle",
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [16.543338, 68.801768]
          }
        }]
      }
    },
    'layout': {},
    "paint": {
      "circle-radius": 14,
      "circle-color": "rgba(0,51,255,0.8)"
    }
  });

});
```

Legg merke til *data*-parameteren under *source*. Her er det ikke henvist til en ekstern fil, men det ligger GeoJSON-kode som beskriver kartobjektet, her et punkt, direkte i javascript-koden.

[thon_hotel.html](thon_hotel.html)

\
*NTNU 11.02.2025 Sverre Stikbakke*