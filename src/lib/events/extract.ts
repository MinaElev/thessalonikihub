/**
 * Pulling structured facts out of an imported event's prose.
 *
 * Deliberately rules, not a model. A start time and a ticket price are facts a
 * reader will act on — turning up at the wrong hour or expecting a free door —
 * and a rule either matches the text or it does not. A model that is usually
 * right is the wrong tool for a field where being occasionally wrong is the
 * whole failure.
 *
 * Everything here returns null when the text does not say. The feeds we import
 * write times as "Ώρα: 19:00", "από τις 19:00 έως τις 21:30" or "Έναρξη
 * Αγώνων: 13:00"; anything else stays unknown rather than guessed.
 */

export interface ExtractedTimes {
  /** "HH:MM" in Thessaloniki local time, or null. */
  start: string | null;
  end: string | null;
}

const HHMM = "([0-2]?\\d)[:.]([0-5]\\d)";

/**
 * Ordered by how explicit the phrasing is. A bare time anywhere in the text is
 * never taken — a price, a date or a distance would match just as well.
 */
const RANGE_PATTERNS = [
  // "από τις 19:00 έως τις 21:30"
  new RegExp(`από\\s+τις\\s+${HHMM}\\s+(?:έως|ως|μέχρι)\\s+τις\\s+${HHMM}`, "i"),
  // "Ώρα: 19:00 – 19:46"  (any dash)
  new RegExp(`Ώρα\\s*:?\\s*${HHMM}\\s*[–—-]\\s*${HHMM}`, "i"),
  // "19:00 - 21:30"
  new RegExp(`${HHMM}\\s*[–—-]\\s*${HHMM}\\s*(?:$|[^\\d])`, "i"),
];

const START_PATTERNS = [
  // "Ώρα: 19:00" / "Ώρα έναρξης 20:00"
  new RegExp(`Ώρα\\s*(?:έναρξης)?\\s*:?\\s*${HHMM}`, "i"),
  // "Έναρξη: 13:00" / "Έναρξη Αγώνων: 13:00"
  new RegExp(`Έναρξη[^\\n:]{0,24}:?\\s*${HHMM}`, "i"),
  // "στις 20:00" / "στις 9:30"
  new RegExp(`στις\\s+${HHMM}`, "i"),
];

const pad = (h: string, m: string) => `${h.padStart(2, "0")}:${m}`;

/** A time only counts if the clock is real; "25:00" is a typo, not an hour. */
function valid(h: string, m: string): boolean {
  const hour = Number(h);
  return hour >= 0 && hour <= 23 && Number(m) <= 59;
}

export function extractTimes(text: string): ExtractedTimes {
  if (!text) return { start: null, end: null };

  for (const pattern of RANGE_PATTERNS) {
    const m = pattern.exec(text);
    if (m && valid(m[1], m[2]) && valid(m[3], m[4])) {
      return { start: pad(m[1], m[2]), end: pad(m[3], m[4]) };
    }
  }

  for (const pattern of START_PATTERNS) {
    const m = pattern.exec(text);
    if (m && valid(m[1], m[2])) return { start: pad(m[1], m[2]), end: null };
  }

  return { start: null, end: null };
}

export interface ExtractedPrice {
  el: string;
  en: string;
}

/**
 * Only the two statements a feed makes unambiguously: free entry, or a figure
 * in euro. "Τιμές από 10€" and a range are left alone — turning a starting
 * price into "the price" misleads, and the source page is one click away.
 */
export function extractPrice(text: string): ExtractedPrice | null {
  if (!text) return null;

  if (/(?:είσοδος\s+ελεύθερη|ελεύθερη\s+είσοδος|δωρεάν\s+είσοδος|χωρίς\s+εισιτήριο)/i.test(text)) {
    return { el: "Είσοδος ελεύθερη", en: "Free entry" };
  }
  if (/(?:με\s+)?δωρεάν\s+(?:συμμετοχή|είσοδο)/i.test(text)) {
    return { el: "Δωρεάν συμμετοχή", en: "Free to take part" };
  }

  // "Εισιτήριο: 12€" / "Τιμή εισιτηρίου 12 ευρώ"
  const ticket = /(?:εισιτήρι\w*|τιμή)[^\d\n]{0,20}?(\d{1,3})(?:[,.](\d{2}))?\s*(?:€|ευρώ)/i.exec(text);
  if (ticket) {
    const amount = ticket[2] ? `${ticket[1]},${ticket[2]}` : ticket[1];
    return { el: `Εισιτήριο ${amount}€`, en: `Ticket €${amount}` };
  }

  return null;
}

/**
 * The venue, when the prose names it in a recognisable frame.
 *
 * Returns the phrase as written. Placing it on a map is `locateVenue`'s job,
 * and it only succeeds for somewhere this site has already verified.
 */
export function extractVenueName(text: string): string | null {
  if (!text) return null;

  const patterns = [
    // "Χώρος: Αίθουσα Μανόλης Ανδρόνικος"
    /Χώρος\s*:?\s*([^\n.]{4,70})/i,
    // "στο Θέατρο Κήπου", "στην Αίθουσα Φίλων Μουσικής". Capped at three words
    // after the keyword and stopped at the first word that starts a new clause:
    // Greek prose runs on without punctuation, so an open-ended capture happily
    // swallows "Θέατρο Κήπου έρχεται για άλλη μια χρονιά στην πόλη".
    new RegExp(
      `(?:στο|στη|στην)\\s+((?:Θέατρο|Μέγαρο|Μουσείο|Αίθουσα|Κέντρο|Γήπεδο|Πάρκο|Κήπο[ς]?|Μονή|Πλατεία)` +
        `(?:\\s+[^\\s,.;:\n]+){1,3})`,
      "i",
    ),
  ];

  // Words that mean the venue name has ended and the sentence has moved on.
  const STOP = new Set([
    "ερχεται", "ερχονται", "θα", "για", "στην", "στον", "στη", "στο", "της",
    "του", "των", "με", "και", "που", "παρουσιαζεται", "παρουσιαζονται",
    "φιλοξενει", "διοργανωνει", "επιστρεφει", "ανεβαινει", "ξεκινα",
    "εισοδοσ", "ωρα", "τιμη", "διοργανωση", "πρεμιερα",
  ]);
  const bare = (w: string) =>
    w.toLowerCase().replace(/[άέήίόύώϊϋΐΰ]/g, (c) => "αεηιουωιυιυ"["άέήίόύώϊϋΐΰ".indexOf(c)]).replace(/ς/g, "σ");

  for (const pattern of patterns) {
    const m = pattern.exec(text);
    if (!m) continue;

    const words = m[1].replace(/\s+/g, " ").trim().split(" ");
    // Keep the leading keyword plus everything up to the first stop word.
    const kept: string[] = [];
    for (const [i, w] of words.entries()) {
      if (i > 0 && STOP.has(bare(w))) break;
      kept.push(w);
    }
    let found = kept.join(" ").replace(/[,;:]+$/, "").trim();
    // Strip a dangling quote only when it has no partner — "Πάρκο «Ατλαντίδα»"
    // is the venue's real name and must keep both marks.
    if (found.endsWith("»") && !found.includes("«")) found = found.slice(0, -1).trim();
    if (found.startsWith("«") && !found.includes("»")) found = `${found}»`;
    // A keyword on its own ("στο Θέατρο") names nothing.
    if (kept.length >= 2 && found.length >= 6) return found;
  }
  return null;
}
