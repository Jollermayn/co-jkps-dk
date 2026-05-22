# Logik-fix på Kompetencer-sektionen

Tre ændringer der retter sektionens indre logik uden at røre layoutet.

## 1. Fjern redundans mellem eyebrow og headline
Eyebrow `KOMPETENCER` + headline `Hvad jeg bringer` siger det samme. Skift eyebrow til **`OMRÅDER`** — det rammer som "her er felterne, ikke en CV-liste" og kolliderer ikke med headlinen.

`src/routes/index.tsx` linje 1278:
- Fra: `<Eyebrow>Kompetencer</Eyebrow>`
- Til: `<Eyebrow>Områder</Eyebrow>`

Sektionens `id="kompetencer"` og alle interne anker-links (`/#kompetencer` i nav, footer, breadcrumbs) bevares — kun det viste ord ændres.

## 2. Ensret eyebrows på de tre kort
I dag: `RESULTAT / METODE / PRAKSIS` — blandet kategori (output vs. arbejdsmåde).

Skift til konsistente **fag-kategorier** der matcher titlerne:
- Kort 1 (Formidling & Kommunikation): `RESULTAT` → **`KOMMUNIKATION`**
- Kort 2 (UX Research & Brugerindsigt): `METODE` → **`RESEARCH`**
- Kort 3 (Servicedesign & Konceptudvikling): `PRAKSIS` → **`DESIGN`**

Tre fag, tre kort. Læseren forstår øjeblikkeligt opdelingen.

`src/routes/index.tsx` `flipCards`-array (linje ~2162-2190): opdatér `eyebrow`-felterne.

## 3. Logisk rækkefølge: Research → Design → Formidling
Følger det reelle workflow (undersøg → form → formidl). I dag starter og slutter rækken med "output"-discipliner, hvilket bryder narrativet.

Omarrangér `flipCards` til:
1. **Research** (var kort 2)
2. **Design** (var kort 3)
3. **Kommunikation** (var kort 1)

Numrene `no: "01"/"02"/"03"` opdateres så de matcher den nye rækkefølge.

## Hvad der IKKE ændres
- Layout, kort-design, billeder, body-tekster, tags.
- Sektionens id, nav-links, scroll-anchors.
- Headline "Hvad jeg bringer".
- Filter-koblingen via `kompetencer:filter` events.

## Teknisk note
To filer/blokke berøres, begge i `src/routes/index.tsx`:
- Linje 1278: eyebrow på sektionen.
- Linje ~2162-2190: `flipCards`-array (eyebrows + rækkefølge + `no`-numre).
