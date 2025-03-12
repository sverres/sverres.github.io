/**
 * veier.js
 * 
 * GetFeatureinfo-kall med geografiske koordinater i EPSG:4326
 * 
 * NB: 
 * EPSG:4326 har breddegrad (latitude) som første akse.
 * Rekkefølge på koordinatene i BBOX blir dermed
 * BBOX=southwestLatitude,soutwestLongitude,northeastLatitude,norteastLongitude
 * Se avsnitt 6.7.4 i WMS-spesifikasjonen fra OGC,
 * https://www.ogc.org/standard/wms/
 * 
 * 
 * sverre.stikbakke 21.03.2024
 */

map.on('click', async (e) => {

    const sw = map.getBounds().getSouthWest();
    const ne = map.getBounds().getNorthEast();

    const getFeatureInfoUrl =
        'https://wms.geonorge.no/skwms1/wms.topo'
        + '?VERSION=1.3.0'
        + '&REQUEST=GetFeatureInfo'
        + '&LAYERS=topo'
        + '&STYLES=default'
        + '&CRS=EPSG:4326'
        + `&BBOX=${sw.lat},${sw.lng},${ne.lat},${ne.lng}`
        + `&WIDTH=${map.getCanvas().width}`
        + `&HEIGHT=${map.getCanvas().height}`
        + '&FORMAT=image/png'
        + '&QUERY_LAYERS=fkb_samferdsel'
        + '&INFO_FORMAT=text/plain'
        + `&I=${e.point.x}`
        + `&J=${e.point.y}`;

    const getFeatureInfoResponse = await fetch(getFeatureInfoUrl);
    const featureInfoText = await getFeatureInfoResponse.text();

    const featureInfoString = `<div style="font-size:medium">
                        <pre>${featureInfoText}</pre>
                    </div>`;

    new mapboxgl.Popup({ maxWidth: 'none' })
        .setLngLat(e.lngLat)
        .setHTML(featureInfoString)
        .addTo(map);
});

map.on('mouseover', () => {
    map.getCanvas().style.cursor = 'crosshair';
});

map.on('mouseleave', () => {
    map.getCanvas().style.cursor = '';
});
