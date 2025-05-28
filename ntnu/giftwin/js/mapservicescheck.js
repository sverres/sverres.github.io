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
 * mapservicescheck.js
 * ====================
 * 
 * sverre.stikbakke@ntnu.no 18.01.2022
 */


"use strict";


let wmsOptions = {
    serviceUrl: mapservices.fiskeridir_wms,
    ogcLayerType: 'WMS',
    sw_x: 1825100,
    sw_y: 10718100,
    ne_x: 1866100,
    ne_y: 10734500,
    layers: '',
    styles: 'default',
    mapWidth: 1000,
    mapHeight: 400
};

let wmtsOptions = {
    serviceUrl: mapservices.statkart_wmts,
    ogcLayerType: 'WMTS',
    layer: '',
    style: 'default',
    tileMatrixSet: 'EPSG:3857',
    tileMatrix: 'EPSG:3857:12',
    tileCol: 2234,
    tileRow: 951
};

const fiskeridir_wms = {
    name: 'fiskeridir_wms',
    serviceUrl: mapservices.fiskeridir_wms,
    getCapabilitiesUrl: '?SERVICE=WMS&VERSION=1.3&REQUEST=GETCAPABILITIES'
};

const nve_wms = {
    name: 'nve_wms',
    serviceUrl: mapservices.nve_wms,
    getCapabilitiesUrl: '?SERVICE=WMS&VERSION=1.3&REQUEST=GETCAPABILITIES'
};

const statkart_wmts = {
    name: 'statkart_wmts',
    serviceUrl: mapservices.statkart_wmts,
    getCapabilitiesUrl: '?SERVICE=WMTS&VERSION=1.3&REQUEST=GETCAPABILITIES'
};

wmsOptions.layers = 'flate_ihht_akvakulturregisteret';
const flate_ihht_akvakulturregisteret = GIFTWIN.ogcLayersChk.createOgcRequestUrl(wmsOptions);

wmsOptions.layers = 'akvakultur_lokaliteter';
const akvakultur_lokaliteter = GIFTWIN.ogcLayersChk.createOgcRequestUrl(wmsOptions);

wmsOptions.serviceUrl = mapservices.nve_wms;
wmsOptions.layers = 'Distribusjonsnett';
const distribusjonsnett = GIFTWIN.ogcLayersChk.createOgcRequestUrl(wmsOptions);

wmsOptions.layers = 'Sjokabler';
const sjokabler = GIFTWIN.ogcLayersChk.createOgcRequestUrl(wmsOptions);

wmsOptions.sw_y = 10718100 - 70000;
wmsOptions.ne_y = 10734500 - 70000;

wmsOptions.layers = 'Transformatorstasjoner';
const transformatorstasjoner = GIFTWIN.ogcLayersChk.createOgcRequestUrl(wmsOptions);

wmsOptions.layers = 'Regionalnett';
const regionalnett = GIFTWIN.ogcLayersChk.createOgcRequestUrl(wmsOptions);

wmsOptions.layers = 'Sentralnett';
const sentralnett = GIFTWIN.ogcLayersChk.createOgcRequestUrl(wmsOptions);

wmtsOptions.layer = 'norgeskart_bakgrunn';
const norgeskart_bakgrunn = GIFTWIN.ogcLayersChk.createOgcRequestUrl(wmtsOptions);

wmtsOptions.layer = 'toporaster4';
const toporaster4 = GIFTWIN.ogcLayersChk.createOgcRequestUrl(wmtsOptions);

const serviceLayerGetCapabilities = `
<table class="pure-table pure-table-bordered">
    <thead>
        <tr>
            <td>Map Service</td>
            <td>GetCapabilities url</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>${fiskeridir_wms.name}</td>
            <td><a href="${fiskeridir_wms.serviceUrl + fiskeridir_wms.getCapabilitiesUrl}">
                ${fiskeridir_wms.serviceUrl + fiskeridir_wms.getCapabilitiesUrl}</a></td>
        </tr>
        <tr>
            <td>${nve_wms.name}</td>
            <td><a href="${nve_wms.serviceUrl + nve_wms.getCapabilitiesUrl}">
                ${nve_wms.serviceUrl + nve_wms.getCapabilitiesUrl}</a></td>
        </tr>
        <tr>
            <td>${statkart_wmts.name}</td>
            <td><a href="${statkart_wmts.serviceUrl + statkart_wmts.getCapabilitiesUrl}">
                ${statkart_wmts.serviceUrl + statkart_wmts.getCapabilitiesUrl}</a></td>
        </tr>
    </tbody>
</table>`

const serviceLayerDisplay = `
<table class="pure-table pure-table-bordered">
    <tbody>
        <tr>
            <td><img src=${flate_ihht_akvakulturregisteret}></td>
            <td><a href="${flate_ihht_akvakulturregisteret}">${flate_ihht_akvakulturregisteret}</a></td>
        </tr>
        <tr>
            <td><img src=${akvakultur_lokaliteter}></td>
            <td><a href="${akvakultur_lokaliteter}">${akvakultur_lokaliteter}</a></td>
        </tr>
        <tr>
            <td><img src=${distribusjonsnett}></td>
            <td><a href="${distribusjonsnett}">${distribusjonsnett}</a></td>
        </tr>
        <tr>
            <td><img src=${sjokabler}></td>
            <td><a href="${sjokabler}">${sjokabler}</a></td>
        </tr>
        <tr>
            <td><img src=${transformatorstasjoner}></td>
            <td><a href="${transformatorstasjoner}">${transformatorstasjoner}</a></td>
        </tr>
        <tr>
            <td><img src=${regionalnett}></td>
            <td><a href="${regionalnett}">${regionalnett}</a></td>
        </tr>
        <tr>
            <td><img src=${sentralnett}></td>
            <td><a href="${sentralnett}">${sentralnett}</a></td>
        </tr>
        <tr>
            <td><img src=${norgeskart_bakgrunn}></td>
            <td><a href="${norgeskart_bakgrunn}">${norgeskart_bakgrunn}</a></td>
        </tr>
        <tr>
            <td><img src=${toporaster4}></td>
            <td><a href="${toporaster4}">${toporaster4}</a></td>
        </tr>
    </tbody>
</table>`

document.getElementById("ogc-services").innerHTML = serviceLayerGetCapabilities;
document.getElementById("ogc-maps").innerHTML = serviceLayerDisplay;
