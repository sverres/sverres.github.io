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
 * mdmsactiveenergy.js
 * ====================
 * 
 * Send request to esb
 * and make plot.
 * 
 * sverre.stikbakke@ntnu.no 19.04.2021
 */


"use strict";


GIFTWIN.esb.plot = GIFTWIN.esb.plot || {};


GIFTWIN.esb.plot.mdmsActiveEnergy = (() => {

    const createDialog = GIFTWIN.esb.createDialog;
    const createPlotFromDialog = GIFTWIN.esb.createPlotFromDialog;
    const addOkButtonEventListener = GIFTWIN.esb.addOkButtonEventListener;
    const get = GIFTWIN.esb.get;
    const removePlot = GIFTWIN.esb.removePlot;


    const requestForm = `
 <form action="javascript:void(0)">
    <fieldset>
       <legend class="doc">MDMS - Active energy - Chiaiolella sewer</legend>
       <div class="input-group">
          <label for="fromDate">From date</label>
          <input type="text" value="2022-01-20T00:00:00Z" class="fromDate"/> 
       </div>
       <div class="input-group">
          <label for="toDate">To date</label>
          <input type="text" value="2022-01-21T00:00:00Z" class="toDate"/>
       </div>
       <button class="ok-button">OK</button>
    </fieldset>
 </form>`;


    const submitRequestForm = async (section, layer, fetchRequestFunction) => {

        const fromDate = section.querySelector(".fromDate").value;
        const toDate = section.querySelector(".toDate").value;
        const esbQuery = `/MDMS/`
            + `?fromDate=${fromDate}`           // 2021-02-01T00:00:00Z
            + `&measurementKind=activeEnergy`
            + `&meterIdList=Sewer_Chiaiolella_street_C`
            + `&regionName=Procida`
            + `&toDate=${toDate}`;              // 2021-02-02T00:00:00Z
        console.log(esbQuery);
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

        const plotData = {
            traces: [{
                type: "bar",
                //mode: "lines",
                x: unpack(rows, "timestamp"),
                y: unpack(rows, "value"),
                line: { color: "#17BECF" }
            }],
            layout: {
                "title": "Active Energy [kWh]",
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
