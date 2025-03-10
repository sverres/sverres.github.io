# Eksempel på minimal mapfile for WMS-tjeneste

```c
/*
 Description:  Simple WMS service to display on MS4W localhost ( http://127.0.0.1 )
 Data source:  NaturalEarth dataset, in SpatiaLite format.
 Other notes:  Open this mapfile in Notepad++, and use the color syntax file
               from https://ms4w.com/trac/wiki/Notepad++MapServerStyle
 Author:       Jeff McKenna, GatewayGeo, info@gatewaygeomatics.com
 Last updated: 2020-12-17
*/

MAP
NAME "innlandet"
STATUS ON
SIZE 400 300
SYMBOLSET "../etc/symbols.txt"
## EPSG:4326 extents:
EXTENT -180 -90 180 90
UNITS DD
SHAPEPATH "../data"
IMAGECOLOR 255 255 255
FONTSET "../etc/fonts.txt"
MAXSIZE 4096

WEB
  IMAGEPATH "/ms4w/tmp/ms_tmp/" 
  IMAGEURL "/ms_tmp/"
  METADATA
    "wms_title"   		"NTNU Demo WMS Server"
    "wms_onlineresource" 	"http://127.0.0.1/cgi-bin/mapserv.exe?MAP=/ntnugeo/apps/innlandet/map/innlandet.map"
    "wms_srs"   		"EPSG:4326 EPSG:4269 EPSG:3857 EPSG:25832"
    "wms_feature_info_mime_type" "text/plain"
    "wms_abstract"      	"Demo-WMS for NTNU, GEOM2240"
    "ows_enable_request" 	"*"  
  END
END

PROJECTION
  "init=epsg:3857"
END

#
# Start of layer definitions
#

LAYER
  NAME "kommune"
  METADATA
    "wms_title"  	"Innlandet"
    "wms_include_items" "all"
  END
  TYPE POLYGON
  STATUS ON
  CONNECTIONTYPE OGR
  #CONNECTION "C:/ntnugeo/apps/ntnustudent/innlandet/data/filegdb/Basisdata_34_Innlandet_25832_Kommuner_FGDB.gdb"
  CONNECTION "/ms4w/apps/innlandet/data/filegdb/Basisdata_34_Innlandet_25832_Kommuner_FGDB.gdb"
  DATA "kommune"
  PROJECTION
    "init=epsg:3857"
  END
  CLASS
    NAME "kommune"
  END
  TEMPLATE "ttt.html"
END # layer

END # Map File

```

\
_NTNU 10.03.2025 Sverre Stikbakke_