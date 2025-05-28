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
 * Module togglemaplayers
 * =======================
 * 
 * Function for turning on and off ordinary 
 * mapbox map layers
 * 
 * sverre.stikbakke@ntnu.no 30.04.2020
 */


const toggleMapLayer = layer => {
    const currentVisibility =
        map.getLayoutProperty(layer.layerId, "visibility");

    if (currentVisibility === "visible") {
        map.setLayoutProperty(
            layer.layerId,
            "visibility",
            "none"
        );
        layer.visible = "false";
    } else {
        map.setLayoutProperty(
            layer.layerId,
            "visibility",
            "visible"
        );
        layer.visible = "true";
    };
};


export { toggleMapLayer };
