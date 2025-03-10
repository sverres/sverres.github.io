# Ukeoppgave med Mapserver - lage en egen WMS-tjeneste

1. Hent ned et datasett med kommuneinndeling innenfor et fylke fra Geonorge. Datasettet skal bestå av polygoner. Datasettet lastes ned på FGDB-format.
2. Lag mappe for tjenesten under _C:\ms4w\apps_, f.eks. _C:\ms4w\apps\innlandet_
3. Legg inn FGDB-fil (mappe) i denne mappen igjen, f.eks. *C:\ms4w\apps\innlandet\Basisdata_34_Innlandet_25832_Kommuner_FGDB.gdb*
4. Legg inn og tilpass en mapfile i mappen for tjenesten. Ta utgangspunkt i malen vist nedenfor.
5. Test tjenesten ved å lage en url med GetCapabilities-parametre som vist ovenfor.
5. Lag en WMS-tjeneste for disse kartdatene med utgangspunkt i oppsettet som som vist eh ....

## Lage webkart for egen WMS-tjeneste

Ta utgangspunkt i lærestoffet under Open Layers, og lag et webkart som viser fram din egen WMS-tjeneste.

# Eksempel på minimal mapfile for WMS-tjeneste

```c
    "wms_feature_info_mime_type"    "text/plain"
    "wms_abstract"                  "Demo-WMS for NTNU, GEOM2430"
    "ows_enable_request"            "*"
  END
END

PROJECTION
  "init=epsg:25832"
END

LAYER
  NAME "kommune"
  METADATA
    "wms_title"     "Innlandet"
    "wms_include_items" "all"
  END
  TYPE POLYGON
  STATUS ON
  CONNECTIONTYPE OGR
  CONNECTION "/ms4w/apps/innlandet/data/filegdb/Basisdata_34_Innlandet_25832_Kommuner_FGDB.gdb"
  DATA "kommune"
  PROJECTION
    "init=epsg:25832"
  END
  CLASS
    NAME "kommune"
  END
END ## Layer

END ## Mapfile

```

\
_NTNU 10.03.2025 Sverre Stikbakke_