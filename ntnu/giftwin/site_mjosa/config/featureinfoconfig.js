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

            case 'water_bodies':

                infoTable = `<table class="horizontal" width="1000px">
<thead>
<tr>
    <th>Navn</th>
    <th>Høyde</th>
    <th>Areal [km2]</th>
    <th>Nedbørfelt-areal [km2]</th>
    <th>Hierarki</th>
    <th>Vassdragsnr</th>
    <th>Objekttype</th>
</tr>
</thead>
<tbody>
<tr>
    <td>${properties["navn"]}</td>
    <td>${properties["hoyde"]}</td>
    <td>${properties["areal_km2"].split(".")[0]}</td>
    <td>${properties["nedbfAreal"]}</td>
    <td>${properties["hierarki"]}</td>
    <td>${properties["vassdragsNr"]}</td>
    <td>${properties["objType"]}</td>
</tr>
</tbody>
</table>`;
                break;


            case 'watershed_regine':

                infoTable = `<div style="font-size:medium">
                                <pre>${JSON.stringify(properties, null, 2)}</pre>
                            </div>`;
                break;


            case 'water_directive':

                infoTable = `<div style="font-size:medium">
                                    <pre>${JSON.stringify(properties, null, 2)}</pre>
                                </div>`;
                break;


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
    <td>${properties["SHAPE_Length"].split(".")[0]}</td>
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