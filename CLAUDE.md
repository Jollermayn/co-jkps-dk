# CLAUDE.md

## Tekniske læringer

- CSS `filter` på et `<video>`-element rammer ikke `poster`-attributten i alle browsere (fx Safari) — brug en wrapper `<div>` med `height: 100%` og `width: 100%` i stedet, så filteret appliceres på det compositede output.
- `filter`-property på et element skaber et nyt stacking context — et `position: absolute` overlay skal have `zIndex` højere end wrapperen for at garantere korrekt paint-rækkefølge.
- Lovable er bedre til visuelle fixes og styling-justeringer. Claude Code til struktur, logik og kodeændringer.
