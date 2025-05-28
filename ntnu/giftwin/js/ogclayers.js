/**
 * GIFT - Geographical Islands FlexibiliTy
 * 
 * This project has received funding from 
 * the European Union's Horizon 2020 
 * research and innovation program under 
 * grant agreement No 824410.
 * 
 * Part of deliverable D3.10 GIS digital twin
 * 
 * NTNU - Norway
 * 
 * ogclayers.js
 * =============
 * 
 * sverre.stikbakke@ntnu.no 08.12.2020
 */


"use strict";


GIFTWIN.ogcLayers = (() => {

    const addOgcLayer = options => {

        let tiles;

        switch (options.ogcLayerType) {

            case 'WMS':

                tiles = [
                    options.serviceUrl
                    + '?BBOX={bbox-epsg-3857}'
                    + '&FORMAT=image/png'
                    + '&VERSION=1.3.0'
                    + '&REQUEST=GetMap'
                    + '&CRS=EPSG:3857'
                    + '&WIDTH=256'
                    + '&HEIGHT=256'
                    + `&LAYERS=${options.layers}`
                    + `&STYLES=${options.styles}`
                    + '&TRANSPARENT=TRUE'
                ];
                break;

            case 'WMTS':

                tiles = [
                    options.serviceUrl
                    + '?SERVICE=WMTS'
                    + '&REQUEST=GetTile'
                    + '&VERSION=1.0.0'
                    + `&LAYER=${options.layer}`
                    + `&STYLE=${options.style}`
                    + '&FORMAT=image/png'
                    + '&TILEMATRIXSET=webmercator'
                    + '&TILEMATRIX={z}'
                    + '&TILECOL={x}'
                    + '&TILEROW={y}'
                ];
                break;

            case 'default':
        };


        map.addLayer({
            'id': options.layerId,
            'type': 'raster',
            'source': {
                'type': 'raster',
                'minzoom': options.minZoomThreshold,
                'tiles': tiles,
                'tileSize': 256
            },
            'layout': {
                'visibility': 'none'
            },
            'paint': {}
        });
        //console.log(`layer loaded: ${options.layerId}`);
    };

    return { addOgcLayer };
})();
