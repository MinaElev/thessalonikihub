/**
 * Stable URL fragments for the headings inside a guide.
 *
 * A fragment can legally hold Greek — browsers percent-encode it — but the
 * result is unreadable the moment anyone copies the link into a message,
 * which is exactly when a link to a section gets used. So the Greek is
 * transliterated.
 *
 * These ids end up in shared links, so the mapping must not drift: changing
 * it silently breaks every link anyone has already sent. Add to it rather
 * than rewriting it.
 */

/** Accents folded first, so "ιστορία" and "ιστορια" produce one id. */
const FOLD: Record<string, string> = {
  ά: "α", έ: "ε", ή: "η", ί: "ι", ό: "ο", ύ: "υ", ώ: "ω",
  ϊ: "ι", ϋ: "υ", ΐ: "ι", ΰ: "υ", ς: "σ",
};

/**
 * Digraphs first: Greek spells several single sounds with two letters, and
 * letter-by-letter would give "μπουγάτσα" as "mpougatsa".
 */
const DIGRAPHS: [string, string][] = [
  ["ου", "ou"], ["ευ", "ev"], ["αυ", "av"],
  ["μπ", "b"], ["ντ", "nt"], ["γκ", "gk"], ["γγ", "ng"],
  ["τσ", "ts"], ["τζ", "tz"],
];

const LETTERS: Record<string, string> = {
  α: "a", β: "v", γ: "g", δ: "d", ε: "e", ζ: "z", η: "i", θ: "th",
  ι: "i", κ: "k", λ: "l", μ: "m", ν: "n", ξ: "x", ο: "o", π: "p",
  ρ: "r", σ: "s", τ: "t", υ: "y", φ: "f", χ: "ch", ψ: "ps", ω: "o",
};

export function headingSlug(text: string): string {
  let s = "";
  for (const ch of text.toLowerCase()) s += FOLD[ch] ?? ch;

  for (const [from, to] of DIGRAPHS) s = s.split(from).join(to);

  let out = "";
  for (const ch of s) out += LETTERS[ch] ?? ch;

  return (
    out
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      // A heading can be long; an id does not need to be.
      .slice(0, 60)
      .replace(/-+$/g, "") || "section"
  );
}

/**
 * The `## ` headings of a markdown body, in order.
 *
 * Read from the source text rather than the rendered DOM so the contents can
 * be built on the server, where there is no DOM — and so the list and the
 * headings themselves are generated from one function and cannot disagree.
 * Fenced code blocks are skipped: a `## ` inside one is a comment, not a
 * heading.
 */
export function markdownHeadings(
  body: string,
): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = [];
  const seen = new Set<string>();
  let inFence = false;

  for (const line of body.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    // Headings are written in markdown too — strip the emphasis and links so
    // the contents list reads as plain text.
    const text = m[1]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    if (!text) continue;
    const id = headingSlug(text);
    /*
     * The id is the slug and nothing else — no occurrence counter — so that
     * this function and the renderer cannot disagree about which heading got
     * which id. A counter would have to be kept in step across two separate
     * passes, one of which React may run twice in development.
     *
     * That is only safe while no single body repeats a heading, which none of
     * the 719 in the content files does. If one ever did, the second would
     * land on the first's anchor; listing it once here keeps the contents
     * honest about that.
     */
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({ id, text });
  }
  return out;
}
