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
 * scadaactivepowerprocida.js
 * ===========================
 * 
 * Send request to esb
 * and make plot.
 * 
 * sverre.stikbakke@ntnu.no 19.04.2021
 */


"use strict";


GIFTWIN.esb.plot = GIFTWIN.esb.plot || {};


GIFTWIN.esb.plot.scadaActivePower = (() => {

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
    const today = 0;

    const requestForm = `
<form action="javascript:void(0)">
<fieldset>
<legend class="doc">SCADA - active power</legend>
<div class="input-group">
<label for="fromDate">From date</label>
<input type="text" value='${showAsLocalTime(getCurrentTime(yesterday))}' class="fromDate"/>
</div>
<div class="input-group">
<label for="toDate">To date</label>
<input type="text" value='${showAsLocalTime(getCurrentTime(today))}' class="toDate"/>
</div>
<div class="input-group">
<label for="meterId">Meter id</label>
<input list="meterIdsSCADAactivePower" class="meterId" placeholder="Select from list or edit"/>
<datalist id="meterIdsSCADAactivePower">
<option value="D620240232102">D620240232102</option>
<option value="D620247461302">D620247461302</option>
<option value="D620256441902">D620256441902</option>
<option value="D620258015602">D620258015602</option>
<option value="D620263606302">D620263606302</option>
<option value="A00075">A00075</option>
<option value="A00082">A00082</option>
<option value="A00083">A00083</option>
<option value="A00085">A00085</option>
</datalist>
</div>
<button class="ok-button">OK</button>
</fieldset>
</form>`;


    const submitRequestForm = async (section, layer, fetchRequestFunction) => {

        const fromDate = section.querySelector(".fromDate").value;
        const toDate = section.querySelector(".toDate").value;
        const meterId = section.querySelector(".meterId").value;
        const esbQuery = `/SCADA/`
            + `?fromDate=${toJSONTime(fromDate)}`           // 2021-02-01T00:00:00Z
            + `&measurementKind=activePower`
            + `&meterIdList=${meterId}`
            + `&phase=ABC`
            + `&regionName=Procida`
            + `&toDate=${toJSONTime(toDate)}`;              // 2021-02-02T00:00:00Z
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
                "title": "Active Power [kW]",
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
