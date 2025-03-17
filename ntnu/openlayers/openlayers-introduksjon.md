# Introduksjon til Open Layers


## Hva er Open Layers?

> A high-performance, feature-packed library for all your mapping needs.

- et javascript-bibliotek med ferdigskrevet javascript-kode
- et API: *Application Programming Interface*


<iframe src="https://ntnu.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=134984a4-deb5-4584-81f5-acab011aac8b&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>


## Map

Map er objektet som kobler sammen HTML-koden og javascript-koden. Map-objektet må ha en egenskap (property), target, som peker inn i HTML-koden via en id- eller class-attributt. Dette angir hvor på siden kartet skal plasseres. Kartets størrelse angis ved hjelp av CSS-kode.

```html
<div id="map"></div>
<script>
    const map = new ol.Map({target: 'map'});
</script>
```

Se nærmere beskrivelse av Map-objektet i [API-dokumentasjonen](http://openlayers.org/en/latest/apidoc/), generell del, og i den detaljerte beskrivelsen av [ol.Map](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html).

Map-objektet må også inneholde informasjon om *view* (parallell til *dataframe* i ArcGIS), og *layers*.

Det er mange muligheter for å legge til egenskaper og funksjonalitet til Map-objektet. Se under *options* i beskrivelsen. Blant annet, så er knappene for zoom knyttet til Map-objektet via egne kontroll-objekter (controls). De viktigste kontrollene er satt opp som [standard-kontroller](https://openlayers.org/en/latest/apidoc/module-ol_control_defaults.html).

Det finnes også et sett med standard-*interaksjoner*, som angir hva som skjer hvis man dobbeltklikker i kartet, f.eks. Se [ol.interaction.defaults](https://openlayers.org/en/latest/apidoc/module-ol_interaction_defaults.html).

## View

View-objektet har ansvar for hvordan kartet skal tegnes opp. View'et trenger derfor å ha informasjon om projeksjon, senter-koordinater, oppløsning og zoom.

Hvis projeksjon ikke er satt, vil standardprojeksjonen *EPSG:3857* brukes (Web Mercator). NB: Dette er ikke det samme som standardprojeksjonen i ArcMap, som er *EPSG:4326* .

View'et har en standard *zoomFactor* på 2. Det vil si at målestokken fordobles eller halveres for hvert klikk på en av zoom-knappene.

Målestokken avhenger av *resolution*-verdien. Den angir hvor mange meter (eller rettere, koordinatsystem-enheter) hver pixel dekker i virkeligheten/terrenget. Zoom-nivåene kan begrenses ved hjelp av *maxResolution* og *minResolution*, eller ved bruk av *maxZoom* og *minZoom*. Se nærmere beskrivelse av disse egenskapene under [ol.View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html)

```javascript
    map.setView(new ol.View({
    center: [0, 0],
    zoom: 2
    }));
```

## Source

Source-objektet angir ulike tjeneste-baserte datakilder for kartet. Egenskapene for objektet er bl.a. URL for tjenesten og eventuelle parametre:
- Open Street Map: [ol.source.OSM](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html)
- [ol.source.ImageWMS](https://openlayers.org/en/latest/apidoc/module-ol_source_ImageWMS-ImageWMS.html)
- [ol.source.TileWMS](https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html)
- [ol.source.WMTS](https://openlayers.org/en/latest/apidoc/module-ol_source_WMTS-WMTS.html)

```javascript
const osmSource = new ol.source.OSM();
```

## Layer

> A layer is a visual representation of data from a source. OpenLayers has three basic types of layers: *ol.layer.Tile*, *ol.layer.Image* and *ol.layer.Vector*.

Vi bruker ol.layer.Tile for WMS-kart. Den viktigste og som regel eneste egenskap som må settes på Layer-objektet er *source*. En egenskap som kan settes er *extent*. Den kan brukes til å begrense hvilket område kartet skal tegnes for. Den angir et rektangel som senter-koordinaten må være innenfor for at kartet skal tegnes opp.

- [ol.layer.Tile](https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html)

```javascript
const osmLayer = new ol.layer.Tile({source: osmSource});
map.addLayer(osmLayer);
```

```javascript
const topo = new ol.layer.Tile({
    extent: extentKartverketWMS25832,
    source: new ol.source.TileWMS({
    attributions: [attribution],
    url: 'https://wms.geonorge.no/skwms1/wms.topo?',
    params: {
        'LAYERS': 'topo',
        'STYLES': 'default'
    },
    })
});
```

## Vi setter det hele sammen - Open Street Map

Kode-eksemplet nedenfor er fra [Quick Start](https://openlayers.org/doc/quickstart.html)-siden hos Open Layers, og tilpasset versjon 6.15.1.

```html
<!doctype html>
<html lang="en">
    <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/css/ol.css" type="text/css">
    <style>
        .map {
        height: 400px;
        width: 100%;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/build/ol.js"></script>
    <title>OpenLayers example</title>
    </head>
    <body>
    <h2>My Map</h2>
    <div id="map" class="map"></div>
    <script type="text/javascript">
        const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
            source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([37.41, 8.82]),
            zoom: 4
        })
        });
    </script>
    </body>
</html>
```

- [osm.html](docs/osm.html)


## Vi setter det hele sammen - Open Street Map - alternativ script-seksjon med samme funksjon

Kan du beskrive hva som er forskjellen på denne versjonen og den ovenfor?

```javascript
    <script>
        
        const map = new ol.Map({});
        const layer = new ol.layer.Tile({});
        const source = new ol.source.OSM();
        const view = new ol.View({});
        
        map.setLayerGroup(layer);
        map.setView(view);
        map.setTarget('map');

        layer.setSource(source);
        
        view.setCenter([0, 0]);
        view.setZoom(2);

    </script>
```

## Vi setter det hele sammen - WMS-versjon med Topografisk norgeskart


```html
<!doctype html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/css/ol.css"
    type="text/css">
    <style>
    .map {
        height: 400px;
        width: 100%;
    }
    </style>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/build/ol.js"></script>
    <title>OpenLayers example</title>
</head>

<body>
    <h2>My Map</h2>
    <div id="map" class="map"></div>
    <script type="text/javascript">
    const extentKartverketWMS25832 = [234068, 6338450, 1351516, 8051673];

    const projection = new ol.proj.Projection({
        code: 'EPSG:25832',
        extent: extentKartverketWMS25832
    });

    const topo = new ol.layer.Tile({
        extent: extentKartverketWMS25832,
        source: new ol.source.TileWMS({
        url: 'https://wms.geonorge.no/skwms1/wms.topo?',
        params: {
            'LAYERS': 'topo',
            'STYLES': 'default'
        },
        })
    });

    const map = new ol.Map({
        layers: [topo],
        target: 'map',
        view: new ol.View({
        projection: projection,
        center: [591500, 6740500],
        zoom: 12
        })
    });
    </script>
</body>

</html>
```

- [gjovik.html](docs/gjovik.html)

## Oppgaver

- Lag egne filer og kopier inn de komplette eksemplene ovenfor. Sett inn dine egne senterkoordinater og zoom-nivåer. Lag filer for både OSM-eksemplet og topo-eksemplet.
- Lag en ny fil som kombinerer OSM og topo . Du må da bruke to layers, og legge til begge lagene i view'et. OSM støtter ikke UTM, så du må lage dette som et Web Mercator-kart. UTM/projeksjonskoden fra topo-eksemplet må derfor fjernes.
- Les om resolutions-egenskapene i dokumentasjonen, og bytt ut zoom-egenskapen med de nødvendige resolutions-egenskapene. Test ut effekten av ulike verdier på disse.
- Test ut effekten av å bruke extent på både lag-nivå og i view'et i topo-eksemplet. Prøv å lage små extents - f.eks. for en kommune eller et fylke.

## Ressurser

- [Open Layers hjemmeside](https://openlayers.org/)
- [Open Layers API-dokumentasjon](https://openlayers.org/en/latest/apidoc/)

## Løsningsforslag

NB: Ikke gå inn på dette før du har prøvd å løse oppgavene selv

- [OpenLayers kart med diverse resolutions- og extent-verdier](openlayers-l-forslag.md)


_NTNU 09.01.2021 Sverre Stikbakke_\
_NTNU 10.02.2021 Lagt til løsningsforslag_\
_NTNU 12.03.2025 Oppdatert OpenLayers-versjon_
