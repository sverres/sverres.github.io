# Introduksjon til Mapbox

## Enkelt webkart

### Import av javascript-bibliotek og css

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Display a map on a webpage</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js"></script>
<style>
body { margin: 0; padding: 0; }
#map { position: absolute; top: 0; bottom: 0; width: 100%; }
</style>
```

script-taggen sørger for å gjøre Mapbox-biblioteket tilgjengelig, mens link-taggen importerer CSS-kode som brukes av Mapbox. Begge disse taggene skal stå i *head*-delen av html-filen.

### accessToken

Når du har registrert deg hos Mapbox, kan du hente ut et *acessToken* fra denne siden:
- [Access Tokens](https://account.mapbox.com/access-tokens/)

NB: Fra og med H2024 må man legge inn betalingsinformasjon for å få registrert seg hos Mapbox. Det betyr ikke nødvendigvis at man må betale for å bruke deres tjenester. Pr. februar 2025 kan man ha 50 000 sidevisninger før de tar betalt. Se nærmere info her: [Mapbox Pricing](https://www.mapbox.com/pricing)

Dette settes inn i starten av script-taggen. 

```html
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

<script>
    mapboxgl.accessToken = 'pk.eyJ1Ijo....';
</script>
```

Script-taggen skal stå i *body*-delen av html-dokumentet.

### Map

Les beskrivelsen for Map-objektet her:

- [Map](https://docs.mapbox.com/mapbox-gl-js/api/map)

Legg merke til setningen *Extends Evented*. Dette betyr at Map-objektet er en utvidelse av objektet *Evented*. Se mer om dette nedenfor.

Map-objektet knyttes til en variabel, her *map*, men dette navnet kan bestemmes helt fritt. Videre, så initieres Map-objektet med noen opsjoner. Av disse må *container* og *style* alltid være med. Det er svært vanlig å ha med opsjonene *center* og *zoom* i tillegg.

Eksempel tatt fra denne siden:

- [Display a map on a webpage](https://docs.mapbox.com/mapbox-gl-js/example/simple-map/)

```html
<div id='map'></div>
<script>

const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [10.5, 11.5], // starting position [lng, lat]
	zoom: 14, // starting zoom
});
</script>
```


## Events

Evented-objektet har som en "Instance Member" funksjonen *on*. Denne funksjonen gjør følgenede: 
> Adds a listener to a specified event type (se [on](https://docs.mapbox.com/mapbox-gl-js/api/#evented#on)). 

on-funksjonen har to parametre:
- _type_, som angir hvilken type event den skal følge med på. 
- _listener_, som angir en funksjon som skal kalles når eventet oppstår.

Map-objektet har en lang rekke mulige event-typer som kan brukes til å initiere en aktivitet (et funksjonskall). Et av disse mulige eventene er *[load](https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:load)*. Load er beskrevet slik:
> Fired immediately after all necessary resources have been downloaded and the first visually complete rendering of the map has occurred.

### Hvordan skrive kode som kjøres når et *event* inntreffer?

Vi kan f.eks. bruke funksjonen *on* og eventtypen *load* og skrive en melding til konsollet i nettleseren slik:

```javascript
map.on('load', function (){
    console.log("Eventet 'load' ble *avfyrt*.")
})
```

For å se denne meldingen trykker du *F12* og velger *console*-fanen.

### Oppgave

1. Hent inn et komplett eksempel i nettleseren og kopier koden til en fil som du lagrer lokalt på egen PC:
    - [mapbox-mini.html](mapbox-mini.html)
    (bruk Ctrl + U for å se koden for siden i nettleseren) 
2. Bytt ut eventtypen *load* med en annen type event, og se om det blir skrevet ut noe når eventet inntreffer. Mulige eventtyper finner du under dokumentasjonen for Map-objektet i API-dokumentasjonen.
3. Se kode-eksempel i forelesningsnotat [Mapbox events som returnerer data-objekt](https://folk.ntnu.no/sverrsti/GEO2311F-H2020/mapbox-events-data.html), og skriv ut avgrensingen av kartet i nord, sør, øst og vest.
4. Ut fra det du nå har sett, og ved hjelp av API-dokumentasjonen: skriv ut zoom-nivået kartet er på når du er ferdig med å zoome.
5. Test ut funksjonen både med å scrolle og ved å dobbeltklikke i kartet. Er det noen forskjell på disse to?

##

*NTNU 11.02.2025 Sverre Stikbakke*
