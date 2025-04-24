# GEOM2430 Vår 2025 Oblig 1<br/>Geografiske databaser og GeoPandas


## Mål for oppgaven

Oppgaven har til hensikt å innarbeide forståelse for geografiske databaser og spørringer mot slike databaser ved hjelp av GeoPandas og SQL. 


## Bakgrunn

Oppgaven bygger på Ukeoppgave – PostGIS og teori om geografiske databaser fra 

- Workshop - Introduction to PostGIS: [https://postgis.net/workshops/postgis-intro/](https://postgis.net/workshops/postgis-intro/) (Kapittel 1-17)

samt teori og eksempler på bruk av python-programmering mot PostGIS-databaser fra 

- [Geopandas ressursside](https://folk.ntnu.no/sverrsti/geopandas/)

og et Jupyter notebook-eksempel som viser hvordan man kan sette opp spørringer mot en PostGIS-database

- [Oblig 1 eksempel-spørring](oblig_1.html)

## Oppgaven

Oppgaven består i å lage et Jupyter Notebook-dokument som utfører spørringer som gir svar på spørsmålene nedenfor.

Mange av disse spørringene benytter seg av funksjoner som er spesifikke for PostGIS, og alle disse funksjonene har navn som begynner med ST_, f.eks. som i ST_CONTAINS(..). 

For tre slike funksjoner som brukes i løsningen skal du gi en forklaring på norsk som forklarer hva funksjonen gjør, og hva parametrene til funksjonen er. Disse beskrivelsene skal legges inn i egne Markdown-celler i dokumentet.

## Hva skal leveres

- HTML-versjon av Jupyter Notebook-dokumentet (File/Save and Export Notebook As/HTML).

## Data for oppgaven

SQL-filer for opplasting av tabeller til PostGIS-database: [glt.zip](docs/glt.zip). 
<br/>Merk at dataene er fra 2009, og dermed ikke oppdatert m.h.t. kommune-nummer og nyere bygg/veier etc.

For å gjennomføre oppgaven må dere først opprette en ny database (kall den gjerne glt), klargjøre den for geografiske data og kjøre SQL-scriptene i glt.zip i fra pgAdmin-programmet.

## Dictionary

Etter at data er lastet opp, vil databasen det skal spørres mot, inneholde seks tabeller med data fra kommunene Gjøvik, Lillehammer, Østre- og Vestre Toten:

Tabell | Innhold
--- | ---
grunnkrets |Dette er data fra Statistisk Sentralbyrå som inneholder befolkningstall.
sentrumssone |Dette er automatisk beregnede soner (polygoner) som viser sentrumssoner i store tettsteder og byer.  Samme beregning er gjort over flere år, så polygonene er derfor overlappende.
bygning |Dette er alle bygninger i en viss radius rundt B-bygget på NTNU.
bygning750 |Dette er alle bygninger med størrelse over 750 kvadratmeter i de fire kommunene.
trackpoint |Dette er et punkttema med GPS tracklog (sporlogg) fra noen sykkelturer mellom Totenvika og Gjøvik.
vbase |Dette er europa-, riks, og fylkesveier.

## Spørsmål vi ønsker svar på

```SQL
-- ================================================================================
-- Del 1 Enkle SQL-spørringer
-- ================================================================================

-- Hvor mange kvinner og menn bor det i grunnkretsen Tongjordet?

-- Hvor mange grunnkretser er det i Gjøvik? Gjøvik har kommunenummer 502.

-- Hvor lang er riksvei 4 i Vestre Toten?

-- På hvilken dato startet den første sykkelturen?


-- ================================================================================
-- Del 2 Enkle Simple Features-funksjoner
-- ================================================================================

-- Hva er areal og omkretsen av grunnkretsen Tongjordet?


-- ================================================================================
-- Del 3 Funksjoner for å teste romlige relasjoner
-- ================================================================================

-- Ligger byggnr 7447868 innenfor Maihaugen grunnkrets?

-- Hvor langt er det fra B-bygget til nærmeste sentrumssone? B-bygget har byggnr. 7482434.

-- Hvor mange hus er det i grunnkretsen Kirkebyskogen?


-- ================================================================================
-- Del 4 Spatial Join
-- ================================================================================

-- GPS-punktene innenfor grunnkretsen Rambekkmoen (de 5 første):

-- Hvor mange hus er det i grunnkretsen Kirkebyskogen?


-- ================================================================================
-- Del 5 Konstruere ny geometri
-- ================================================================================
-- Lag en ny tabell med følgende SQL-kommando:

query = """
CREATE TABLE rv4 AS
SELECT *
FROM vbase
WHERE datfgstdat = '05.09.2006';
"""

with engine.begin() as conn:
  conn.execute(text(query))
  
-- Lag deretter en buffersone på 100 meter rundt denne veistrekningen.
--   Bruk samme metode som ovenfor for å utføre en SQL-spørringen som lager 
--   bufferet og legger det i en ny tabell.
--   (hvis spørringene ikke returnerer noe må vi bruke conn.execute(...) -metoden.

-- Hva er arealet arealet av hele buffersonen?
-- Hva er arealet av hver grunnkrets som faller innenfor buffersonen?

```

## Ressurser

Eksempel på oppsett for spørring mot PostGIS-databaser:

```python

# Geopandas-eksempel med lesing av kodetabell fra prodskog-databasen.
#   Merk at prodskog også er navnet på skjemaet som arealressursarealtype-tabellen ligger i.
#   Hvis tabellen det spørres mot ligger i public-skjemaet, trenger man ikke spesifisere skjema 

import pandas as pd
import geopandas as gpd

from sqlalchemy import create_engine, text
from mypostgisdb import postgis_connection_string

engine = create_engine(postgis_connection_string)
query = 'SELECT * from prodskog.arealressursarealtype'

with engine.begin() as conn:
  df = pd.read_sql_query(sql=text(query), con=conn)

df

```


```python
# Innhold I mypostgisdb.py - postgres er brukernavn for databasen, prodskog er navnet på databasen

postgis_connection_string = 'postgresql://postgres:passord@localhost:5432/prodskog'

```

### PostGIS brukermanual

- [Chapter 8. PostGIS Reference](https://postgis.net/docs/manual-3.4/reference.html)
- [8.11.1. Topological Relationships](https://postgis.net/docs/manual-3.4/reference.html#Spatial_Relationships)



\
_NTNU 10.01.2025 Sverre Stikbakke_