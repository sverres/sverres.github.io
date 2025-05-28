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
 * esbplot.js
 * ===========
 * 
 * Utility functions:
 * 
 * Send request to esb
 * and make plot.
 * 
 * sverre.stikbakke@ntnu.no 06.04.2021
 */


"use strict";


GIFTWIN.esb = GIFTWIN.esb || {};


GIFTWIN.esb.removePlot = (layer) => {

    const sectionId = layer.sectionId;
    const plotSectionId = `${sectionId}-plot`;

    const plot = document.getElementById(plotSectionId);
    if (plot) {
        plot.remove();
    };
};


GIFTWIN.esb.createDialog = (layer, requestFormHtml) => {

    const sectionId = layer.sectionId;
    const dialogSectionId = `${sectionId}-dialog`;

    const section = document.getElementById(sectionId);
    const dialogExists = section.hasChildNodes();

    if (!dialogExists) {
        const dialog = document.createElement("div");
        dialog.setAttribute('id', dialogSectionId);
        dialog.setAttribute('class', 'fluid');
        dialog.innerHTML = requestFormHtml;
        section.append(dialog);
    };

    return section;
};


GIFTWIN.esb.createPlotFromDialog = (layer, plotData) => {

    const sectionId = layer.sectionId;
    const dialogSectionId = `${sectionId}-dialog`;
    const plotSectionId = `${sectionId}-plot`;

    const dialog = document.getElementById(dialogSectionId);
    const plotExists = dialog.contains(document.getElementById(plotSectionId));

    if (plotExists) {
        const plotSection = document.getElementById(plotSectionId);
        Plotly.react(plotSection, plotData.traces, plotData.layout);
    } else {
        const plotSection = document.createElement("div");
        plotSection.setAttribute('id', plotSectionId);
        dialog.append(plotSection);
        Plotly.newPlot(plotSection, plotData.traces, plotData.layout);
    };
};


GIFTWIN.esb.createPlot = (layer, plotData) => {

    const sectionId = layer.sectionId;
    const plotSectionId = `${layer.sectionId}-plot`;

    const section = document.getElementById(sectionId);
    const plotExists = section.contains(document.getElementById(plotSectionId));

    if (plotExists) {
        const plotSection = document.getElementById(plotSectionId);
        Plotly.react(plotSection, plotData.traces, plotData.layout, { displayModeBar: false });
    } else {
        const plotSection = document.createElement("div");
        plotSection.setAttribute('id', plotSectionId)
        section.append(plotSection);
        Plotly.newPlot(plotSection, plotData.traces, plotData.layout, { displayModeBar: false });
    };
};


GIFTWIN.esb.createGaugePlot = (layer, plotData) => {

    const sectionId = layer.sectionId;
    const plotSectionId = `${sectionId}-plot`;

    const section = document.getElementById(sectionId);
    const plotExists = section.contains(document.getElementById(plotSectionId));

    if (plotExists) {
        const plotSection = document.getElementById(plotSectionId);
        Plotly.react(plotSection, plotData)
    } else {
        const plotSection = document.createElement("div");
        plotSection.setAttribute('id', plotSectionId)
        section.append(plotSection);
        Plotly.newPlot(plotSection, plotData);
    };
}


GIFTWIN.esb.addOkButtonEventListener = (section, layer, esbRequestFunction, plotDataConfigurator) => {

    const okButton = section.querySelector('.ok-button');
    const esbQuery = () => esbRequestFunction(section, layer, plotDataConfigurator);
    okButton.addEventListener('click', esbQuery);
};


GIFTWIN.esb.getCurrentTime = (addDayCount) => {

    var date = new Date();
    date.setDate(date.getDate() + addDayCount);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const JSONDate = date.toJSON();
    const javaDate = JSONDate.replace('00.000Z', '00Z');
    return javaDate;  // 2021-12-14T13:36:09Z  (UTC time)
};


GIFTWIN.esb.showAsLocalTime = (timestamp) => {

    const date = new Date(timestamp);
    const localTimeString = date.toString();
    // Thu May 04 2023 09:03:24 GMT+0200 (Central European Summer Time)

    const strippedLocalTimeString = localTimeString.substring(0, localTimeString.indexOf('('));
    // Thu May 04 2023 09:03:24 GMT+0200

    return strippedLocalTimeString;
};


GIFTWIN.esb.toJSONTime = (timestamp) => {

    const date = new Date(timestamp);

    const UTCTimeJSON = date.toJSON();
    const UTCTimeJava = UTCTimeJSON.replace('00.000Z', '00Z');

    return UTCTimeJava;
};


GIFTWIN.esb.convertToLocalTime = (timestamps) => {

    const currentTime = new Date;
    const offsetMinutes = currentTime.getTimezoneOffset();
    const offsetHours = Math.floor(offsetMinutes / 60);

    const localTimestamps = timestamps.map((timestamp) => {
        const date = new Date(timestamp);
        date.setHours(date.getHours() - offsetHours);
        const localTimeJSON = date.toJSON();
        const localTimeJava = localTimeJSON.replace('00.000Z', '00Z');

        return localTimeJava;
    });

    console.log('UTC time:   ', timestamps[0]);
    console.log('Local time: ', localTimestamps[0]);

    return localTimestamps;
};
