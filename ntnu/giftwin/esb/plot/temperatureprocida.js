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
 * temperatureprocida.js
 * ======================
 * 
 * Send request to esb
 * and make plot.
 * 
 * sverre.stikbakke@ntnu.no 19.04.2021
 */


"use strict";


GIFTWIN.esb.plot = GIFTWIN.esb.plot || {};


GIFTWIN.esb.plot.temperature = (() => {

    const createDialog = GIFTWIN.esb.createDialog;
    const createPlotFromDialog = GIFTWIN.esb.createPlotFromDialog;
    const addOkButtonEventListener = GIFTWIN.esb.addOkButtonEventListener;
    const get = GIFTWIN.esb.get;
    const removePlot = GIFTWIN.esb.removePlot;

    const getCurrentTime = GIFTWIN.esb.getCurrentTime;
    const convertToLocalTime = GIFTWIN.esb.convertToLocalTime;
    const showAsLocalTime = GIFTWIN.esb.showAsLocalTime;
    const toJSONTime = GIFTWIN.esb.toJSONTime;
    const yesterday = -1;
    const tomorrow = 1;

    const requestForm = `
<form action="javascript:void(0)">
   <fieldset>
      <legend class="doc">Temperature</legend>
      <div class="input-group">
         <label for="fromDate">From date</label>
         <input type="text" value='${showAsLocalTime(getCurrentTime(yesterday))}' class="fromDate"/>
      </div>
      <div class="input-group">
         <label for="toDate">To date</label>
         <input type="text" value='${showAsLocalTime(getCurrentTime(tomorrow))}' class="toDate"/>
      </div>
      <button class="ok-button">OK</button>
   </fieldset>
</form>`;


    const submitRequestForm = async (section, layer, fetchRequestFunction) => {

        const fromDate = section.querySelector(".fromDate").value;
        const toDate = section.querySelector(".toDate").value;
        const esbQuery = `/WEATHER/`
            + `?fromDate=${toJSONTime(fromDate)}`           // 2021-02-01T00:00:00Z
            + `&measurementKind=temperature`
            + `&regionName=Procida`
            + `&toDate=${toJSONTime(toDate)}`;              // 2021-02-02T00:00:00Z
        const plotData = await fetchRequestFunction(layer, esbQuery);
        if (plotData) {
            createPlotFromDialog(layer, plotData);
        };
    };


    const fetchRequest = async (layer, esbQuery) => {

        const data = await get(layer, esbQuery);
        if (!data) {
            removePlot(layer);
            return false;
        };

        const rows = data       // rows is an array of JSON objects
        [layer.jsonLevel_1]
        [layer.jsonLevel_2]
        [layer.jsonLevel_3];

        const unpack = (rows, key) => rows.map(row => row[key]);

        let x = unpack(rows, "timestamp");
        let y = unpack(rows, "value");
        x = convertToLocalTime(x);

        const plotData = {
            traces: [{
                type: "scattergl",
                mode: "lines",
                x: x,
                y: y,
                line: { color: "#17BECF" }
            }],
            layout: {
                "title": "Temperature Procida [C]",
                "xaxis": { "tickangle": -45, "automargin": true }
            }
        };

        return plotData;
    };


    const preparePlot = (layer) => {

        const section = createDialog(layer, requestForm);

        addOkButtonEventListener(
            section,
            layer,
            submitRequestForm,
            fetchRequest
        );
    };


    return preparePlot;
})();
