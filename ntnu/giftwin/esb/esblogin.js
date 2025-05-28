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
 * esblogin.js
 * ============
 * 
 * Send request to esb
 * and return json file
 * 
 * sverre.stikbakke@ntnu.no 17.09.2020
 */


"use strict";


GIFTWIN.esb = GIFTWIN.esb || {};


GIFTWIN.esb.getAccessToken = async layer => {

    const post = GIFTWIN.esb.post;

    const s1 = "username=";
    const s2 = encodeURI("password=");

    const esbApiQuery = s1 + "&" + s2;

    const accessGranted = await post(layer, esbApiQuery);

    const errMsg = "esblogin.js: Error in obtaining ESB JWT access token";

    console.assert(accessGranted, errMsg);

    const section = document.getElementById(layer.sectionId);
    const paragraph = document.createElement("p")
    const dataString = document.createTextNode("Access granted for 1 hour");
    paragraph.appendChild(dataString);
    section.appendChild(paragraph);
};


GIFTWIN.addLoginSection = layer => {

    const getJwt = GIFTWIN.esb.getAccessToken;

    const loginSection = document.getElementById(layer.sectionId);
    const loginDialogExists = loginSection.hasChildNodes();

    if (!loginDialogExists) {

        const loginButton = document.createElement("button");
        const buttonText = document.createTextNode("Get ESB access token");
        loginButton.append(buttonText);
        loginSection.append(loginButton);

        // create a parameterless function as the addEventListener method
        // i.e. a closure with current context: the current layer object
        const getAccessToken = () => {
            getJwt(layer);
        };

        loginButton.addEventListener("click", getAccessToken);
    };
};
