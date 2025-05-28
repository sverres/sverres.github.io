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
 * getfeatureinfoconfig.js
 * ========================
 * 
 * sverre.stikbakke@ntnu.no 10.11.2020
 */


"use strict";


GIFTWIN.featureInfoConfig = (() => {

    const infoLayers = new Map();


    const createHtmlTable = (layerId, properties,) => {

        let infoTable;

        switch (layerId) {

            case 'submarin_cables':
            case 'distribution_grid':
            case 'region_grid':
            case 'transmission_grid':

                infoTable = `<table class="horizontal" width="1000px">
    <thead>
    <tr>
        <th>Object ID</th>
        <th>Segment name</th>
        <th>Segment length [m]</th>
        <th>Owner</th>
        <th>Operational [year]</th>
        <th>Grid level</th>
        <th>Voltage [kV]</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>${properties["OBJECTID"]}</td>
        <td>${properties["navn"]}</td>
        <td>${properties["SHAPE_Length"].split(",")[0]}</td>
        <td>${properties["Eier"]}</td>
        <td>${properties["driftsattaar"]}</td>
        <td>${properties["sosiNettnivaa"]}</td>
        <td>${properties["spenning_kV"]}</td>
    </tr>
    </tbody>
    </table>`;
                break;


            case 'stations':

                infoTable = `<table class="horizontal" width="1000px">
<thead>
<tr>
    <th>Object ID</th>
    <th>Name</th>
    <th>Owner</th>
    <th>Operational [year]</th>
    <th>Grid level</th>
    <th>Voltage [kV]</th>
</tr>
</thead>
<tbody>
<tr>
    <td>${properties["OBJECTID"]}</td>
    <td>${properties["Navn"]}</td>
    <td>${properties["Eier"]}</td>
    <td>${properties["driftsattaar"]}</td>
    <td>${properties["sosiNettnivaa"]}</td>
    <td>${properties["spenning_kV"]}</td>
</tr>
</tbody>
</table>`;
                break;

            default:
        };

        return infoTable;
    };


    return {
        createHtmlTable,
        infoLayers
    };

})();
