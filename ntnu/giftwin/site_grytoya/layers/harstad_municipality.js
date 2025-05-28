/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 22.03.2021
 */


"use strict";


const getKommunePolygon = async (kommunenummer) => {

    let geoJsonData =
    {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "kommunenavn": "",
                    "kommunenummer": ""
                },
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [0, 0]
                }
            }
        ]
    };

    const response = await fetch(`https://api.test.kartverket.no/kommuneinfo/v1/kommuner/${kommunenummer}/omrade?utkoordsys=4326`);

    if (response.ok) {

        const apiData = await response.json();

        geoJsonData.features[0].properties.kommunenavn = apiData.kommunenavn;
        geoJsonData.features[0].properties.kommunenummer = apiData.kommunenummer;
        geoJsonData.features[0].geometry.coordinates = apiData.omrade.coordinates;

        return geoJsonData;

    } else {

        return false;

    };
};

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', async function () {

    const visibility = "none";

    map.addSource('harstadmunicipality', {
        'type': 'geojson',
        'data': await getKommunePolygon(5503)
    });

    map.addLayer({
        'id': 'harstadmunicipality',
        'type': 'fill',
        'source': 'harstadmunicipality',
        'layout': {
            "visibility": visibility
        },
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.4
        }
    });
});




