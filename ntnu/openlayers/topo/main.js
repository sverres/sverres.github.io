import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import {register} from 'ol/proj/proj4.js';
import proj4 from 'proj4';

proj4.defs("EPSG:25833","+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
register(proj4);

const extentKartverketWMS25833 = [-2500000, 3500000, 3045984, 9045984];

const topo = new TileLayer({
  extent: extentKartverketWMS25833,
  source: new TileWMS({
    url: 'https://wms.geonorge.no/skwms1/wms.topo?',
    params: {
      'LAYERS': 'topo',
      'STYLES': 'default'
    },
  }),
});

const map = new Map({
  layers: [topo],
  target: document.getElementById('map'),
  view: new View({
    projection: 'EPSG:25833',
    center: [194414, 6697365],
    maxZoom: 19,
    zoom: 10,
  }),
});
