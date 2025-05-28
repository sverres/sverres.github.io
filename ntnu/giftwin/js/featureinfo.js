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
 * getfeatureinfo.js
 * ==================
 * 
 * Creates click-event with getfeatureinfo-request
 * getfeatureinfo is part of Web Map Service specification
 * 
 * External dependencies:
 * 
 *  map - defined in html file
 *  infoLayers - Map-objekt with layer information
 *  createHtmlTable - function
 *  
 * 
 * proj4js is used for coordinate transformation:
 * http://proj4js.org/
 * 
 * sverre.stikbakke@ntnu.no 10.11.2020
 */


"use strict";


GIFTWIN.featureInfo = (() => {

    const featureInfoConfig = GIFTWIN.featureInfoConfig;


    const toWebMercator = lngLat => {
        return proj4('EPSG:4326', 'EPSG:3857', [lngLat.lng, lngLat.lat]);
    };


    const getFeatureInfo = async getFeatureInfoUrl => {

        const response = await fetch(getFeatureInfoUrl);
        if (response.ok) {
            return response;
        };
    };


    const createGetFeatureInfoUrl = options => {

        const getFeatureInfoUrl =
            `${options.serviceUrl}`
            + '?VERSION=1.3.0'
            + '&REQUEST=GetFeatureInfo'
            + `&LAYERS=${options.layers}`
            + `&STYLES=${options.styles}`
            + '&CRS=EPSG:3857'
            + `&BBOX=${options.sw_x},${options.sw_y},${options.ne_x},${options.ne_y}`
            + `&WIDTH=${options.mapWidth}`
            + `&HEIGHT=${options.mapHeight}`
            + '&FORMAT=image/png'
            + `&QUERY_LAYERS=${options.query_layers}`
            + `&INFO_FORMAT=${options.info_format}`
            + `&I=${options.x}`
            + `&J=${options.y}`;
        console.log(getFeatureInfoUrl);
        return getFeatureInfoUrl;
    };


    map.on('click', async e => {

        let sw_x, sw_y, ne_x, ne_y;
        [sw_x, sw_y] = toWebMercator(map.getBounds().getSouthWest());
        [ne_x, ne_y] = toWebMercator(map.getBounds().getNorthEast());

        const mapContainerId = document.getElementById(map.getContainer().id);
        const mapContainerStyle = window.getComputedStyle(mapContainerId);
        const mapWidth = parseInt(mapContainerStyle.getPropertyValue('width').replace('px', ''));
        const mapHeight = parseInt(mapContainerStyle.getPropertyValue('height').replace('px', ''));

        for (const layer of featureInfoConfig.infoLayers.values()) {

            const currentVisibility =
                map.getLayoutProperty(layer.layerId, "visibility");

            if (currentVisibility != "visible") {
                continue;
            };

            let featureInfoString = null;
            let featureInfoHasContent = null;

            const getFeatureInfoOptions = {
                serviceUrl: layer.serviceUrl,
                layers: layer.layers,
                styles: layer.styles,
                sw_x: sw_x,
                sw_y: sw_y,
                ne_x: ne_x,
                ne_y: ne_y,
                mapWidth: mapWidth,
                mapHeight: mapHeight,
                query_layers: layer.query_layers,
                info_format: layer.info_format,
                x: parseInt(e.point.x),
                y: parseInt(e.point.y),
            };

            const getFeatureInfoUrl = createGetFeatureInfoUrl(getFeatureInfoOptions);
            const getFeatureInfoResponse = await getFeatureInfo(getFeatureInfoUrl);

            switch (layer.info_format) {

                case 'text/html':

                    const featureInfoHTML = await getFeatureInfoResponse.text();
                    featureInfoHasContent = !featureInfoHTML.includes("<body></body>");
                    if (featureInfoHasContent) {
                        featureInfoString = `<div style="font-size:large">
                            ${featureInfoHTML}
                        </div>`;
                    };
                    break;


                case 'text/plain':

                    const featureInfoText = await getFeatureInfoResponse.text();
                    featureInfoHasContent = !featureInfoText.includes("no results");
                    if (featureInfoHasContent) {
                        featureInfoString = `<div style="font-size:medium">
                            <pre>${featureInfoText}</pre>
                        </div>`;
                    };
                    break;


                case 'application/geo%2bjson':

                    const featureInfoJSON = await getFeatureInfoResponse.json();
                    featureInfoHasContent = featureInfoJSON["features"].length > 0;
                    if (featureInfoHasContent) {
                        const featureProperties = featureInfoJSON["features"][0]["properties"];
                        console.log(JSON.stringify(featureProperties, null, 2))
                        featureInfoString = featureInfoConfig.createHtmlTable(
                            layer.layerId, featureProperties);
                    };
                    break;

                default:

                    const featureInfoDefaultFormat = await getFeatureInfoResponse.text();
                    featureInfoHasContent = !featureInfoDefaultFormat.includes("no results");
                    if (featureInfoHasContent) {
                        featureInfoString = `<div style="font-size:medium">
                            <pre>${featureInfoDefaultFormat}</pre>
                        </div>`;
                    };

            };

            if (featureInfoHasContent) {
                new mapboxgl.Popup({ maxWidth: 'none' })
                    .setLngLat(e.lngLat)
                    .setHTML(featureInfoString)
                    .addTo(map);
            };
        };
    });


    // Change the cursor to a pointer when the mouse is over the map.
    map.on('mouseover', () => {
        map.getCanvas().style.cursor = 'pointer';
    });


    // Change it back to standard cursor when it leaves.
    map.on('mouseleave', () => {
        map.getCanvas().style.cursor = '';
    });

})();