import type { Localized, Pillar } from "@/lib/types";
import type { Locale } from "@/i18n/routing";

/**
 * Canonical amenity catalog, grouped and localized.
 *
 * `Place.amenities` is a flat list of these keys; this catalog gives each key a
 * group and a bilingual label so amenities render grouped on listing pages and
 * the submission form can offer them as checkboxes.
 *
 * One catalog, not one per pillar: a key has to resolve to a label wherever it
 * turns up, and a published listing keeps its keys for ever. What varies is who
 * gets *asked* — a taverna owner has no use for "dryer" and a host none for
 * "takeaway" — so every group declares the pillars it belongs to, and the
 * submission form shows only those.
 */

/** The pillars a person can submit, and so the ones asked about amenities. */
export type AmenityScope = Extract<
  Pillar,
  "stay" | "eat" | "drink" | "experiences" | "services"
>;

export interface AmenityItem {
  key: string;
  label: Localized<string>;
  /**
   * Overrides the group's scope. Only for the few items that cross over —
   * Wi-Fi matters to everyone, a high chair to hosts and tavernas both.
   */
  appliesTo?: AmenityScope[];
}

export interface AmenityGroup {
  key: string;
  label: Localized<string>;
  /** Which kinds of listing are asked about this group. */
  appliesTo: AmenityScope[];
  amenities: AmenityItem[];
}

export const amenityGroups: AmenityGroup[] = [
  {
    key: "general",
    label: { el: "Γενικά", en: "General" },
    appliesTo: ["stay"],
    amenities: [
      // The first three are the only ones a restaurant or bar is asked about.
      { key: "wifi", label: { el: "Wi-Fi", en: "Wi-Fi" }, appliesTo: ["stay", "eat", "drink"] },
      { key: "air-conditioning", label: { el: "Κλιματισμός", en: "Air conditioning" }, appliesTo: ["stay", "eat", "drink"] },
      { key: "heating", label: { el: "Θέρμανση", en: "Heating" }, appliesTo: ["stay", "eat", "drink"] },
      { key: "elevator", label: { el: "Ασανσέρ", en: "Elevator" } },
      { key: "balcony", label: { el: "Μπαλκόνι", en: "Balcony" } },
      { key: "terrace", label: { el: "Βεράντα", en: "Terrace" } },
      { key: "tv", label: { el: "Τηλεόραση", en: "TV" } },
      { key: "streaming", label: { el: "Streaming (Netflix κ.ά.)", en: "Streaming (Netflix etc.)" } },
      { key: "workspace", label: { el: "Χώρος εργασίας", en: "Workspace" } },
    ],
  },
  {
    key: "kitchen",
    label: { el: "Κουζίνα", en: "Kitchen" },
    appliesTo: ["stay"],
    amenities: [
      { key: "kitchen", label: { el: "Πλήρης κουζίνα", en: "Full kitchen" } },
      { key: "oven", label: { el: "Φούρνος", en: "Oven" } },
      { key: "stove", label: { el: "Εστίες", en: "Stove" } },
      { key: "fridge", label: { el: "Ψυγείο", en: "Fridge" } },
      { key: "dishwasher", label: { el: "Πλυντήριο πιάτων", en: "Dishwasher" } },
      { key: "microwave", label: { el: "Φούρνος μικροκυμάτων", en: "Microwave" } },
      { key: "coffee-machine", label: { el: "Καφετιέρα", en: "Coffee machine" } },
    ],
  },
  {
    key: "bathroom-laundry",
    label: { el: "Μπάνιο & πλυντήριο", en: "Bathroom & laundry" },
    appliesTo: ["stay"],
    amenities: [
      { key: "washer", label: { el: "Πλυντήριο ρούχων", en: "Washing machine" } },
      { key: "dryer", label: { el: "Στεγνωτήριο", en: "Dryer" } },
      { key: "iron", label: { el: "Σίδερο", en: "Iron" } },
      { key: "hairdryer", label: { el: "Σεσουάρ", en: "Hair dryer" } },
      { key: "towels", label: { el: "Πετσέτες", en: "Towels" } },
      { key: "toiletries", label: { el: "Είδη περιποίησης", en: "Toiletries" } },
    ],
  },
  {
    key: "wellness",
    label: { el: "Wellness", en: "Wellness" },
    appliesTo: ["stay"],
    amenities: [
      { key: "pool", label: { el: "Πισίνα", en: "Pool" } },
      { key: "hot-tub", label: { el: "Τζακούζι", en: "Hot tub" } },
      { key: "sauna", label: { el: "Σάουνα", en: "Sauna" } },
      { key: "gym", label: { el: "Γυμναστήριο", en: "Gym" } },
      { key: "fireplace", label: { el: "Τζάκι", en: "Fireplace" } },
    ],
  },
  {
    key: "family",
    label: { el: "Οικογένεια", en: "Family" },
    appliesTo: ["stay"],
    amenities: [
      { key: "crib", label: { el: "Κούνια μωρού", en: "Baby crib" } },
      { key: "high-chair", label: { el: "Καρέκλα φαγητού", en: "High chair" }, appliesTo: ["stay", "eat"] },
    ],
  },
  {
    key: "safety",
    label: { el: "Ασφάλεια", en: "Safety" },
    appliesTo: ["stay"],
    amenities: [
      { key: "smoke-alarm", label: { el: "Ανιχνευτής καπνού", en: "Smoke alarm" } },
      { key: "fire-extinguisher", label: { el: "Πυροσβεστήρας", en: "Fire extinguisher" } },
      { key: "first-aid", label: { el: "Κιτ πρώτων βοηθειών", en: "First-aid kit" } },
      { key: "safe", label: { el: "Χρηματοκιβώτιο", en: "Safe" } },
    ],
  },

  // ---- Food & drink ----
  {
    key: "venue",
    label: { el: "Ο χώρος", en: "The space" },
    appliesTo: ["eat", "drink"],
    amenities: [
      { key: "outdoor-seating", label: { el: "Τραπέζια σε εξωτερικό χώρο", en: "Outdoor seating" } },
      { key: "garden-courtyard", label: { el: "Κήπος ή αυλή", en: "Garden or courtyard" } },
      { key: "rooftop", label: { el: "Ταράτσα / rooftop", en: "Rooftop" } },
      { key: "waterfront", label: { el: "Δίπλα στη θάλασσα", en: "On the waterfront" } },
      { key: "live-music", label: { el: "Ζωντανή μουσική", en: "Live music" } },
      { key: "smoking-area", label: { el: "Χώρος καπνιστών", en: "Smoking area" } },
    ],
  },
  {
    key: "dining-service",
    label: { el: "Εξυπηρέτηση", en: "Service" },
    appliesTo: ["eat", "drink"],
    amenities: [
      { key: "reservations", label: { el: "Δέχεται κρατήσεις", en: "Takes reservations" } },
      { key: "takeaway", label: { el: "Take away", en: "Takeaway" } },
      { key: "delivery", label: { el: "Delivery", en: "Delivery" } },
      { key: "card-payment", label: { el: "Δέχεται κάρτες", en: "Card payment" } },
      { key: "open-late", label: { el: "Ανοιχτά αργά", en: "Open late" } },
    ],
  },
  {
    key: "menu",
    label: { el: "Στο μενού", en: "On the menu" },
    appliesTo: ["eat", "drink"],
    amenities: [
      { key: "vegetarian-options", label: { el: "Χορτοφαγικές επιλογές", en: "Vegetarian options" } },
      { key: "vegan-options", label: { el: "Vegan επιλογές", en: "Vegan options" } },
      { key: "gluten-free-options", label: { el: "Επιλογές χωρίς γλουτένη", en: "Gluten-free options" } },
      { key: "kids-menu", label: { el: "Παιδικό μενού", en: "Kids menu" } },
      { key: "specialty-coffee", label: { el: "Καφές specialty", en: "Specialty coffee" } },
      { key: "cocktails", label: { el: "Κοκτέιλ", en: "Cocktails" } },
      { key: "craft-beer", label: { el: "Μπίρα μικροζυθοποιίας", en: "Craft beer" } },
      { key: "wine-list", label: { el: "Λίστα κρασιών", en: "Wine list" } },
      { key: "tsipouro-ouzo", label: { el: "Τσίπουρο & ούζο", en: "Tsipouro & ouzo" } },
    ],
  },

  // ---- Experiences ----
  {
    key: "experience",
    label: { el: "Η εμπειρία", en: "The experience" },
    appliesTo: ["experiences"],
    amenities: [
      { key: "guide-greek", label: { el: "Ξεναγός στα ελληνικά", en: "Greek-speaking guide" } },
      { key: "guide-english", label: { el: "Ξεναγός στα αγγλικά", en: "English-speaking guide" } },
      { key: "small-group", label: { el: "Μικρό γκρουπ", en: "Small group" } },
      { key: "private-option", label: { el: "Δυνατότητα ιδιωτικής", en: "Private option" } },
      { key: "family-friendly", label: { el: "Κατάλληλο για οικογένειες", en: "Family friendly" } },
      { key: "hotel-pickup", label: { el: "Παραλαβή από το κατάλυμα", en: "Hotel pickup" } },
      { key: "tickets-included", label: { el: "Εισιτήρια στην τιμή", en: "Tickets included" } },
      { key: "food-included", label: { el: "Φαγητό ή ποτό στην τιμή", en: "Food or drink included" } },
    ],
  },

  // ---- Anything with a front door ----
  {
    key: "access",
    label: { el: "Πρόσβαση", en: "Access" },
    appliesTo: ["eat", "drink", "experiences"],
    amenities: [
      // Deliberately different keys from the `accessibility` field on Place,
      // so the same fact never renders twice on one page.
      { key: "step-free-entry", label: { el: "Είσοδος χωρίς σκαλιά", en: "Step-free entrance" } },
      { key: "accessible-wc", label: { el: "Προσβάσιμη τουαλέτα", en: "Accessible toilet" }, appliesTo: ["eat", "drink"] },
      { key: "pet-friendly", label: { el: "Δεκτά κατοικίδια", en: "Pets welcome" }, appliesTo: ["eat", "drink"] },
      { key: "parking-nearby", label: { el: "Πάρκινγκ κοντά", en: "Parking nearby" } },
    ],
  },
];

/**
 * The groups, and the items within them, that a given pillar is asked about.
 *
 * An item's own `appliesTo` wins over its group's; a group left with nothing
 * is dropped rather than rendered as an empty heading.
 */
export function amenityGroupsFor(scope: AmenityScope): AmenityGroup[] {
  return amenityGroups
    .map((group) => ({
      ...group,
      amenities: group.amenities.filter((a) =>
        (a.appliesTo ?? group.appliesTo).includes(scope),
      ),
    }))
    .filter((group) => group.amenities.length > 0);
}

const labelByKey = new Map<string, Localized<string>>();
for (const g of amenityGroups) {
  for (const a of g.amenities) labelByKey.set(a.key, a.label);
}

/** Localized label for an amenity key (falls back to the raw key). */
export function amenityLabel(key: string): Localized<string> {
  return labelByKey.get(key) ?? { el: key, en: key };
}

/** Group a place's flat amenity keys into the catalog groups (order preserved). */
export function groupAmenities(
  keys: string[],
): { group: AmenityGroup; items: { key: string; label: Localized<string> }[] }[] {
  const set = new Set(keys);
  return amenityGroups
    .map((group) => ({
      group,
      items: group.amenities.filter((a) => set.has(a.key)),
    }))
    .filter((g) => g.items.length > 0);
}

// ---- Labels for structured stay fields (views, parking, policies) ----

export function viewLabel(key: string): Localized<string> {
  const map: Record<string, Localized<string>> = {
    sea: { el: "Θέα θάλασσα", en: "Sea view" },
    city: { el: "Θέα πόλη", en: "City view" },
    mountain: { el: "Θέα βουνό", en: "Mountain view" },
    garden: { el: "Θέα κήπο", en: "Garden view" },
  };
  return map[key] ?? { el: key, en: key };
}

export function parkingLabel(key: string): Localized<string> {
  const map: Record<string, Localized<string>> = {
    none: { el: "Χωρίς πάρκινγκ", en: "No parking" },
    "free-onsite": { el: "Δωρεάν πάρκινγκ", en: "Free parking on site" },
    "paid-onsite": { el: "Πάρκινγκ επί πληρωμή", en: "Paid parking on site" },
    street: { el: "Πάρκινγκ στον δρόμο", en: "Street parking" },
    nearby: { el: "Πάρκινγκ πλησίον", en: "Parking nearby" },
  };
  return map[key] ?? { el: key, en: key };
}

export function accessibilityLabel(key: string): Localized<string> {
  const map: Record<string, Localized<string>> = {
    "step-free": { el: "Πρόσβαση χωρίς σκαλιά", en: "Step-free access" },
    elevator: { el: "Ασανσέρ", en: "Elevator" },
    wheelchair: { el: "Πρόσβαση ΑΜΕΑ", en: "Wheelchair accessible" },
  };
  return map[key] ?? { el: key, en: key };
}

export function cancellationLabel(key: string): Localized<string> {
  const map: Record<string, Localized<string>> = {
    flexible: { el: "Ευέλικτη ακύρωση", en: "Flexible cancellation" },
    moderate: { el: "Μέτρια πολιτική ακύρωσης", en: "Moderate cancellation" },
    strict: { el: "Αυστηρή πολιτική ακύρωσης", en: "Strict cancellation" },
  };
  return map[key] ?? { el: key, en: key };
}

export function propertyTypeLabel(key: string): Localized<string> {
  const map: Record<string, Localized<string>> = {
    apartment: { el: "Διαμέρισμα", en: "Apartment" },
    studio: { el: "Studio", en: "Studio" },
    villa: { el: "Βίλα", en: "Villa" },
    maisonette: { el: "Μεζονέτα", en: "Maisonette" },
    house: { el: "Σπίτι", en: "House" },
    loft: { el: "Loft", en: "Loft" },
    guesthouse: { el: "Ξενώνας", en: "Guesthouse" },
    "serviced-apartment": { el: "Serviced apartment", en: "Serviced apartment" },
  };
  return map[key] ?? { el: key, en: key };
}

export function checkInMethodLabel(key: string): Localized<string> {
  const map: Record<string, Localized<string>> = {
    self: { el: "Self check-in", en: "Self check-in" },
    keybox: { el: "Θυρίδα κλειδιών", en: "Key box" },
    host: { el: "Υποδοχή από οικοδεσπότη", en: "Host greeting" },
    reception: { el: "Ρεσεψιόν", en: "Reception" },
  };
  return map[key] ?? { el: key, en: key };
}

export function serviceTypeLabel(key: string): Localized<string> {
  const map: Record<string, Localized<string>> = {
    transfer: { el: "Μεταφορά / Transfer", en: "Transfer" },
    taxi: { el: "Ταξί", en: "Taxi" },
    "car-rental": { el: "Ενοικίαση αυτοκινήτου", en: "Car rental" },
    cleaning: { el: "Καθαρισμός", en: "Cleaning" },
    plumber: { el: "Υδραυλικός", en: "Plumber" },
    electrician: { el: "Ηλεκτρολόγος", en: "Electrician" },
    photographer: { el: "Φωτογράφος", en: "Photographer" },
    "tour-guide": { el: "Ξεναγός", en: "Tour guide" },
    babysitting: { el: "Φύλαξη παιδιών", en: "Babysitting" },
    laundry: { el: "Πλυντήριο / Καθαριστήριο", en: "Laundry" },
    beauty: { el: "Ομορφιά & ευεξία", en: "Beauty & wellness" },
    other: { el: "Άλλη υπηρεσία", en: "Other service" },
  };
  return map[key] ?? { el: key, en: key };
}

export function priceModelLabel(key: string): Localized<string> {
  const map: Record<string, Localized<string>> = {
    fixed: { el: "σταθερή τιμή", en: "fixed price" },
    "per-trip": { el: "ανά διαδρομή", en: "per trip" },
    "per-hour": { el: "ανά ώρα", en: "per hour" },
    "per-day": { el: "ανά ημέρα", en: "per day" },
    "per-person": { el: "ανά άτομο", en: "per person" },
    quote: { el: "κατόπιν προσφοράς", en: "on request" },
  };
  return map[key] ?? { el: key, en: key };
}

export function languageLabel(code: string, locale: Locale): string {
  const names: Record<Locale, Record<string, string>> = {
    el: { el: "Ελληνικά", en: "Αγγλικά", de: "Γερμανικά", fr: "Γαλλικά", it: "Ιταλικά", ru: "Ρωσικά", tr: "Τουρκικά", bg: "Βουλγαρικά", sr: "Σερβικά", ro: "Ρουμανικά" },
    en: { el: "Greek", en: "English", de: "German", fr: "French", it: "Italian", ru: "Russian", tr: "Turkish", bg: "Bulgarian", sr: "Serbian", ro: "Romanian" },
  };
  return names[locale][code] ?? code.toUpperCase();
}
