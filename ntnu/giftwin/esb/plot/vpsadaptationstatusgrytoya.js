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
 * vpsadaptationstatusgrytoya.js
 * ==============================
 * 
 * Send request to esb
 * and make plot.
 * 
 * sverre.stikbakke@ntnu.no 22.04.2021
 */


"use strict";


GIFTWIN.esb.plot = GIFTWIN.esb.plot || {};


GIFTWIN.esb.plot.vpsAdaptationStatusGrytoya = (() => {

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
    const tomorrow = 1;

    const requestForm = `
<form action="javascript:void(0)">
   <fieldset>
      <legend class="doc">VPS - adaptation status</legend>
      <div class="input-group">
         <label for="fromDate">From date</label>
         <input type="text" value='${showAsLocalTime(getCurrentTime(yesterday))}' class="fromDate"/>
      </div>
      <div class="input-group">
         <label for="toDate">To date</label>
         <input type="text" value='${showAsLocalTime(getCurrentTime(today))}' class="toDate"/>
      </div>
      <div class="input-group">
      <label for="meterId">Flex provider</label>
      <input list="vpsId" class="meterId" placeholder="Select from list or edit"/>
      <datalist id="vpsId">
            <option value="6-PIE-001">Lundenes School</option>
            <option value="6-PIE-002">Bjarkøy School</option>
            <option value="6-PIE-003">Kindergarten heating cables</option>
            <option value="6-PPE-001">Lundenes School1 charger (6-PPE-001)</option>
            <option value="6-PPE-002">Lundenes School1 charger (6-PPE-002)</option>
            <option value="6-PPE-003">Private charger</option>
            <option value="6-PRE-CD-001">Elestor</option>
            <option value="1382">Wholesaler freezers</option>
            <option value="1395">HLK boilers</option>
            <option value="0430">6-CDEMS-002 - Hafen</option>
            <option value="0360">6-CEMS-003 - Etrel</option>
            <option value="62">62</option>
            <option value="91">91</option>
            <option value="93">93</option>
            <option value="94">94</option>
            <option value="301">301</option>
      </datalist>
      <button class="ok-button">OK</button>
   </fieldset>
</form>`;


    const submitRequestForm = async (section, layer, fetchRequestFunction) => {

        const fromDate = section.querySelector(".fromDate").value;
        const toDate = section.querySelector(".toDate").value;
        const meterId = section.querySelector(".meterId").value;
        const esbQuery = `/VPS/`
            + `?fromDate=${toJSONTime(fromDate)}`           // 2021-02-01T00:00:00Z
            + `&measurementKind=adaptationStatus`
            + `&meterIdList=${meterId}`
            + `&phase=ABC`
            + `&regionName=Grytoya`
            + `&toDate=${toJSONTime(toDate)}`;              // 2021-02-02T00:00:00Z
        console.log('esbQuery:', esbQuery);
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
                type: "bar",
                //mode: "lines",
                x: x,
                y: y,
                line: { color: "#17BECF" }
            }],
            layout: {
                "title": "VPS adaptation status [code]",
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
