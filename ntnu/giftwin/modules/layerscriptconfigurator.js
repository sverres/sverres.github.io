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
 * Module layerscriptconfigurator
 * ===============================
 * 
 * Add script element with src attribute 
 * for layer javascript file
 * 
 * sverre.stikbakke@ntnu.no 13.04.2020
 */


const isScriptLoaded = (url) => {

    const scripts = document.getElementsByTagName('script');

    for (const script of scripts) {
        if (script.src.split('/').pop() === url.split('/').pop()) {
            return true;
        };
    };

    return false;
};


const addScriptItem = layer => {

    const layerHasLayerUrl = Boolean(layer.layerUrl);

    const errMsg = ` Module layerscriptconfigurator, layer ${layer.layerId} ` +
        `has no layerUrl info`;
    console.assert(layerHasLayerUrl, errMsg);

    if (layerHasLayerUrl) {
        const scriptNotLoaded = !isScriptLoaded(layer.layerUrl);
        if (scriptNotLoaded) {
            const scriptElement = document.createElement("script");
            scriptElement.setAttribute("src", layer.layerUrl);

            document.body.append(scriptElement);
        };
    };
};


export { addScriptItem };
