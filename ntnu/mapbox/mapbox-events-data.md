# Mapbox events som returnerer data-objekt

Utgangspunkt: *[Get coordinates of the mouse pointer](https://docs.mapbox.com/mapbox-gl-js/example/mouse-position/)*.

Dokumentasjon fra Mapbox API:

- [Map](https://docs.mapbox.com/mapbox-gl-js/api/map)
- [mousemove](https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:mousemove)
- [LngLat](https://docs.mapbox.com/mapbox-gl-js/api/geography/)
- [Point](https://docs.mapbox.com/mapbox-gl-js/api/geography/)
- [JSON.stringify()](https://www.w3schools.com/js/js_json_stringify.asp)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8' />
    <title>Get coordinates of the mouse pointer</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <link href="https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.js"></script>
    <style>
        body { margin:0; padding:0; }
        #map { position:absolute; top:0; bottom:0; width:100%; }
    </style>
</head>
<body>

<style type='text/css'>
    #info {
        display: block;
        position: relative;
        margin: 0px auto;
        width: 50%;
        padding: 10px;
        border: none;
        border-radius: 3px;
        font-size: 12px;
        text-align: center;
        color: #222;
        background: #fff;
    }
</style>
<div id='map'></div>
<pre id='info'></pre>
<script>
mapboxgl.accessToken = 'pk.eyJ1Ijoic3ZlcnJlc3QiLCJhIjoiY2l1Y2VqcmRzMDAxMTJ0cGl6c3ZteGozMyJ9.ieY0kEubUisIWVVwjZiuBg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.50, 40], // starting position
    zoom: 9 // starting zoom
});

map.on('mousemove', function (e) {
    document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) + '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat.wrap());

        console.log("lngLat: " + e.lngLat);
        console.log("point: " +  e.point);
        console.log("bilde_x: " + e.point.x + "  bilde_y: " + e.point.y);
});
</script>

</body>
</html>
```

\
*NTNU 11.02.2025 Sverre Stikbakke*