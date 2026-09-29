import type { Localized } from "@/lib/types";

/**
 * What a listing is, in both languages.
 *
 * `Place.type` is a slug — "landmark", "taverna", "cocktail-bar" — and it is
 * shown to readers in the filter chips on every listing page. Those chips
 * were printing the slug itself, so a Greek visitor browsing the monuments
 * was offered "landmark", "church", "museum" and "archaeological".
 *
 * One table, used by both the filters and the submission form, so the word a
 * business picks when it submits is the word a reader is offered when they
 * filter. Keys are never renamed once published: they are stored on rows in
 * the database and written into the content files.
 */
export const placeTypes: Record<string, Localized<string>> = {
  // Monuments and sights (DISCOVER).
  landmark: { el: "Αξιοθέατο", en: "Landmark" },
  church: { el: "Εκκλησία", en: "Church" },
  monastery: { el: "Μονή", en: "Monastery" },
  museum: { el: "Μουσείο", en: "Museum" },
  archaeological: { el: "Αρχαιολογικός χώρος", en: "Archaeological site" },
  viewpoint: { el: "Θέα", en: "Viewpoint" },
  square: { el: "Πλατεία", en: "Square" },
  park: { el: "Πάρκο", en: "Park" },

  // Food.
  taverna: { el: "Ταβέρνα", en: "Taverna" },
  mezedopoleio: { el: "Μεζεδοπωλείο", en: "Mezedopoleio" },
  tsipouradiko: { el: "Τσιπουράδικο", en: "Tsipouradiko" },
  ouzeri: { el: "Ουζερί", en: "Ouzeri" },
  psarotaverna: { el: "Ψαροταβέρνα", en: "Fish taverna" },
  seafood: { el: "Θαλασσινά", en: "Seafood" },
  restaurant: { el: "Εστιατόριο", en: "Restaurant" },
  psistaria: { el: "Ψησταριά", en: "Grill house" },
  souvlaki: { el: "Σουβλατζίδικο", en: "Souvlaki" },
  bougatsadiko: { el: "Μπουγατσάδικο", en: "Bougatsa shop" },
  bakery: { el: "Φούρνος / Αρτοποιείο", en: "Bakery" },
  patisserie: { el: "Ζαχαροπλαστείο", en: "Patisserie" },
  brunch: { el: "Brunch", en: "Brunch" },
  cafe: { el: "Καφέ", en: "Café" },
  "street-food": { el: "Street food", en: "Street food" },
  pizzeria: { el: "Πιτσαρία", en: "Pizzeria" },
  ethnic: { el: "Εθνική κουζίνα", en: "World cuisine" },
  vegan: { el: "Vegan / χορτοφαγικό", en: "Vegan / vegetarian" },
  "fine-dining": { el: "Fine dining", en: "Fine dining" },

  // Drink.
  bar: { el: "Μπαρ", en: "Bar" },
  "cocktail-bar": { el: "Cocktail bar", en: "Cocktail bar" },
  "rooftop-bar": { el: "Rooftop bar", en: "Rooftop bar" },
  "wine-bar": { el: "Wine bar", en: "Wine bar" },
  brewery: { el: "Μπυραρία", en: "Brewery / beer bar" },
  "cafe-bar": { el: "Καφέ-μπαρ", en: "Café-bar" },
  "live-venue": { el: "Μαγαζί με ζωντανή μουσική", en: "Live music venue" },
  club: { el: "Club", en: "Club" },
  "beach-bar": { el: "Beach bar", en: "Beach bar" },

  // Experiences.
  "guided-tour": { el: "Ξενάγηση", en: "Guided tour" },
  "walking-tour": { el: "Περιπατητική ξενάγηση", en: "Walking tour" },
  "food-tour": { el: "Food tour", en: "Food tour" },
  "boat-trip": { el: "Βόλτα με σκάφος", en: "Boat trip" },
  "cooking-class": { el: "Μάθημα μαγειρικής", en: "Cooking class" },
  "wine-tasting": { el: "Οινογνωσία", en: "Wine tasting" },
  workshop: { el: "Εργαστήριο", en: "Workshop" },
  "bike-tour": { el: "Ποδηλατική βόλτα", en: "Bike tour" },
  "photo-tour": { el: "Φωτογραφικός περίπατος", en: "Photo walk" },
  "day-trip": { el: "Ημερήσια εκδρομή", en: "Day trip" },

  // Events.
  concert: { el: "Συναυλία", en: "Concert" },
  theatre: { el: "Θέατρο", en: "Theatre" },
  festival: { el: "Φεστιβάλ", en: "Festival" },
  exhibition: { el: "Έκθεση", en: "Exhibition" },
  // These four keys are also the category-cover filenames in event-cover.ts:
  // an event whose type is not one it knows falls back to the generic cover.
  screening: { el: "Προβολή ταινίας", en: "Film screening" },
  dance: { el: "Χορός / παράσταση", en: "Dance / performance" },
  sport: { el: "Αθλητικό", en: "Sports" },
  family: { el: "Παιδικό / οικογενειακό", en: "For children and families" },
  talk: { el: "Ομιλία / σεμινάριο", en: "Talk / seminar" },
  market: { el: "Bazaar / αγορά", en: "Market / bazaar" },
  party: { el: "Πάρτι / clubbing", en: "Party / clubbing" },

  // Accommodation. `type` falls back to `propertyType` on submission.
  apartment: { el: "Διαμέρισμα", en: "Apartment" },
  studio: { el: "Studio", en: "Studio" },
  villa: { el: "Βίλα", en: "Villa" },
  maisonette: { el: "Μεζονέτα", en: "Maisonette" },
  house: { el: "Σπίτι", en: "House" },
  loft: { el: "Loft", en: "Loft" },
  guesthouse: { el: "Ξενώνας", en: "Guesthouse" },
  hotel: { el: "Ξενοδοχείο", en: "Hotel" },

  // Services. `type` falls back to `serviceType` on submission.
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

  other: { el: "Άλλο", en: "Other" },
  listing: { el: "Καταχώρηση", en: "Listing" },
};

/**
 * The label for a type, falling back to the key itself.
 *
 * An unknown key is a content file using a word this table has not learned
 * yet. Showing the raw slug is ugly but truthful, and better than hiding the
 * filter — which would silently make listings unreachable.
 */
export function placeTypeLabel(key: string): Localized<string> {
  return placeTypes[key] ?? { el: key, en: key };
}

/** The `{ key, label }` shape the submission form's dropdowns want. */
export function typeOptions(
  keys: readonly string[],
): { key: string; label: Localized<string> }[] {
  return keys.map((key) => ({ key, label: placeTypeLabel(key) }));
}
