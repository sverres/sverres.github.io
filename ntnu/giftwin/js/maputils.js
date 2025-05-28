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
 * maputils.js
 * ============
 * 
 * sverre.stikbakke@ntnu.no 21.09.2022
 */


"use strict";

GIFTWIN = GIFTWIN || {};


GIFTWIN.mapUtils = (() => {

    const updateCursorType = (layerId) => {

        // Change the cursor to a pointer when the mouse is over the layer.
        map.on('mouseenter', layerId, () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', layerId, () => {
            map.getCanvas().style.cursor = '';
        });
    };

    return { updateCursorType };

})();