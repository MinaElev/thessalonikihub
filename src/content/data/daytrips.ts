import type { Localized, Photo } from "@/lib/types";

/** A day trip from Thessaloniki. Real, well-known destinations, factual. */
export interface DayTrip {
  slug: string;
  name: Localized<string>;
  summary: Localized<string>;
  description: Localized<string>; // markdown
  distanceKm: number;
  drivingTime: Localized<string>;
  category: "history" | "nature" | "beach";
  photos: Photo[];
  featured?: boolean;
}

const WIKI = "Wikimedia Commons";

export const dayTrips: DayTrip[] = [
  {
    slug: "vergina",
    name: { el: "Βεργίνα (Αιγές)", en: "Vergina (Aigai)" },
    summary: {
      el: "Οι βασιλικοί τάφοι των Μακεδόνων και ο τάφος του Φιλίππου Β΄ — μνημείο UNESCO.",
      en: "The royal Macedonian tombs and the tomb of Philip II — a UNESCO site.",
    },
    description: {
      el: "Η **Βεργίνα**, η αρχαία **Αιγές**, ήταν η πρώτη πρωτεύουσα του μακεδονικού βασιλείου. Το εντυπωσιακό υπόγειο μουσείο των βασιλικών τάφων φιλοξενεί τον ασύλητο τάφο του **Φιλίππου Β΄** (πατέρα του Μεγάλου Αλεξάνδρου) με τα χρυσά ευρήματα. Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO, ιδανικό για μισή ή μία μέρα.",
      en: "**Vergina**, ancient **Aigai**, was the first capital of the Macedonian kingdom. Its striking underground museum of the royal tombs holds the unlooted tomb of **Philip II** (father of Alexander the Great) with its golden finds. A UNESCO World Heritage Site, ideal for a half or full day.",
    },
    distanceKm: 75,
    drivingTime: { el: "~1 ώρα", en: "~1 hour" },
    category: "history",
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Facade_of_Philip_II_tomb_Vergina_Greece.jpg/1280px-Facade_of_Philip_II_tomb_Vergina_Greece.jpg",
        alt: { el: "Ο τάφος του Φιλίππου Β΄ στη Βεργίνα", en: "The tomb of Philip II at Vergina" },
        credit: WIKI,
      },
    ],
    featured: true,
  },
  {
    slug: "mount-olympus",
    name: { el: "Όλυμπος", en: "Mount Olympus" },
    summary: {
      el: "Το ψηλότερο βουνό της Ελλάδας και μυθική κατοικία των θεών.",
      en: "Greece's highest mountain and the mythical home of the gods.",
    },
    description: {
      el: "Ο **Όλυμπος**, με ψηλότερη κορυφή τον Μύτικα (2.917 μ.), ήταν στη μυθολογία η κατοικία των δώδεκα θεών. Εθνικός δρυμός με πλούσια φύση και μονοπάτια· βάση για πεζοπορία είναι ο **Λιτόχωρο**. Ιδανικό για λάτρεις της φύσης και του βουνού.",
      en: "**Mount Olympus**, whose highest peak Mytikas reaches 2,917 m, was in mythology the home of the twelve gods. A national park with rich nature and trails; **Litochoro** is the base for hiking. Great for nature and mountain lovers.",
    },
    distanceKm: 90,
    drivingTime: { el: "~1 ώρα 15′", en: "~1 hr 15 min" },
    category: "nature",
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Olympus_National_Park_30.jpg/1280px-Olympus_National_Park_30.jpg",
        alt: { el: "Ο Όλυμπος", en: "Mount Olympus" },
        credit: WIKI,
      },
    ],
    featured: true,
  },
  {
    slug: "edessa",
    name: { el: "Έδεσσα", en: "Edessa" },
    summary: {
      el: "Η πόλη των καταρρακτών, με πράσινο και νερά.",
      en: "The town of waterfalls, full of greenery and water.",
    },
    description: {
      el: "Η **Έδεσσα** είναι γνωστή για τους **καταρράκτες** της — τους μεγαλύτερους της Ελλάδας — μέσα σε ένα καταπράσινο πάρκο. Μαζί με το παλιό συνοικιακό Βαρόσι και τα γεφύρια, είναι μια ήρεμη, δροσερή απόδραση κοντά στη Θεσσαλονίκη.",
      en: "**Edessa** is famous for its **waterfalls** — the largest in Greece — set in a lush green park. Together with the old Varosi quarter and its bridges, it makes for a calm, refreshing escape near Thessaloniki.",
    },
    distanceKm: 90,
    drivingTime: { el: "~1 ώρα", en: "~1 hour" },
    category: "nature",
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/4/44/La_cascata_-_panoramio_%281%29.jpg",
        alt: { el: "Ο καταρράκτης της Έδεσσας", en: "The Edessa waterfall" },
        credit: WIKI,
      },
    ],
  },
  {
    slug: "chalkidiki",
    name: { el: "Χαλκιδική", en: "Chalkidiki" },
    summary: {
      el: "Οι τρεις χερσόνησοι με τις διάσημες παραλίες, δίπλα στη Θεσσαλονίκη.",
      en: "The three peninsulas with famous beaches, right next to Thessaloniki.",
    },
    description: {
      el: "Η **Χαλκιδική** με τα τρία «πόδια» της (Κασσάνδρα, Σιθωνία, Άθως) είναι ο πιο δημοφιλής παραθαλάσσιος προορισμός των Θεσσαλονικέων. Κρυστάλλινες παραλίες, γραφικά χωριά και ξεκούραστες αποδράσεις — η **Κασσάνδρα** είναι η πιο κοντινή.",
      en: "**Chalkidiki**, with its three \"legs\" (Kassandra, Sithonia, Mount Athos), is the favourite seaside destination of the people of Thessaloniki. Crystal-clear beaches, picturesque villages and easy escapes — **Kassandra** is the closest.",
    },
    distanceKm: 70,
    drivingTime: { el: "~1 ώρα (Κασσάνδρα)", en: "~1 hour (Kassandra)" },
    category: "beach",
    photos: [],
    featured: true,
  },
  {
    slug: "meteora",
    name: { el: "Μετέωρα", en: "Meteora" },
    summary: {
      el: "Τα βυζαντινά μοναστήρια πάνω σε βράχους — μνημείο UNESCO.",
      en: "Byzantine monasteries atop towering rocks — a UNESCO site.",
    },
    description: {
      el: "Τα **Μετέωρα** είναι ένα από τα πιο εντυπωσιακά τοπία της Ελλάδας: μοναστήρια χτισμένα στην κορυφή τεράστιων βράχων. Μνημείο UNESCO. Είναι πιο μακρινή εκδρομή (μεγάλη μέρα), αλλά αξίζει απόλυτα.",
      en: "**Meteora** is one of Greece's most spectacular landscapes: monasteries perched atop giant rock pillars. A UNESCO site. It's a longer trip (a full long day), but absolutely worth it.",
    },
    distanceKm: 230,
    drivingTime: { el: "~2 ώρες 45′", en: "~2 hr 45 min" },
    category: "history",
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Meteora%27s_monastery_2.jpg/1280px-Meteora%27s_monastery_2.jpg",
        alt: { el: "Τα μοναστήρια των Μετεώρων", en: "The monasteries of Meteora" },
        credit: WIKI,
      },
    ],
  },
];

const bySlug = new Map(dayTrips.map((d) => [d.slug, d]));
export function getDayTrip(slug: string): DayTrip | undefined {
  return bySlug.get(slug);
}
