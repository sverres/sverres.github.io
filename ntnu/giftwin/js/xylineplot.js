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
 * xylineplot.js
 * =========================
 * 
 * Make a line plot with Plotly
 * 
 * sverre.stikbakke@ntnu.no 17.06.2020
 */


"use strict"


GIFTWIN.xyLinePlot = (layer, rows) => {

    // rows is an array of JSON objects

    const unpack = (rows, key) => rows.map(row => row[key]);

    const trace1 = {
        type: "scattergl",
        mode: "lines",
        x: unpack(rows, layer.xKey),
        y: unpack(rows, layer.yKey),
        line: { color: "#17BECF" }
    };

    const data = [trace1];

    const layout = {
        "title": layer.plotTitle,
        "xaxis": { "tickangle": -45, "automargin": true }
    };

    const section = document.getElementById(layer.sectionId);

    const plotExists = section.hasChildNodes();

    if (plotExists) {
        Plotly.react(section, data, layout)
    } else {
        Plotly.newPlot(section, data, layout);
    };
};
