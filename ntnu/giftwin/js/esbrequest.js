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
 * esbrequest.js
 * ==============
 * 
 * Send request to esb
 * and return json file:
 * 
 *   JWT
 *   post
 *   get
 *   checkResponse
 *   removeMessage
 *   showMessage
 * 
 * sverre.stikbakke@ntnu.no 16.06.2020
 */


"use strict";


GIFTWIN.esb = GIFTWIN.esb || {};


GIFTWIN.esb.JWT = {
    "Authorization": "",
};


GIFTWIN.esb.post = async (layer, esbApiQuery) => {

    const JWT = GIFTWIN.esb.JWT;

    const request = {
        method: 'POST',
        body: esbApiQuery,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    };


    let response = await fetch(layer.apiUrl + layer.apiEndPoint, request);

    if (!response.ok) {
        const errMsg = `{esbapirequest.js: ` +
            `${layer.apiUrl} is not found}`;
        throw new Error(errMsg);
    };

    let data = await response.json();

    // if post is used for getting JWT
    if (data.access_token) {
        JWT["Authorization"] = `Bearer ${data.access_token}`;
        return true;
    };

    // if post is used for something else 
    return data;
};


GIFTWIN.esb.get = async (layer, esbQuery) => {

    const JWT = GIFTWIN.esb.JWT;

    const fetchParam = {
        "method": "GET",
        "headers": {
            "Content-type": "application/x-www-form-urlencoded",
            "Authorization": JWT.Authorization
        }
    };

    if (!esbQuery) {
        esbQuery = layer.apiEndPoint; // default value
    };

    // if exist: remove earlier error message
    GIFTWIN.esb.removeMessage(layer.sectionId, 'error-message');

    let response = await fetch(layer.apiUrl + esbQuery, fetchParam);

    if (!response.ok) {
        const errMsg = `{esbapirequest.js: ` +
            `${layer.apiUrl} is not found}`;
        throw new Error(errMsg);
    };

    const data = await response.json();

    console.log(esbQuery);
    console.log(JSON.stringify(data));

    const errorMessage = GIFTWIN.esb.checkResponse(data);
    if (errorMessage) {
        GIFTWIN.esb.showMessage(errorMessage, layer.sectionId, 'error-message');
        return null;
    };

    return data;
};


GIFTWIN.esb.checkResponse = (data) => {

    if (Object.keys(data).length > 1 && data.status === 401) {
        return `<p><strong>Not logged in to ESB?</strong></p>`
            + `<p>${JSON.stringify(data)}</p>`;
    };

    if (Object.keys(data).length > 1 && data.status === 400) {
        return `<p><strong>Bad request:</strong></p>`
            + `<p>${JSON.stringify(data)}</p>`;
    };

    if (data.meterReadings.length === 0) {
        return '<p><strong>No data from that request</strong></p>'
            + `<p>${JSON.stringify(data)}</p>`;
    };

    return null;
};


GIFTWIN.esb.removeMessage = (sectionId, cssClass) => {

    const cssClassDotted = `.${cssClass}`;
    const section = document.getElementById(sectionId);
    const messageSection = section.querySelector(cssClassDotted);
    if (messageSection) {
        messageSection.remove();
    };
};


GIFTWIN.esb.showMessage = (message, sectionId, cssClass) => {

    const cssClassDotted = `.${cssClass}`;

    const section = document.getElementById(sectionId);
    const messageSection = section.querySelector(cssClassDotted)
        || document.createElement('div');
    messageSection.setAttribute('class', cssClass);
    messageSection.innerHTML = message;
    section.append(messageSection);
};
