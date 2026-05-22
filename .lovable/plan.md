## Mål
Omstrukturere indholdsflowet på `/` så perspektiv kommer før biografi: Hero → kerneposition → hvorfor det betyder noget → credentials → tre søjler.

Alle ændringer i `src/routes/index.tsx`.

## 1. Hero / `DigitalTransformationSection` (linje 896–945)
Uændret. Tekst bevares som nu.

## 2. Ny "kerneposition" sektion — direkte efter hero
Den nuværende første italic-paragraf flyttes ud af PORTRÆT og bliver et selvstændigt statement med mere luft.

Ny sektion (placeres mellem `<DigitalTransformationSection />` og PORTRÆT, linje 981):

- Større padding (`pt-24 md:pt-32 pb-16 md:pb-20`)
- Playfair Display italic, ~2rem / 1.4 line-height, hvid
- Ingen øvrige paragraffer

Indhold:
> Jeg arbejder med dét, der sker mellem mennesker og systemer.
> Ikke brugeren — men personen bag beslutningen, vanen og frustrationen.

(Anden linje let nedtonet / mindre, fx 1.25rem, opacity 0.8 — som rytmisk uddybning.)

## 3. PORTRÆT sektion (linje 984–1004) — omskrives

Fjern den italic kerneposition-paragraf (linje 989–991) — den er nu flyttet op.

Ny rækkefølge i blokken:

a) "Hvorfor det betyder noget" — erstatter den nuværende paragraf om digital transformation (linje 993–995):
> Digital transformation handler ikke kun om teknologi.
> Det handler om, hvorvidt mennesker kan følge med.

Style: 1.25–1.4rem, Playfair eller body, lidt mere fremhævet end credentials.

b) Credentials — bevares ordret (linje 996–998):
> UX research, servicedesign og konceptudvikling på tværs af public service, civilsamfund og kommercielle virksomheder. Selvstændig siden 2016.

c) Personlig closer — bevares (linje 999–1001):
> Familiefar, naturmenneske — og først og fremmest en seriøs lytter.

## 4. Tre søjler (linje 1006–1093) — omdøb titler

Skift `title`-strenge i arrayet:
- "Digitalt lag" → "Digital forståelse"
- "Menneskeligt lag" → "Menneskelig forståelse"
- "Kreativt lag" → "Kreativ forståelse"

Beskrivelser, ikoner og layout uændret.

## Ingen ændringer
- Hero typewriter, rotating phrase, video baggrund
- Cases, MIN TILGANG, CodeParadoxBlock og alt nedenunder
- Navigation, footer, andre routes