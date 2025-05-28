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
 * lineplotpresentday.js
 * ======================
 * 
 * Send request to esb
 * and make plot.
 * 
 * sverre.stikbakke@ntnu.no 21.12.2021
 */


"use strict";

GIFTWIN.esb.plot = GIFTWIN.esb.plot || {};


GIFTWIN.esb.plot.linePlotPresentDay = (() => {

    const getCurrentTime = GIFTWIN.esb.getCurrentTime;
    const convertToLocalTime = GIFTWIN.esb.convertToLocalTime;
    const createPlot = GIFTWIN.esb.createPlot;
    const get = GIFTWIN.esb.get;
    const yesterday = -1;
    const today = 0;
    const tomorrow = 1;
    const removePlot = GIFTWIN.esb.removePlot;


    const fetchRequest = async (layer, esbQuery, plotTitle) => {

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
                "title": plotTitle,
                "xaxis": { "tickangle": -45, "automargin": true }
            }
        };

        return plotData;
    };


    const plotFeature = (layerId, e) => {

        // Set `bbox` as 5px reactangle area around clicked point.
        const bbox = [
            [e.point.x - 5, e.point.y - 5],
            [e.point.x + 5, e.point.y + 5]
        ];
        const features = map.queryRenderedFeatures(
            bbox, { layers: [layerId] }
        );

        const sensorID = features[0].properties['SensorID'];

        const layer = GIFTWIN.layers.get(layerId);

        const popup = new mapboxgl.Popup({
            className: 'mapboxgl-plot-popup',
            anchor: 'bottom-left'
        })
            .setLngLat(e.lngLat)
            .setHTML(`Sensor ID: ${sensorID}`)
            .addTo(map);

        const popupElem = popup.getElement();
        popupElem.id = layer.sectionId;
        const plotFunction =
            new Function(`${layer.plotFunction}(
            ${JSON.stringify(layer)},
            '${sensorID}')`);
        plotFunction();
    };


    const makePlot = async (layer, sensorID) => {

        const plotTitle = layer.plotTitle;
        const meterIdList = sensorID || layer.meterIdList;

        const esbQuery = `/${layer.esbEndPoint}/`
            + `?fromDate=${getCurrentTime(layer.startDateOffset ? parseInt(`${layer.startDateOffset}`) : yesterday)}`  // 2021-02-01T00:00:00Z
            + `&toDate=${getCurrentTime(layer.endDateOffset ? parseInt(`${layer.endDateOffset}`) : today)}`
            + `&measurementKind=${layer.measurementKind}`
            + (layer.phase ? `&phase=${layer.phase}` : "")
            + `&regionName=${layer.regionName}`
            + (meterIdList ? `&meterIdList=${meterIdList}` : "");

        const plotData = await fetchRequest(layer, esbQuery, plotTitle);
        if (plotData) {
            createPlot(layer, plotData);
        };

        return null;
    };


    return {
        makePlot,
        plotFeature
    };

})();
