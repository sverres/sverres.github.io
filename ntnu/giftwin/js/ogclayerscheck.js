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
 * ogclayerscheck.js
 * ==================
 * 
 * sverre.stikbakke@ntnu.no 18.01.2022
 */


"use strict";


var GIFTWIN = {};

GIFTWIN.ogcLayersChk = (() => {

    const createOgcRequestUrl = options => {

        let url;

        switch (options.ogcLayerType) {

            case 'WMS':

                url = [
                    options.serviceUrl
                    + '?SERVICE=WMS'
                    + '&FORMAT=image/png'
                    + '&VERSION=1.3.0'
                    + '&REQUEST=GetMap'
                    + '&CRS=EPSG:3857'
                    + `&BBOX=${options.sw_x},${options.sw_y},${options.ne_x},${options.ne_y}`
                    + `&WIDTH=${options.mapWidth}`
                    + `&HEIGHT=${options.mapHeight}`
                    + `&LAYERS=${options.layers}`
                    + `&STYLES=${options.styles}`
                ];
                break;

            case 'WMTS':

                url = [
                    options.serviceUrl
                    + '?SERVICE=WMTS'
                    + '&REQUEST=GetTile'
                    + '&VERSION=1.0.0'
                    + `&LAYER=${options.layer}`
                    + `&STYLE=${options.style}`
                    + `&FORMAT=image/png`
                    + `&TILEMATRIXSET=${options.tileMatrixSet}`
                    + `&TILEMATRIX=${options.tileMatrix}`
                    + `&TILECOL=${options.tileCol}`
                    + `&TILEROW=${options.tileRow}`
                ];
                break;

            case 'default':

                url = '';
        };

        return url;
    };

    return { createOgcRequestUrl };
})();
