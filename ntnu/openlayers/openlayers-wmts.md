# WMTS-kart med Open Layers

## Eksempel-tjeneste: Topografisk norgeskart WMTS / cache

- [Metadata på geonorge](https://kartkatalog.geonorge.no/metadata/topografisk-norgeskart-wmts--cache/8f381180-1a47-4453-bee7-9a3d64843efa)

geonorge pr. 14.03.2025:
> Cache-tjeneste med topografisk grunnkart. Tjenesten har 4 lag (layers):\
\
Topografisk norgeskart – «Topo (farge)» Ny tjeneste som har data fra N50 til N2000, FKB, matrikkel, høyde- og dybdedata. Kartografien er i farger og er tilpasset web.\
\
Topografisk gråtonekart – «Topo (gråtone)» Ny tjeneste som har det samme innholdet som «topo», men har en gråtone-basert kartografi.\
\
Topografisk rasterkart – «Topo (raster)» Ny tjeneste med innhold fra N50 til N2000 og N5.\
\
Sjøkart rasterformat - «Sjøkartraster» Ny tjeneste med sjødata fra overseilingskart, hovedkart, kystkart, havnekart samt Svalbardkart.\
\
Disse tjenestene er tilgjengelige i: «utm32n» (EPSG:25832), «utm33n» (EPSG:25833), «utm35n» (EPSG:25835) og «webmercator» (EPSG:3857).\
\
OBS! Vi har dessverre utfordringer knyttet til ytelse for tjenesten, noe som skyldes overgang til ny plattform. Tregheten er forventet å vare i en tid fremover. Vi beklager på det sterkeste ulempene dette medfører, og forsikrer om at vi jobber for å løse dette raskest mulig.

### Utdrag fra GetCapabilities-respons

URL til tjenesten:

```xml
<ows:OperationsMetadata>
    <ows:Operation name="GetCapabilities">
        <ows:DCP>
            <ows:HTTP>
                <ows:Get xlink:href="https://cache.kartverket.no/v1/wmts?">
                    <ows:Constraint name="GetEncoding">
                        <ows:AllowedValues>
                            <ows:Value>KVP</ows:Value>
                        </ows:AllowedValues>
                    </ows:Constraint>
                </ows:Get>
            </ows:HTTP>
        </ows:DCP>
    </ows:Operation>
    <ows:Operation name="GetTile">
        <ows:DCP>
            <ows:HTTP>
                <ows:Get xlink:href="https://cache.kartverket.no/v1/wmts?">
                    <ows:Constraint name="GetEncoding">
                        <ows:AllowedValues>
                            <ows:Value>KVP</ows:Value>
                        </ows:AllowedValues>
                    </ows:Constraint>
                </ows:Get>
            </ows:HTTP>
        </ows:DCP>
    </ows:Operation>
    <ows:Operation name="GetFeatureInfo">
        <ows:DCP>
            <ows:HTTP>
                <ows:Get xlink:href="https://cache.kartverket.no/v1/wmts?">
                    <ows:Constraint name="GetEncoding">
                        <ows:AllowedValues>
                            <ows:Value>KVP</ows:Value>
                        </ows:AllowedValues>
                    </ows:Constraint>
                </ows:Get>
            </ows:HTTP>
        </ows:DCP>
    </ows:Operation>
</ows:OperationsMetadata>
```

Under `Layer`-elementet finner vi
- navn på Layer (ows:Identifier) 
- navn på TilematrixSet

```xml
<Layer>
    <ows:Title>Topo (gråtone)</ows:Title>
    <ows:WGS84BoundingBox>
        <ows:LowerCorner>4.340283 57.749118</ows:LowerCorner>
        <ows:UpperCorner>31.219161 71.250611</ows:UpperCorner>
    </ows:WGS84BoundingBox>
    <ows:Identifier>topograatone</ows:Identifier>
    <Style isDefault="true">
        <ows:Identifier>default</ows:Identifier>
    </Style>
    <Format>image/png</Format>
    <TileMatrixSetLink>
        <TileMatrixSet>utm32n</TileMatrixSet>
        <TileMatrixSetLimits>
            <TileMatrixLimits>
                <TileMatrix>utm32n:0</TileMatrix>
                <MinTileRow>0</MinTileRow>
                <MaxTileRow>0</MaxTileRow>
                <MinTileCol>0</MinTileCol>
                <MaxTileCol>0</MaxTileCol>
            </TileMatrixLimits>
            <TileMatrixLimits>
                <TileMatrix>utm32n:1</TileMatrix>
                <MinTileRow>0</MinTileRow>
                <MaxTileRow>1</MaxTileRow>
                <MinTileCol>0</MinTileCol>
                <MaxTileCol>1</MaxTileCol>
            </TileMatrixLimits>

            ..........

            <TileMatrixLimits>
                <TileMatrix>utm32n:18</TileMatrix>
                <MinTileRow>47026</MinTileRow>
                <MaxTileRow>125035</MaxTileRow>
                <MinTileCol>105059</MinTileCol>
                <MaxTileCol>179979</MaxTileCol>
            </TileMatrixLimits>
        </TileMatrixSetLimits>
    </TileMatrixSetLink>
    <TileMatrixSetLink>
        <TileMatrixSet>utm33n</TileMatrixSet>
        <TileMatrixSetLimits>
            <TileMatrixLimits>
                <TileMatrix>utm33n:0</TileMatrix>
                <MinTileRow>0</MinTileRow>
                <MaxTileRow>0</MaxTileRow>
                <MinTileCol>0</MinTileCol>
                <MaxTileCol>0</MaxTileCol>
            </TileMatrixLimits>
            <TileMatrixLimits>
                <TileMatrix>utm33n:1</TileMatrix>
                <MinTileRow>0</MinTileRow>
                <MaxTileRow>1</MaxTileRow>
                <MinTileCol>0</MinTileCol>
                <MaxTileCol>1</MaxTileCol>
            </TileMatrixLimits>

            ..........

            <TileMatrixLimits>
                <TileMatrix>utm33n:18</TileMatrix>
                <MinTileRow>50233</MinTileRow>
                <MaxTileRow>125034</MaxTileRow>
                <MinTileCol>111881</MinTileCol>
                <MaxTileCol>187170</MaxTileCol>
            </TileMatrixLimits>
        </TileMatrixSetLimits>
    </TileMatrixSetLink>
    <TileMatrixSetLink>
        <TileMatrixSet>utm35n</TileMatrixSet>
        <TileMatrixSetLimits>
            <TileMatrixLimits>
                <TileMatrix>utm35n:0</TileMatrix>
                <MinTileRow>0</MinTileRow>
                <MaxTileRow>0</MaxTileRow>
                <MinTileCol>0</MinTileCol>
                <MaxTileCol>0</MaxTileCol>
            </TileMatrixLimits>
            <TileMatrixLimits>
                <TileMatrix>utm35n:1</TileMatrix>
                <MinTileRow>0</MinTileRow>
                <MaxTileRow>1</MaxTileRow>
                <MinTileCol>0</MinTileCol>
                <MaxTileCol>1</MaxTileCol>
            </TileMatrixLimits>
            <TileMatrixLimits>
                <TileMatrix>utm35n:2</TileMatrix>
                <MinTileRow>0</MinTileRow>
                <MaxTileRow>3</MaxTileRow>
                <MinTileCol>0</MinTileCol>
                <MaxTileCol>3</MaxTileCol>
            </TileMatrixLimits>

            ..........

            <TileMatrixLimits>
                <TileMatrix>utm35n:18</TileMatrix>
                <MinTileRow>46752</MinTileRow>
                <MaxTileRow>125030</MaxTileRow>
                <MinTileCol>126062</MinTileCol>
                <MaxTileCol>200940</MaxTileCol>
            </TileMatrixLimits>
        </TileMatrixSetLimits>
    </TileMatrixSetLink>
    <TileMatrixSetLink>
        <TileMatrixSet>webmercator</TileMatrixSet>
        <TileMatrixSetLimits>
            <TileMatrixLimits>
                <TileMatrix>webmercator:0</TileMatrix>
                <MinTileRow>0</MinTileRow>
                <MaxTileRow>0</MaxTileRow>
                <MinTileCol>0</MinTileCol>
                <MaxTileCol>0</MaxTileCol>
            </TileMatrixLimits>
            <TileMatrixLimits>
                <TileMatrix>webmercator:1</TileMatrix>
                <MinTileRow>0</MinTileRow>
                <MaxTileRow>1</MaxTileRow>
                <MinTileCol>0</MinTileCol>
                <MaxTileCol>1</MaxTileCol>
            </TileMatrixLimits>

            ..........

            <TileMatrixLimits>
                <TileMatrix>webmercator:18</TileMatrix>
                <MinTileRow>55916</MinTileRow>
                <MaxTileRow>79303</MaxTileRow>
                <MinTileCol>134227</MinTileCol>
                <MaxTileCol>153810</MaxTileCol>
            </TileMatrixLimits>
        </TileMatrixSetLimits>
    </TileMatrixSetLink>
    <ResourceURL format="image/png" resourceType="tile" template="https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"/>
</Layer>
```

Under `TileMatrixSet`-elementet finner vi

- navn på Tilematrix (ows:Identifier), et for hvert zoom-nivå
- TopLeftCorner
- m.m.

```xml
<TileMatrixSet>
    <ows:Identifier>utm32n</ows:Identifier>
    <ows:BoundingBox crs="urn:ogc:def:crs:EPSG:6.3:25832">
        <ows:LowerCorner>-2000000.000000 3500000.000000</ows:LowerCorner>
        <ows:UpperCorner>3545984.000000 9045984.000000</ows:UpperCorner>
    </ows:BoundingBox>
    <ows:SupportedCRS>urn:ogc:def:crs:EPSG:6.3:25832</ows:SupportedCRS>
    <TileMatrix>
        <ows:Identifier>0</ows:Identifier>
        <ScaleDenominator>77371428.57142858207225799561</ScaleDenominator>
        <TopLeftCorner>-2000000.000000 9045984.000000</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
    </TileMatrix>
    <TileMatrix>
        <ows:Identifier>1</ows:Identifier>
        <ScaleDenominator>38685714.28571429103612899780</ScaleDenominator>
        <TopLeftCorner>-2000000.000000 9045984.000000</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>2</MatrixWidth>
        <MatrixHeight>2</MatrixHeight>
    </TileMatrix>

    ..........

    <TileMatrix>
        <ows:Identifier>18</ows:Identifier>
        <ScaleDenominator>295.14857700892861203101</ScaleDenominator>
        <TopLeftCorner>-2000000.000000 9045984.000000</TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>262144</MatrixWidth>
        <MatrixHeight>262144</MatrixHeight>
    </TileMatrix>
</TileMatrixSet>
```

## HTML/Open Layers-fil for kombinert WMS og WMTS-tjeneste

naturvern.html:

```html
<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/css/ol.css"
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

  <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/build/ol.js"></script>
  <script src="naturvern.js" type="text/javascript"></script>

</body>

</html>
```

For å lage WMTS-webkartet trenger vi

- extent (utstrekning for kartflisene i kartprojeksjonens koordinatsystem)
- resolution-verdier (antall meter en pixel dekker i terrenget)

Disse verdiene finner vi under Zoomnivå på siden

[Bruke tjenester og API-er](https://www.geonorge.no/aktuelt/om-geonorge/slik-bruker-du-geonorge/bruke-tjenester-og-api-er/)

I tabellen der vises `Tilestørelse` x/y i meter. Disse verdiene deles med 256 for å få resolutions-verdiene.

Videre finner man utstrekning under `xmin, ymin, xmax, ymax` for hvert koordinatsystem.

naturvern.js:

```js
const url = 'https://cache.kartverket.no/v1/wmts?';

const layer = 'topograatone';

// Se Zoomnivå på
// https://www.geonorge.no/aktuelt/om-geonorge/slik-bruker-du-geonorge/bruke-tjenester-og-api-er/
// Verdiene nedenfor er x/y min/max i fra tabellen der.

const extentKartverket = [-2000000, 3500000, 3545984, 9045984];

// Datum og projeksjon: EUREF89, UTM zone 32
const projection = new ol.proj.Projection({
    code: 'EPSG:25832',
    extent: extentKartverket
});

// Se Zoomnivå på
// https://www.geonorge.no/aktuelt/om-geonorge/slik-bruker-du-geonorge/bruke-tjenester-og-api-er/
// I tabellen der vises Tilestørelse x/y i meter. Disse verdiene deles med 256 for å få
// verdiene nedenfor.

const resolutionsKartverket = [
    21664, // tallet viser antall meter en pixel dekker i terrenget
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

const matrixSet = 'utm32n';
const matrixIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const center = [500000, 6777400]; // Easting, Northing
const zoom = 5;

const topograatone = new ol.layer.Tile({
    opacity: 0.7,
    source: new ol.source.WMTS({
        url: url,
        layer: layer,
        matrixSet: matrixSet,
        format: 'image/png',
        tileGrid: new ol.tilegrid.WMTS({
            extent: extentKartverket,
            resolutions: resolutionsKartverket,
            matrixIds: matrixIds
        }),
        style: 'default',
    })
});

const naturvern = new ol.layer.Tile({
    extent: extentKartverket,
    source: new ol.source.TileWMS({
        url: 'https://kart.miljodirektoratet.no/arcgis/services/vern/MapServer/WmsServer',
        params: {
            'LAYERS': 'naturvern_omrade',
            'STYLES': 'default',
            'TRANPARENT': 'true'
        },
    })
});

const map = new ol.Map({
    layers: [topograatone, naturvern],
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

[naturvern.html](docs/naturvern.html)

\
_NTNU 17.03.2025 Sverre Stikbakke_
