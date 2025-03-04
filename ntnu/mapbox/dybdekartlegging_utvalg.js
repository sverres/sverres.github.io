/**
 * Mapbox GeoJSON-layer from OGC API
 * 
 * sverre.stikbakke 04.03.2025
*/


const ogcApiUrl = 'https://hybasapi.atgcp1-prod.kartverket.cloud/collections/surveys/items?f=json';

const layerId = 'survey_coverages';

const maxItems = 10;

const getFeatures = (layerId) => {

    const sw = map.getBounds().getSouthWest();
    const ne = map.getBounds().getNorthEast();

    const urlGeoJSON = `${ogcApiUrl}/items?bbox=${sw.lng},${sw.lat},${ne.lng},${ne.lat}&f=json`;

    console.log(urlGeoJSON);

    if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
    };

    if (map.getSource(layerId)) {
        map.removeSource(layerId);
    };

    map.addSource(layerId, {
        type: 'geojson',
        'data': urlGeoJSON
    });

    map.addLayer({
        'id': layerId,
        'type': 'fill',
        'source': layerId,
        'layout': {},
        'paint': {
            'fill-color': '#0080ff',
            'fill-opacity': 0.5,
            'fill-outline-color': '#000'
        }
    });
};

map.on('load', () => getFeatures(layerId));
map.on('moveend', () => getFeatures(layerId));

map.on('click', layerId, e => {
    const popupTxt = `<pre>${JSON.stringify(e.features[0].properties, null, 2)}</pre>`;

    new mapboxgl.Popup({
        maxWidth: 'none',
        anchor: 'bottom-left'
    })
        .setLngLat(e.lngLat)
        .setHTML(popupTxt)
        .addTo(map);
});

map.on('mouseover', () => {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', () => {
    map.getCanvas().style.cursor = '';
});