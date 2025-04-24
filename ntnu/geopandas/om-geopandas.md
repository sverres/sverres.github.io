# Introduksjon til Geopandas og andre geodata-biblioteker

Det finnes en rekke programvare-biblioteker for lesing og behandling av geodata som på ulike måter er gjort tilgjengelig for programmering i Python. Her skal vi gi en kortfattet opplisting av de mest sentrale.

- [GDAL/OGR](https://trac.osgeo.org/gdal/wiki/FAQGeneral), _Geospatial Data Abstraction Library_, _OpenGIS Simple Features Reference Implementation_. Disse bibliotekene har lese- og skrive-funksjonalitet for en lang rekke raster- og vektor-geodataformater, bl.a. shape, GeoJSON, ESRI file geodatabase, PostGIS, SOSI. GDAL/OGR brukes f.ek.,s i QGIS.
- [JTS og GEOS](https://github.com/locationtech/jts), _Java Topology Suite_, _Geometry Engine - Open Source_. JTS er laget som et Java-bibliotek for å håndtere geodata i henhold til _ISO 19125-1:2004 Geographic information — Simple feature access — Part 1: Common architecture_, bl.a. ulike overlay-operasjoner og geografiske søk basert på _point set_-topologi (Egenhofer-topologi). GEOS er en oversettelse av JTS til programmeringsspåket C++. GEOS brukes i QGIS.
- [Fiona](https://github.com/Toblerity/Fiona) er en Python overbygning over GDAL/OGR open source-programvarebiblioteker, og gir mulighet for å lese og skrive til en lang rekke geodataformater fra Python-programmer. Fiona er inkludert bl.a. i Geopandas.
- [Shapely](https://github.com/Toblerity/Shapely) er et Python-bibliotek for _"manipulation and analysis of planar geometric objects"_. Det er basert på GEOS og JTS.
- [Rasterio](https://rasterio.readthedocs.io/en/latest/) er et Pyton-bibliotek for lesing og skriving av raster-formatet GeoTIFF.
- [Pandas](https://pandas.pydata.org/docs/getting_started/overview.html) er et generelt Python-bibliotek for håndtering av vektor- og matrise-baserte data (tabell-strukturer). Det brukes mye innenfor _Data Science_-feltet.
- [Geopandas](https://geopandas.org/) er en utvidelse av Pandas for håndtering av geodata (vektordata). Geopandas inkluderer funksjonalitet fra Shapely og Fiona, samt [descartes](https://pypi.org/project/descartes/) og [matplotlib](https://matplotlib.org/) for plotting.
- [Eartpy](https://www.earthdatascience.org/tools/earthpy/) er en overbygning over Geopandas som bl.a. inneholder en del funksjonalitet for både raster- og vektordata - deriblant forbedrede plottemuligheter.

Det kan være nyttig å kjenne til en del av disse avhengighetene mellom programvarebibliotekene bl.a. ved at dokumentasjon kan hentes fra flere kilder. For eksemplel, så kan dokumentasjon om tilgjengelige geodataformater i GeoPandas finnes i GDAL/OGR-dokumentasjonen. For å finne aktuell dokumentasjon vil Google-søk ofte være nyttige, men igjen vil et generelt kjennskap til disse programvarebibliotekene kunne gi en pekepinn om verdien av søke-treffene. Ved å lese de innledende avsnittene fra dokumentasjonen til hvert bibliotek kan man raskt få en oversikt over hvilke oppgaver de ulike bibliotekene er utviklet for, og lettere kunne sette opp målrettede søk.

## Eksempel med bruk av data fra geonorge.no

Eksemplet nedenfor viser

- innlesing av FGDB-data for Innlandet fylke, administrative data, kommuner og grunnkretser
- utforsking av innhold i datasett
- oppretting av indekser som forberedelse av join-operasjoner
- plotting av kart (øvingsoppgaven viser flere muligheter)
- join/merge-operasjon
- utvalg av data
- overlay-operasjon

[Innlandet - med Python og Geopandas](geopandas-innlandet.html)


## Ressurser

- [GeoPandas ressursside](index.html)

\
_02.02.2021 - Sverre Stikbakke_
