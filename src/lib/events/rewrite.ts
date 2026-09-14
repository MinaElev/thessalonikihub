import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { jsonSchemaOutputFormat } from "@anthropic-ai/sdk/helpers/json-schema";

/**
 * Rewriting an imported event in our own words.
 *
 * Feeds hand over a truncated excerpt of someone else's article. Publishing it
 * verbatim is why every imported event sat noindex: it is not our text. This
 * turns the same facts into original Greek and English prose.
 *
 * The hard rule is the one this whole site runs on — never invent anything
 * about a real business or event. The model is told to work only from the
 * excerpt and to set `confident: false` rather than fill a gap, and anything
 * not confident stays in the moderation queue instead of going live.
 *
 * Disabled by simply not setting ANTHROPIC_API_KEY: imports then behave as
 * they did before, arriving as PENDING for a human to write.
 */

export const isRewriterConfigured = Boolean(process.env.ANTHROPIC_API_KEY);

const EVENT_TYPES = [
  "concert",
  "theatre",
  "dance",
  "festival",
  "exhibition",
  "screening",
  "talk",
  "workshop",
  "sport",
  "market",
  "family",
  "other",
] as const;

/**
 * Described as JSON Schema rather than Zod: the SDK's Zod helper targets Zod 4
 * and this project is on Zod 3, so the schema is written out directly. The
 * field descriptions are part of the prompt — the model reads them.
 */
const REWRITE_SCHEMA = {
  type: "object",
  properties: {
    nameEl: { type: "string", description: "Τίτλος στα ελληνικά, δικός μας — όχι αντιγραφή της πηγής" },
    nameEn: { type: "string", description: "The same title in English" },
    summaryEl: { type: "string", description: "Μία πρόταση, έως 160 χαρακτήρες" },
    summaryEn: { type: "string", description: "One sentence, up to 160 characters" },
    descriptionEl: {
      type: "string",
      description: "2-4 σύντομες παράγραφοι, χωρισμένες με κενή γραμμή",
    },
    descriptionEn: { type: "string", description: "The same, in English" },
    type: { type: "string", enum: EVENT_TYPES as unknown as string[] },
    tags: {
      type: "array",
      items: { type: "string" },
      description: "2-4 ελληνικές ετικέτες μιας-δύο λέξεων",
    },
    confident: {
      type: "boolean",
      description:
        "false if the excerpt is too thin, ambiguous or truncated to describe honestly",
    },
    note: {
      type: "string",
      description: "If not confident, what is missing. Otherwise an empty string.",
    },
  },
  required: [
    "nameEl",
    "nameEn",
    "summaryEl",
    "summaryEn",
    "descriptionEl",
    "descriptionEn",
    "type",
    "tags",
    "confident",
    "note",
  ],
  additionalProperties: false,
} as const;

export interface EventRewrite {
  nameEl: string;
  nameEn: string;
  summaryEl: string;
  summaryEn: string;
  descriptionEl: string;
  descriptionEn: string;
  type: string;
  tags: string[];
  confident: boolean;
  note: string;
}

const SYSTEM = `Γράφεις για το ThessalonikiHub, έναν οδηγό πόλης για τη Θεσσαλονίκη.

Σου δίνεται ένα απόσπασμα από ξένη ιστοσελίδα, συχνά κομμένο στη μέση. Η δουλειά σου
είναι να ξαναγράψεις το ίδιο περιεχόμενο με δικά μας λόγια, σε ελληνικά και αγγλικά.

ΑΠΟΛΥΤΟΙ ΚΑΝΟΝΕΣ

1. Μην επινοήσεις ΤΙΠΟΤΑ. Καμία ώρα, τιμή, διεύθυνση, όνομα καλλιτέχνη, διάρκεια ή
   λεπτομέρεια που δεν υπάρχει στο απόσπασμα. Αν λείπει, απλώς μην το αναφέρεις.
2. Μην αντιγράψεις φράσεις. Ξαναδιατύπωσε. Το κείμενο πρέπει να είναι δικό μας.
3. Μην προσθέσεις διαφημιστικό ύφος («μια ανεπανάληπτη βραδιά», «μαγικές στιγμές»).
   Γράψε νηφάλια και συγκεκριμένα, όπως ένας καλός οδηγός πόλης.
4. Γενικές πληροφορίες για γνωστά μνημεία και χώρους της Θεσσαλονίκης που ισχύουν
   αντικειμενικά επιτρέπονται, αν προσθέτουν κάτι χρήσιμο στον επισκέπτη.
5. Αν το απόσπασμα είναι πολύ φτωχό ή κομμένο ώστε να μην μπορείς να γράψεις κάτι
   ειλικρινές, βάλε confident: false και εξήγησε στο note. Αυτό ΔΕΝ είναι αποτυχία —
   είναι η σωστή απάντηση. Μην γεμίσεις τα κενά με μπαλώματα.
6. Ο τίτλος να είναι καθαρός και περιγραφικός, όχι αντιγραφή του τίτλου της πηγής.`;

export interface RewriteInput {
  sourceTitle: string;
  sourceText: string;
  /** ISO date, so the model can say "Saturday" without computing it. */
  dateLabel: string;
  venue: string | null;
  startTime: string | null;
  price: string | null;
}

let client: Anthropic | null = null;

/**
 * Returns null when the rewriter is off, the model declines, or the result is
 * not confident. Every null means "leave it for a human", never "publish it
 * anyway".
 */
export async function rewriteEvent(input: RewriteInput): Promise<EventRewrite | null> {
  if (!isRewriterConfigured) return null;
  client ??= new Anthropic();

  const facts = [
    `Τίτλος πηγής: ${input.sourceTitle}`,
    `Ημερομηνία: ${input.dateLabel}`,
    input.venue ? `Χώρος (εξαγμένος με κανόνες, αξιόπιστος): ${input.venue}` : null,
    input.startTime ? `Ώρα έναρξης (εξαγμένη με κανόνες, αξιόπιστη): ${input.startTime}` : null,
    input.price ? `Τιμή (εξαγμένη με κανόνες, αξιόπιστη): ${input.price}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 16000,
      system: SYSTEM,
      // Adaptive thinking at medium effort: the judgement here is "is this
      // excerpt enough to write from", which benefits from reasoning, but the
      // writing itself is short and the job runs in bulk.
      thinking: { type: "adaptive" },
      output_config: {
        effort: "medium",
        format: jsonSchemaOutputFormat(REWRITE_SCHEMA),
      },
      messages: [
        {
          role: "user",
          content: `${facts}\n\nΑπόσπασμα από την πηγή:\n"""\n${input.sourceText}\n"""`,
        },
      ],
    });

    // A refusal is close to inconceivable for a listings rewrite, but it would
    // arrive as a 200 with no parsed output — treat it like any other reason to
    // leave the event for a human rather than special-casing a fallback model.
    if (response.stop_reason === "refusal") return null;

    const parsed = response.parsed_output as EventRewrite | null;
    if (!parsed) return null;
    if (!parsed.confident) {
      console.warn(`rewriteEvent not confident for "${input.sourceTitle}": ${parsed.note}`);
      return null;
    }
    // A model that returns an empty body has not done the job either.
    if (!parsed.nameEl.trim() || !parsed.descriptionEl.trim()) return null;

    return parsed;
  } catch (e) {
    // Never fail an import over this. The event still lands, unrewritten.
    console.error("rewriteEvent failed:", e);
    return null;
  }
}
