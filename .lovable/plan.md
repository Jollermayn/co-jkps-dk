## Ændring i `src/routes/index.tsx` (Portræt-sektionen, linje 996–1016)

1. **Fjern** `<Eyebrow>Portræt</Eyebrow>` (linje 999) helt.
2. **Justér wrapperen** — fjern `mt-8` så afsnittet starter i toppen af sektionen uden tomt mellemrum.
3. **Fremhæv første sætning** (linje 1002–1004) som en redaktionel opening:
   - Font: Playfair Display, italic
   - Størrelse: `1.5rem` (op fra 1.1rem)
   - Line-height: 1.4
   - Opacity: 1 (fuld hvid, ikke 0.85)
   - Bevar farvekontrast til de øvrige afsnit
4. **Øvrige tre afsnit** forbliver uændrede (1.1rem, opacity 0.85).
5. Sektionens padding (`pt-20 md:pt-28`) bevares, så der stadig er luft over.

Resultatet: et roligere, mere redaktionelt look — første sætning fungerer som naturlig indgang i stedet for en CV-agtig label.