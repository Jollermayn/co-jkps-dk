import caseWolt from "@/assets/case-wolt.png";
import caseWoltVideo from "@/assets/case-wolt.mp4?url";
import caseBoliga from "@/assets/case-boliga.png";
import caseBoligaVideo from "@/assets/case-boliga.mp4?url";
import caseHearing from "@/assets/case-hearing.png";
import caseHearingVideo from "@/assets/case-hearing.mp4?url";
import caseDR from "@/assets/case-dr.png";
import caseDRVideo from "@/assets/case-dr.mp4?url";
import caseAmnesty from "@/assets/case-amnesty.png";
import caseAmnestyVideo from "@/assets/case-amnesty.mp4?url";
import caseDN from "@/assets/case-dn.png";
import caseDNVideo from "@/assets/case-dn.mp4?url";
import caseUlla from "@/assets/case-ulla.png";
import caseDyrlovVideo from "@/assets/case-dyrlov.mp4?url";
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
  video?: string;
  context: string;
  challenge: string;
  role: string[];
  approach: string[];
  solution?: string[];
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
    video: caseWoltVideo,
    context:
      "Wolt-budene kørte længere end algoritmen regnede med — og fik løn for en rute der ikke eksisterede.",
    challenge:
      "Løn beregnet i fugleflugt: 2,7 km. Faktisk rute: 5,9 km. Grundløn faldet fra 45 til 35 kr. 40% af kunderne fravalgte Wolt af etiske årsager — uden at budene vidste det.",
    role: [
      "Jeg fulgte budene på deres ruter og kortlagde kløften mellem algoritmens logik og hverdagens virkelighed.",
      "Mixed methods: interviews, media-go-alongs og feltobservation.",
    ],
    approach: ["Mixed methods", "Co-design", "Service Design", "UX Research"],
    solution: [
      "Heatmap der viser faktiske efterspørgselszoner",
      "Restaurant-blacklist så budene selv kan fravælge samarbejdspartnere",
      "Juridisk support direkte i appen",
    ],
    outcomes: [
      "Kortlagde at lønberegningen systematisk undervurderer faktisk arbejdsdistance med 54%",
      "Dokumenterede at 40% af kunder fravalgte platformen af etiske årsager — uden at budene havde adgang til den information",
      "Designede og validerede tre interventioner i Wolt Partner-appen der giver budene direkte adgang til den information der påvirker deres indkomst",
    ],
  },
  {
    slug: "boliga",
    client: "Boliga",
    title: "Den gode start på boligjagten",
    image: caseBoliga,
    video: caseBoligaVideo,
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
      "Onboarding-flowet valideret og godkendt af Boligas product owner til implementering",
      "Personaliseret flow der bringer relevante boliger frem fra start — reducerer irrelevant eksponering i den kritiske første session",
      "Designet på baggrund af analyse af 6,5 mio. månedlige interaktioner",
    ],
  },
  {
    slug: "interaktiv-horesimulering",
    client: "FUS",
    title: "Social isolation. Teknologien løser lyden. Ikke ensomheden.",
    image: caseHearing,
    video: caseHearingVideo,
    context:
      "Over 20% af hørehæmmede elever i den danske folkeskole oplever hyppig ensomhed mod under 4% blandt normalthørende. Der findes ingen nationale retningslinjer for inkluderende praksis — og eksisterende teknologiske løsninger adresserer lyden, ikke oplevelsen.",
    challenge:
      "Eksisterende simuleringer viser hvad høretab gør ved lyden. Ikke hvad det gør ved mennesket — at miste tråden, gå glip af joken, stå udenfor fællesskabet. Hvordan designer man empati ind i et klasserum?",
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
      "Anvendte generativ AI til at skabe og kalibrere personaliserede lydscenarier baseret på audiologiske data",
      "Promptede og itererede AI-genereret speak til at matche individuelle høreprofiler",
      "Designede interaktivt simuleringskoncept testet direkte med målgruppen",
    ],
    approach: ["Co-design", "Participatorisk design", "Konceptudvikling", "Generativ AI", "Binaural lyddesign", "Spekulativt design"],
    outcomes: [
      "Udviklet og testet i samarbejde med hørehæmmede elever og fagprofessionelle",
      "Ansvaret for inklusion flyttes fra den enkelte elev til skolefællesskabet",
      "Lærere ændrede sprog og tilgang til hørehæmmede elever efter simuleringen",
      "Dokumenteret effekt på læreres forståelse af hørehæmmede elevers oplevelse",
    ],
  },
  {
    slug: "danmarks-radio",
    client: "Danmarks Radio",
    title: "Redaktionel kvalitet bag Danmarks public service",
    image: caseDR,
    video: caseDRVideo,
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
      "Leverede tilrettelagte produktioner klar til broadcast i Danmarks største medieorganisation",
      "Producerede og postproducerede podcast-indhold fra koncept til færdigt produkt",
      "Bidrog til konceptudvikling på tværs af redaktionelle formater",
    ],
  },
  {
    slug: "amnesty-international",
    client: "AMNESTY INTERNATIONAL",
    title: "Når tunge emner finder sin stemme",
    image: caseAmnesty,
    video: caseAmnestyVideo,
    context:
      "Amnesty International arbejder med emner der er både politisk følsomme og fagligt tunge — dødsstraf, tortur, flygtninge. Et samarbejde der dækkede hele processen fra konceptudvikling og forberedelse til færdig produktion og levering.",
    challenge:
      "Amnestys journalister var fagligt stærke men manglede de produktionsmæssige redskaber til at formidle deres viden i lyd — og en kanal der matchede indholdets tyngde.",
    role: [
      "Husede og instruerede et hold på 7 Amnesty-journalister i professionelt lydstudio på Frederiksberg",
      "Konceptudviklede Amnestys lydbaserede formidlingskanal",
      "Trænede journalisterne i mikrofonteknik og oplæsning",
      "Komponerede underlægningsmusik og skabte en samlet lydidentitet for kanalen",
      "Tilrettelagde og efterredigerede færdige produktioner til publicering",
    ],
    approach: ["Strategisk kommunikation", "Lydproduktion", "Konceptudvikling", "Lydidentitet"],
    outcomes: [
      "7 Amnesty-journalister klar til selvstændig produktion af professionelt lydindhold",
      "Komplet lydidentitet — musik, stemme og produktion — der matcher Amnestys integritet og tematiske tyngde",
      "Komplekse emner som dødsstraf og tortur formidlet i et tilgængeligt lydformat uden at miste faglig præcision",
    ],
  },
  {
    slug: "danmarks-naturfredningsforening",
    client: "Danmarks Naturfredningsforening",
    title: "Strategisk kommunikation for Danmarks største naturorganisation",
    image: caseDN,
    video: caseDNVideo,
    context:
      "Danmarks Naturfredningsforening er Danmarks største naturorganisation med mere end 130.000 medlemmer. Opgaven var at styrke organisationens kommunikation og digitale tilstedeværelse med fokus på at nå nye og yngre målgrupper.",
    challenge:
      "Hvordan omsætter man komplekse bæredygtighedsdagsordener til kommunikation der engagerer — uden at miste organisationens faglige tyngde?",
    role: [
      "Havde det samlede kommunikationsansvar og koordinerede på tværs af interne og eksterne interessenter",
      "Udviklede og eksekverede kommunikationsstrategi målrettet nye målgrupper",
      "Omsatte faglige budskaber til tilgængeligt indhold på tværs af platforme og formater",
    ],
    approach: ["Strategisk kommunikation", "Stakeholdermanagement", "Indholdsudvikling", "Målgruppeanalyse"],
    outcomes: [
      "→ Kommunikationsstrategi der nåede yngre målgrupper på tværs af sociale medier og digitale platforme",
      "→ Faglige budskaber om biodiversitet og klimaforandringer gjort tilgængelige uden at kompromittere organisationens troværdighed",
      "→ Styrket digital tilstedeværelse med sammenhængende indhold på tværs af kanaler",
    ],
  },
  {
    slug: "ulla-dyrlov",
    client: "Ulla Dyrløv",
    title: "Ulla Dyrløv. En TV-psykologs stemme — fra idé til platform.",
    image: caseUlla,
    video: caseDyrlovVideo,
    context:
      "Ulla Dyrløv er TV-børnepsykolog og foredragsholder med en etableret faglig profil og en målgruppe der allerede lyttede. Det manglede var en platform der matchede hendes ekspertise og gav hendes stemme et hjem.",
    challenge:
      "Hvordan bygger man en professionel podcastplatform fra bunden der formidler kompleks faglig viden på en måde der møder målgruppen — børn og forældre — i deres egne præmisser?",
    role: [
      "Afdækkede behov og udviklede konceptet i tæt samarbejde med Ulla",
      "Tog ansvar for hele leverancen fra strategi til eksekvering",
      "Designede studieopsætning og lydidentitet fra første episode",
      "Sikrede sammenhæng mellem afsender, budskab og målgruppe på tværs af platforme",
    ],
    approach: ["Konceptudvikling", "Indholdsstrategi", "Lyddesign", "Platformsudvikling"],
    outcomes: [
      "→ Podcast Forældreskabet lanceret og distribueret på Spotify, Apple Podcasts og Podimo",
      "→ Lyddesign, jingle og mix krediteret i samtlige episoder",
      "→ En fagprofessionel med en etableret stemme fik en digital platform der faktisk bruges",
      "→ Indholdsstrategi og studieopsætning fra første episode til løbende produktion",
    ],
  },
  {
    slug: "concerto-copenhagen",
    client: "Concerto Copenhagen",
    title: "Bach remixet for en ny generation",
    image: caseConcerto,
    context:
      "Concerto Copenhagen er et af Danmarks førende barokensembler. Opgaven var at skabe kulturel relevans for et kunstnerisk produkt med 300 års historik — og nå en ny generation uden at kompromittere det kunstneriske udtryk.",
    challenge:
      "Hvordan gør man barokmusik relevant for en yngre målgruppe og skaber en kampagne der rækker ud over de traditionelle koncertsale?",
    role: [
      "Drev strategisk kommunikation og kampagneudvikling",
      "Koordinerede aktivering på Dronning Louises Bro og i TV2-samarbejde",
      "Omsatte et kunstnerisk koncept til en kampagne med bred mediedækning",
    ],
    approach: ["Strategisk kommunikation", "Kampagneudvikling", "Aktivering", "Projektledelse"],
    outcomes: [
      "Remixet afspillet på ladcykler over Dronning Louises Bro med bred mediedækning",
      "TV2-eksponering og ny relevant kontekst for klassisk musik til yngre målgrupper",
      "Viste at kulturelt indhold kan nå unge uden at miste sin integritet",
    ],
  },
  {
    slug: "art-spirit-coaching",
    client: "Art Spirit Coaching",
    title: "Brand og platform for en praksis der var før sin tid",
    image: caseArtSpirit,
    context:
      "Art Spirit Coaching er en praksis ledet af Steen Lykke, der tidligt identificerede stress som en samfundsmæssig pandemi og arbejdede målrettet med resiliens og stressforebyggelse — på et tidspunkt hvor det endnu ikke var en anerkendt dagsorden. Praksis kombinerede mindfulness, personlig udvikling og retreatforløb for både enkeltpersoner og organisationer.",
    challenge:
      "At bygge en sammenhængende brand- og platformsidentitet op fra bunden for en praksis med en stærk faglig vision — og forankre den i reel viden om målgruppen frem for antagelser.",
    role: [
      "Gennemførte dybdegående interviews med klienter, fagpersoner og læger for at afdække værdifulde indsigter om målgruppens behov og bevæggrunde",
      "Udviklede brandidentitet, positionering og kommunikationsstrategi på baggrund af disse indsigter",
      "Definerede kernekoncept og omsatte det til en digital og servicebaseret platform",
      "Producerede indhold der skabte konkrete forbindelser til nye samarbejdspartnere og målgrupper",
    ],
    approach: ["Brugerindsigt", "Brandudvikling", "Konceptdesign", "Platformsudvikling", "Indholdsstrategi"],
    outcomes: [
      "Brandidentitet forankret i reel viden om klienter og fagmiljø — ikke antagelser",
      "Fra nul digital tilstedeværelse til en sammenhængende brand- og platformsidentitet klar til lancering",
      "Synliggjorde en dagsorden om stress og resiliens der siden er blevet en af tidens mest presserende samfundsudfordringer",
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
    title: "Når formatet ikke passer — design af auditiv fordybelse til børn med ADHD",
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
    approach: ["Brugerinddragelse", "Empirisk research", "Konceptudvikling", "Iterativ prototyping"],
    outcomes: [
      "Dokumenteret uopfyldt behov i markedet for lydbaserede læringsværktøjer",
      "Koncept for auditiv fordybelse tilpasset børn med ADHD",
      "Indsigt i hvordan narrativ struktur og lyd kan erstatte forklaring med oplevelse",
    ],
  },
  {
    slug: "itu-designlab",
    client: "DESIGNLAB",
    title: "Når fortiden vækkes til live",
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
      "Generativ AI",
    ],
    outcomes: [
      "Prototype valideret af domæneeksperter som potentielt samtalefacilitator i plejepraksis",
      "Konceptramme for etisk ansvarlig brug af AI-genererede stemmer og lydscenarier",
      "Indsigt i hvordan AI kan understøtte fagprofessionelle uden at erstatte den menneskelige relation",
    ],
  },
];

const _order = [
  "wolt",
  "amnesty-international",
  "boliga",
  "danmarks-radio",
  "ulla-dyrlov",
  "danmarks-naturfredningsforening",
  "interaktiv-horesimulering",
  "itu-designlab",
  "art-spirit-coaching",
  "concerto-copenhagen",
  "musikfaellesskabet-i-nye",
  "lydboger-til-born-med-adhd",
];

export const caseStudies: CaseStudy[] = [
  ..._order
    .map((s) => _allCases.find((c) => c.slug === s))
    .filter((c): c is CaseStudy => Boolean(c)),
  ..._allCases.filter((c) => !_order.includes(c.slug)),
];

export const getCaseBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
