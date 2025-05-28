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
 * Module featureinfolayerconfigurator
 * ====================================
 * 
 * Add getfeatureinfo parameters to 
 * featureInfoConfig.infoLayers
 * 
 * sverre.stikbakke@ntnu.no 26.11.2020
 */


const addFeatureInfoLayer = layer => {

    if (layer.queryable == "true") {

        GIFTWIN.featureInfoConfig.infoLayers.set(layer.layerId, {
            layerId: layer.layerId,
            serviceUrl: layer.serviceUrl,
            layers: layer.layers,
            styles: layer.styles,
            query_layers: layer.query_layers,
            info_format: layer.info_format
        });
    };
};


export { addFeatureInfoLayer };