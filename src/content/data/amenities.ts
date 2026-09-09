import type { Localized } from "@/lib/types";
import type { Locale } from "@/i18n/routing";

/**
 * Canonical amenity catalog, grouped and localized.
 *
 * `Place.amenities` is a flat list of these keys; this catalog gives each key a
 * group and a bilingual label so amenities render grouped on listing pages and
 * the submission form can offer them as checkboxes.
 */
export interface AmenityGroup {
  key: string;
  label: Localized<string>;
  amenities: { key: string; label: Localized<string> }[];
}

export const amenityGroups: AmenityGroup[] = [
  {
    key: "general",
    label: { el: "Γενικά", en: "General" },
    amenities: [
      { key: "wifi", label: { el: "Wi-Fi", en: "Wi-Fi" } },
      { key: "air-conditioning", label: { el: "Κλιματισμός", en: "Air conditioning" } },
      { key: "heating", label: { el: "Θέρμανση", en: "Heating" } },
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
    amenities: [
      { key: "crib", label: { el: "Κούνια μωρού", en: "Baby crib" } },
      { key: "high-chair", label: { el: "Καρέκλα φαγητού", en: "High chair" } },
    ],
  },
  {
    key: "safety",
    label: { el: "Ασφάλεια", en: "Safety" },
    amenities: [
      { key: "smoke-alarm", label: { el: "Ανιχνευτής καπνού", en: "Smoke alarm" } },
      { key: "fire-extinguisher", label: { el: "Πυροσβεστήρας", en: "Fire extinguisher" } },
      { key: "first-aid", label: { el: "Κιτ πρώτων βοηθειών", en: "First-aid kit" } },
      { key: "safe", label: { el: "Χρηματοκιβώτιο", en: "Safe" } },
    ],
  },
];

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
