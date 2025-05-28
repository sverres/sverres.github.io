/**
 * Mapbox geojson layer
 * 
 * sverre.stikbakke 25.06.2019
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', () => {

  const layerId = 'sensors';
  const layerDataSource = './site_procida/data/sensors.geojson';
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

    const layer = GIFTWIN.layers.get(layerId);

    const popup = new mapboxgl.Popup({
      className: 'mapboxgl-plot-popup',
      anchor: 'bottom-left'
    })
      .setLngLat(e.lngLat)
      .setHTML('SCADA sensor data (demonstration with data from Grytøya)')
      .addTo(map);

    const popupElem = popup.getElement();
    popupElem.id = layer.sectionId;
    const plotFunction =
      new Function(`${layer.plotFunction}(
             ${JSON.stringify(layer)})`);
    plotFunction();
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
