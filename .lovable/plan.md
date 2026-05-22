## Tilføj kundenavne-linje i hero-sidebar

Tilføjer en diskret social proof-linje under "Kontakt mig" i `Sidebar`-komponenten — viser de stærkeste kundenavne for at signalere autoritet uden at bryde den minimalistiske æstetik.

### Hvor

`src/routes/index.tsx`, `Sidebar`-komponenten — efter "Kontakt mig"-linket (efter linje 213, før den lukkende `</div>` på linje 214).

### Hvad indsættes

En lille hairline-divider efterfulgt af en tekstlinje:

```
TIDLIGERE
DR · Wolt · Amnesty · Boliga
Danmarks Naturfredningsforening · ITU
```

### Styling

- Eyebrow "TIDLIGERE": samme uppercase-stil som "Digital konsulent" undertitlen (0.75rem, letter-spacing 0.24em, opacity ~50%).
- Navnene: cremefarvet, ca. 0.85rem, mellemrum med · som separator, line-height 1.7. To linjer for at undgå for lang vandret tekst.
- Top margin ca. 24px fra "Kontakt mig" — bevarer luft.
- Centreret, matcher sidebar-layoutet.

### Hvad der IKKE ændres

- Ingen logoer, ingen billeder — kun tekst.
- Ingen ændringer til CTA-knapper, navn, foto eller anden sidebar-indhold.
- Ingen route-, data-, eller logikændringer.
- Ingen ændringer til design tokens eller globale styles.

### Hvorfor netop disse seks

DR + Amnesty = public service/NGO-autoritet. Wolt + Boliga = kommerciel/skala. DN = nonprofit/grøn. ITU = akademisk. Dækker hele dit kundespektrum i ét scan.