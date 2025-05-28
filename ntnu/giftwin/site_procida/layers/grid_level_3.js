/**
 * Mapbox geojson layer
 * 
 * sverre.stikbakke 04.11.2021
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', function () {

  const layerId = 'grid_level_3';
  const layerDataSource = './site_procida/data/grid_level_3.geojson';
  const visibility = "none";

  map.addLayer({
    'id': layerId,
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': layerDataSource
    },
    'layout': {
      "line-join": "round",
      "line-cap": "round",
      "visibility": visibility
    },
    'paint': {
      "line-color": "rgba(116,196,118,0.9)",
      "line-width": 4
    }
  });

  map.on('click', layerId, e => {
    console.log(e);
    const popupTxt = `
          <table>
            <caption>Grid L3</caption>
            <thead>
              <tr>
                <th>CIVICO</th>
                <th>NODO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${e.features[0].properties.GID_CIVICO}</td>
                <td>${e.features[0].properties.GID_NODO}</td>
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

  // Change the cursor to a pointer when the mouse is over the layer.
  map.on('mouseenter', layerId, () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', layerId, () => {
    map.getCanvas().style.cursor = '';
  });
});
