# OGC API-oppsett for Mapserver

## Demo-applikasjon som følger med MS4W-installasjonen

Mappe for demo-installasjon: `C:\ms4w\apps\local-demo`

Mapfile: `C:\ms4w\apps\local-demo\local.map`

Url til tjenesten finner vi under WEB-seksjonen under METADATA: 

`"oga_onlineresource"      "http://127.0.0.1/cgi-bin/mapserv.exe/local-demo/ogcapi"`

En del av denne addressen, `local-demo`, er et alias som er satt opp i fila `C:\ms4w\ms4w.conf`:

```html
  #
  # Map aliases
  #
  MAPS
    local-demo "C:/ms4w/apps/local-demo/local.map"
  END
```

## Mapserver-ressurser for oppsett av OGC API

Mapfile - se under Dokumentasjon og OGC (OGC API : Features)
- [https://mapserver.org/documentation.html](https://mapserver.org/documentation.html)

Datakilder - se under Dokumentasjon og Iput (Vector Data)
- [https://mapserver.org/documentation.html](https://mapserver.org/documentation.html)


## Mapfile for demo-applikasjon som setter opp OGC API-tjeneste

Denne mapfila er svært omfattende, og setter også opp WMS og WFS i tillegg til OGC API. For å finne ut hva som kreves for bare OGC API, se dokumentasjonen for OGC API og eksempel på mapfile der.

Til info: Mapfila som vises her på denne siden virker uten modifikasjoner. Mapfila som vises i dokumentasjonen krever at det installeres ekstra filer i `apps\local-demo`-mappa.

```html
/*
 Description:  Simple map to display on MS4W localhost ( http://127.0.0.1 )
               Also configured for WMS, WFS, OGCAPI (Feature) services, and 
			   includes GeoJSON, Shapefile, KMZ, GML output
 Data source:  NaturalEarth dataset, in SpatiaLite format.
 Other notes:  Open this mapfile in Notepad++, and use the color syntax file
               from https:/C:/ms4w.com/trac/wiki/Notepad++MapServerStyle
 Author:       Jeff McKenna, GatewayGeo, info@gatewaygeomatics.com
 Last updated: 2024-09-02
*/
 
MAP
  NAME "local-demo"
  STATUS ON
  SIZE 600 400
  SYMBOLSET "../etc/symbols.txt"
  EXTENT -23422614 -11650014 23758273 18540865 #EPSG:3857
  #EXTENT -180 -90 180 90 #EPSG:4326
  UNITS meters #EPSG:3857
  #UNITS DD #EPSG:4326
  SHAPEPATH "./data"
  IMAGECOLOR 255 255 255
  FONTSET "../etc/fonts.txt"
  IMAGETYPE "png"
  
  #output projection
  PROJECTION 
    "init=epsg:3857" #Web Mercator, see https://spatialreference.org/ref/epsg/3857/
  END  
  
  WEB
    IMAGEPATH "C:/ms4w/tmp/ms_tmp/" 
    IMAGEURL "/ms_tmp/"
    METADATA
      "ows_title"               "MS4W Demo WMS / WFS / OGCAPI Server"
      "ows_abstract"            "This demonstration server was setup by GatewayGeo (https://gatewaygeomatics.com/) and is powered by MS4W (https:/C:/ms4w.com/)."      
      "ows_keywordlist"         "MS4W, MapServer, OGCAPI"
      "ows_onlineresource"      "http://127.0.0.1/cgi-bin/mapserv.exe?map=C:/ms4w/apps/local-demo/local.map"
      "oga_onlineresource"      "http://127.0.0.1/cgi-bin/mapserv.exe/local-demo/ogcapi"      
      "ows_service_onlineresource" "https://gatewaygeomatics.com/"
      "ows_fees"                "none"
      "ows_accessconstraints"   "none"    
      "ows_contactperson"       "Jeff McKenna" 
      "ows_contactorganization" "GatewayGeo"
      "ows_contactposition"     "Director"
      "ows_role"                "Director"
      "ows_contactelectronicmailaddress" "info@gatewaygeomatics.com"
      "ows_contactvoicetelephone" "none"
      "ows_contactfacsimiletelephone" "none"
      "ows_contactinstructions" "none"
      "ows_hoursofservice"      "none"
      "ows_addresstype"         "none"    
      "ows_address"             "none"
      "ows_city"                "none"
      "ows_stateorprovince"     "none"
      "ows_postcode"            "none"
      "ows_country"             "none"    
      "ows_srs"                 "EPSG:3857 EPSG:4326 EPSG:4269"
      "ows_getfeatureinfo_formatlist" "text/plain,text/html,application/json,application/vnd.ogc.gml,gml"
      "wfs_getfeature_formatlist" "gml,application/json,shapezip,kmz,ogrgml,spatialite,ogrflatgeobuf,csv" #can also be set at LAYER level, which will be used instead     
      "ows_enable_request"      "*"
      "wms_allow_getmap_without_styles" "true"
      #"oga_html_template_directory" "../../share/ogcapi/templates/html-plain/"
      "oga_html_template_directory" "../../share/ogcapi/templates/html-bootstrap4/"	  
    END
  END
  
  /* Sample outputformats 
       more about includes at https://mapserver.org/mapfile/include.html
  */  
  INCLUDE "../includes/outputformat.include"
  
  /* Ocean */
  LAYER
    NAME "ocean"
    METADATA
      "ows_title" "Ocean"
      "ows_abstract"      "World Oceans, NaturalEarth dataset, 2020"
      "ows_keywordlist"   "MS4W, MapServer, OGCAPI"	  
      "ows_include_items" "all"
      "gml_include_items" "all"
	  "gml_featureid"     "ne_id"
      "gml_types"         "auto"
      "wfs_use_default_extent_for_getfeature" "false"
      "ows_extent" "-180 -90 180 90" #data's source extent, this helps for performance
    END
    TYPE POLYGON
    STATUS ON
    CONNECTIONTYPE OGR
    CONNECTION "demo.db"
    DATA "ocean"
    #the data's source projection
    PROJECTION
      "init=epsg:4326" #latlong, see https://spatialreference.org/ref/epsg/4326/
    END
    CLASS
      NAME "Ocean"
      STYLE
        COLOR 134 204 249
      END
    END
    TEMPLATE "ttt.html"
  END # layer
  
  /* Countries */
  LAYER
    NAME "countries"
    METADATA
      "ows_title"       "World Countries"
      "ows_abstract"      "World Countries, NaturalEarth dataset, 2020"
      "ows_keywordlist"   "MS4W, MapServer, OGCAPI"	  
      "ows_include_items" "all"
      "gml_include_items" "all"
	  "gml_featureid"     "ne_id"
      "gml_types"         "auto"
      "wfs_use_default_extent_for_getfeature" "false"
      "ows_extent" "-180 -90 180 90" #data's source extent, this helps for performance    
    END
    TYPE POLYGON
    STATUS ON
    CONNECTIONTYPE OGR
    CONNECTION "demo.db"
    DATA "countries"
    #the data's source projection
    PROJECTION
      "init=epsg:4326" #latlong, see https://spatialreference.org/ref/epsg/4326/
    END
    LABELITEM "name"
    CLASS
      NAME "World Countries"
      STYLE
        COLOR 200 200 200
        OUTLINECOLOR 0 0 0
        WIDTH 0.1
      END
      LABEL
        FONT sans
        TYPE truetype
        POSITION AUTO     
        PARTIALS FALSE
        BUFFER 5
        SIZE 5 
        COLOR 75 75 75
        MINFEATURESIZE 10
      END     
    END
    TEMPLATE "ttt.html"  
  END # layer
  
  /* Lakes */
  LAYER
    NAME "lakes"
    METADATA
      "ows_title" "World Lakes"
      "ows_abstract"      "World Lakes, NaturalEarth dataset, 2020"
      "ows_keywordlist"   "MS4W, MapServer, OGCAPI"	  
      "ows_include_items" "all"
      "gml_include_items" "all"
      "gml_featureid"     "ne_id"
      "gml_types"         "auto"
      "wfs_use_default_extent_for_getfeature" "false"
      "ows_extent" "-180 -90 180 90" #data's source extent, this helps for performance    
    END
    TYPE POLYGON
    STATUS ON
    CONNECTIONTYPE OGR
    CONNECTION "demo.db"
    DATA "lakes"
    #the data's source projection
    PROJECTION
      "init=epsg:4326" #latlong, see https://spatialreference.org/ref/epsg/4326/
    END
    CLASS
      NAME "Lakes"
      STYLE
        COLOR 153 204 255
      END
    END
    TEMPLATE "ttt.html"  
  END # layer
  
  /* Ocean labels */
  LAYER
    NAME "ocean-labels"
    METADATA
      "ows_title" "Ocean Labels"
      "ows_abstract"      "Ocean Labels, NaturalEarth dataset, 2020"
      "ows_keywordlist"   "MS4W, MapServer, OGCAPI"	  
      "ows_include_items" "all"
      "gml_include_items" "all"
      "gml_featureid"     "ne_id"
      "gml_types"         "auto"
      "wfs_use_default_extent_for_getfeature" "false"
      "ows_extent" "-180 -90 180 90" #data's source extent, this helps for performance
    END
    TYPE POLYGON
    STATUS ON
    CONNECTIONTYPE OGR
    CONNECTION "demo.db"
    DATA "marine_region_poly"
    #the data's source projection
    PROJECTION
      "init=epsg:4326" #latlong, see https://spatialreference.org/ref/epsg/4326/
    END
    LABELITEM "name"
    CLASS
      NAME "Ocean Labels"
      LABEL
        COLOR  75 75 75
        FONT sans-italic
        TYPE truetype
        SIZE 5
        POSITION AUTO      
        PARTIALS FALSE
        BUFFER 5
      END
      #MAXSCALEDENOM 50000000
    END
    TEMPLATE "ttt.html"  
  END # layer
  
  /* Places */
  LAYER
    NAME "places"
    METADATA
      "ows_title" "Populated Places"
      "ows_abstract"      "Populated Places, NaturalEarth dataset, 2020"
      "ows_keywordlist"   "MS4W, MapServer, OGCAPI"	  
      "ows_include_items" "all"
      "gml_include_items" "all"
      "gml_featureid"     "ne_id"
      "gml_types"         "auto"
      "wfs_use_default_extent_for_getfeature" "false"
      "ows_extent" "-180 -90 180 90" #data's source extent, this helps for performance    
    END
    TYPE POINT
    STATUS ON
    CONNECTIONTYPE OGR
    CONNECTION "demo.db"
    DATA "places"
    #the data's source projection
    PROJECTION
      "init=epsg:4326" #latlong, see https://spatialreference.org/ref/epsg/4326/
    END
    LABELITEM "name"
    CLASS
      NAME "Populated Places"
      STYLE
        SYMBOL "square"
        SIZE 4
        COLOR 150 150 150
      END #style
      LABEL
        COLOR  75 75 75
        FONT sans
        TYPE truetype
        SIZE 5
        POSITION AUTO      
        PARTIALS FALSE
        BUFFER 5
      END
      MAXSCALEDENOM 50000000
    END
    TEMPLATE "ttt.html"  
  END # layer

END # Map File
```
\
_NTNU 13.03.2025 Sverre Stikbakke_
