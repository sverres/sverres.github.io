# Ukeoppgave: Oppsett og bruk av WMTS-tjenester på Mapserver


## Forutsetninger - bakgrunnskunnskaper

- Mapserver er installert (se ukeoppgave om dette)
- Mapserver NTNU-oppsett er installert
- Lærestoffet fra [WMS-forelesning](wms.html) er kjent
- Lærestoffet fra [WMTS-forelesning](wmts.html) er kjent
- Se også linker om WMS, WMTS og Geonorge-stoff under Oppsett og drift av WMS- og WMTS-tjenester

## Oppgave

Ukeoppgaven består i å sette seg inn i hvordan WMTS-tjenester settes opp med Mapserver og Mapcache. Denne ukeoppgaven viser i detalj hvordan undertegnede har satt opp en WMTS-tjeneste. Din oppgave blir å gjenta dette på egen PC, og gjøre nødvendige endringer basert på forskjeller i datagrunnlag, filnavn, brukernavn, mappenavn, etc. Hvis alt går bra skal du få vist din WMTS-tjeneste på et Open Layers webkart. Oppgaven bygger i stor grad på forrige ukeoppgave.

## Video-gjennomgang av oppsettet

<iframe src="https://ntnu.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=1d02726a-144a-46d7-8dbe-acd100d857c2&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>


## Eksempel på Mapserver-oppsett (mapfile)

innlandet.map:

```js
/*
    Description:  Simple WMS service to display on MS4W localhost ( http://127.0.0.1 )
    Data source:  Innlandet fylke, in FGDB format.
    Author:       sverre.stikbakke@ntnu.no
    Last updated: 2021-02-13
*/

MAP
    EXTENT 413293 6637090 706922 6953227
    WEB
        METADATA
            "wms_title" "NTNU Demo WMS Server"
            "wms_onlineresource" "http://127.0.0.1/cgi-bin/mapserv.exe?MAP=/ntnugeo/apps/sverrsti/innlandet/map/innlandet.map"
            "wms_srs" "EPSG:4326 EPSG:4269 EPSG:3857 EPSG:25832"
            "wms_feature_info_mime_type" "text/plain"
            "wms_abstract" "Demo-WMS for NTNU, GEO3141 og GEOM2240"
            "ows_enable_request" "*"
        END
    END
    PROJECTION
        "init=epsg:25832"
    END
    LAYER
        NAME "kommune"
        METADATA
            "wms_title" "Innlandet"
            "wms_include_items" "all"
        END
        TYPE POLYGON
        STATUS ON
        CONNECTIONTYPE OGR
        CONNECTION "C:/ntnugeo/apps/sverrsti/innlandet/data/filegdb/Basisdata_34_Innlandet_25832_Kommuner_FGDB.gdb"
        DATA "kommune"
        PROJECTION
            "init=epsg:25832"
        END
        CLASSITEM "kommunenummer"
        CLASS
            NAME "Østre Toten"
            EXPRESSION "3442"
            COLOR 150 107 157
            OUTLINECOLOR 231 207 188
        END
        CLASS
            NAME "Hedmark"
            EXPRESSION ( ( '[kommunenummer]' LT "3431" ) AND NOT ( '[kommunenummer]' IN "3407,3405" ) )
            COLOR 201 134 134
            OUTLINECOLOR 231 207 188
        END
        CLASS
            NAME "Resten - dvs. Oppland unntatt Østre Toten"
            COLOR 242 184 128
            OUTLINECOLOR 231 207 188
        END
    END
END
```

GetCapabilities-kall mot denne tjenesten:

```ini
http://127.0.0.1/cgi-bin/mapserv.exe
?MAP=/ntnugeo/apps/sverrsti/innlandet/map/innlandet.map
&SERVICE=WMS
&VERSION=1.3.0
&REQUEST=GetCapabilities
```

GetMap-kall mot denne tjenesten:

```ini
http://127.0.0.1/cgi-bin/mapserv.exe
?MAP=/ntnugeo/apps/sverrsti/innlandet/map/innlandet.map
&VERSION=1.3.0
&REQUEST=GetMap
&CRS=EPSG:25832
&BBOX=592000,6741000,652000,6801000
&WIDTH=600
&HEIGHT=600
&LAYERS=kommune
&FORMAT=image/png
&STYLES=default
```

Kallet ovenfor gir dette bildet:

![innlandet.png](img/innlandet.png)


## Open Layers-fil for WMS-tjeneste - UTM-projeksjon

```ini
<!--
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/css/ol.css"
    type="text/css">
    <style>
    .map {
        height: 800px;
        width: 100%;
        border: 1px solid darkslategrey;
    }
    </style>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js"></script>
    <title>Mapserver WMS-tjeneste</title>
</head>

<body>
    <h2>Innlandet fylke</h2>
    <div id="map" class="map"></div>
    <script type="text/javascript">
    var extentKartverketWMS25832 = [234068, 6338450, 1351516, 8051673];

    var projection = new ol.proj.Projection({
        code: 'EPSG:25832',
        extent: extentKartverketWMS25832
    });

    var wmsUrl = 'http://127.0.0.1/cgi-bin/mapserv.exe'
                    + '?MAP=/ntnugeo/apps/sverrsti/innlandet/map/innlandet.map&';

    var topo4 = new ol.layer.Tile({
        extent: extentKartverketWMS25832,
        source: new ol.source.TileWMS({
        url: wmsUrl,
        params: {
            'LAYERS': 'kommune',
            'STYLES': 'default'
        },
        })
    });

    var map = new ol.Map({
        layers: [topo4],
        target: 'map',
        view: new ol.View({
        projection: projection,
        center: [591500, 6792500],
        zoom: 4
        })
    });
    </script>
</body>

</html>
-->
```

## Mapbox-fil for WMS-tjeneste - Web Mercator

```ini
<!--
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />

    <style>
        #map {
            width: 1500px;
            height: 900px;
        }
    </style>

    <title>Mapserver - innlandet</title>

</head>

<body>

    <div id='map'></div>
    <script>
        mapboxgl.accessToken = '<sett inn ditt eget access-token her';

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [10.5, 60.7],
            zoom: 5
        });

        map.on('load', function () {

            map.addLayer({
                'id': 'innlandet',
                'type': 'raster',
                'source': {
                    'type': 'raster',
                    'tiles': [
                        'http://127.0.0.1/cgi-bin/mapserv.exe'
                        + '?MAP=/ntnugeo/apps/sverrsti/innlandet/map/innlandet.map'
                        + '&bbox={bbox-epsg-3857}'
                        + '&format=image/png'
                        + '&service=WMS'
                        + '&version=1.3.0'
                        + '&request=GetMap'
                        + '&crs=EPSG:3857'
                        + '&width=256'
                        + '&height=256'
                        + '&layers=kommune'
                        + '&styles='
                        + '&transparent=true'
                    ],
                    'tileSize': 256
                },
                'layout': {},
                'paint': {'raster-opacity': 0.70}
            });
        });
    </script>
</body>

</html>
-->
```

## WMTS-tjenester med Mapcache (maxcache.xml)

Oppsettet for cache-tjenesten ligger i fila
_C:\ntnugeo\apps\sverrsti\mapcache\mapcache.xml_.

Se forklaringer til oppsettet i [Mapcache-dokumentasjonen](https://mapserver.org/mapcache/config.html).

I oppsettet her kan man merke seg følgende:

- det er bare én cache-type: _disk_
- kilden (_source_ ) for kartflisene er WMS-tjenesten som er definert ovenfor.
- det er definert et kartflis-skjema (_grid_ ): _UTM32EUREF89_
- resolutions-verdiene for dette skjemaet er hentet fra Geonorge.no, se linken [eksakte "resolutions"](http://wms.geonorge.no/kr/koordsys_res.txt) under Zoom-nivå på denne siden: [Cache-tjenester (WMTS)](https://www.geonorge.no/aktuelt/om-geonorge/brukerveiledning/#!#cache_tjenester)
- det er definert en utstrekning for dette skjemaet (_extent_ ) som dekker Innlandet fylke
- det er brukt _origin: top-left_ som utgangspunkt for kartkoordinatene
- det er definert ett _tileset_, 'innlandet', som bruker kartflis-skjemaet _UTM32EUREF89_.
- levetiden for kartflisene er satt til 600 sekunder.

```js
<!--
<?xml version="1.0" encoding="UTF-8"?>

<mapcache>
   <cache name="disk" type="disk">
      <base>C:/ntnugeo/apps/sverrsti/tmp/cache</base>
   </cache>

   <source name="innlandet" type="wms">
      <getmap>
         <params>
            <FORMAT>image/png</FORMAT>
            <LAYERS>kommune</LAYERS>
            <TRANSPARENT>true</TRANSPARENT>
         </params>
      </getmap>

      <http>
         <url>http://127.0.0.1/cgi-bin/mapserv.exe?MAP=/ntnugeo/apps/sverrsti/innlandet/map/innlandet.map</url>
      </http>
   </source>

   <grid name="UTM32EUREF89">
      <metadata>
         <title>UTM32EUREF89</title>
      </metadata>
      <extent>413293 6637090 706922 6953227</extent>
      <origin>top-left</origin>
      <srs>EPSG:25832</srs>
      <units>m</units>
      <size>256 256</size>
      <resolutions>21664 10832 5416 2708 1354 677 338.5 169.25 84.625 42.3125 21.15625 10.578125 5.2890625 2.64453125 1.322265625 0.6611328125 0.33056640625 0.165283203125 0.0826416015625</resolutions>
   </grid>

   <tileset name="innlandet">
      <source>innlandet</source>
      <cache>disk</cache>
      <grid>UTM32EUREF89</grid>
      <format>PNG</format>
      <metatile>5 5</metatile>
      <metabuffer>10</metabuffer>
      <expires>600</expires>
   </tileset>


   <default_format>JPEG</default_format>

   <service type="wms" enabled="true">
      <full_wms>assemble</full_wms>
      <resample_mode>bilinear</resample_mode>
      <format>JPEG</format>
      <maxsize>4096</maxsize>
   </service>

   <service type="wmts" enabled="true"/>
   <service type="tms" enabled="true"/>
   <service type="kml" enabled="true"/>
   <service type="gmaps" enabled="true"/>
   <service type="ve" enabled="true"/>
   <service type="demo" enabled="true"/>

   <errors>report</errors>
   <lock_dir>C:/ntnugeo/apps/sverrsti/tmp/cache</lock_dir>

</mapcache>
-->
```

## Aktivering av WMS- og WMTS-tjenester

Både WMS- og WMTS-tjenester er avhengige av Apache web-server for å kjøre.

- endringer i WMS-tjenester basert på endringer i mapfile-oppsettet er umiddelbart tilgjengelige
- endringer i WMTS-tjenester basert på endinger i mapcache.xml-fila krever omstart av Apache for å aktiveres

Etter omstart av Apache kan WMTS-tjenestene testes med GetCapabilities- og GetTile-kall:

```ini
http://localhost/sverrsti/wmts
?SERVICE=WMTS
&VERSION=1.0.0
&REQUEST=GetCapabilities
```

```ini
http://localhost/sverrsti/wmts
?SERVICE=WMTS
&VERSION=1.0.0
&REQUEST=GetTile
&LAYER=innlandet
&TILEMATRIXSET=UTM32EUREF89
&TILEMATRIX=5
&TILEROW=1
&TILECOL=1
```

GetTile-kallet ovenfor gir dette bildet:

![innlandet-matrix-5.png](img/innlandet-matrix-5.png)


## Open Layers-fil for WMTS-tjeneste

innlandet_WMTHS.html:

```ini
<!--
<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/css/ol.css"
    type="text/css">
  <style>
    #map {
      height: 800px;
      width: 1200px;
      border: solid 1px darkslategray;
    }
  </style>
  <title>Innlandet WMTS</title>
</head>

<body>

  <div id="map"></div>

  <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js"></script>
  <script src="innlandet.js" type="text/javascript"></script>

</body>

</html>
-->
```

innlandet.js:

```js
var url = 'http://localhost/sverrsti/wmts/?';

var layer = 'innlandet';

var extentKartverket = [-2000000, 3500000, 3545984, 9045984];
var extentInnlandet = [413293, 6637090, 706922, 6953227];

// Datum og projeksjon: EUREF89, UTM zone 32
var projection = new ol.proj.Projection({
    code: 'EPSG:25832',
    extent: extentKartverket
});

var resolutionsKartverket = [
    21664,
    10832,
    5416,
    2708,
    1354,
    677,
    338.5,
    169.25,
    84.625,
    42.3125,
    21.15625,
    10.578125,
    5.2890625,
    2.64453125,
    1.322265625,
    0.6611328125,
    0.33056640625,
    0.165283203125,
    0.0826416015625
  ];
  

var matrixSet = 'UTM32EUREF89';
var matrixIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

var center = [500000, 6777400]; // Easting, Northing
var zoom = 5;

var kommuner = new ol.layer.Tile({
    opacity: 0.7,
    source: new ol.source.WMTS({
        url: url,
        layer: layer,
        matrixSet: matrixSet,
        format: 'image/png',
        tileGrid: new ol.tilegrid.WMTS({
            extent: extentInnlandet,
            resolutions: resolutionsKartverket,
            matrixIds: matrixIds
        }),
        style: 'default',
    })
});

var topo4 = new ol.layer.Tile({
    extent: extentInnlandet,
    source: new ol.source.TileWMS({
        url: 'https://openwms.statkart.no/skwms1/wms.topo4.graatone',
        params: {
            'LAYERS': 'topo4graatone_WMS',
            'STYLES': 'default'
        },
    })
});

var map = new ol.Map({
    layers: [topo4, kommuner],
    target: 'map',
    view: new ol.View({
        extent: extentKartverket,
        projection: projection,
        center: center,
        resolutions: resolutionsKartverket,
        zoom: zoom
    })
});
```


_NTNU 16.02.2021 Sverre Stikbakke_\
_NTNU 18.02.2021 Endret versjonsnr. på Open Layers eksempler. V. 6.5.0 skapte problemer._

