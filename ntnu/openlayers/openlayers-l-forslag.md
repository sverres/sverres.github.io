# Løsningsforslag/varianter av webkart med Open Layers

---

Gå inn på kartene nedenfor og trykk Ctrl + U for å se koden som ligger bak. Prøv også å se hvor langt ut og hvor langt inn det går an å zoome, og hvor mye du kan flytte kartet sideveis.
Dette bli bestemt av verdiene for
- extent (plassert enten lagnivå eller view-nivå)
- maxResolution
- minResolution

Du kan sjekke hvilke zoom- og resolution-verdier som er i bruk i kartet ved å åpne konsollet i nettleseren og skrive inn disse funksjonskallene (metodekall):
- map.getView().getResolution()
- map.getView().getZoom()

## Webkart-varianter

- [Extent brukt på lagnivå](docs/topoextenInnlandet.html)
- [Extent brukt på viewet](docs/topoextentGjovik.html)
- [Bruk av resolution-verdier](docs/toporesolution.html)
- [Kombinasjon av Topo og OSM i Web Mercator-projeksjon](docs/osmtopo.html)

## Video-gjennomgang

Innhold:

- litt overordnet stoff om Open Layers
- demonstrasjon av løsningsforslagene, inkl.
  - fokus på extent-variablene
  - fokus på resolutions-verdier og hvordan man kan lese av disse fra kartet
- litt om hvordan Open Layers-dokumentasjonen viser kode-eksempler

<iframe src="https://ntnu.cloud.panopto.eu/Panopto/Pages/Embed.aspx?id=b1d1ec9e-a16d-4b1e-a7ec-acd0010b38d4&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&start=0&interactivity=all" height="405" width="720" style="border: 1px solid #464646;" allowfullscreen allow="autoplay"></iframe>


_NTNU 10.02.2021 Sverre Stikbakke_\
_NTNU 15.02.2021 Oppdatert med video-gjennomgang av løsningsforslag_\
_NTNU 12.03.2025 Oppdatert OpenLayers versjon i løsningsforslag, endret fra topo4 til topo_