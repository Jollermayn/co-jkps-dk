// Mapping from skill/approach tag → related case slugs.
// Used both by the Kompetencer section (homepage) and the Tilgang
// section on individual case pages.

export const TAG_TO_SLUGS: Record<string, string[]> = {
  // Research / UX
  "Semistrukturerede interviews": ["wolt", "boliga", "interaktiv-horesimulering"],
  "Feltobservation": ["wolt", "boliga", "interaktiv-horesimulering"],
  "Mixed methods": ["wolt", "boliga", "interaktiv-horesimulering"],
  "UX Research": ["wolt", "boliga", "interaktiv-horesimulering"],
  "Dataanalyse": ["boliga", "wolt"],
  "Co-design": ["interaktiv-horesimulering", "wolt"],
  "Co-Creation": ["interaktiv-horesimulering", "wolt"],
  "Participatorisk design": ["interaktiv-horesimulering", "wolt"],
  "Brugerrejser": ["boliga", "wolt", "art-spirit-coaching"],
  "Touchpoint-mapping": ["boliga", "wolt"],
  "Servicedesign": ["wolt", "boliga"],
  "Service Design": ["wolt", "boliga"],
  "Konceptvalidering": ["wolt", "boliga"],
  "Concept Design": ["interaktiv-horesimulering", "wolt"],
  "Konceptdesign": ["art-spirit-coaching", "ulla-dyrlov"],
  "Product Design": ["boliga", "wolt"],
  "Workshopfacilitering": ["interaktiv-horesimulering", "danmarks-naturfredningsforening"],
  "Facilitering": ["danmarks-naturfredningsforening", "interaktiv-horesimulering", "wolt"],
  "Workshops": ["interaktiv-horesimulering", "wolt"],

  // Strategi / Brand
  "Digital strategi": ["ulla-dyrlov", "art-spirit-coaching", "concerto-copenhagen"],
  "Positionering": ["ulla-dyrlov", "art-spirit-coaching", "concerto-copenhagen"],
  "Brandudvikling": ["ulla-dyrlov", "art-spirit-coaching", "concerto-copenhagen"],
  "Visuel identitet": ["ulla-dyrlov", "art-spirit-coaching"],
  "Lydidentitet": ["ulla-dyrlov", "danmarks-radio"],
  "Platformsudvikling": ["art-spirit-coaching", "ulla-dyrlov"],

  // Kommunikation / Indhold
  "Kommunikationsstrategi": ["amnesty-international", "danmarks-radio", "danmarks-naturfredningsforening"],
  "Strategisk kommunikation": ["danmarks-naturfredningsforening", "concerto-copenhagen", "amnesty-international"],
  "Indholdsstrategi": ["amnesty-international", "danmarks-radio", "danmarks-naturfredningsforening"],
  "Indholdsproduktion": ["amnesty-international", "danmarks-radio", "danmarks-naturfredningsforening"],
  "Indholdsarkitektur": ["ulla-dyrlov", "concerto-copenhagen"],
  "Journalistisk formidling": ["amnesty-international", "danmarks-radio"],
  "So-me indhold": ["danmarks-naturfredningsforening", "amnesty-international"],
  "Kampagneudvikling": ["concerto-copenhagen", "danmarks-naturfredningsforening"],

  // Lyd / Produktion
  "Podcastproduktion": ["danmarks-radio", "ulla-dyrlov"],
  "Lydproduktion": ["danmarks-radio", "ulla-dyrlov"],
  "Musikproduktion": ["concerto-copenhagen", "danmarks-radio"],
  "Videoproduktion": ["danmarks-naturfredningsforening", "amnesty-international"],
  "Studieopsætning": ["ulla-dyrlov", "danmarks-radio"],
  "Redaktionel tilrettelæggelse": ["danmarks-radio", "amnesty-international"],
  "Postproduktion": ["danmarks-radio", "ulla-dyrlov"],
  "Tværgående koordinering": ["danmarks-radio", "amnesty-international"],
  "Projektledelse": ["concerto-copenhagen", "art-spirit-coaching"],
};

export const TAG_HEADLINES: Record<string, string> = {
  wolt: "Fra usynlig algoritme til informeret bud",
  boliga: "Reduceret kompleksitet i boligsøgning",
  "interaktiv-horesimulering": "Når teknologi ikke er svaret — men mennesket er",
  "danmarks-radio": "Digitale og lydbaserede formater",
  "amnesty-international": "Menneskerettigheder til konkret indhold",
  "danmarks-naturfredningsforening": "Bæredygtighed og brandudvikling",
  "ulla-dyrlov": "Koncept og platform fra bunden",
  "concerto-copenhagen": "Publikumsengagement gennem kulturformidling",
  "art-spirit-coaching": "Brand og koncept fra idé til lancering",
};
