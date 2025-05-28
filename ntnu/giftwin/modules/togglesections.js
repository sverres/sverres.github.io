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
 * Module togglesections
 * ======================
 * 
 * Function for turning on and off section layer
 * i.e. change visibility property on div element
 * 
 * sverre.stikbakke@ntnu.no 30.04.2020
 */


const toggleSection = layer => {

    if (layer.visible === "true") {
        document.getElementById(layer.sectionId)
            .style.display = "none";
        layer.visible = "false";
    } else {
        document.getElementById(layer.sectionId)
            .style.display = "flex";
        layer.visible = "true";
    };
};

export { toggleSection };
