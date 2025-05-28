/**
 * GIFT - Geographical Islands FlexibiliTy
 * 
 * This project has received funding from 
 * the European Union's Horizon 2020 
 * research and innovation program under 
 * grant agreement No 824410.
 * 
 * Part of deliverable D3.10 GIS digital twin
 * 
 * NTNU - Norway
 * 
 * Module togglemapwindows
 * ========================
 * 
 * Function for turning on and off map windows (sections)
 * 
 * sverre.stikbakke@ntnu.no 30.04.2020
 */


const toggleMapWindow = layer => {

    const uiSectionsToShowHide =
        layer.sectionsToShowHide.split(",")
            .map(section =>
                section.trim());

    const missingUiSections = uiSectionsToShowHide.filter(
        uiSection => document.getElementById(uiSection) === null);

    const errMsg = ` Module layertoggle, layer ${layer.layerId}, ` +
        `missing section(s): ${missingUiSections} in index.html`;
        
    console.assert(missingUiSections.length === 0, errMsg);

    if (layer.visible === "true") {
        for (const uiSection of uiSectionsToShowHide) {
            document.getElementById(uiSection).style.display = "none";
        };
        layer.visible = "false";
    } else {
        for (const uiSection of uiSectionsToShowHide) {
            document.getElementById(uiSection).style.display = "block";
        };
        layer.visible = "true";
    };
};

export { toggleMapWindow }