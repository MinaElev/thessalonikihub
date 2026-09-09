import type { Localized } from "@/lib/types";

/**
 * Audience landing pages — SEO hubs that gather the right content for each
 * kind of visitor. Each pulls matching places (by tag), curated collections
 * and guides, plus a unique editorial intro.
 */
export interface Audience {
  slug: string;
  name: Localized<string>;
  blurb: Localized<string>;
  intro: Localized<string>; // markdown
  /** Place tags to feature. */
  tags: string[];
  /** Guide slugs to feature. */
  guides: string[];
  /** Collection refs as "pillar:slug". */
  collections: string[];
  featured?: boolean;
}

export const audiences: Audience[] = [
  {
    slug: "first-timers",
    name: { el: "Πρώτη φορά", en: "First-timers" },
    blurb: { el: "Πρώτη φορά στη Θεσσαλονίκη;", en: "First time in Thessaloniki?" },
    intro: {
      el: "Πρώτη φορά στη Θεσσαλονίκη; Ξεκίνα από τα βασικά: την **Αριστοτέλους**, τον **Λευκό Πύργο**, τη **Ροτόντα** και μια βόλτα στη **Νέα Παραλία**. Με 2-3 μέρες προλαβαίνεις τα κυριότερα με τα πόδια. Παρακάτω θα βρεις itineraries, τα must αξιοθέατα και πρακτικές πληροφορίες.",
      en: "First time in Thessaloniki? Start with the essentials: **Aristotelous Square**, the **White Tower**, the **Rotunda** and a walk along the **waterfront**. In 2-3 days you can cover the highlights on foot. Below you'll find itineraries, the must-see sights and practical info.",
    },
    tags: ["landmark", "unesco", "views"],
    guides: ["3-days-in-thessaloniki", "unesco-monuments-of-thessaloniki", "getting-around-thessaloniki"],
    collections: ["discover:unesco-monuments", "discover:center"],
    featured: true,
  },
  {
    slug: "couples",
    name: { el: "Για ζευγάρια", en: "For couples" },
    blurb: { el: "Ρομαντική απόδραση για δύο.", en: "A romantic getaway for two." },
    intro: {
      el: "Ρομαντική απόδραση; Η Θεσσαλονίκη έχει θέα, ηλιοβασιλέματα και ατμόσφαιρα. Ανέβα στην **Άνω Πόλη** για τη θέα, περπάτα στη **Νέα Παραλία** στο ηλιοβασίλεμα και κλείσε τη βραδιά με cocktail σε rooftop.",
      en: "A romantic getaway? Thessaloniki has views, sunsets and atmosphere. Go up to **Ano Poli** for the view, walk the **waterfront** at sunset and end the night with a rooftop cocktail.",
    },
    tags: ["couples", "views", "sea-view", "sunset"],
    guides: ["romantic-weekend-thessaloniki"],
    collections: ["discover:best-views"],
    featured: true,
  },
  {
    slug: "families",
    name: { el: "Για οικογένειες", en: "For families" },
    blurb: { el: "Θεσσαλονίκη με παιδιά.", en: "Thessaloniki with kids." },
    intro: {
      el: "Ταξίδι με παιδιά; Η πόλη προσφέρει ανοιχτούς χώρους, μουσεία και την παραλία. Ο **Λευκός Πύργος**, το **Αρχαιολογικό Μουσείο** και οι βόλτες στη Νέα Παραλία είναι ιδανικά για μικρούς και μεγάλους.",
      en: "Travelling with kids? The city offers open spaces, museums and the seafront. The **White Tower**, the **Archaeological Museum** and walks along the waterfront are great for all ages.",
    },
    tags: ["family"],
    guides: [],
    collections: ["discover:family"],
    featured: true,
  },
  {
    slug: "students",
    name: { el: "Για φοιτητές", en: "For students" },
    blurb: { el: "Η φοιτητούπολη της Ελλάδας.", en: "Greece's student city." },
    intro: {
      el: "Η Θεσσαλονίκη είναι η μεγαλύτερη φοιτητούπολη της χώρας — ζωντανή, οικονομική και με ασταμάτητη νυχτερινή ζωή. Εδώ θα βρεις **δωρεάν** πράγματα να κάνεις, φθηνές γωνιές και τα στέκια της πόλης. *(Στέγη, εκπτώσεις και jobs έρχονται σύντομα.)*",
      en: "Thessaloniki is Greece's largest student city — lively, affordable and with non-stop nightlife. Here you'll find **free** things to do, cheap spots and the city's hangouts. *(Student housing, discounts and jobs coming soon.)*",
    },
    tags: ["free", "nightlife", "budget"],
    guides: ["free-things-to-do-thessaloniki", "getting-around-thessaloniki"],
    collections: ["discover:free"],
    featured: true,
  },
  {
    slug: "business",
    name: { el: "Business & ΔΕΘ", en: "Business & TIF" },
    blurb: { el: "Επαγγελματικά ταξίδια & συνέδρια.", en: "Business trips & conferences." },
    intro: {
      el: "Ταξίδι για δουλειά ή συνέδριο (π.χ. **ΔΕΘ/HELEXPO**); Η Θεσσαλονίκη έχει γρήγορες μετακινήσεις, καλή σύνδεση με το αεροδρόμιο και κεντρικές επιλογές διαμονής κοντά στην αγορά και τη Νέα Παραλία.",
      en: "Here for work or a conference (e.g. **TIF/HELEXPO**)? Thessaloniki has quick transport, a good airport connection and central places to stay near the market and the waterfront.",
    },
    tags: ["business", "central"],
    guides: ["thessaloniki-from-the-airport", "getting-around-thessaloniki"],
    collections: [],
  },
  {
    slug: "digital-nomads",
    name: { el: "Digital nomads", en: "Digital nomads" },
    blurb: { el: "Δουλειά & ζωή στη Θεσσαλονίκη.", en: "Work & live in Thessaloniki." },
    intro: {
      el: "Δουλεύεις από απόσταση; Η Θεσσαλονίκη συνδυάζει προσιτό κόστος ζωής, θάλασσα, καλό φαγητό και δυνατή καφε-κουλτούρα ιδανική για δουλειά. Διάλεξε γειτονιά, βρες τα στέκια σου και μείνε για μεγάλο διάστημα.",
      en: "Working remotely? Thessaloniki combines an affordable cost of living, the sea, great food and a strong café culture perfect for working. Pick a neighbourhood, find your spots and stay a while.",
    },
    tags: ["long-stays", "central", "coffee"],
    guides: ["thessaloniki-neighbourhoods", "getting-around-thessaloniki"],
    collections: ["discover:museums"],
  },
];

const bySlug = new Map(audiences.map((a) => [a.slug, a]));
export function getAudience(slug: string): Audience | undefined {
  return bySlug.get(slug);
}
