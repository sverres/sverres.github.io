# Mapfile-oppsett for WFS


## Eksempel på minimal mapfile for WFS-tjeneste

Dette eksemplet er basert på data i PostGIS-database, etablert slik det er vist i [Ukeoppgave om PSTools, GISTools, Postgis og FME](../tjenesteleveranser/ukeoppgave-PsTools-GISTools-PostGIS-FME.md)

```c
/*
    Description:  WFS on MS4W localhost ( http://127.0.0.1 )
    Data source:  FKB-AR5, produktiv skog
    Author:       sverre.stikbakke@ntnu.no
    Last updated: 2024-04-11
*/

MAP
  NAME "WMS_WFS_server"
  #EXTENT 605828 6720009 615421 6725867

  WEB
    METADATA
        "wfs_title"                     "Prodskog WFS"                                                         ## REQUIRED
        "wfs_onlineresource"            "http://localhost/cgi-bin/mapserv.exe?MAP=/ms4w/apps/prodskog/wfs.map" ## Recommended
        "wfs_srs"                       "EPSG:4326 EPSG:4269 EPSG:3857 EPSG:25832 EPSG:25833"                  ## Recommended
        "wfs_abstract"                  "Prodskog"                                                             ## Recommended
        "wfs_enable_request"            "*"                                                                    ## REQUIRED
    END
  END

  PROJECTION
    "init=epsg:25832"
  END

  LAYER
    NAME "arealressursflate"
    METADATA      
        "gml_include_items"     "all"
        "gml_geometries"        "omraade"
        "gml_geom_type"         "polygon"
        "gml_featureid"         "objid"         ## REQUIRED

        "wfs_title"             "Prodskog WFS"  ## REQUIRED
        "wfs_srs"               "EPSG:25832"    ## REQUIRED
        "wfs_enable_request"    "*"
    END

    TYPE POLYGON
    CONNECTIONTYPE POSTGIS
    CONNECTION "host=localhost dbname=prodskog-t3 user=postgres password=gulogulo port=5432" 
    DATA "omraade from prodskog.arealressursflate using unique objid"
    PROJECTION
      "init=epsg:25832"
    END
  END #layer

END #mapfile
```


\
_NTNU 08.04.2025 Sverre Stikbakke_
