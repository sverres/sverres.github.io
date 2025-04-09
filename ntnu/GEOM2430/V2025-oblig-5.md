# GEOM2430 Vår 2025 Oblig 5<br/>Tjenesteleveranse med MDA-metoden


## Mål for oppgaven

- Lære hva en leveranse i Norge Digitalt omfatter
- Lære å lage en produktspesifikasjon
- Lære å sette opp en nedlastingstjeneste (WFS) v.h.a. PostGIS og Mapserver
- Lære om GML og WFS

## Scenario

Oppgaven er tenkt som en forenklet gjennomgang av hva en part i Norge Digitalt skal gjøre i
forbindelse med en tjenesteleveranse. Forhåpentligvis vil det gi et godt inntrykk av hva som gjøres i
et reelt tilfelle.

## Beskrivelse av tjenesten

Tjenesten skal bestå av en WFS-tjeneste som skal levere arealressurspolygoner for nærmere angitte
arealtyper innen en kommune. Arealressurspolygonene skal hentes fra FKB-AR5.
Hver gruppe skal lage tjenesten for en av kommunene Kongsberg, Oppdal eller Bindal. Arealtypene som tjenestene skal levere er enten produktiv skog eller dyrket mark og beite. Se tabell i Blackboard under _Datafiler_ for hvilke
kombinasjoner av kommune og arealtype som skal lages. Emneansvarlig vil angi i tabellen hvilken
kommune og arealtype hver gruppe skal ha.

## Arbeidsoppgaver

Oppgaven gjøres som gruppearbeid med 2-3 medlemmer pr. gruppe. Den kan også gjøres individuelt.


- Beskriv hvilke forpliktelser en part ha med tanke på tjenesteleveranser.

- Lage en produktspesifikasjon for tjenesten du skal sette opp, i henhold til mal fra Norge Digitalt.

- Lag en «miniversjon» av tjenesten på egen PC
    - Last opp aktuelle data til PostGIS
    - Sett opp WFS-tjeneste i Mapserver
    - Vise kartdata fra WFS-tjenesten i QGIS

- Lag et refleksjonsnotat der du beskriver erfaringer som gjøres underveis og vurderer hva som skiller denne oppgaven fra en reell situasjon.

## Hvordan skal vi få til dette?

- Bruk søkefunksjon på GeoNorge for å finne mest mulig informasjon om AR5.
- Gjennomføre ukeoppgave om PSTools, GISTools, PostGIS og FME.
- Les «Veileder for leveranser» fra Norge Digitalt.
- Les «Veileder for Web Feature Service (WFS)» fra Norge Digitalt.
- Følge / se opptak fra forelesningene i emnet.
- Hør på opptak fra gjesteforelesning 12. mars 2019 med Ingvild Nystuen fra NIBIO – Norsk Institutt for Bio-økonomi.
- Bruk ISO/OGC-standardene for WFS og Filter Encoding samt veiledere fra Norge Digitalt for å finne eksempler.
- Benytte tjenesten SOSI Produktspesifikasjoner på http://sosi.arkitektum.no/ for å lage produktspesifikasjon. Med denne tjenesten kan du velge objekttyper fra SOSI objektkatalog og få ut ferdig Word-dokument, UML-modell og GML skjema-fil (xsd-fil). Alle bruker samme brukernavn og passord (se Programvare-menyen i Blackboard).
- Bruke Sparx Enterprise Architect med tillegget GISTools for å opprette PostGIS-database med skjema som spesifisert i produktspesifikasjonen.
- Bruke FME Workbench for å laste SOSI-data til PostGIS-databasen.
- Bruke QGIS til å lage en kart-layout som viser data fra WFS-tjenesten.


## Hva skal leveres

- Rapport med beskrivelse av arbeidet, svar på spørsmålene i oppgaven og refleksjonsnotat
- Produktspesifikasjon for tjenesten, inkludert UML-diagram
- GML skjema-fil (*.xsd) fra PSTools
- PDF-fil med kart-layout

## Vurdering 

Det er viktig å lage en god rapport. Den skal gi en god beskrivelse på hva en tjenesteleveranse i
Norge Digitalt innebærer.


## Ressurser


Fra NTNU:

- Datafiler: oversikt over kommuner og arealtyper (Se Blackboard, under Datafiler i venstremenyen)
- forelesninger, ukeoppgaver og instruksjonsvideoer

Fra Norge Digitalt:

- [Generelle vilkår for Norge digitalt-samarbeidet](https://www.geonorge.no/Geodataarbeid/Norge-digitalt/Avtaler-og-maler/)
- [Rammeverksdokumentet](https://register.geonorge.no/subregister/versjoner/nasjonalt-rammeverk-for-geografisk-informasjon/kartverket/rammeverksdokumentet/kartverket/teknologisk-rammeverk-for-den-geografiske-infrastrukturen)
- [Veiledere](https://www.geonorge.no/Geodataarbeid/veiledere/)
    - Leveranseveilederen
    - WFS-veilederen
    - GML-veileder
    - Veileder for SOSI produktspesifikasjoner

[Fra OGC/ISO](https://www.ogc.org/docs/is):

- Web Feature Service (WFS), versjon 2.0 /ISO 19142
- Geography Markup Language (GML), versjon 3.2.1 / ISO 19136
- Geography Markup Language (GML), versjon 3.3 (Tillegg til 3.2.1)

\
_NTNU 26.03.2025 Sverre Stikbakke_