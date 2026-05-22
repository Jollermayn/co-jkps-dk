## Mål

Omarrangér sektionerne på forsiden (`src/routes/index.tsx`) til denne narrative bue:

```
1. Hero
2. Digital Transformation     (tese — flyttet op)
3. Portræt                    (hvem)
4. Fundament — Tre søjler     (hvorfra — flyttet op)
5. Cases                      (bevis)
6. Tilgang (med aben)         (hvordan)
7. Kompetencer                (hvad — rename fra "Ekspertise")
8. Uddannelse                 (credentials)
9. Kontakt
```

## Nuværende rækkefølge (i filen)

- Hero (linje 976)
- OM MIG / Portræt (1001–1021)
- CASES (`<CasesSection />`, 1023)
- KOMPETENCER (1026–1040, eyebrow "Ekspertise")
- `<DigitalTransformationSection />` (1041)
- MIN TILGANG (1045–1161)
- UDDANNELSE (1163–1218)
- BAGGRUND / Fundament (1220–1315)
- KONTAKT (1317–...)

## Ændringer

1. **Flyt `<DigitalTransformationSection />`** fra linje 1041 til lige efter hero-sektionen (før Portræt).
2. **Flyt Fundament-sektionen** (`{/* BAGGRUND */}` på linje 1219–1315) til lige efter Portræt (før Cases).
3. **Flyt Kompetencer-sektionen** (1025–1040) til efter Tilgang (før Uddannelse).
4. **Skift eyebrow** i Kompetencer-sektionen: `<Eyebrow>Ekspertise</Eyebrow>` → `<Eyebrow>Kompetencer</Eyebrow>` (linje 1029).
5. Behold alle `id="..."` attributter uændret (så evt. interne anker-links stadig virker).
6. Ingen ændringer til indhold, styling eller komponenter — kun rækkefølge + ét label.

## Resulterende rækkefølge i filen

```
Hero
<DigitalTransformationSection />
{/* PORTRÆT */}      (id="om", eyebrow "Portræt")
{/* FUNDAMENT */}    (id="baggrund", eyebrow "Fundament", h2 "Tre søjler")
<CasesSection />
{/* MIN TILGANG */}  (id="tilgang")
{/* KOMPETENCER */}  (id="kompetencer", eyebrow "Kompetencer")
{/* UDDANNELSE */}   (id="uddannelse")
{/* KONTAKT */}      (id="kontakt")
```