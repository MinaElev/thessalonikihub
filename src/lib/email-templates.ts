import { site } from "@/lib/site";
import type { Mail } from "@/lib/email";
import { renderHtml, renderText, type EmailDoc } from "@/lib/email-layout";

/**
 * Every email the site sends.
 *
 * Greek throughout, because the submission form asks for Greek and `Profile`
 * carries no language preference to switch on — guessing from the browser of
 * whoever happens to be moderating would be worse than picking one.
 *
 * Each template describes its message as blocks and the layout renders both an
 * HTML and a plain-text version from them, so the two can never disagree.
 */

const base = site.url;

function build(to: string, subject: string, doc: EmailDoc): Mail {
  return { to, subject, text: renderText(doc), html: renderHtml(doc) };
}

/* ------------------------------------------------------------------ *
 * 1. Welcome — sent once, after the account is confirmed.
 * ------------------------------------------------------------------ */

export function welcome(to: string): Mail {
  return build(to, `Καλώς ήρθες στο ${site.name}`, {
    preheader: "Ο λογαριασμός σου είναι έτοιμος. Να τι μπορείς να κάνεις.",
    heading: "Ο λογαριασμός σου είναι έτοιμος",
    blocks: [
      {
        kind: "text",
        text: "Η διεύθυνσή σου επιβεβαιώθηκε και μπαίνεις πλέον κανονικά. Ορίστε τι σου ανοίγει.",
      },
      {
        kind: "facts",
        rows: [
          ["Καταχώρηση επιχείρησης", "Κατάλυμα, εστιατόριο, μπαρ, εμπειρία ή υπηρεσία"],
          ["Εκδηλώσεις", "Ανέβασε τη δική σου εκδήλωση στο ημερολόγιο της πόλης"],
          ["Η λίστα μου", "Αποθήκευσε μέρη και μοιράσου τα με έναν σύνδεσμο"],
          ["Διεκδίκηση", "Αν υπάρχει ήδη σελίδα της επιχείρησής σου, ζήτησέ την"],
        ],
      },
      {
        kind: "text",
        text: "Η καταχώρηση είναι δωρεάν και δεν χρεώνουμε για κατάταξη ή προβολή.",
      },
      { kind: "button", label: "Καταχώρησε την επιχείρησή σου", href: `${base}/submit` },
      { kind: "divider" },
      {
        kind: "callout",
        tone: "neutral",
        title: "Πώς δουλεύει ο έλεγχος",
        text: "Κάθε καταχώρηση περνάει από εμάς πριν δημοσιευθεί. Θα σου στείλουμε email και όταν την παραλάβουμε και όταν βγει στον αέρα — δεν χρειάζεται να ελέγχεις.",
      },
    ],
  });
}

/* ------------------------------------------------------------------ *
 * 2. Submission received — to the person who submitted it.
 * ------------------------------------------------------------------ */

export function submissionReceived(
  to: string,
  name: string,
  kindLabel: string,
): Mail {
  return build(to, `Λάβαμε την καταχώρηση «${name}»`, {
    preheader: "Μπήκε στη σειρά ελέγχου. Δεν χρειάζεται να κάνεις κάτι.",
    heading: "Λάβαμε την καταχώρησή σου",
    blocks: [
      {
        kind: "text",
        text: "Μπήκε στη σειρά για έλεγχο. Δεν χρειάζεται να κάνεις τίποτα άλλο.",
      },
      {
        kind: "facts",
        rows: [
          ["Καταχώρηση", name],
          ["Κατηγορία", kindLabel],
          ["Κατάσταση", "Σε έλεγχο"],
        ],
      },
      {
        kind: "steps",
        items: [
          "Ελέγχουμε τα στοιχεία και συμπληρώνουμε την αγγλική απόδοση.",
          "Αν κάτι λείπει ή χρειάζεται διόρθωση, σου γράφουμε τι ακριβώς.",
          "Μόλις εγκριθεί, σου στέλνουμε τον σύνδεσμο της σελίδας σου.",
        ],
      },
      {
        kind: "callout",
        tone: "neutral",
        title: "Στο μεταξύ",
        text: "Μπορείς να συμπληρώσεις ωράριο λειτουργίας, στοιχεία επικοινωνίας και προσφορές από τον πίνακά σου. Όσο πιο πλήρης είναι η σελίδα, τόσο περισσότερο τη βρίσκει ο κόσμος.",
      },
      { kind: "button", label: "Άνοιξε τον πίνακά μου", href: `${base}/dashboard` },
    ],
  });
}

/* ------------------------------------------------------------------ *
 * 3. Approved.
 * ------------------------------------------------------------------ */

export function listingApproved(to: string, name: string, url: string): Mail {
  return build(to, `Δημοσιεύτηκε: ${name}`, {
    preheader: "Η καταχώρησή σου είναι ζωντανή στο site.",
    heading: "Η καταχώρησή σου δημοσιεύτηκε",
    blocks: [
      { kind: "text", text: `Η «${name}» εγκρίθηκε και είναι πλέον ζωντανή.` },
      { kind: "button", label: "Δες τη σελίδα σου", href: url },
      {
        kind: "text",
        text: "Από τον πίνακά σου βλέπεις πόσοι την άνοιξαν και πόσοι επικοινώνησαν μαζί σου — τηλέφωνο, κράτηση, ιστοσελίδα, οδηγίες χάρτη.",
      },
      {
        kind: "callout",
        tone: "neutral",
        title: "Τρία που αξίζουν πέντε λεπτά",
        text: "· Ωράριο λειτουργίας — είναι από τα πρώτα που ψάχνει ο κόσμος.\n· Φωτογραφίες δικές σου, όχι από αλλού.\n· Μια προσφορά με ημερομηνία λήξης· αποσύρεται μόνη της.",
      },
      { kind: "button", label: "Συμπλήρωσε τα στοιχεία", href: `${base}/dashboard` },
    ],
  });
}

/* ------------------------------------------------------------------ *
 * 4. Rejected, with the reason.
 * ------------------------------------------------------------------ */

export function listingRejected(to: string, name: string, note: string | null): Mail {
  return build(to, `Η καταχώρηση «${name}» χρειάζεται διορθώσεις`, {
    preheader: "Δεν εγκρίθηκε ως έχει — δες τι χρειάζεται.",
    heading: "Χρειάζονται μερικές διορθώσεις",
    blocks: [
      { kind: "text", text: `Η «${name}» δεν εγκρίθηκε ως έχει.` },
      note
        ? { kind: "callout", tone: "warn", title: "Τι χρειάζεται", text: note }
        : {
            kind: "callout",
            tone: "warn",
            title: "Τι χρειάζεται",
            text: "Δεν καταγράφηκε συγκεκριμένος λόγος. Απάντησε σε αυτό το email και θα σου πούμε.",
          },
      {
        kind: "steps",
        items: [
          "Άνοιξε την καταχώρηση από τον πίνακά σου.",
          "Κάνε τις διορθώσεις.",
          "Πάτα «Υπέβαλε ξανά για έλεγχο».",
        ],
      },
      { kind: "button", label: "Διόρθωσε την καταχώρηση", href: `${base}/dashboard` },
      {
        kind: "text",
        text: "Δεν χάθηκε τίποτα από όσα έγραψες — όλα σε περιμένουν εκεί.",
      },
    ],
  });
}

/* ------------------------------------------------------------------ *
 * 5. New submission — to the admin, not the owner.
 * ------------------------------------------------------------------ */

export function newSubmission(to: string, name: string, kindLabel: string): Mail {
  return build(to, `Νέα καταχώρηση προς έλεγχο: ${name}`, {
    preheader: `${name} — ${kindLabel}`,
    heading: "Νέα καταχώρηση προς έλεγχο",
    blocks: [
      {
        kind: "facts",
        rows: [
          ["Καταχώρηση", name],
          ["Κατηγορία", kindLabel],
        ],
      },
      { kind: "button", label: "Άνοιξε τη διαχείριση", href: `${base}/admin` },
    ],
    footnote: "Ειδοποίηση διαχειριστή. Ρυθμίζεται από τη μεταβλητή ADMIN_EMAIL.",
  });
}

/* ------------------------------------------------------------------ *
 * 6. Newsletter double opt-in.
 * ------------------------------------------------------------------ */

export function confirmSubscription(to: string, confirmUrl: string): Mail {
  return build(to, "Επιβεβαίωσε την εγγραφή σου", {
    preheader: "Ένα κλικ και τελειώσαμε.",
    heading: "Επιβεβαίωσε την εγγραφή σου",
    blocks: [
      {
        kind: "text",
        text: `Κάποιος — ελπίζουμε εσύ — έγραψε αυτή τη διεύθυνση για τα νέα του ${site.name}.`,
      },
      { kind: "button", label: "Ναι, εγγράψτε με", href: confirmUrl },
      {
        kind: "text",
        text: "Αν δεν το ζήτησες εσύ, αγνόησε αυτό το email. Χωρίς επιβεβαίωση δεν στέλνουμε τίποτα και η διεύθυνση διαγράφεται.",
      },
    ],
    footnote:
      "Έλαβες αυτό το email επειδή αυτή η διεύθυνση γράφτηκε στη φόρμα του newsletter.",
  });
}
