# Ukeoppgave med Mapserver - lage en egen WMS-tjeneste

1. Hent ned et datasett med kommuneinndeling innenfor et fylke fra Geonorge. Datasettet skal bestå av polygoner. Datasettet lastes ned på FGDB-format.
2. Lag mappe for tjenesten under _C:\ms4w\apps_, f.eks. _C:\ms4w\apps\innlandet_
3. Legg inn FGDB-fil (mappe) i denne mappen igjen, f.eks. *C:\ms4w\apps\innlandet\Basisdata_34_Innlandet_25832_Kommuner_FGDB.gdb*
4. Legg inn og tilpass en mapfile i mappen for tjenesten. Ta utgangspunkt i malen vist nedenfor.
5. Test tjenesten ved å lage en url med GetCapabilities-parametre som vist nedenfor.
6. Lag webkart for WMS-tjenesten med Open Layers. Et eksempel er vist nednefor.

## Eksempel på minimal mapfile for WMS-tjeneste

```c
/*
 Description:  NTNU Demo WMS Server WMS service to display on MS4W localhost (http://127.0.0.1)
 Author:       sverre.stikbakke@ntnu.no
 Last updated: 2025-03-10
*/

MAP
NAME "innlandet"
STATUS ON
EXTENT -180 -90 180 90
UNITS DD

CONFIG "MS_ERRORFILE" "/ms4w/tmp/ms_error.txt"
DEBUG 5

WEB
  METADATA
    "wms_title"                     "NTNU Demo WMS Server"
    "wms_onlineresource"            "http://127.0.0.1/cgi-bin/mapserv.exe?MAP=/apps/innlandet/wms.map"
    "wms_srs"                       "EPSG:4326 EPSG:4269 EPSG:3857 EPSG:25832"
    "wms_feature_info_mime_type"    "text/plain"
    "wms_abstract"                  "Demo-WMS for NTNU, GEOM2430"
    "ows_enable_request"            "*"
  END
END

PROJECTION
  "init=epsg:25832"
END

LAYER
  NAME "kommune"
  METADATA
    "wms_title"     "Innlandet kommuner"
    "wms_include_items" "all"
  END
  
  TYPE POLYGON
  STATUS ON
  CONNECTIONTYPE ogr
  CONNECTION "/ms4w/apps/innlandet/Basisdata_34_Innlandet_25832_Kommuner_FGDB.gdb"
  DATA "kommune"

  PROJECTION
    "init=epsg:25832"
  END

  CLASS
    NAME "kommune"
    STYLE
      COLOR 200 255 0
      OUTLINECOLOR 120 120 120
    END
  END
END

END

```

WMS GetCapabilities-kall for denne tjenesten (Virker bare hvis du har tjenesten installert påegen PC)

- [http://localhost/cgi-bin/mapserv.exe?map=/ms4w/apps/innlandet/wms.map&SERVICE=WMS&VERSION=1.3.0&REQUEST=GETCAPABILITIES](http://localhost/cgi-bin/mapserv.exe?map=/ms4w/apps/innlandet/wms.map&SERVICE=WMS&VERSION=1.3.0&REQUEST=GETCAPABILITIES)


## Webkart med Open Layers

Open Layers webkart for denne tjenesten (Virker bare hvis du har tjenesten installert påegen PC)

- [Innlandet kommuner](docs/innlandet.html)

```html
<!doctype html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/css/ol.css"
    type="text/css">
    <style>
    .map {
        height: 800px;
        width: 100%;
        border:1px solid DarkSlateGray;
    }
    </style>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/build/ol.js"></script>
    <title>Innlandet</title>
</head>

<body>
    <h2>Innlandet</h2>
    <div id="map" class="map"></div>
    <script type="text/javascript">
    var extentKartverketWMS25832 = [234068, 6338450, 1351516, 8051673];

    var projection = new ol.proj.Projection({
        code: 'EPSG:25832',
        extent: extentKartverketWMS25832
    });

    var kommune = new ol.layer.Tile({
        extent: extentKartverketWMS25832,
        source: new ol.source.TileWMS({
        url: 'http://127.0.0.1/cgi-bin/mapserv.exe?map=/ms4w/apps/innlandet/wms.map?',
        params: {
            'LAYERS': 'kommune',
            'STYLES': 'default'
        },
        })
    });

    var map = new ol.Map({
        layers: [kommune],
        target: 'map',
        view: new ol.View({
        projection: projection,
        center: [591500, 6740500],
        zoom: 3
        })
    });
    </script>
</body>

</html>
```

\
_NTNU 11.03.2025 Sverre Stikbakke_