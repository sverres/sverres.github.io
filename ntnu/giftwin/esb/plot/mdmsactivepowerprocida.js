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
 * mdmsactivepowerprocida.js
 * ==========================
 * 
 * Send request to esb
 * and make plot.
 * 
 * sverre.stikbakke@ntnu.no 19.04.2021
 */


"use strict";


GIFTWIN.esb.plot = GIFTWIN.esb.plot || {};


GIFTWIN.esb.plot.mdmsActivePower = (() => {

    const createDialog = GIFTWIN.esb.createDialog;
    const createPlotFromDialog = GIFTWIN.esb.createPlotFromDialog;
    const addOkButtonEventListener = GIFTWIN.esb.addOkButtonEventListener;
    const get = GIFTWIN.esb.get;
    const removePlot = GIFTWIN.esb.removePlot;

    const getCurrentTime = GIFTWIN.esb.getCurrentTime;
    const convertToLocalTime = GIFTWIN.esb.convertToLocalTime;
    const showAsLocalTime = GIFTWIN.esb.showAsLocalTime;
    const toJSONTime = GIFTWIN.esb.toJSONTime;
    const yesterday = -2;
    const today = 0;
    const tomorrow = 0;

    const requestForm = `
 <form action="javascript:void(0)">
    <fieldset>
       <legend class="doc">MDMS - Active Power</legend>
       <div class="input-group">
          <label for="fromDate">From date</label>
          <input type="text" value='${showAsLocalTime(getCurrentTime(yesterday))}' class="fromDate"/>
       </div>
       <div class="input-group">
          <label for="toDate">To date</label>
          <input type="text" value='${showAsLocalTime(getCurrentTime(tomorrow))}' class="toDate"/>
       </div>
       <div class="input-group">
       <label for="meterId">Meter id</label>
       <input list="meterIdsMDMSactivePower" class="meterId" placeholder="Select from list or edit"/>
       <datalist id="meterIdsMDMSactivePower">
       <option value="D620211566902">D620211566902</option>
       <option value="D620216242502">D620216242502</option>
       <option value="D620218935702">D620218935702</option>
       <option value="D620224709202">D620224709202</option>
       <option value="D620242437102">D620242437102</option>
       <option value="D620251714802">D620251714802</option>
       <option value="D620256441902">D620256441902</option>
       <option value="D620263606302">D620263606302</option>
       <option value="D620264564102">D620264564102</option>
       <option value="D620212007402">D620212007402</option>
       <option value="D620216932302">D620216932302</option>
       <option value="D620217930802">D620217930802</option>
       <option value="D620220236102">D620220236102</option>
       <option value="D620221584702">D620221584702</option>
       <option value="D620222320502">D620222320502</option>
       <option value="D620225089702">D620225089702</option>
       <option value="D620240232102">D620240232102</option>
       <option value="D620246623602">D620246623602</option>
       <option value="D620261925402">D620261925402</option>
       <option value="D620214948202">D620214948202</option>
       <option value="D620224134502">D620224134502</option>
       <option value="D620233276802">D620233276802</option>
       <option value="D620236523602">D620236523602</option>
       <option value="D620242477602">D620242477602</option>
       <option value="D620249428802">D620249428802</option>
       <option value="D620249937002">D620249937002</option>
       <option value="D620251288802">D620251288802</option>
       <option value="D620251776402">D620251776402</option>
       <option value="D620255533902">D620255533902</option>
       <option value="D620258015602">D620258015602</option>
       <option value="D620264696102">D620264696102</option>
       <option value="D620266339202">D620266339202</option>
       <option value="D620237998402">D620237998402</option>
       <option value="D620245848902">D620245848902</option>
       <option value="D620247461302">D620247461302</option>
       <option value="City_Hall_C">City_Hall_C</option>
       <option value="City_Hall_PV">City_Hall_PV</option>
       <option value="Sewer_Chiaiolella_street_C">Sewer_Chiaiolella_street_C</option>
       <option value="Sewer_Chiaiolella_street_C">Sewer_Chiaiolella_street_C</option>
       <option value="Sewer_Chiaiolella_street_C">Sewer_Chiaiolella_street_C</option>
       <option value="TR23102">TR23102</option>
       <option value="TR13402">TR13402</option>       
       </datalist>
    </div>
       <button class="ok-button">OK</button>
    </fieldset>
 </form>`;


    const submitRequestForm = async (section, layer, fetchRequestFunction) => {

        const fromDate = section.querySelector(".fromDate").value;
        const toDate = section.querySelector(".toDate").value;
        const meterId = section.querySelector(".meterId").value;
        const esbQuery = `/MDMS/`
            + `?fromDate=${toJSONTime(fromDate)}`           // 2021-02-01T00:00:00Z
            + `&measurementKind=activePower`
            + `&meterIdList=${meterId}`
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
