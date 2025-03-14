
# GEOM2430 Vår 2025 Oblig 4<br/>Tjenesteoppsett - WMS og OGC-API med Mapserver


## Målsetting

- lære om Mapserver og tjenesteoppsett
- lære å utnytte dokumentasjon for tjeneste-oppsett
- lære å lage webkart med OpenLayers
- lære å utnytte OGC API i webkart-løninger med Mapbox


## Del 1 - Tjenesteoppsett for WMS og Open Layers webkart

Oppgaven tar utgangspunkt i ukeoppgave for Mapserver. Du skal etablere en WMS-tjeneste ved hjelp av Mapserver på egen PC. Tjenesten skal vise kommuner i et fylke i Norge. Kartet skal framheve en eller flere kommuner med en annen farge.

Du skal videre lage et webkart ved hjelp av OpenLayers som viser innholdet i tjenesten. Kartet skal være i UTM-projeksjon.

Frivillig: Bruke WMTS-kart som bakgrunnskart for kommunene. En mal for dette vil bli lagt ut mandag 17.03 på  [OpenLayers ressursside](https://sverres.github.io/ntnu/openlayers/).


## Del 2 - Tjenesteoppsett for OGC API og Mapbox webkart

Du skal etablere en OGC API-tjeneste ved hjelp av Mapserver på egen PC. Tjenesten skal hente data fra en av PostGIS-databasene du etablerte i forbindelse med Oblig 1, og skal vise enten grunnkretser i Gjøvik eller bydeler/nabolag i New York (neighborhood).

Mapfila som setter opp denne tjenesten skal bare ha innhold som er nødvendig for OGC API. Hvis du bruker mapfila til demo-applikasjonen [mapserver-ogcapi](../mapserver/mapserver-ogcapi.md) som utgangspunkt, så må den strippes for alt som har med WMS og WFS å gjøre.  Mapfila skal likevel inneholde relevante metadata. Her bør du gjøre en selvstendig vurdering på hvilke (frivillige) metadata du vil ha med. 

For informasjon om oppsett av PostGIS datakilder, se under Input-delen i Mapserver-dokumentasjonen.

Du skal videre lage et webkart ved hjelp av Mapbox som viser innholdet i tjenesten. Se eksempel på Mapbox webkart for OGC API på [Mapbox ressursside](https://sverres.github.io/ntnu/mapbox/).


## Krav til gjennomføring

- Hver av tjenestene skal settes opp i en egen mappe under `C:\ms4w\apps`
- I hver mappe skal det være en undermappe, `web`, som skal inneholde filene som inngår i webkart-løsningen.
- For innlevering skal det lages zip-filer av disse mappene.

## Innlevering

Besvarelsen skal bestå av:

- zip-fil for del 1 med
  - mapfile for WMS-tjeneste
  - datafiler (mappe) for kommunene i aktuelt fylke
  - alle filer som inngår i webkart-løsningen (OpenLayers webkart)

- zip-fil for del 2 med
  - mapfile for OGC API Features-tjeneste
  - det skal ikke leveres noe data/databasefiler, men tilkobling til PostGIS-database må vises i mapfila.\
  (passordet til databasen kan gjerne fjernes/settes til _mittpassord_ i mapfil før levering)
  - alle filer som inngår i webkart-løsningen (OpenLayers webkart)

- Tjenestene skal være operative på egen PC fra innleveringsfrist og to uker framover for å kunne vises fram til emneansvarlig.

## Ressurser

- [Mapserver dokumentasjon](https://mapserver.org/documentation.html)
- forelesningsopptak i Blackboard og [Mapserver ressursside](https://sverres.github.io/ntnu/mapserver/)
- forelesningsopptak i Blackboard og [Mapbox ressursside](https://sverres.github.io/ntnu/mapbox/)
- [OpenLayers ressursside](https://sverres.github.io/ntnu/openlayers/)
- veiledning fra emnelærer


\
_NTNU 13.03.2025 Sverre Stikbakke_\
_NTNU 13.03.2025 kl.11.35 Oppdatert, men ikke helt ferdig enda_
_NTNU 14.03.2025 endelig versjon (med forbehold om mindre korreksjoner)_
