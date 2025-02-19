map.on("load", function () {

  map.addSource("naturtap", {
    "type": "geojson",
    "data": "naturtap.geojson"
  });

  map.addLayer({
    "id": "kommuner",
    "type": "fill",
    "source": "naturtap",
    'layout': {},
    "paint": {
      'fill-color': [
        'step',
        ['get', 'endring_natur'],
        '#b10026',
        -1.5, '#e31a1c',
        -1.0, '#fc4e2a',
        -0.5, '#fd8d3c',
        -0.0, '#feb24c',
        0.5, '#fed976',
        1.0, '#ffffb2',
      ],
      "fill-outline-color": "#000",
      "fill-opacity": 0.75,
    }
  });

  map.addLayer({
    'id': 'kommunenavn',
    'type': 'symbol',
    'source': 'naturtap',
    'layout': {
      'text-field': '{kommunenavn}',
      'text-font': ["DIN Offc Pro Bold"],
      'text-size': { "stops": [[4, 9], [6, 12]] },
    },
    'paint': {
      'text-color': "#000000",
    }
  });

  map.on('click', 'kommuner', function (e) {
    var description =
      `<table>\
              <tr>\
                <td>Kommune</td>\
                <td>Endring</td>\
              </tr>\
              <tr>\
                <td>${e.features[0].properties.kommunenavn}</td>\
                <td>${e.features[0].properties.endring_natur}</td>\
              </tr>\
            </table>`;

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(description)
      .addTo(map);
  });

});

// Change the cursor to a pointer when the mouse is over the layer.
map.on('mouseenter', 'kommuner', function () {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'kommuner', function () {
  map.getCanvas().style.cursor = '';
});

