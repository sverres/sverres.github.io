const url = 'https://cache.kartverket.no/v1/wmts?';

const layer = 'topograatone';

const extentKartverket = [-2000000, 3500000, 3545984, 9045984];

// Datum og projeksjon: EUREF89, UTM zone 32
const projection = new ol.proj.Projection({
    code: 'EPSG:25832',
    extent: extentKartverket
});

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