/**
 * Generates the HTML for the three emails Supabase sends on our behalf.
 *
 * Supabase owns sign-in mail — confirm signup, one-time code, password reset —
 * and its templates live in the dashboard, not in this repository. Writing
 * them by hand would mean a second, drifting design. These are rendered with
 * the same layout as every other email the site sends, with Supabase's own
 * placeholders left intact, so the two stay identical.
 *
 *   npx tsx scripts/build-supabase-templates.ts
 *
 * Then paste each file into Supabase → Authentication → Email Templates.
 * {{ .Token }} is the six-digit code; {{ .ConfirmationURL }} is the link.
 *
 * Nothing here is deployed — these files exist to be copied.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { renderHtml, type EmailDoc } from "../src/lib/email-layout";

const OUT = "docs/supabase-email-templates";

/** Supabase substitutes this server-side; it must survive escaping untouched. */
const TOKEN = "{{ .Token }}";
const CONFIRM_URL = "{{ .ConfirmationURL }}";

const docs: Record<string, { file: string; subject: string; doc: EmailDoc }> = {
  signup: {
    file: "01-confirm-signup.html",
    subject: "Ο κωδικός επιβεβαίωσης: {{ .Token }}",
    doc: {
      preheader: "Γράψε τον εξαψήφιο κωδικό για να ολοκληρώσεις την εγγραφή.",
      heading: "Επιβεβαίωσε το email σου",
      blocks: [
        {
          kind: "text",
          text: "Καλώς ήρθες. Γράψε αυτόν τον κωδικό στη σελίδα σύνδεσης για να ολοκληρωθεί η εγγραφή σου.",
        },
        { kind: "code", value: TOKEN, caption: "Ισχύει για μία ώρα." },
        {
          kind: "callout",
          tone: "neutral",
          title: "Δεν έκανες εσύ εγγραφή;",
          text: "Αγνόησε αυτό το email. Χωρίς τον κωδικό δεν δημιουργείται λογαριασμός και η διεύθυνσή σου δεν χρησιμοποιείται για τίποτα.",
        },
      ],
      footnote:
        "Έλαβες αυτό το email επειδή αυτή η διεύθυνση χρησιμοποιήθηκε για εγγραφή στο ThessalonikiHub.",
    },
  },

  magic: {
    file: "02-one-time-code.html",
    subject: "Ο κωδικός σύνδεσης: {{ .Token }}",
    doc: {
      preheader: "Ο εξαψήφιος κωδικός σύνδεσής σου.",
      heading: "Ο κωδικός σύνδεσής σου",
      blocks: [
        { kind: "text", text: "Γράψε τον στη σελίδα σύνδεσης για να μπεις." },
        { kind: "code", value: TOKEN, caption: "Ισχύει για μία ώρα, μία φορά." },
        {
          kind: "callout",
          tone: "warn",
          title: "Μην τον προωθήσεις σε κανέναν",
          text: "Όποιος έχει αυτόν τον κωδικό μπορεί να μπει στον λογαριασμό σου. Δεν θα σου τον ζητήσουμε ποτέ — ούτε με email, ούτε με τηλέφωνο.",
        },
        {
          kind: "text",
          text: "Αν δεν ζήτησες εσύ σύνδεση, αγνόησέ το. Κανείς δεν μπήκε στον λογαριασμό σου.",
        },
      ],
    },
  },

  recovery: {
    file: "03-reset-password.html",
    subject: "Επαναφορά κωδικού πρόσβασης",
    doc: {
      preheader: "Σύνδεσμος για να ορίσεις νέο κωδικό.",
      heading: "Όρισε νέο κωδικό πρόσβασης",
      blocks: [
        {
          kind: "text",
          text: "Ζητήθηκε επαναφορά κωδικού για τον λογαριασμό σου. Πάτα το κουμπί για να ορίσεις καινούργιο.",
        },
        { kind: "button", label: "Όρισε νέο κωδικό", href: CONFIRM_URL },
        {
          kind: "text",
          text: "Ο σύνδεσμος ισχύει για μία ώρα και χρησιμοποιείται μία φορά.",
        },
        {
          kind: "callout",
          tone: "neutral",
          title: "Δεν το ζήτησες;",
          text: "Αγνόησε αυτό το email. Ο κωδικός σου δεν αλλάζει αν δεν ανοίξεις τον σύνδεσμο.",
        },
      ],
    },
  },
};

mkdirSync(OUT, { recursive: true });

const index: string[] = [
  "# Πρότυπα email του Supabase",
  "",
  "Δημιουργούνται από `scripts/build-supabase-templates.ts` με το ίδιο layout",
  "που χρησιμοποιούν και τα email του site, ώστε να μοιάζουν μεταξύ τους.",
  "",
  "Αντιγραφή σε: **Supabase → Authentication → Email Templates**.",
  "",
  "| Πρότυπο στο Supabase | Αρχείο | Θέμα |",
  "| --- | --- | --- |",
];

const NAMES: Record<string, string> = {
  signup: "Confirm signup",
  magic: "Magic Link",
  recovery: "Reset Password",
};

for (const [key, { file, subject, doc }] of Object.entries(docs)) {
  // renderHtml escapes its inputs; Supabase's placeholders must come through
  // as written, so they are restored after rendering.
  const html = renderHtml(doc)
    .replace(/\{\{ \.Token \}\}/g, "{{ .Token }}")
    .replace(/&#123;&#123;/g, "{{")
    .replace(/\{\{ \.ConfirmationURL \}\}/g, "{{ .ConfirmationURL }}");
  writeFileSync(`${OUT}/${file}`, html, "utf8");
  index.push(`| ${NAMES[key]} | \`${file}\` | \`${subject}\` |`);
  console.log(`  ${file.padEnd(26)} ${subject}`);
}

index.push(
  "",
  "Για να φεύγουν από το Gmail και όχι από τον server του Supabase, πρέπει να",
  "είναι ενεργό το **Custom SMTP** στο ίδιο dashboard.",
  "",
);
writeFileSync(`${OUT}/README.md`, index.join("\n"), "utf8");
console.log(`\n  wrote ${Object.keys(docs).length} templates to ${OUT}/`);
