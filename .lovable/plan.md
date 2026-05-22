# Stram Kompetencer-sektionen op

Mål: fjerne uroen i `Hvad jeg bringer`-rækken så de tre kort læses som ét sammenhængende sæt frem for et tilfældigt collage.

## Ændringer i `src/routes/index.tsx` (KompetencerList + flipCards)

### 1. Lås billed-proportioner
I dag har billedkolonnen `md:min-h-[280px]` og `md:h-auto` — billedet strækkes efter tekstens højde, så kort med længere tekst får højere billede. Det er kilden til den ujævne række.

- Skift billedkolonnen til fast aspect ratio på desktop: `md:aspect-[4/3]` på selve `<img>`-wrapperen, og lad teksten styre kortets højde uafhængigt.
- Alternativt: sæt fast `md:h-[320px]` på hele article'en, så billede og tekst-kolonne altid er ens høje.
- Behold mobil-højden `h-[220px]`.

### 2. Ensartet beskrivelseslængde
- Omskriv `body` på de tre kort så de alle er 2 linjer ved normal læsebredde (ca. 90-110 tegn hver).
  - Kort 2 ("UX Research") er i dag 1 linje — udvid med en konkret sætning.
- Tilføj evt. `min-h` på `<p>` så højdeforskel udjævnes selv ved responsive line-breaks.

### 3. Ensartet antal tags
- Sørg for at alle tre kort har præcis **3 tags** (det er allerede sandt i `flipCards`, men `Formidling` har 3 og de andre 3 — bekræft og hold det stramt). Hvis 4 ønskes, gør det på alle tre.

### 4. Tag-ikoner
- Det generiske `SlidersHorizontal`-ikon vises kun på klikbare filter-tags. Det er ok funktionelt, men gør ikonet mindre og mere subtilt (`size={9}`, lavere opacity) så det ikke konkurrerer med teksten.
- Ikke-klikbare tags har intet ikon — behold som er.

### 5. Billed-grading (let, valgfri)
- Tilføj et meget subtilt navy-tint overlay på billederne (`bg-[#0D1B2A]/15` eller en let `mix-blend-multiply`) for at binde de tre forskellige fotos visuelt sammen uden at gøre dem mørke.

## Hvad der IKKE ændres
- Layout (billede venstre, tekst højre) bevares.
- Eyebrow + titel + body + tags-struktur bevares.
- Sektionens overordnede plads i siden, headline `Hvad jeg bringer`, og eksisterende filter-koblinger via `kompetencer:filter` rører jeg ikke.
- Ingen nye kort tilføjes — antallet (3) bevares.

## Teknisk note
Alle ændringer er i `src/routes/index.tsx`:
- `flipCards`-array (linje ~2162): justér `body`-tekster, evt. `tags`.
- `KompetencerList` `<article>` (linje ~2233-2254): justér billed-kolonnens højde/aspect ratio, tilføj overlay.
- `renderTags` (linje ~2195): mindre tag-ikon.
