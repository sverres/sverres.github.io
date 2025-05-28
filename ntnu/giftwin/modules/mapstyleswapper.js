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
 * Module mapstyleswapper
 * =======================
 * 
 * Function for changing map style
 * 
 * sverre.stikbakke@ntnu.no 31.03.2020
*/


const swapMapStyle = async (newStyle, accessToken) => {

    const currentStyle = map.getStyle();
    const newStyleUrl = `https://api.mapbox.com/styles/v1/mapbox/`
        + `${newStyle.layerId}?access_token=${accessToken}`;

    const newStyleUrlResponse = await fetch(newStyleUrl);

    if (newStyleUrlResponse.ok) {

        const newStyle = await newStyleUrlResponse.json();

        // ensure any sources from the current style 
        // are copied across to the new style

        newStyle.sources = Object.assign({},
            currentStyle.sources,
            newStyle.sources);

        const currentLayers = currentStyle.layers;
        for (const layer of currentLayers) {
            const isMapBoxLayer = ["composite", "mapbox"].includes(layer.source);
            if (layer.source && !isMapBoxLayer) {
                newStyle.layers.push(layer);
            };
        };

        map.setStyle(newStyle);

    } else {

        const errMsg = ` Module mapstyleswapper: ` +
            `${newStyleUrl} is not found`;
        throw new Error(errMsg);
    };
};


export { swapMapStyle };
