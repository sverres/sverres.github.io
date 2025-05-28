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
 * digitaltwinoptions.js
 * ======================
 * 
 * Configuration parameters for the digital twin.
 * 
 * sverre.stikbakke@ntnu.no 08.04.2020
 */


"use strict";


var GIFTWIN = (() => {

    const siteOptions = {

        "gift": {
            "layersConfigUrl": "./site_gift/config/layers.json",
            "mapMarkersUrl": "./site_gift/data/mapmarkers.geojson",
            "mapMarkerCssClass": "mapboxgl-marker"
        },

        "grytoya": {
            "layersConfigUrl": "./site_grytoya/config/layers.json",
            "mapMarkersUrl": "./site_grytoya/data/mapmarkers.geojson",
            "mapMarkerCssClass": "mapboxgl-marker",
            "numberOfLayers": 27
        },

        "procida": {
            "layersConfigUrl": "./site_procida/config/layers.json",
            "mapMarkersUrl": "./site_procida/data/mapmarkers.geojson",
            "mapMarkerCssClass": "mapboxgl-marker",
            "numberOfLayers": 19
        },

        "mjosa": {
            "layersConfigUrl": "./site_mjosa/config/layers.json",
            "mapMarkersUrl": "./site_mjosa/data/mapmarkers.geojson",
            "mapMarkerCssClass": "mapboxgl-marker",
            "numberOfLayers": 13
        }

    };

    let site = null;
    let layerCount =  0;

    return { siteOptions, site, layerCount };
})();
