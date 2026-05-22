## Killer-stat per case i case-listen

Tilføj én kort stat-linje under hver case-overskrift i kortet — synlig før klik. Det løfter scanning-oplevelsen massivt: en digital chef ser brand + overskrift + ét konkret tal/resultat.

### Ændringer

**1. Type-felt** — `src/data/cases.ts`
Tilføj `stat?: string` til `CaseStudy`-type.

**2. Stat per case** — `src/data/cases.ts`
Tilføj `stat` til hver case (kort, max ~50 tegn, baseret på eksisterende tekst):

| Case | Stat |
|---|---|
| Wolt | `54% undervurdering af faktisk køredistance` |
| Boliga | `1,1 mio. månedlige brugere · app uden brugerinddragelse` |
| FUS / Høresimulering | `Hørehæmmede elever oplever 5× mere ensomhed` |
| Amnesty | `7 journalister trænet til selvstændig produktion` |
| Danmarks Naturfredningsforening | `130.000 medlemmer · ny digital strategi` |
| Ulla Dyrløv | `Lanceret på Spotify, Apple Podcasts og Podimo` |
| Concerto Copenhagen | `TV2-eksponering · aktivering på Dronning Louises Bro` |
| ITU Designlab | `Valideret af domæneeksperter i ældreplejen` |
| Musikfællesskabet i Nye | `Indstillet til Realdania / Underværker` |
| Lydbøger til børn med ADHD | `Dokumenteret uopfyldt behov i markedet` |
| Art Spirit Coaching | `Brandidentitet bygget på interviews med læger og klienter` |
| DR | *(ingen stat — for vag; lader feltet være tomt)* |

**3. Render-stedet** — `src/routes/index.tsx`, `renderCard` ca. linje 2062
Mellem `<h3>` (headline) og `<ul>` (tags): tilføj en stat-linje hvis `c.stat` findes.

```tsx
{c.stat && (
  <p className="text-[12px] text-cream/70 leading-snug italic">
    → {c.stat}
  </p>
)}
```

Pilen `→` matcher ember-streg-stilen fra tags. Italic + lidt mindre fontsize giver det en "footnote-fakta"-følelse, ikke en sub-overskrift.

### Hvad der IKKE ændres

- Layout, kortstørrelse, billeder, video, hover-effekter.
- Eksisterende `headline`, `context`, `challenge`, `outcomes` osv. — intet i case-modal-indhold rører.
- Tags, filter, slider, grid-view.
- Nav, anchors, routes.
- DR-casen får ikke ændret tekst — den får bare ikke en stat (kan rettes separat senere).

### Hvorfor disse stats

Alle er trukket direkte fra eksisterende `context`/`challenge`/`outcomes`-tekst i `cases.ts`. Ingen nye påstande, ingen tal jeg har opfundet. Det er bare guld der bliver løftet op af brødtekst og gjort synligt.