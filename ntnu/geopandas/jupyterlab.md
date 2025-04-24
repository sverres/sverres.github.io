# Kort intro til JupyterLab

## Hva er JupyterLab?

JupyterLab er et web-basert utviklingsmiljø for utvalgte programmeringsspråk, bl.a. Python. JupyterLab gir mulighet for å lage dokumenter som 
kombinerer tekst, programkode og visualiseringer.

JupyterLab er avhengig av en underliggende Python-installasjon og eventuelle programbiblioteker. GeoPandas er en samling av slike biblioteker.

Sentrale navn og begreper:

- Conda: System for administrasjon av programbiblioteker/pakker.
- Front-end: En webside med mulighet til å redigere og kjøre programkode.
- Celler: Kode organiseres i avgrensede tekstfelt, celler.
- Celletype Code: For programkode
- Celletype Markdown: For formatert tekst
- Celletype Raw: For uformatert tekst
- Kernel: Program som kjører i bakgrunnen og som på kommando fra Front-end vil utføre programkoden i cellene.
- Notebook: Filformat for filene som programkode og tekst lagres i. Har .ipynb-endelse og JSON-struktur internt.
- Markdown: Tekstformat for markering av overskrifter, linker etc. Oversettes til HTML-kode

## Hvordan starte JupyterLab?

Fra kommandovindu for Miniconda/Anaconda:

```
cd \                    ; går til rotnivå på c-disken
md NTNU                 ; lager mappen for programfiler (gjøres bare første gang)
cd NTNU                 ; går ned i mappen
conda activate geo      ; aktiverer geopandas-oppsettet (et conda 'environment')
jupyter lab             ; starter JupyterLab (som kommer opp i et nettleservindu)
```

## Hvordan redigere og kjøre programkode i JupyterLab?

### Edit Mode og Command Mode

JupyterLab opererer med to typer modus, og vil reagere ulikt på tastetrykk etter hvilken modus den er i.

- Edit mode: Cursor er synlig inne i en celle, og celle-kanten er uthevet med blå farge. Vanlig oppførsel som i en tekstbehander kan forventes.
- Command mode: Cursor er ikke synlig, men det er (fortsatt) en blå markør utenfor cellen.

### Skifte mellom Edit Mode og Command Mode

- Esc - fra Edit Mode til Command Mode
- Enter - går inn i en celle i Edit Mode

### Hurtigtaster i Command mode

Tast | Operasjon
--- | ---
a |Setter inn ny celle ovenfor aktiv celle
b |Setter inn ny celle nedenfor aktiv celle
x |Cut - klipper ut aktiv celle
c |Copy - kopierer aktic celle
v |Paste - limer inn celle etter x- eller c-kommando
dd |Sletter aktiv celle
y |endrer celletype til code
m |endrer celletype til markdown
r |endrer celletype til raw
ii |Interrupt - avbryt kjøring av aktiv celle


### Hurtigtaster i Edit mode

Tast | Operasjon
--- | ---
Cursor-bevegelser |
Ctrl-Home |gå til celle start
Ctrl-Up |gå til celle start
Ctrl-End |gå til celle slutt
Ctrl-Down |gå til celle slutt
Ctrl-Left |gå ett ord til venstre
Ctrl-Right |gå ett ord til høyre
Markering av tekst |
Shift + Cursor-bevegelser |markerer tekst
Kopiering av tekst |
Shift + del |kopier tekst
Shift + ins |lim inn tekst
Ctrl + C |Copy - kopierer markert tekst
Ctrl + X |Cut - klipper ut markert tekst
Ctrl + V |Paste - limer inn tekst

Høyre-klikk for å få kontekstmeny med kopier/lim inn fungerer ikke i JupyterLab. Man må bruke tastatur-kommandoer for å kopiere av tekst.

### Hurtigtaster i begge modus

Tast | Operasjon
--- | ---
Shift + Enter |Kjør aktiv celle - hopp til neste celle
Ctrl + Enter |Kjør aktiv celle - forbli i samme celle
Ctrl + S |Lagrer notebook-dokument

### Aktuelle meny-kommandoer

Meny-punkt | ---
--- | ---
File/Rename notebook
Edit/Clear all outputs
Run/Restart kernel and run all cells

## Referanser

- [https://jupyter.org/documentation](https://jupyter.org/documentation)
- [JupyterLab](https://jupyterlab.readthedocs.io/en/latest/)

\
_06.03.2021 - Sverre Stikbakke_
