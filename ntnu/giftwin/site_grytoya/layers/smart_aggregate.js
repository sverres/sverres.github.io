/**
 * Mapbox geojson polygon-layer
 * 
 * sverre.stikbakke@ntnu.no 30.03.2020
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', () => {

  const layerId = 'smart_aggregate';
  const layerDataSource = './site_grytoya/data/smart_aggregate.geojson';
  const visibility = "none";

  map.addLayer({
    'id': layerId,
    'type': 'fill',
    'source': {
      'type': 'geojson',
      'data': layerDataSource
    },
    'layout': {
      "visibility": visibility
    },
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.6
    }
  });

  map.on('click', layerId, e => {
    const popupTxt = `
      <table class="horizontal">
        <caption>Sample data</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Consumption</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${e.features[0].properties.Date}</td>
            <td>${e.features[0].properties.Hour}</td>
            <td>${e.features[0].properties.Consumption}</td>
          </tr>
        </tbody>
      </table>`;

    new mapboxgl.Popup({
      maxWidth: 'none',
      closeButton: false,
      anchor: 'bottom-left'
    })
      .setLngLat(e.lngLat)
      .setHTML(popupTxt)
      .addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter', layerId, () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', layerId, () => {
    map.getCanvas().style.cursor = '';
  });
  //console.log("layer loaded: smart_aggregate");
});