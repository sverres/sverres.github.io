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
 * esbgetdata.js
 * ==============
 * 
 * Send request to esb
 * and forward data to visialization.
 * 
 * sverre.stikbakke@ntnu.no 19.09.2020
 */


"use strict";


GIFTWIN.esb = GIFTWIN.esb || {};


GIFTWIN.esb.getTableData = async layer => {

    const get = GIFTWIN.esb.get;

    const esbQuery = null;
    const data = await get(layer, esbQuery);
    if (data) {
        GIFTWIN.tableUtils.createTable(data, layer);
    };
    
    return null;
};
