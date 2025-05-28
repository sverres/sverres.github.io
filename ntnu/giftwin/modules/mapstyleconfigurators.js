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
 * Module mapstyleconfigurators
 * =============================
 * 
 * Functions for creating menu toggle
 * and user interaction events.
 * 
 * sverre.stikbakke@ntnu.no 31.03.2020
 */


import { swapMapStyle } from "./mapstyleswapper.js";


const setAttributes = (targetElement, attributes) => {
    for (const [attribute, value] of attributes) {
        targetElement.setAttribute(attribute, value);
    };
};


const addMapStyleItem = layer => {

    const mapStyleToggle = document.createElement("input");
    const selected = (layer.visible === "true")
        ? ["checked", "true"]
        : ["unchecked", "true"];
    const mapStyleToggleAttributes = [
        ["type", "radio"],
        ["name", "mapStyleToggle"],
        ["id", `switch_${layer.layerId}`],
        selected
    ];
    setAttributes(mapStyleToggle, mapStyleToggleAttributes);

    const mapStyleLabel = document.createElement("label");
    mapStyleLabel.innerText = layer.menuText;
    const mapStyleLabelAttributes = [["for", layer.layerId]];
    setAttributes(mapStyleLabel, mapStyleLabelAttributes);

    const errMsg =
        ` Module menuconfigurator, addStyleItem, layer ${layer.layerId}, ` +
        `missing id="${layer.targetMenu}" in index.html`;

    const targetMenu = document.getElementById(layer.targetMenu);
    console.assert(targetMenu, errMsg);
    targetMenu.append(mapStyleToggle, mapStyleLabel);
};


const addStyleSwapEventListener = layer => {

    const styleSwitch = document.getElementById(`switch_${layer.layerId}`);

    // create a parameterless function as the addEventListener method
    // i.e. a closure with current context: the current layer
    const currentStyleSwapper = () => {
        swapMapStyle(layer, mapboxgl.accessToken);
    };

    styleSwitch.addEventListener("click", currentStyleSwapper);
};


export {
    addMapStyleItem,
    addStyleSwapEventListener,
};
