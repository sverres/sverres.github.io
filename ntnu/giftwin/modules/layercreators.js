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
 * Module layercreators
 * =====================
 * 
 * Creates infolayers - plots and tables
 * 
 * sverre.stikbakke@ntnu.no 22.04.2020
 */


const createLayer = layer => {

    switch (layer.layerType) {

        case "plotlayer":
            // create and call plot function
            // from layer object plotFunction string
            const currentPlotFunction =
                new Function(`${layer.plotFunction}(
                      ${JSON.stringify(layer)})`);
            currentPlotFunction();
            break;

        case "tablelayer":
            // create and call table function
            // from layer object tableFunction string
            const currentTableFunction =
                new Function(`${layer.tableFunction}(
                    ${JSON.stringify(layer)})`);
            currentTableFunction();
            break;

        case "scriptlayer":
            // create and call script function
            // from layer object scriptFunction string
            const currentScriptFunction =
                new Function(`${layer.scriptFunction}(
                ${JSON.stringify(layer)})`);
            currentScriptFunction();
            break;
    };
};

export { createLayer };
