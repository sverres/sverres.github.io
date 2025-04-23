# WFS-kart med Open Layers i UTM-projeksjon


## Om utviklingsverktøy for Open Layers-applikasjoner

I dette eksemplet bruker vi utviklingsverktøyene [Node.js](https://nodejs.org/en/about), [Vite](https://vite.dev/guide/) og [GIT](https://github.com/git-guides), slik det er presentert på [Open Layers Quick start](https://openlayers.org/doc/quickstart.html).
(Andre eksempler på bruk av Open Layers presentert på disse sidene, er laget ved å kode alt direkte i HTML, CSS og javascript. Dette har fungert bra tidligere, men i de senere versjonene av Open Layers er alle kode-eksemplene i dokumentasjonen basert på bruk av disse utviklingsverktøyene.)

Installasjon av utviklingsmiljøet:

1. Installer [Node.js](https://nodejs.org/en)
1. Installer [GIT](https://github.com/git-guides/install-git)
1. Fra Windows kommandolinje, i mappen der du vil utvikle applikasjonen: kjør kommandoen `npm create ol-app my-app`. Dette vil installere Vite, samt lage et rammeverk for en app i mappa my-app.
1. Gi kommandoene `cd my-app`, `npm install proj4` og `npm start`.
1. Bruk VS Code eller en annen teksts-editor for å redigere koden i `index.html` og `main.js`.

## Om eksempelet

Eksemplet viser arealressursflate fra WFS-tjeneste på localhost, og forutsetter at WFS-tjenesten kan levere data på GeoJSON-format. I mapbox-oppsettet må dette spesifiseres, slik:

```c
  WEB
    METADATA
        
        ...

        "wfs_getfeature_formatlist"     "geojson"
    END
  END
```

```c
  OUTPUTFORMAT
    NAME "geojson"
    DRIVER "OGR/GEOJSON"
    MIMETYPE "application/json; subtype=geojson"
    FORMATOPTION "STORAGE=stream"
    FORMATOPTION "FORM=SIMPLE"
  END
```

Komplett MAP-file:

```c
/*
    Description:  WFS on MS4W localhost ( http://127.0.0.1 )
    Data source:  FKB-AR5, produktiv skog
    Author:       sverre.stikbakke@ntnu.no
    Last updated: 2025-04-11
*/

MAP

  NAME "WFS_server"
  EXTENT 326664 6547676 364267 6584572

  CONFIG "MS_ERRORFILE" "/ms4w/tmp/ms_error.txt"

  WEB
    METADATA
        "wfs_title"                     "Prodskog WFS"                                                         ## REQUIRED
        "wfs_onlineresource"            "http://localhost/cgi-bin/mapserv.exe?MAP=/ms4w/apps/prodskog/wfs.map" ## Recommended
        "wfs_srs"                       "EPSG:4326 EPSG:4269 EPSG:3857 EPSG:25832 EPSG:25833"                  ## Recommended
        "wfs_abstract"                  "Prodskog"                                                             ## Recommended
        "wfs_enable_request"            "*"                                                                    ## REQUIRED
        "wfs_getfeature_formatlist"     "geojson"
    END
  END

  OUTPUTFORMAT
    NAME "geojson"
    DRIVER "OGR/GEOJSON"
    MIMETYPE "application/json; subtype=geojson"
    FORMATOPTION "STORAGE=stream"
    FORMATOPTION "FORM=SIMPLE"
  END

  PROJECTION
    "init=epsg:25832"
  END

  LAYER

    NAME "arealressursflate"

    METADATA      
        "gml_include_items"     "all"
        "gml_geometries"        "omraade"
        "gml_geom_type"         "polygon"
        "gml_featureid"         "objid"         # REQUIRED

        "wfs_title"             "Prodskog WFS"  # REQUIRED
        "wfs_srs"               "EPSG:25832"    # REQUIRED
        "wfs_enable_request"    "*"
    END

    DEBUG 2

    TYPE POLYGON
    CONNECTIONTYPE POSTGIS
    CONNECTION "host=localhost dbname=prodskog-t3 user=postgres password=gulogulo port=5432" 
    DATA "omraade from prodskog.arealressursflate using unique objid"

    PROJECTION
      "init=epsg:25832"
    END

  END #layer

END #mapfile
```


## index.html

```html
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/x-icon" href="https://openlayers.org/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WFS</title>
  <style>
    .map {
      width: 100%;
      height: 1000px;
    }
  </style>
</head>

<body>
  <div id="map" class="map"></div>

  <script type="module" src="main.js"></script>
</body>

</html>
```

## main.js

```js
import './style.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { bbox as bboxStrategy } from 'ol/loadingstrategy.js';
import {register} from 'ol/proj/proj4.js';
import proj4 from 'proj4';

proj4.defs("EPSG:25832","+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
register(proj4);

const extentKartverketWMS25832 = [234068, 6338450, 1351516, 8051673];

const topograatone = new TileLayer({
  extent: extentKartverketWMS25832,
  source: new TileWMS({
    url: 'https://wms.geonorge.no/skwms1/wms.topograatone?',
    params: {
      'LAYERS': 'topograatone',
      'STYLES': 'default'
    },
  }),
});

const vectorSource = new VectorSource({
  format: new GeoJSON(),
  url: function (extent) {
    return (
      'http://localhost/cgi-bin/mapserv.exe?MAP=/ms4w/apps/prodskog/wfs.map' +
      '&service=WFS' +
      '&version=2.0.0' +
      '&request=GetFeature' +
      '&typename=ms:arealressursflate' +
      '&outputFormat=geojson' +
      '&crsname=EPSG:4326' +
      '&bbox=' + extent.join(',') + ',EPSG:25832'
    );
  },
  strategy: bboxStrategy,
});

const vector = new VectorLayer({
  source: vectorSource,
  style: {
    'stroke-width': 0.75,
    'stroke-color': 'black',
    'fill-color': 'rgba(251, 133, 0, 0.7)',
  },
});

const map = new Map({
  layers: [topograatone, vector],
  target: document.getElementById('map'),
  view: new View({
    projection: 'EPSG:25832',
    center: [339077, 6569840],
    maxZoom: 19,
    zoom: 16,
  }),
});
```

