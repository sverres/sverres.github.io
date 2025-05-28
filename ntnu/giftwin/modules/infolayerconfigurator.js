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
 * Module infolayerconfigurator
 * =============================
 * 
 * Add div element for infolayers
 * 
 * sverre.stikbakke@ntnu.no 18.04.2020
 */


const addInfoSection = layer => {

    const infoSection = document.createElement("div");
    const attributes = [
        ["class", layer.sectionCssClass],
        ["id", layer.sectionId]
    ];
    for (const [attribute, value] of attributes) {
        infoSection.setAttribute(attribute, value);
    };

    document.getElementById(layer.targetSectionId).append(infoSection);
};


export { addInfoSection };
