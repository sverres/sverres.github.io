# Installasjon og oppstart av Geopandas i Windows 10

- sett av 15-30 minutter for installasjonen
- geopandas krever ca. 6 GB diskplass

## Installasjon

NB: Standard installasjonsmappe er under ditt hjemmeområde (f.eks. C:\Users\sverrsti\Miniconda3) og brukernavnet ditt i Windows er en del av denne adressen. Hvis brukernavnet ditt inneholder æ, ø, eller å og/eller mellomrom, så vil ikke geopandas virke. Hvis du har brukernavn med disse tegnene, gjør du dette:

- før installasjonen: lag mappen Miniconda3 på rotnivå på C-disken (C:\Miniconda3)
- under installasjonen: velg denne mappen som installasjonsmappe

Hvis du ikke har slike tegn i brukernavnet kan du følge alle standardvalgene i installasjonsprogrammet. 

Hent installasjonsfil for Miniconda her:

- [Informasjon om Miniconda](https://docs.anaconda.com/miniconda/)
- [Nedlasting](https://www.anaconda.com/download/) - Du kan klikke på "Skip registration" under Submit-knappen
- [Velg "Minikonda Installers" - ikke "Anaconda Installers" når du kommer hit:](https://www.anaconda.com/download/success)<br/>https://www.anaconda.com/download/success

Etter at du har kjørt installasjonsprogrammet, åpner du kommandovinduet _Anaconda Prompt (Miniconda3)_ fra Windows-menyen og kjører kommandoene nedenfor én etter én. Det kan komme noen feilmeldinger underveis, men disse blir som oftest håndtert automatisk. Installasjonen går ikke helt automatisk - du må svare ja på endel spørsmål underveis.

Disse kommandoene installerer geopandas under oppsettet 'geo'. Ved å lage et eget oppsett for geopandas, kan du ha egne versjoner av programbiblioteker som ikke kommer i konflikt med andre versjoner i andre oppsett. Conda er et system for administrasjon av programpakker.

```ini
conda create -n geo
conda activate geo
conda config --env --add channels conda-forge
conda config --env --set channel_priority strict
conda install python=3 geopandas
```

Deretter gis disse kommandoene som gir muligheter for kart-framstilling (matplotlib og descartes) samt bruk av notebooks i Jupyter Lab:

```ini
conda install -c conda-forge matplotlib
conda install -c conda-forge descartes
conda install -c conda-forge jupyterlab
```

Installasjon av nødvendige pakker for å kommunisere med PostGIS-databaser:

```ini
conda install -c conda-forge sqlalchemy
conda install -c conda-forge geoalchemy2
conda install -c conda-forge psycopg2
```

Installasjon av nødvendige pakker for å bruke NetCDF-filer:

```ini
conda install -c conda-forge rioxarray
conda install -c conda-forge earthpy
```

Oppdatering til siste versjon av alle installerte pakker. Denne kan brukes, hvis man etter en tid har en god grunn for å oppdatere. Kommandoen ivaretar avhengigheter mellom pakker.

```ini
conda update --all
```


## Starte Jupyter Lab

For å starte Jupyter Lab i mappen NTNU, gi disse kommandoene i kommandovinduet for _Anaconda Prompt_:

```ini
cd \                  ; går til rotnivå på c-disken
md NTNU               ; lager mappen NTNU  (gjøres bare første gang)
cd NTNU               ; går ned i mappen
activate geo          ; aktiverer geopandas-oppsettet (et conda 'environment')
jupyter lab           ; starter Jupyter Lab (som kommer opp i et nettleservindu)
```

## Ressurser

- [Getting started with conda](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html)
- [Om Geopandas-installasjonen](https://geopandas.org/install.html)
- [Using the conda-forge channel](https://geopandas.org/install.html#using-the-conda-forge-channel)
- [Geopandas User Guide](https://geopandas.org/)

\
_NTNU 02.02.2021 Sverre Stikbakke_\
_NTNU 05.03.2021 PostGIS-pakker, conda update --all_\
_NTNU 21.02.2022 lagt til installasjon av NetCDF-biblioteker_
