import { getFilePlaces } from "@/lib/repo";
import { areas } from "@/content/data/areas";
import { pick } from "@/lib/types";

/**
 * Finding where an imported event actually happens.
 *
 * The feeds name a venue inside the prose and nowhere else — every event
 * imported so far arrived with an empty `venue` field and no coordinates, so
 * none of them could appear on a map.
 *
 * Coordinates come only from places this site has already verified: the
 * attractions and listings in the content files, each with a location someone
 * checked. Nothing here invents a position. A venue we cannot recognise keeps
 * a name and no pin, because a wrong pin is worse than no pin — it sends
 * someone to the wrong side of the city.
 */

export interface VenueMatch {
  /** The venue as we will display it. */
  name: string;
  lat: number | null;
  lng: number | null;
  /** Area slug, when the venue sits in one we know. */
  area: string | null;
}

const FOLD: Record<string, string> = {
  ά: "α", έ: "ε", ή: "η", ί: "ι", ό: "ο", ύ: "υ", ώ: "ω",
  ϊ: "ι", ϋ: "υ", ΐ: "ι", ΰ: "υ", ς: "σ",
};

/** Accent- and final-sigma-insensitive, so "Ροτόντα" matches "ροτοντα". */
function fold(text: string): string {
  return text
    .toLowerCase()
    .replace(/[άέήίόύώϊϋΐΰς]/g, (c) => FOLD[c] ?? c)
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Venues that are not listings of ours but are unmistakable in this city, with
 * the area they stand in. No coordinates: the area is a fact we can check on a
 * map ourselves, a precise pin is not, and an approximate pin presented as
 * exact is the kind of invented detail this project does not publish.
 */
interface Landmark {
  /** What to search for, already folded. */
  needle: string;
  /** How to write it when the prose did not give us a cleaner name. */
  display: string;
  area: string;
}

const LANDMARKS: Landmark[] = [
  { needle: "μεγαρο μουσικης", display: "Μέγαρο Μουσικής Θεσσαλονίκης", area: "nea-paralia" },
  { needle: "θεατρο κηπου", display: "Θέατρο Κήπου", area: "center" },
  { needle: "βαφοπουλειο", display: "Βαφοπούλειο Πνευματικό Κέντρο", area: "analipsi" },
  { needle: "eightball", display: "Eightball Club", area: "center" },
  { needle: "θεατρο αμαλια", display: "Θέατρο Αμαλία", area: "center" },
  { needle: "θεατρο αθηναιον", display: "Θέατρο Αθήναιον", area: "center" },
  { needle: "μικρη σκηνη", display: "Μικρή Σκηνή", area: "center" },
  { needle: "μονη λαζαριστων", display: "Μονή Λαζαριστών", area: "stavroupoli" },
  { needle: "γενι τζαμι", display: "Γενί Τζαμί", area: "center" },
];

interface Entry {
  needle: string;
  match: VenueMatch;
}

let cache: Entry[] | null = null;

/** Built once: the site's own places first, then the landmarks above. */
function gazetteer(): Entry[] {
  if (cache) return cache;

  const entries: Entry[] = [];
  const pillars = ["stay", "eat", "drink", "discover", "experiences", "services"] as const;

  for (const pillar of pillars) {
    for (const place of getFilePlaces(pillar)) {
      // Both languages, since a feed may name either.
      for (const locale of ["el", "en"] as const) {
        const name = pick(place.name, locale).trim();
        // Two words minimum: a one-word name like "Soul" matches far too much
        // ordinary prose to be safe.
        if (name.split(/\s+/).length < 2) continue;
        entries.push({
          needle: fold(name),
          match: {
            name: pick(place.name, "el"),
            lat: place.geo.lat,
            lng: place.geo.lng,
            area: place.geo.area ?? null,
          },
        });
      }
    }
  }

  const areaSlugs = new Set(areas.map((a) => a.slug));
  for (const landmark of LANDMARKS) {
    entries.push({
      needle: landmark.needle,
      match: {
        name: landmark.display,
        lat: null,
        lng: null,
        area: areaSlugs.has(landmark.area) ? landmark.area : null,
      },
    });
  }

  // Longest first, so "Αρχαιολογικό Μουσείο Θεσσαλονίκης" wins over "Μουσείο".
  entries.sort((a, b) => b.needle.length - a.needle.length);
  cache = entries;
  return entries;
}

/**
 * Look a venue up by the name an extractor pulled out of the prose.
 *
 * `stated` is what the text called it, and is always what we display — the
 * gazetteer supplies the position, never the wording, so "Αίθουσα Μανόλης
 * Ανδρόνικος" does not silently become "Αρχαιολογικό Μουσείο".
 */
export function locateVenue(stated: string): VenueMatch {
  const name = stated.trim();
  if (!name) return { name: "", lat: null, lng: null, area: null };

  const haystack = fold(name);
  for (const entry of gazetteer()) {
    if (haystack.includes(entry.needle)) {
      return { ...entry.match, name };
    }
  }
  return { name, lat: null, lng: null, area: null };
}

/** Scan a body of text for any venue we recognise. Used when no venue was stated. */
export function findVenueInText(text: string): VenueMatch | null {
  const haystack = fold(text);
  for (const entry of gazetteer()) {
    // A gazetteer entry always carries a display name; the folded needle is a
    // lookup key and must never reach a page.
    if (entry.match.name && haystack.includes(entry.needle)) return { ...entry.match };
  }
  return null;
}
