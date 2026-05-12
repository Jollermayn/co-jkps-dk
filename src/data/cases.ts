import caseWolt from "@/assets/case-wolt.png";
import caseBoliga from "@/assets/case-boliga.png";
import caseHearing from "@/assets/case-hearing.png";
import caseDR from "@/assets/case-dr.png";
import caseAmnesty from "@/assets/case-amnesty.png";
import caseDN from "@/assets/case-dn.png";
import caseUlla from "@/assets/case-ulla.png";
import caseConcerto from "@/assets/case-concerto.png";
import caseArtSpirit from "@/assets/case-artspirit.png";
import caseNye1 from "@/assets/case-nye-1.png";
import caseNye2 from "@/assets/case-nye-2.png";
import caseNye3 from "@/assets/case-nye-3.png";
import caseNye4 from "@/assets/case-nye-4.png";
import caseNye5 from "@/assets/case-nye-5.png";
import caseNye6 from "@/assets/case-nye-6.png";
import caseNye7 from "@/assets/case-nye-7.png";
import caseNyeHero from "@/assets/case-nye-hero.png";
import caseNyeVaerkstedet from "@/assets/case-nye-vaerkstedet.png";
import caseLydbogerAdhd from "@/assets/case-lydboger-adhd.jpg";
import caseItuDesignlab from "@/assets/case-itu-designlab.jpg";

export type StemFraFeltet = {
  quote: string;
  highlight?: string;
  attribution: string;
  size: "sm" | "md" | "lg";
  indent: "none" | "mid" | "far";
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  image: string;
  context: string;
  challenge: string;
  role: string[];
  approach: string[];
  outcomes: string[];
  stemmerFraFeltet?: StemFraFeltet[];
  gallery?: string[];
  status?: "ongoing";
  statusLabel?: string;
};

const _allCases: CaseStudy[] = [
  {
    slug: "wolt",
    client: "Wolt",
    title: "Fra usynlig algoritme til informeret bud",
    image: caseWolt,
    context:
      "Wolt-bude arbejder under uigennemsigtige forhold de ikke kan se eller forudsige. Løn beregnes i fugleflugt, basisløn er faldet, og algoritmekontrol betyder at bude accepterer ordrer de ved er dårlige — uden reelt valg.",
    challenge:
      "Platformen usynliggør de mennesker der holder den kørende. Hvordan designer man transparens ind i et system der er bygget på det modsatte?",
    role: [
      "Gennemførte mixed methods research med 5 interviews, media-go-alongs og feltobservation",
      "Analyserede lønstrukturer og algoritmisk kontrol",
      "Designede tre interventioner i Wolt Partner-appen",
    ],
    approach: ["Mixed methods", "Co-design", "Service Design", "UX Research"],
    outcomes: [
      "Realtids heatmap over efterspørgsel",
      "Mulighed for at fravælge restauranter",
      "Direkte adgang til juridisk support og rettigheder",
    ],
  },
  {
    slug: "boliga",
    client: "Boliga",
    title: "Reduceret kompleksitet i boligsøgning",
    image: caseBoliga,
    context:
      "Boliga er Danmarks største boligplatform med 6,5 mio. månedlige interaktioner. Centrale funktioner var usynlige for brugerne — menuen modtog blot 100.000 interaktioner mod 2,6 mio. på boligvisningssiden.",
    challenge:
      "Brugerne blev præsenteret for for mange irrelevante boliger for tidligt og mistede overblikket før de overhovedet kom i gang.",
    role: [
      "Gennemførte brugerinterviews og brugerrejser",
      "Analyserede Boligas egne brugsdata",
      "Designede et personaliseret onboarding-flow",
    ],
    approach: ["UX Research", "Brugerrejser", "Dataanalyse", "Product Design"],
    outcomes: [
      "Personaliseret flow der bringer relevante boliger frem fra start",
      "Reduceret kognitiv belastning",
      "Valideret af Boligas product owner",
    ],
  },
  {
    slug: "interaktiv-horesimulering",
    client: "Interaktiv høresimulering",
    title: "Inklusion i undervisningen",
    image: caseHearing,
    context:
      "Over 20% af hørehæmmede elever i den danske folkeskole oplever hyppig ensomhed mod under 4% blandt normalthørende. Der findes ingen nationale retningslinjer for inkluderende praksis.",
    challenge:
      "Eksisterende simuleringer viser hvad høretab gør ved lyden. Ikke hvad det gør ved mennesket — at miste tråden, gå glip af joken, stå udenfor fællesskabet.",
    stemmerFraFeltet: [
      {
        quote: '"Jeg vil ikke lade mit liv dikteres af et høretab."',
        highlight: "ikke",
        attribution: "Emil, høreelev",
        size: "lg",
        indent: "none",
      },
      {
        quote: '"De fleste hørebørn kommer fra en baggrund af kaos."',
        highlight: "kaos",
        attribution: "Marie, elev",
        size: "md",
        indent: "far",
      },
      {
        quote: '"Usikkerhedens højborg."',
        attribution: "Viceforstander, efterskole for hørehæmmede",
        size: "lg",
        indent: "mid",
      },
      {
        quote:
          '"Forestil jer en situation, hvor I følte jer udenfor eller ikke forstod, hvad der foregik. Hvordan føltes det?"',
        highlight: "Hvordan føltes det?",
        attribution: "Lærer til klassen, efter simuleringen",
        size: "sm",
        indent: "none",
      },
      {
        quote:
          '"Problematikken handler ikke om manglen på teknologi — men om brugernes interaktion med hjælpemidlerne."',
        highlight: "brugernes interaktion",
        attribution: "Audiologopædisk konsulent, Decibel",
        size: "md",
        indent: "far",
      },
    ],
    role: [
      "Gennemførte 8 dybdegående interviews med lærere, eksperter og hørehæmmede elever",
      "Faciliterede 2 co-design workshops på specialefterskole",
      "Anvendte AI til at generere speak og kalibrere binaurale lydscenarier baseret på audiologiske data",
    ],
    approach: ["Co-design", "Participatorisk design", "Konceptudvikling"],
    outcomes: [
      "Udviklet og testet i samarbejde med hørehæmmede elever",
      "Ansvaret for inklusion flyttes fra den enkelte elev til skolefællesskabet",
      "Øget empati og delt ansvar i klasserummet",
    ],
  },
  {
    slug: "danmarks-radio",
    client: "Danmarks Radio",
    title: "Broadcast-kvalitet for Danmarks største medieplatform",
    image: caseDR,
    context:
      "Danmarks Radio er Danmarks største public service medievirksomhed. Samarbejdet dækkede broadcast, podcastproduktion og tværgående koordinering på tværs af redaktioner.",
    challenge:
      "At navigere i en stor, kompleks medieorganisation og levere teknisk og redaktionel kvalitet under tidspres i et professionelt broadcast-miljø.",
    role: [
      "Koordinerede tværgående processer på tværs af redaktioner og sikrede fremdrift under stram tidsstyring",
      "Stod for podcastproduktion og postproduktion",
      "Sikrede redaktionel og teknisk kvalitet i produktionen",
    ],
    approach: ["Redaktionel tilrettelæggelse", "Tværgående koordinering", "Postproduktion"],
    outcomes: [
      "Koordinerede produktioner på tværs af flere DR-redaktioner",
      "Sikrede redaktionel og teknisk kvalitet under stram tidsstyring i Danmarks største medieorganisation",
    ],
  },
  {
    slug: "amnesty-international",
    client: "Amnesty International",
    title: "Menneskerettigheder formidlet i lyd",
    image: caseAmnesty,
    context:
      "Amnesty International er en af verdens førende menneskerettighedsorganisationer. Samarbejdet handlede om journalistisk formidling af komplekse menneskerettighedsspørgsmål til en bred dansk offentlighed.",
    challenge:
      "At gøre tunge menneskerettighedstemaer tilgængelige og engagerende gennem podcast og lydproduktion uden at kompromittere den journalistiske integritet.",
    role: [
      "Producerede podcast og lydindhold om menneskerettighedsspørgsmål",
      "Stod for redaktionel tilrettelæggelse og postproduktion",
      "Sikrede redaktionel integritet og faktuel præcision i produktionen",
    ],
    approach: ["Journalistisk formidling", "Podcastproduktion", "Redaktionel tilrettelæggelse"],
    outcomes: [
      "Tilgængeligt lydindhold om menneskerettigheder til bred dansk offentlighed",
      "Indhold der ikke gik på kompromis med den journalistiske integritet for at blive tilgængeligt",
    ],
  },
  {
    slug: "danmarks-naturfredningsforening",
    client: "Danmarks Naturfredningsforening",
    title: "Naturformidling og strategisk kommunikation",
    image: caseDN,
    context:
      "Danmarks Naturfredningsforening er Danmarks største naturorganisation. Samarbejdet tog udgangspunkt i Den Grønne Sommerhøjskole med fokus på bæredygtighed og naturformidling.",
    challenge:
      "At skabe professionelt medievisuals og strategisk kommunikation der kunne formidle naturorganisationens kerneværdier til nye og yngre målgrupper — særligt unge der skal møde naturen med nysgerrighed.",
    role: [
      "Stod for det samlede medieproduktionssetup — film, interview og branding video",
      "Producerede sociale medier-indhold og strategisk kommunikation",
      "Var kommunikationsansvarlig under Den Grønne Sommerhøjskole",
    ],
    approach: ["Videoproduktion", "Brandudvikling", "Strategisk kommunikation", "So-me indhold"],
    outcomes: [
      "Professionelt filmet interview- og brandingmateriale",
      "Styrket digital tilstedeværelse og kommunikation om bæredygtighed",
    ],
  },
  {
    slug: "ulla-dyrlov",
    client: "Ulla Dyrløv",
    title: "Lydidentitet og podcastplatform",
    image: caseUlla,
    context:
      "Ulla Dyrløv er TV-børnepsykolog og arbejder med børns trivsel og mentale sundhed. Samarbejdet handlede om at bygge en professionel lydidentitet og podcastplatform op fra bunden i hendes psykologpraksis.",
    challenge:
      "At omsætte en psykologs faglige ekspertise til en tilgængelig og professionel lyddimension — fra fysisk studieopssætning til digitalt indhold der rammer forældre og børn. Fordi børn og forældre skulle mødes i kendte og trygge rammer, ikke i et fremmed studie.",
    role: [
      "Byggede et professionelt lydstudio op i hendes praksis",
      "Stod for podcastproduktion og postproduktion",
      "Koordinerede kreative processer og udviklede social media-koncept",
      "Sikrede at optagelsesmiljøet matchede målgruppens præmisser",
    ],
    approach: ["Lydidentitet", "Studieopsætning", "Podcastproduktion", "Indholdsstrategi"],
    outcomes: [
      "Færdigt og fungerende lydstudio i psykologpraksis",
      "Professionel podcastproduktion målrettet forældre og børn",
      "Indhold der tager udgangspunkt i børns og forældres egne præmisser",
    ],
  },
  {
    slug: "concerto-copenhagen",
    client: "Concerto Copenhagen",
    title: "Bach remixet for en ny generation",
    image: caseConcerto,
    context:
      "Concerto Copenhagen er et af Danmarks førende barokensembler. Samarbejdet handlede om at skabe en remix af Johann Sebastian Bachs B minor Messe og bruge den som løftestang til at engagere unge i klassisk musik.",
    challenge:
      "At gøre barokmusik relevant for en yngre målgruppe uden at kompromittere det kunstneriske udtryk — og skabe en kampagne der kunne nå ud over de traditionelle koncertsale.",
    role: [
      "Fungerede som projektleder for strategisk kommunikation",
      "Producerede remix af Bachs B minor Messe",
      "Koordinerede aktivering på Dronning Louises Bro og i TV2-samarbejde",
    ],
    approach: ["Strategisk kommunikation", "Musikproduktion", "Kampagneudvikling", "Projektledelse"],
    outcomes: [
      "Remixet afspillet på lastcykler over Dronning Louises Bro",
      "TV2-eksponering og bred mediedækning",
      "Ny relevant kontekst for klassisk musik til yngre målgrupper",
      "Viste at kulturelt indhold kan nå unge uden at miste sin integritet",
    ],
  },
  {
    slug: "art-spirit-coaching",
    client: "Art Spirit Coaching — Insight Consulting",
    title: "Brand- og platformsidentitet fra bunden",
    image: caseArtSpirit,
    context:
      "Art Spirit Coaching er en coaching- og psykoterapipraksis ledet af Steen Lykke, der arbejder med mindfulness og personlig udvikling — både individuelt og på hold i retreatsettings.",
    challenge:
      "At bygge en sammenhængende brand- og platformsidentitet op fra bunden for en praksis der opererede uden digital tilstedeværelse — og forankre den i reel viden om målgruppen.",
    role: [
      "Gennemførte dybdegående interviews med klienter, fagpersoner og læger for at afdække værdifulde indsigter om målgruppens behov og bevæggrunde",
      "Udviklede brandidentitet, positionering og kommunikationsstrategi på baggrund af disse indsigter",
      "Producerede medieindhold der skabte konkrete forbindelser til nye samarbejdspartnere og målgrupper",
      "Definerede kernekoncept og omsatte det til en digital og servicebaseret platform",
    ],
    approach: ["Brandudvikling", "Konceptdesign", "Brugerrejser", "Indholdsstrategi", "Platformsudvikling"],
    outcomes: [
      "Brandidentitet forankret i reel viden om klienter og fagmiljø — ikke antagelser",
      "Medieproduktioner der åbnede døre til nye samarbejder og forbindelser",
      "En praksis uden digital tilstedeværelse fik et fundament den kunne vokse fra",
    ],
  },
  {
    slug: "musikfaellesskabet-i-nye",
    client: "Musikfællesskabet i Nye",
    title: "En borgerdrevet musikskole",
    image: caseNyeHero,
    gallery: [caseNyeVaerkstedet, caseNye2, caseNye1, caseNye3, caseNye4, caseNye5, caseNye6],
    context:
      "I den nyetablerede by Nye nord for Aarhus opstår et fællesskabsdrevet musikhus i et tidligere møbelværksted — med plads til undervisning, sammenspil og koncerter for alle aldre og niveauer. Med særligt fokus på at skabe grobund for børn og unges kreative udfoldelse i en by uden etablerede kulturtilbud.",
    challenge:
      "At skabe et musikhus drevet af fællesskabet — fra koncept og rumlig vision til lydstudio og undervisning — i et eksisterende møbelværksted.",
    role: [
      "Medkonceptualisering af musikskolens vision og rum",
      "Ansvarlig for design og opsætning af det komplette lydstudio",
      "Underviser og workshop-facilitator med fokus på børn og unges musikalske og kreative udvikling",
    ],
    approach: ["Konceptudvikling", "Lyddesign", "Læringsdesign", "Fællesskabsdrevet udvikling"],
    outcomes: [
      "Projektet er indsendt til Realdania/Underværker og afventer bedømmelse",
    ],
  },
  {
    slug: "lydboger-til-born-med-adhd",
    client: "Lydbøger til børn med ADHD",
    title: "Lydbøger til børn med ADHD",
    image: caseLydbogerAdhd,
    context:
      "Børn med ADHD kæmper ofte med traditionelle læringsformater. Ikke fordi de ikke kan lære, men fordi formaterne ikke er designet til dem. Projektet undersøgte hvordan lydbaserede formater kan blive et reelt lærings- og aflastningsværktøj for børn i alderen 7-12 år.",
    challenge:
      "At kortlægge hvilke auditive og narrative egenskaber der skaber ro og fordybelse frem for stimulering, og omsætte den viden til et koncept der kunne realiseres i samarbejde med fagfolk og målgruppe.",
    role: [
      "Empirisk research med pædagoger, didaktikere og specialister",
      "Brugerinddragende metode med børn og forældre",
      "Konceptudvikling og prototype for lydbaseret læringsformat",
      "Iterativ afprøvning og videreudvikling baseret på indsigt fra felten",
    ],
    approach: ["Læringsdesign", "Lydbaseret formidling", "Brugerinddragelse", "Konceptudvikling"],
    outcomes: [
      "Dokumenteret uopfyldt behov i markedet for lydbaserede læringsværktøjer",
      "Koncept for auditiv fordybelse tilpasset børn med ADHD",
      "Indsigt i hvordan narrativ struktur og lyd kan erstatte forklaring med oplevelse",
    ],
  },
  {
    slug: "itu-designlab",
    client: "ITU / DESIGNLAB",
    title: "Generativ AI som brobygger mellem minder og mennesker",
    image: caseItuDesignlab,
    context:
      "Professionelle plejere bruger reminiscensterapi til at styrke livskvaliteten hos borgere med demens — men kortlægning af den enkeltes livshistorie er ressourcekrævende og afhænger af pårørendes hukommelse og tilgængelighed.",
    challenge:
      "Kan generativ AI skabe personaliserede, lydbaserede livsfortællinger fra personlige data — og dermed styrke reminiscensarbejdet uden at kompromittere værdighed og etik?",
    role: [
      "Gennemførte ekspertinterviews med fagprofessionelle i ældreplejen",
      "Designede og testede lydbaserede prototyper med binaural lydteknik",
      "Anvendte Wizard of Oz-metoden til at simulere AI-interaktion under brugertest",
      "Itererede konceptet gennem tre designrunder baseret på tematisk analyse",
    ],
    approach: [
      "Spekulativt design",
      "Research through Design",
      "Mixed methods",
      "Wizard of Oz",
      "Binaural lyddesign",
      "Generativ AI (ElevenLabs)",
    ],
    outcomes: [
      "Prototype valideret af domæneeksperter som potentielt samtalefacilitator i plejepraksis",
      "Konceptramme for etisk ansvarlig brug af AI-genererede stemmer og lydscenarier",
      "Indsigt i hvordan AI kan understøtte fagprofessionelle uden at erstatte den menneskelige relation",
    ],
  },
];

const _order = [
  "boliga",
  "wolt",
  "itu-designlab",
  "danmarks-radio",
  "amnesty-international",
  "danmarks-naturfredningsforening",
  "ulla-dyrlov",
  "interaktiv-horesimulering",
  "lydboger-til-born-med-adhd",
  "musikfaellesskabet-i-nye",
  "concerto-copenhagen",
  "art-spirit-coaching",
];

export const caseStudies: CaseStudy[] = [
  ..._order
    .map((s) => _allCases.find((c) => c.slug === s))
    .filter((c): c is CaseStudy => Boolean(c)),
  ..._allCases.filter((c) => !_order.includes(c.slug)),
];

export const getCaseBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
