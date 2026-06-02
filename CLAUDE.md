# CLAUDE.md

## Projekt

- **Navn:** co.jkps.dk — Kreativ formidler & konceptudvikler
- **Repo:** github.com/Jollermayn/co-jkps-dk
- **Stack:** Vite + TypeScript + React + TanStack
- **Vercel projekt:** co-jkps-dk
- **Production:** co.jkps.dk
- **Preview:** co-jkps-dk.vercel.app

## Branch workflow

⚠️ Arbejd ALTID på `dev` branch. Push ALDRIG direkte til `main`.

- Alle ændringer committes og pushes til `dev`
- `dev` → preview på co-jkps-dk.vercel.app
- Merge til `main` KUN når ændringer er godkendt på preview URL
- `main` er production → co.jkps.dk

## Tekniske læringer

- CSS `filter` på et `<video>`-element rammer ikke `poster`-attributten i alle browsere (fx Safari) — brug en wrapper `<div>` med `height: 100%` og `width: 100%` i stedet, så filteret appliceres på det compositede output.
- `filter`-property på et element skaber et nyt stacking context — et `position: absolute` overlay skal have `zIndex` højere end wrapperen for at garantere korrekt paint-rækkefølge.
- Lovable er bedre til visuelle fixes og styling-justeringer. Claude Code til struktur, logik og kodeændringer.

## Session-workflow

### Generelle regler
- Push altid til dev automatisk efter hver ændring — ingen bekræftelse nødvendig.

### Ved opstart
Læs seneste commits og opsummer hvad der er aktivt i projektet.

### Ved afslutning
Når jeg siger 'afslut session' eller 'lav resumé':
1. Opsummer hvad der er lavet i sessionen
2. Opdater todo-listen
3. Generer en Projekt Resumé-fil klar til kopiering i Obsidian
