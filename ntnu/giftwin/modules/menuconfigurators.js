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
 * Module menuconfigurators
 * =========================
 * 
 * Functions for creating menus and 
 * user interaction events.
 * 
 * sverre.stikbakke@ntnu.no 31.03.2020
 */


import { toggleLayer } from "./layertoggle.js";


const setAttributes = (targetElement, attributes) => {
    for (const [attribute, value] of attributes) {
        targetElement.setAttribute(attribute, value);
    };
};


const addMenuItem = layer => {

    const layerSwitch = document.createElement("input");
    const selected = (layer.visible === "true")
        ? ["checked", "true"]
        : ["unchecked", "true"];
    const layerSwitchAttributes = [
        ["type", "checkbox"],
        ["id", `switch_${layer.layerId}`],
        selected
    ];
    setAttributes(layerSwitch, layerSwitchAttributes);

    const layerSwitchText = document.createElement("span");
    layerSwitchText.innerText = layer.menuText;

    const menuItemLabel = document.createElement("label");
    menuItemLabel.append(layerSwitch, layerSwitchText);

    const menuItem = document.createElement("div");
    menuItem.append(menuItemLabel);

    const errMsg =
        ` Module menuconfigurator, addMenuItem, layer ${layer.layerId}, ` +
        `missing id="${layer.targetMenu}" in index.html`;

    const targetMenu = document.getElementById(layer.targetMenu);
    console.assert(targetMenu, errMsg);
    targetMenu.append(menuItem);
};


const addMenuItemEventListener = layer => {

    const layerSwitch = document.getElementById(`switch_${layer.layerId}`);

    // create a parameterless function as the addEventListener method
    // i.e. a closure with current context: the current layer object
    const currentLayerToggler = () => toggleLayer(layer);

    layerSwitch.addEventListener("click", currentLayerToggler);
};


export {
    addMenuItem,
    addMenuItemEventListener,
};
