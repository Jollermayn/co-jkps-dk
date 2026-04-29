import caseWolt from "@/assets/case-wolt.png";
import caseBoliga from "@/assets/case-boliga.png";
import caseHearing from "@/assets/case-hearing.png";
import caseDR from "@/assets/case-dr.png";
import caseAmnesty from "@/assets/case-amnesty.png";
import caseDN from "@/assets/case-dn.png";
import caseUlla from "@/assets/case-ulla.png";
import caseConcerto from "@/assets/case-concerto.png";
import caseArtSpirit from "@/assets/case-artspirit.png";

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
};

export const caseStudies: CaseStudy[] = [
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
    role: [
      "Gennemførte 8 dybdegående interviews med lærere, eksperter og hørehæmmede elever",
      "Faciliterede 2 co-design workshops på specialefterskole",
      "Udviklede interaktiv binaural høretabssimulering",
    ],
    approach: ["Co-design", "Participatorisk design", "Concept Design", "Co-Creation"],
    outcomes: [
      "Autentisk valideret af hørehæmmede deltagere",
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
      "Stod for podcastproduktion og postproduktion",
      "Koordinerede på tværs af redaktioner og teams",
      "Sikrede teknisk og redaktionel kvalitet i produktionen",
    ],
    approach: ["Redaktionel tilrettelæggelse", "Postproduktion", "Tværgående koordinering"],
    outcomes: [
      "Leveret broadcast-kvalitet indhold til Danmarks største medieplatform",
      "Opbygget erfaring med professionel medieproduktion i stor skala",
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
      "Formidlede komplekse temaer i et tilgængeligt format",
    ],
    approach: ["Journalistisk formidling", "Podcastproduktion", "Redaktionel tilrettelæggelse"],
    outcomes: [
      "Tilgængeligt lydindhold om menneskerettigheder til bred dansk offentlighed",
      "Styrket kommunikation af Amnestys kernebudskaber",
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
      "At skabe professionelt medievisuals og strategisk kommunikation der kunne formidle naturorganisationens kerneværdier til nye og yngre målgrupper.",
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
    title: "Lydidentitet og podcastplatform fra bunden",
    image: caseUlla,
    context:
      "Ulla Dyrløv er TV-børnepsykolog og arbejder med børns trivsel og mentale sundhed. Samarbejdet handlede om at bygge en professionel lydidentitet og podcastplatform op fra bunden i hendes psykologpraksis.",
    challenge:
      "At omsætte en psykologs faglige ekspertise til en tilgængelig og professionel lyddimension — fra fysisk studieopsætning til digitalt indhold der rammer forældre og børn.",
    role: [
      "Byggede et professionelt lydstudio op i hendes praksis",
      "Stod for podcastproduktion og postproduktion",
      "Koordinerede kreative processer og udviklede social media-koncept",
    ],
    approach: ["Lydidentitet", "Studieopsætning", "Podcastproduktion", "Indholdsstrategi"],
    outcomes: [
      "Færdigt og fungerende lydstudio i psykologpraksis",
      "Professionel podcastproduktion målrettet forældre og børn",
      "Sammenhængende social media-koncept",
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
      "At bygge en sammenhængende brand- og platformsidentitet op fra bunden for en praksis der opererede uden digital tilstedeværelse.",
    role: [
      "Udviklede brandidentitet, positionering og kommunikationsstrategi fra bunden",
      "Definerede kernekoncept og omsatte det til en digital og servicebaseret platform",
      "Designede brugerrejser og indholdsstrategi",
      "Skabte skalerbart fundament for løbende kommunikation og vækst",
    ],
    approach: ["Brandudvikling", "Konceptdesign", "Brugerrejser", "Indholdsstrategi", "Platformsudvikling"],
    outcomes: [
      "Sammenhængende brandidentitet fra koncept til eksekvering",
      "Funktionel digital platform med klar kommunikation",
      "Skalerbart fundament for fremtidig vækst",
    ],
  },
];

export const getCaseBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
