# WMS GetFeatureInfo

Getfeatureinfo er et mulig kall mot en WMS-tjeneste. I kallet benyttes bilde-koordinater i et fiktivt bilde. Dersom det finnes kartobjekter av den etterspurte objekttypen på dette stedet vil WMS-tjenesten returnere egenskapsdata for disse.

Getfeatureinfo-kallet har alle parametrene som et WMS-kall i tillegg til et sett med bilde-koordinater og informasjon om hvilket kartlag det ønskes egenskapsdata om.

Eksempel på WMS-kall:

```js
https://wms.geonorge.no/skwms1/wms.topo
?bbox=1185691.18,8576234.57,1186302.68,8576846.07
&format=image/png
&service=WMS
&version=1.3.0
&request=GetMap 
&crs=EPSG:3857
&width=256
&height=256
&layers=topo
&styles=default
&transparent=false
```

![topo](https://wms.geonorge.no/skwms1/wms.topo?bbox=1185691.1827596538,8576234.573596776,1186302.6789859347,8576846.069823056&format=image/png&service=WMS&version=1.3.0&request=GetMap&crs=EPSG:3857&width=256&height=256&layers=topo&styles=default&transparent=false)


Eksempel på GetFeatureInfo-kall med samme bilde-avgrensning:

```js
https://wms.geonorge.no/skwms1/wms.topo
?bbox=1185691.18,8576234.57,1186302.68,8576846.07
&format=image/png
&service=WMS
&version=1.3.0
&REQUEST=GetFeatureInfo
&crs=EPSG:3857
&width=256
&height=256
&layers=topo
&styles=default
&transparent=false
&QUERY_LAYERS=fkb_samferdsel
&INFO_FORMAT=text/plain
&I=256
&J=128
```

[Test kallet her](https://wms.geonorge.no/skwms1/wms.topo?bbox=1185691.1827596538,8576234.573596776,1186302.6789859347,8576846.069823056&format=image/png&service=WMS&version=1.3.0&request=GetFeatureInfo&crs=EPSG:3857&width=256&height=256&layers=topo&styles=default&transparent=false&QUERY_LAYERS=fkb_samferdsel&INFO_FORMAT=text/plain&I=256&J=128)


## Mapbox-eksempel med geografiske koordinater

```js
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
```

[veier.html](docs/veier.html)

## Noen momenter vedrørende getfeatureinfo-kall

- Selv om getfeatureinfo-kallet deler parametre med WMS-kall, trenger man ikke å vise kartbildet for dette WMS-kallet. I eksemplet her er det brukt Mapbox vector tiles for  å vise et kartbilde som inneholder veier.
- I vei-eksemplet er det brukt geografiske koordinater. Fordelen med det er at man slipper å transformere koordinater til f.eks. Web Mercator (EPSG:3857), Mapbox-funksjonen getBounds() viser geografiske koordinater, og disse kan da brukes direkte i GetFeatureInfo-kallet.
- WMS-tjenester leverer GetfeatureInfo-svaret i de formatene som tjenesten er satt opp med. Disse er dokumentert i GetCapabilities-dokumentet, f.eks. slik:

```xml
<Capability>
  <Request>
    <GetCapabilities>
      <Format>text/xml</Format>
```

- Andre mulige formater er
    - HTML
    - GeoJSON


## Referanser

- [6.7.4 Bounding boxes i WMS-spesifikasjonen fra OGC](https://www.ogc.org/standard/wms/)
- [7.4 GetFeatureInfo i WMS-spesifikasjonen fra OGC](https://www.ogc.org/standard/wms/)

\
*NTNU 17.02.2025 Sverre Stikbakke*