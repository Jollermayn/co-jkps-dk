## Ændring

I `src/routes/index.tsx` byttes rækkefølgen på to blokke, så "Strategien er solid / Forankringen fejler" + chimp-sektionen kommer **under** Tilgang-blokken (CodeParadoxBlock):

**Nu:**
1. `#tilgang`-section (Strategien er solid + chimp + CTA)
2. `<CodeParadoxBlock />` (eyebrow "Tilgang" + kodevindue)

**Efter:**
1. `<CodeParadoxBlock />` (eyebrow "Tilgang" + kodevindue)
2. `#tilgang`-section (Strategien er solid + chimp + CTA)

Ingen ændring af indhold, styling eller markup i de to blokke — kun rækkefølgen.