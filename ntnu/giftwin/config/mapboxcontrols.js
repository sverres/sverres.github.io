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
 * mapboxcontrols.js
 * ==================
 * 
 * Controls for the map.
 * 
 * sverre.stikbakke@ntnu.no 08.04.2020
 */


"use strict";


GIFTWIN.mapScale = new mapboxgl.ScaleControl({
    maxWidth: 300,
    unit: 'metric'
});

map.addControl(GIFTWIN.mapScale);
map.addControl(new mapboxgl.NavigationControl());
