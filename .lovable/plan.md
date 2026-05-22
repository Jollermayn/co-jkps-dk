## Tre søjler — visuel forbindelse

Tilføj et lille "søjle-top"-motiv over de tre symboler i `#baggrund`-sektionen i `src/routes/index.tsx` (linje 1006-1093).

### Visuel idé

```text
   │           │           │      ← tynde lodrette streger (ember/rød)
   ●───────────●───────────●      ← små prikker som "knudepunkter"
   ───────────────────────────    ← tynd vandret linje der forbinder
        [✦]         [◐]        [☰]   ← eksisterende symboler
     Digitalt    Menneskeligt   Kreativt
```

Konkret:
- Én vandret hårfin streg (1px, ember med ~40% opacity) på tværs af de tre kolonner, lige over symbolerne.
- Tre korte lodrette streger (1px, ember, ~24px høje) som "falder ned" fra den vandrette streg og peger ned mod hvert symbol.
- Små prikker (3px ember) hvor lodret og vandret møder hinanden — som tegnede konstruktionsknudepunkter.
- På mobil (1 kolonne): skjul motivet helt — det giver kun mening i 3-kolonne layout.

### Hvorfor det virker

- Forstærker "søjler"-metaforen uden at gentage den (søjlerne *bærer* noget — den vandrette streg).
- Bruger ember sparsomt og arkitektonisk, matcher den eksisterende streg-stil i symbolerne (stjernen, equalizer).
- Subtilt nok til ikke at stjæle fokus fra symbolerne.

### Implementering

I `<div className="grid grid-cols-1 md:grid-cols-3 relative ...">` (linje 1016) tilføjes et absolut-positioneret SVG-overlay som kun vises fra `md:` opefter. SVG'et spænder fuld bredde, sidder ca. 8px over symbol-rækken, og indeholder:
- 1 `<line>` vandret over hele bredden
- 3 `<line>` lodrette, centreret over hver kolonne (1/6, 3/6, 5/6 af bredden)
- 3 `<circle>` r=2 hvor de mødes

Farve: `stroke="var(--ember)"`, `opacity: 0.45`.

Symbol-wrapperne får `mt-6` så der er plads til motivet ovenover.

### Risici

- Hvis ember er for stærk → skru ned til opacity 0.3 eller skift til `stroke-cream/30`.
- Hvis det konkurrerer med equalizer-symbolet (som også har lodrette streger) → kortere lodrette streger (16px i stedet for 24px).
