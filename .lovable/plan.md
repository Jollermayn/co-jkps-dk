## Mål

Stram Fundament-sektionens tre søjler i `src/routes/index.tsx` (omkring linje 1025–1121).

## Ændringer

### 1. Skift titler til "lagene" (drop generiske kategori-titler)

| Før | Efter |
|---|---|
| Title: "Teknologi" / tagline: "Det digitale lag" | Title: **"Det digitale lag"** (tagline fjernes) |
| Title: "Kommunikation" / tagline: "Det menneskelige lag" | Title: **"Det menneskelige lag"** (tagline fjernes) |
| Title: "Kreativitet" / tagline: "Det kreative lag" | Title: **"Det kreative lag"** (tagline fjernes) |

Fjerner samtidig selvmodsigelsen i søjle 2 (Kommunikation ≠ menneskelige lag).

### 2. Skær body-tekst til én skarp sætning per søjle

- **Det digitale lag** → "Ti år med UX research, servicedesign og digital leverance for DR, Amnesty og DN."
- **Det menneskelige lag** → "Evnen til at oversætte det komplekse til noget, der faktisk rammer."
- **Det kreative lag** → "Løsninger der ikke lå i problemformuleringen — formet af en baggrund i medieproduktion og musik."

Fjerner overlap med Portræt og Kompetencer.

### 3. Bredere læsekolonner

- `max-w-[220px]` på indre wrapper → `max-w-[260px]`
- Title `whitespace-nowrap` fjernes (ikke længere nødvendigt med kortere titler — men også fordi "Det menneskelige lag" wrapper alligevel pænere på mobil)

### 4. Justér H3-styling
Da titlerne nu er længere ("Det menneskelige lag" vs "Kommunikation"), reduceres `text-2xl` til `text-xl md:text-[1.35rem]` for at undgå line-break-grimhed.

## Hvad der IKKE ændres

- Ikonerne (de fungerer)
- Eyebrow "Fundament" + H2 "Tre søjler."
- Subtitle "Som tilsammen former den måde, jeg arbejder på."
- Grid-layout (3 kolonner på md+, 1 på mobil)
- Hover-glow på ikoner