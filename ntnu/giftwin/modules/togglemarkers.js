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
 * Module tooglemarkers
 * =====================
 * 
 * Function for turning on and off map marker layer
 * 
 * sverre.stikbakke@ntnu.no 30.04.2020
 */


import {
    getMarkers,
    hideMarkers,
    showMarkers
}
    from "./markerconfigurators.js";


const toggleMarkers = layer => {

    const mapMarkerCssClass = GIFTWIN.site.mapMarkerCssClass;

    if (layer.visible === "true") {
        hideMarkers(mapMarkerCssClass);
        layer.visible = "false";
    } else {
        getMarkers();
        showMarkers(mapMarkerCssClass);
        layer.visible = "true";
    };
};

export { toggleMarkers };
