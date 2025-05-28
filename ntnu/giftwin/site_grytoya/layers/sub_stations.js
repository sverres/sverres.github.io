/**
 * Mapbox image tile layer
 * 
 * sverre.stikbakke 25.06.2019
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', () => {

  const layerId = 'sub_stations';
  const layerDataSource = './site_grytoya/data/nettstasjon_g.geojson';
  const visibility = "none";

  map.addLayer({
    "id": layerId,
    "type": "circle",
    'source': {
      'type': 'geojson',
      'data': layerDataSource
    },
    'layout': {
      'visibility': visibility
    },
    "paint": {
      "circle-radius": 8,
      "circle-color": "rgba(0,51,255,0.8)"
    }
  });

  map.on('click', layerId, e => {
    const popupTxt = `
          <table>
            <caption>Sample data</caption>
            <thead>
              <tr>
                <th>Data capture date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${e.features[0].properties.datafangstdato}</td>
              </tr>
            </tbody>
          </table>`;

    new mapboxgl.Popup({
      maxWidth: 'none',
      anchor: 'bottom-left'
    })
      .setLngLat(e.lngLat)
      .setHTML(popupTxt)
      .addTo(map);
  });
  //console.log("layer loaded: sub_stations");
});
