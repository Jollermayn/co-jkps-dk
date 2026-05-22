## Få stats og tags til at flugte på tværs af case-kort

Lige nu varierer højden på titel og stat fra kort til kort, så `→ stat`-linjen og tag-listen begynder forskellige steder. Det bryder scanning-rytmen.

### Fix

I `renderCard` (ca. linje 2057-2070 i `src/routes/index.tsx`) sættes faste min-højder på de to tekstblokke, så stat- og tag-linjer altid starter på samme baseline — uanset om titel/stat er 1, 2 eller 3 linjer:

- **Titel-blok (`<h3>`)**: `min-h-[3.5rem]` (rummer 2 linjer á 18px med leading-snug; 3-linjede titler tillades stadig at vokse).
- **Stat-blok (`<p>`)**: `min-h-[2.4rem]` (rummer 2 linjer á 12px; 1-linje-stats får tom luft nedenunder så tags starter samme sted).
- **Stat-wrapper** rendres altid (selv for DR — men nu garanteret) — tom plads holdes hvis `c.stat` mangler, så tag-listen flugter på alle kort.

### Resultat

Korthøjden vokser en smule (~30-40px ekstra hvor titler er korte), men giver dig en visuel "snor" på tværs af alle kort: alle stats står på samme y-position, og alle tag-lister begynder på samme y-position.

### Hvad der IKKE ændres

- Billed-højde, hover-effekt, kortbredde, gap mellem kort.
- Tekst-indhold (stats, titler, tags) — intet ændres.
- Slider/grid-skifte, filter, modal.
- Mobile breakpoints — min-heights gælder også mobil, hvor det giver samme effekt.