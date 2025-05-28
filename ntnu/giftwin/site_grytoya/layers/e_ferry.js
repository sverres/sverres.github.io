/**
 * Mapbox layer
 * 
 * sverre.stikbakke 25.11.2021
 */


"use strict";

GIFTWIN.layerCount = GIFTWIN.layerCount + 1;

GIFTWIN.mapWindow.addEventListener('addlayer', () => {

  const layerId = 'e_ferry';
  const layerDataSource = 'pier';
  const visibility = "none";

  map.addSource('pier', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'message': 'Foo',
            'iconSize': [60, 60]
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [16.4912949, 68.8518723]
          }
        }
      ]
    }
  });

  map.addLayer({
    "id": layerId,
    "type": "circle",
    'source': layerDataSource,
    'layout': {
      "visibility": visibility
    },
    "paint": {
      "circle-radius": 12,
      "circle-color": "rgba(0,100,0,0.8)"
    }
  });

  map.on('click', layerId, e => {
    const popupTxt = `
        <table>
          <thead>
              <tr>
                  <th>Sample data</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><img src='./site_grytoya/data/e-ferry-charging.png'></td>
              </tr>
              <tr>
                  <td><img src='./site_grytoya/data/e-ferry-charging-2MW.png'></td>
              </tr>
              <tr>
                  <td><img src='./site_grytoya/data/e-ferry-charging-12-days.png'></td>
              </tr>
          </tbody>
        </table>`;

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setMaxWidth('1200px')
      .setHTML(popupTxt)
      .addTo(map);
  });
});
