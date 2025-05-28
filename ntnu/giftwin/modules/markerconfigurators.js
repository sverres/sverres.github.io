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
 * Module markerconfigurators
 * ===========================
 * 
 * Reads geojson file and generate markers in the map.
 * 
 * sverre.stikbakke@ntnu.no 31.03.2020
 */


// get poi from file and add markers to map
const getMarkers = async () => {

    const mapMarkersUrl = GIFTWIN.site.mapMarkersUrl;
    const mapMarkersUrlResponse = await fetch(mapMarkersUrl);

    if (mapMarkersUrlResponse.ok) {

        const markers = await mapMarkersUrlResponse.json();

        const errMsg = ` Module markerconfigurators: ` +
            `${mapMarkersUrl} has ${markers.features.length} ` +
            `entries, i.e. no data`;
        console.assert(markers.features.length > 0, errMsg);

        for (const marker of markers.features) {

            const infoTable = `<table class='horizontal'>
<thead>
<tr>
    <th>Name</th>
    <th>Category</th>
    <th>Solution</th>
    <th>Location</th>
</tr>
</thead>
<tbody>
<tr>
    <td>${marker.properties.Name}</td>
    <td>${marker.properties.Prosumer}</td>
    <td>${marker.properties.Solution}</td>
    <td>${marker.properties.Location}</td>
</tr>
</tbody>
</table>`;

            const popup = new mapboxgl.Popup({
                maxWidth: 'none',
                closeButton: false,
            }).setHTML(infoTable);

            new mapboxgl.Marker()
                .setLngLat(marker.geometry.coordinates)
                .setPopup(popup)
                .addTo(map);
        };

    } else {

        const errMsg = ` Module markerconfigurators: ` +
            `${mapMarkersUrl} is not found`;
        throw new Error(errMsg);
    };
};


const hideMarkers = cssClass => {
    for (const marker of document.getElementsByClassName(cssClass)) {
        marker.style.visibility = "hidden";
    };
};


const showMarkers = cssClass => {
    for (const marker of document.getElementsByClassName(cssClass)) {
        marker.style.visibility = "visible";
    };
};


export {
    getMarkers,
    hideMarkers,
    showMarkers
};
