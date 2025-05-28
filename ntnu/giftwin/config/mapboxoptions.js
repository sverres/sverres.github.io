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
 * mapboxoptions.js
 * =================
 * 
 * Configuration parameters for the map.
 * 
 * sverre.stikbakke@ntnu.no 31.03.2020
 */


"use strict";


GIFTWIN.mapboxSiteOptions = {

    "gift": {
        container: "map",
        style: "mapbox://styles/mapbox/light-v10",
        center: [22.966667, 59.833333],
        zoom: 3
    },

    "grytoya": {
        container: "map",
        style: "mapbox://styles/mapbox/light-v10",
        //style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
        center: [16.5092491, 68.8887863],
        zoom: 10
    },

    "procida": {
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [14.014220237731934, 40.75544960889313],
        zoom: 14
    },

    "mjosa": {
        container: "map",
        style: "mapbox://styles/mapbox/light-v10",
        center: [10.83296750, 60.72003847],
        zoom: 11
    }

}

GIFTWIN.mapWindow = document.getElementById('map');

GIFTWIN.mapLoadTimeouts = [0, 200, 400, 800, 1200, 1600, 2000, 2400, 2800, 3200,
    4000, 6000, 10000, 15000, 25000]; // ms

mapboxgl.accessToken = 'pk.eyJ1Ijoic3ZlcnJlc3QiLCJhIjoiY2l1Y2VqcmRzMDAxMTJ0cGl6c3ZteGozMyJ9.ieY0kEubUisIWVVwjZiuBg';
