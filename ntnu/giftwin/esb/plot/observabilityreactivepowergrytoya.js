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
 * observabilityreactivepowergrytoya.js
 * =====================================
 * 
 * Send request to esb
 * and make plot.
 * 
 * sverre.stikbakke@ntnu.no 20.04.2021
 */


"use strict";


GIFTWIN.esb.plot = GIFTWIN.esb.plot || {};


GIFTWIN.esb.plot.observabilityReActivePower = (() => {

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
      <legend class="doc">Observability - reactive power</legend>
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
         <input list="meterIdsObservabilityReActivePower" class="meterId" placeholder="Select from list or edit"/>
         <datalist id="meterIdsObservabilityReActivePower">
         <option value="0010">0010</option>
         <option value="0020">0020</option>
         <option value="0040">0040</option>
         <option value="0050">0050</option>
         <option value="0060">0060</option>
         <option value="0070">0070</option>
         <option value="0080">0080</option>
         <option value="0090">0090</option>
         <option value="0095">0095</option>
         <option value="0100">0100</option>
         <option value="0110">0110</option>
         <option value="0115">0115</option>
         <option value="0120">0120</option>
         <option value="0121">0121</option>
         <option value="0122">0122</option>
         <option value="0123">0123</option>
         <option value="0125">0125</option>
         <option value="0130">0130</option>
         <option value="0135">0135</option>
         <option value="0140">0140</option>
         <option value="0150">0150</option>
         <option value="0160T1">0160T1</option>
         <option value="0160T2">0160T2</option>
         <option value="0165">0165</option>
         <option value="0170">0170</option>
         <option value="0180">0180</option>
         <option value="0182">0182</option>
         <option value="0183">0183</option>
         <option value="0184">0184</option>
         <option value="0190">0190</option>
         <option value="0200">0200</option>
         <option value="0205">0205</option>
         <option value="0210">0210</option>
         <option value="0230">0230</option>
         <option value="0240">0240</option>
         <option value="0245">0245</option>
         <option value="0250">0250</option>
         <option value="0255">0255</option>
         <option value="0260">0260</option>
         <option value="0270">0270</option>
         <option value="0271">0271</option>
         <option value="0273">0273</option>
         <option value="0275">0275</option>
         <option value="0280">0280</option>
         <option value="0281">0281</option>
         <option value="0290">0290</option>
         <option value="0300">0300</option>
         <option value="0310">0310</option>
         <option value="0312">0312</option>
         <option value="0315">0315</option>
         <option value="0320">0320</option>
         <option value="0330">0330</option>
         <option value="0350">0350</option>
         <option value="0360">0360</option>
         <option value="0370">0370</option>
         <option value="0371">0371</option>
         <option value="0379">0379</option>
         <option value="0380">0380</option>
         <option value="0381">0381</option>
         <option value="0390">0390</option>
         <option value="0400">0400</option>
         <option value="0410">0410</option>
         <option value="0411">0411</option>
         <option value="0420">0420</option>
         <option value="0430">0430</option>
         <option value="0435">0435</option>
         <option value="0440">0440</option>
         <option value="0450">0450</option>
         <option value="0451">0451</option>
         <option value="0460">0460</option>
         <option value="0464">0464</option>
         <option value="0466">0466</option>
         <option value="0470">0470</option>
         <option value="0475">0475</option>
         <option value="0480">0480</option>
         <option value="0490">0490</option>
         <option value="0500">0500</option>
         <option value="0505">0505</option>
         <option value="0510">0510</option>
         <option value="0520">0520</option>
         <option value="1382">1382</option>
         <option value="cable_1_east">cable_1_east</option>
         <option value="cable_2_west">cable_2_west</option>
         <option value="EVCharging">EVCharging</option>
         <option value="FF2">FF2</option>
         <option value="PT500">PT500</option>
         <option value="TBD">TBD</option>
         <option value="0030">0030</option>
         <option value="0045">0045</option>
         <option value="0220">0220</option>
         <option value="0455">0455</option>
         <option value="0760">0760</option>
         <option value="0761">0761</option>
         <option value="0762">0762</option>
         <option value="0765">0765</option>
         <option value="0770">0770</option>
         <option value="0775">0775</option>
         <option value="0780">0780</option>
         <option value="0790">0790</option>
         <option value="02009">02009</option>        
         </datalist>
      </div>
      <button class="ok-button">OK</button>
   </fieldset>
</form>`;


    const submitRequestForm = async (section, layer, fetchRequestFunction) => {

        const fromDate = section.querySelector(".fromDate").value;
        const toDate = section.querySelector(".toDate").value;
        const meterId = section.querySelector(".meterId").value;
        const esbQuery = `/OBSERVABILITY/`
            + `?fromDate=${toJSONTime(fromDate)}`           // 2021-02-01T00:00:00Z
            + `&measurementKind=reactivePower`
            + `&meterIdList=${meterId}`
            + `&phase=ABC`
            + `&regionName=Grytoya`
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
                "title": "Reactive Power [kvar]",
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
