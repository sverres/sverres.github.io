# Projeksjoner i Mapbox

## Historikk

Mapbox, Google Maps med flere har tidligere brukt Web Mercator som projeksjon. Mapbox lanserte i 2021 _adaptive projections_. Hva dette innebærer er ikke så godt dokumentert, men man kan se at når man zoomer langt ut, så skifter Mapbox projeksjon til noe som viser verden som en rund klode.

Se [Mapbox GL JS v2.6 lanseringsinformasjon](https://www.mapbox.com/blog/mapbox-gl-js-v2-6).

- [Se Mapbox verdenskart](docs/verden)

## Bruk

Fra og med versjon 2.6 av Mapbox GL JS, er _globe_ standard projeksjon. Hvis man ønsker en annen projeksjon kan det settes når map-objektet initialiseres, slik:

```javascript
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [14.5162758, 66.1325835],
    projection: {name: "mercator"},
    zoom: 4
});
```
## Mapbox ressurser om projeksjoner

- [Guide: Projections](https://docs.mapbox.com/mapbox-gl-js/guides/projections/)
- [Glossary: Projection](https://docs.mapbox.com/help/glossary/projection/)
- [Adaptive Projection Behavior](https://docs.mapbox.com/mapbox-gl-js/guides/projections/#adaptive-projection-behavior)

\
*NTNU 05.03.2025 Sverre Stikbakke*