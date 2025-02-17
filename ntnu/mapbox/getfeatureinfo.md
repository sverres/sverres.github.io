# WMS GetFeatureInfo

Getfeatureinfo er et mulig kall mot en WMS-tjeneste. I kallet benyttes bilde-koordinater i et fiktivt bilde. Dersom det finnes kartobjekter av den etterpurte typen på dette stedet vil WMS-tjenesten returnere egenskapsdata for disse.

Getfeatureinfo-kallet har alle parametrene som et WMS-kall i tillegg til et sett med bilde-koordinater og informasjon om hvilket kartlag det ønskes egenskapsdata om.

Eksempel på WMS-kall:

```html
https://wms.geonorge.no/skwms1/wms.topo
?bbox=1185691.1827596538,8576234.573596776,1186302.6789859347,8576846.069823056
&format=image/png
&service=WMS
&version=1.3.0
&request=GetMap
&crs=EPSG:3857
&width=256
&height=256
&layers=topo
&styles=default
&transparent=false
```

![topo](https://wms.geonorge.no/skwms1/wms.topo?bbox=1185691.1827596538,8576234.573596776,1186302.6789859347,8576846.069823056&format=image/png&service=WMS&version=1.3.0&request=GetMap&crs=EPSG:3857&width=256&height=256&layers=topo&styles=default&transparent=false)


Eksempel på GetFeatureInfo-kall med samme bilde-avgrensning:

```html
https://wms.geonorge.no/skwms1/wms.topo
?bbox=1185691.1827596538,8576234.573596776,1186302.6789859347,8576846.069823056
&format=image/png
&service=WMS
&version=1.3.0
&request=GetFeatureInfo
&crs=EPSG:3857
&width=256
&height=256
&layers=topo
&styles=default
&transparent=false
&QUERY_LAYERS=fkb_samferdsel
&INFO_FORMAT=text/plain
&I=256
&J=128
```

[Test kallet her](https://wms.geonorge.no/skwms1/wms.topo?bbox=1185691.1827596538,8576234.573596776,1186302.6789859347,8576846.069823056&format=image/png&service=WMS&version=1.3.0&request=GetFeatureInfo&crs=EPSG:3857&width=256&height=256&layers=topo&styles=default&transparent=false&QUERY_LAYERS=fkb_samferdsel&INFO_FORMAT=text/plain&I=256&J=128)


