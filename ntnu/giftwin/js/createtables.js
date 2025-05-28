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
 * createtables.js
 * ================
 * 
 * Creates tables from JSON data
 * 
 * sverre.stikbakke@ntnu.no 22.04.2020
 */


"use strict";


GIFTWIN.tableUtils = GIFTWIN.tableUtils || {};

/**
 * https://dev.to/boxofcereal/
 *   how-to-generate-a-table-from-json-data-with-es6-methods-2eel
 */

GIFTWIN.tableUtils.json2Table = (json, cssClass = "") => {

    let cols = Object.keys(json[0]);

    // Map over columns, make headers, join into string
    let headerRow = cols
        .map(col => `<th>${col}</th>`)
        .join("");

    // Map over array of json objs, for each row(obj) map over column values,
    // and return a td with the value of that object for its column
    // take that array of tds and join them
    // then return a row of the tds
    // finally join all the rows together

    let rows = json
        .map(row => {
            let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
            return `<tr>${tds}</tr>`;
        })
        .join("");

    // build the table
    const table = `
      <table class=${cssClass}>
          <thead>
              <tr>${headerRow}</tr>
          <thead>
          <tbody>
              ${rows}
          <tbody>
      <table>`;

    return table;
};


GIFTWIN.tableUtils.removeSection = (sectionId) => {

    const section = document.getElementById(sectionId);
    if (section) {
        section.remove();
    };
};


GIFTWIN.tableUtils.createTable = (data, layer) => {

    const json2Table = GIFTWIN.tableUtils.json2Table;

    const sectionId = layer.sectionId;
    const tableSectionId = `${sectionId}-table`;

    const section = document.getElementById(sectionId);

    const tableExists = section.contains(document.getElementById(tableSectionId));
    if (tableExists) {
        GIFTWIN.tableUtils.removeSection(tableSectionId);
    };

    const tableSection = document.createElement('div');
    tableSection.setAttribute('class', 'fluid');
    tableSection.setAttribute('id', tableSectionId);

    switch (layer.jsonLevels) {

        case "1":
            tableSection.innerHTML = json2Table(
                data
                [layer.jsonLevel_1],
                layer.cssClass);
            break;

        case "2":
            tableSection.innerHTML = json2Table(
                data
                [layer.jsonLevel_1]
                [layer.jsonLevel_2],
                layer.cssClass);
            break;

        case "3":
            tableSection.innerHTML = json2Table(
                data
                [layer.jsonLevel_1]
                [layer.jsonLevel_2]
                [layer.jsonLevel_3],
                layer.cssClass);
            break;

        case "4":
            tableSection.innerHTML = json2Table(
                data
                [layer.jsonLevel_1]
                [layer.jsonLevel_2]
                [layer.jsonLevel_3]
                [layer.jsonLevel_4],
                layer.cssClass);
            break;

        case "5":
            tableSection.innerHTML = json2Table(
                data
                [layer.jsonLevel_1]
                [layer.jsonLevel_2]
                [layer.jsonLevel_3]
                [layer.jsonLevel_4]
                [layer.jsonLevel_5],
                layer.cssClass);
            break;

        case "6":
            tableSection.innerHTML = json2Table(
                data
                [layer.jsonLevel_1]
                [layer.jsonLevel_2]
                [layer.jsonLevel_3]
                [layer.jsonLevel_4]
                [layer.jsonLevel_5]
                [layer.jsonLevel_6],
                layer.cssClass);
            break;

        default:
            const applicableLevels = false;
            console.assert(applicableLevels, [
                "createTable:",
                layer.layerId,
                "has jsonLevels not in ['1','2','3',4','5','6']",
                layer.jsonLevels
            ]);
    };
    section.appendChild(tableSection);
};
