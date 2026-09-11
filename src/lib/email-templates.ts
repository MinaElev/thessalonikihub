import { site } from "@/lib/site";
import type { Mail } from "@/lib/email";

/**
 * The three emails the site sends.
 *
 * Greek, because submitters write Greek — the submission form says so and does
 * not offer an English field. Profile carries no language preference to switch
 * on, and guessing from the browser of whoever happens to be moderating would
 * be worse than picking one.
 *
 * Plain text on purpose: these are short, they render identically everywhere,
 * and a text-only transactional email is far less likely to be filtered than
 * an HTML one sent from a Gmail address.
 */

const base = site.url;

export function listingApproved(to: string, name: string, url: string): Mail {
  return {
    to,
    subject: `Η καταχώρησή σου δημοσιεύτηκε: ${name}`,
    text: `Γεια σου,

Η καταχώρηση «${name}» εγκρίθηκε και είναι πλέον ζωντανή στο ThessalonikiHub:

${url}

Μπορείς να συμπληρώσεις ωράριο, στοιχεία επικοινωνίας και προσφορές, και να
δεις πόσοι την άνοιξαν και πόσοι επικοινώνησαν μαζί σου, από τον πίνακά σου:

${base}/dashboard

Καλή συνέχεια,
ThessalonikiHub
`,
  };
}

export function listingRejected(to: string, name: string, note: string | null): Mail {
  const reason = note
    ? `Ο λόγος:

${note}
`
    : `Δεν καταγράφηκε συγκεκριμένος λόγος. Αν θέλεις διευκρινίσεις, απάντησε σε
αυτό το email.
`;

  return {
    to,
    subject: `Η καταχώρηση «${name}» χρειάζεται διορθώσεις`,
    text: `Γεια σου,

Η καταχώρηση «${name}» δεν εγκρίθηκε ως έχει.

${reason}
Μπορείς να τη διορθώσεις και να την υποβάλεις ξανά για έλεγχο από τον πίνακά σου:

${base}/dashboard

ThessalonikiHub
`,
  };
}

export function newSubmission(to: string, name: string, kind: string): Mail {
  return {
    to,
    subject: `Νέα καταχώρηση προς έλεγχο: ${name}`,
    text: `Νέα υποβολή στο ThessalonikiHub.

Καταχώρηση: ${name}
Κατηγορία:  ${kind}

Έλεγχος και έγκριση:
${base}/admin
`,
  };
}
