
# GEOM2430 Vår 2025 Oblig 3<br/>Webkart med Mapbox, WMTS og GeoJSON


## Målsetting

- lære om Mapbox GL JS og kunne bruke dette til å lage webkart
- lære mer om WMS og WMTS (Web Map Tile Service) og bruk av slike tjenester
- lære å utnytte dokumentasjon for API'er og tjeneste-spesifikasjoner
- lære om bruk av ulike kartlag-typer på webkart
- lære å utnytte getcapabilities-kall mot WMS-tjenester for å vise egenskapsdata


## Del 1 - Kart som viser sporlogg fra GPS

Her skal du bruke en GPS-sporlogg fra en tur, registrert gjennom f.eks. Strava-appen. Denne turen skal presenteres på et Mapbox-webkart. Sporloggen, som gjerne foreligger på GPX-format, må konverteres til GeoJSON-fil. Denne filen skal legges inn på filområdet på folk.ntnu.no og kobles til kartet ved hjelp av Mapbox-API'et. I tillegg til webkartet skal det være en kort tekst-presentasjon av turen.

Frivillig, men anbefalt: Webkartet kan gjerne ha et WMTS-kartlag med et godt topografisk kart over Norge.

## Del 2 - Webkart med WMS-innhold

Oppgaven går også her ut på å lage et Mapbox-basert webkart.

På geonorge.no kan du finne informasjon om en WMS-tjeneste som viser naturvern-områder for hele Norge.

Ved å analysere innholdet i denne WMS-tjenesten ved hjelp av GetCapabilities-kall, kan du finne nødvendig informasjon for å legge til et kartlag fra denne tjenesten som viser naturvernområder som polygoner.
Kartet skal vise et "passe" stort område ved oppstart over et område du velger selv. Du velger selv om du vil bruke en av de medfølgende Mapbox-stilene, eller om du vil bruke et WMTS-kart som bakgrunn for naturvern-polygonene. 

Kartet skal ha en målstokklinjal.

## Del 3 - Egenskapsdata for naturvern-områder i popup-vinduer<br/>fra WMS GetFeatureInfo-kall

Løsningen på denne del-oppgaven skal integreres i webkartet for deloppgave 2.

WMS-spesifikasjonen inneholder beskrivelse av GetFeatureInfo-kall. Ut i fra beskrivelsen der og eksempel presentert i undervisning, skal du lage en løsning som ved museklikk i kartet sender et GetFeatureInfo-kall til WMS-tjenesten. Resultatet av kallet skal presenteres i et popup-vindu. Løsningen skal lages med Mapbox GL JS. I løsningen skal det legges vekt på å få vist egenskapsdata på en tydelig og lesevennlig måte.

## Del 4 - Samleside

Websidene for del 1-3 skal knyttes sammen gjennom en samleside som har linker til de andre sidene.

## Generelle krav til gjennomføring

- Det skal legges vekt på å lage sidene med en ryddig layout og fornuftig bruk av farger og fonter.
- Det skal ikke brukes websidegeneratorer eller rammeverk/API-er ut over Mapbox-API'et.
- Det er lov å hente eksempler på kode fra andre nettsteder og modifisere den, men løsningen skal bare inneholde kode som brukes.
- Koden skal være ryddig og ha god lesbarhet. Det innebærer bruk av innrykk og passende linjeskift.
- Du må kunne forklare hvordan koden er bygd opp.

## Grupper

På denne oblig'en skal alle levere hver for seg, men vi oppfordrer til samarbeid underveis.

## Innlevering

- Websidene skal legges ut på [folk.ntnu.no](https://folk.ntnu.no/).
- Innleveringen består i en URL til hovedsiden (Del 4). Den leveres under Arbeidskrav i Blackboard.


## Ressurser

### Mapbox

- forelesningsopptak i Blackboard og [Mapbox ressursside](https://sverres.github.io/ntnu/mapbox/)
- veiledning fra emnelærer

### WMS og WMTS
- [WMS-veileder fra Norge Digitalt](https://www.geonorge.no/Geodataarbeid/veiledere/)
- [WMS-spesifikasjonen fra OGC](https://www.ogc.org/publications/standard/wms/)


### Javascript Fetch API

- [eksempel/video](https://bonsaiilabs.com/js-fetch-async-await/)
- [eksempel på bruk av fetch](https://sverres.github.io/ntnu/mapbox/yr.html)

\
*NTNU 19.02.2025 Sverre Stikbakke*
