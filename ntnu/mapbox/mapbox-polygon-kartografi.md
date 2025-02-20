# Mapbox kartografi-eksempler for polygoner


## Beregning av fargeverdier

Mapbox kan regne ut fargeverdier basert på egenskapsverdier i kartlagene. Syntaksen for dette er basert på programmeringsspråket LISP, der operatoren står først, og verdiene som inngår i beregningen kommer etterpå. Dette kan virke litt fremmed, men denne teksten er et forsøk på å gjøre det litt lettere tilgjengelig.


LISP:
```
(+ 1 3)  // 4
(+ 1 3 5)  // 9
(* pi (expt 3 2))  // pi multiplisert med 3 opphøyd i andre (28.26)
```

Mapbox:
```
['+', 1, 3]
['+', 1, 3, 5]
['*', ['pi'], ['^', 3, 2]]
```

## Beregning av fargeverdi basert på step-funksjonen

> Produces discrete, stepped results by evaluating a piecewise-constant function defined by pairs of input and output values ("stops"). The input may be any numeric expression (e.g., ["get", "population"]). Stop inputs must be numeric literals in strictly ascending order. Returns the output value of the stop just less than the input, or the first output if the input is less than the first stop.

Kilde: [https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#step](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#step)

Bruk _step_-funksjonen hvis du vil ha full kontroll på hvilke fargeverdier som brukes i kartet. Med _step_-funksjonen setter du grenseverdiene (for egenskapsverdiene) der fargene skal skifte.


Eksempel fra Mapbox dokumentasjonen:
(her er teksten som står med kolon etter seg, forklaringer på hva slags parametre dette er)
```
["step",
    input: number,
    stop_output_0: OutputType,
    stop_input_1: number, stop_output_1: OutputType,
    stop_input_n: number, stop_output_n: OutputType, ...
]: OutputType
```

Dokumentasjonen med kun disse forklaringene:
```
["step",
    input,
    stop_output_0
    stop_input_1, stop_output_1
    stop_input_n, stop_output_n
]
```

Reelt eksempel:
(gir rød farge for alt under 0, grønt for alt over 25, og gult for alt mellom 0 og 25).
Get-funksjonen henter egenskapsverdien fra datasettet og bruker denne som input-verdi.
```
['step',
    ['get', 'Prosentendringkvinne'],
    'red',
     0, 'yellow',
     25, 'green'
]
```

Komplett eksempel for ett kartlag basert på vektor-tiles.
```
map.addLayer({
    "id": "kommuner",
    "type": "fill",
    "source": "kommuner-tiles",
    "source-layer": "sysselsetting",
    "layout": {},
    "paint": {
        'fill-color': [
            'step',
            ['get', 'Prosentendringkvinne'],
            'red',
            0, 'yellow',
            25, 'green'
        ],
        "fill-outline-color": "#000",
        "fill-opacity": 0.7,
    }
});
```

## Beregning av fargeverdi basert på interpolate-funksjonen

>Produces continuous, smooth results by interpolating between pairs of input and output values ("stops"). The input may be any numeric expression (e.g., ["get", "population"]). Stop inputs must be numeric literals in strictly ascending order. The output type must be number, array, or color.

>Interpolation types:

> - "linear": Interpolates linearly between the pair of stops just less than and just greater than the input.
> - "exponential", base: Interpolates exponentially between the stops just less than and just greater than the input. base controls the rate at which the output increases: higher values make the output increase more towards the high end of the range. With values close to 1 the output increases linearly.
> - "cubic-bezier", x1, y1, x2, y2: Interpolates using the cubic bezier curve defined by the given control points.

Kilde: [https://docs.mapbox.com/style-spec/reference/expressions/#ramps-scales-curves](https://docs.mapbox.com/style-spec/reference/expressions/#ramps-scales-curves)

Med _interpolate_ er det nok å oppgi to fargeverdier, knyttet til to egenskapsverdier. Mapbox vil da beregne fargeverdier for alle aktuelle egenskapsverdier basert på den valgte interpolasjonsmetoden. Man kan også ha flere mellomliggende "knekkpunkter" for interpolasjonen.

Her må man velge endepunkter som ligger utenfor de egenskapsverdiene man har i datasettet - dette i motsetning til step-funksjonen, der man ikke trenger å kjenne til endepunktene.

I eksemplet nedenfor interpoleres fargeverdier mellom fargenavnene _darkslategrey_ og _whitesmoke_. Disse navnene er definert i HTML-standarden. Farger kan også oppgis på andre måter, som RGB-verdier, eller HEX-verdier.

```
[
    'interpolate',
    ['linear'],
    ['get', 'Prosentendringkvinne'],
    -100, 'darkslategrey',
    60, 'whitesmoke'
],
```

Komplett eksempel for ett kartlag basert på vektor-tiles.
```
map.addLayer({
    "id": "kommuner",
    "type": "fill",
    "source": "kommuner-tiles",
    "source-layer": "sysselsetting",
    "layout": {},
    "paint": {
        'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'Prosentendringkvinne'],
            -100, 'darkslategrey',
            60, 'whitesmoke'
        ],
        "fill-outline-color": "#000",
        "fill-opacity": 0.7,
    }
});
```

Komplett eksempel som viser endring i arealkategorien natur for Innlandet fylke fra 2013-2023:

[naturtap.html](naturtap.html)

## Ressurser

- [get](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#get)
- [step](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#step)
- [interpolate](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#interpolate)
- [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/)
- [Expressions](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/)
- [Get started with Mapbox GL JS expressions](https://docs.mapbox.com/help/tutorials/mapbox-gl-js-expressions/)
- [HTML fargenavn](https://htmlcolorcodes.com/color-names/)
- [Color Brewer - fargeskjemagenerator](https://colorbrewer2.org)


\
*Sverre Stikbakke 14.11.2020*
