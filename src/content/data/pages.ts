import type { Localized } from "@/lib/types";

/**
 * Static pages the footer links to.
 *
 * The privacy text describes what the site actually does — the tables in
 * `prisma/schema.prisma`, the Supabase project in eu-central-1 and the Vercel
 * hosting — rather than a template downloaded from somewhere. It is a plain
 * description written by the people who built the site, not legal advice; a
 * lawyer should review it before it is relied on.
 */
export interface StaticPage {
  slug: string;
  title: Localized<string>;
  intro: Localized<string>;
  body: Localized<string>;
  updatedAt: string;
}

/** The address published for contact. */
export const CONTACT_EMAIL = "thessalonikihub@gmail.com";

export const staticPages: StaticPage[] = [
  {
    slug: "about",
    title: { el: "Σχετικά με εμάς", en: "About us" },
    intro: {
      el: "Ένας ψηφιακός οδηγός της Θεσσαλονίκης, γραμμένος με έναν κανόνα: μόνο πραγματικά, επαληθευμένα στοιχεία.",
      en: "A digital guide to Thessaloniki, written under one rule: only real, verified information.",
    },
    body: {
      el: `Το **ThessalonikiHub** είναι ένας δίγλωσσος οδηγός της Θεσσαλονίκης. Δεν είναι πλατφόρμα κρατήσεων και δεν πουλάει τίποτα: μαζεύει, γράφει και οργανώνει πληροφορία για την πόλη, στα ελληνικά και στα αγγλικά.

## Ο κανόνας
Δημοσιεύουμε **μόνο ό,τι μπορούμε να επαληθεύσουμε**. Αυτό ακούγεται αυτονόητο και δεν είναι.

Πρακτικά σημαίνει ότι:

- Δεν εφευρίσκουμε **ωράρια, τιμές ή τηλέφωνα**. Αν μια επιχείρηση δεν τα δημοσιεύει, η σελίδα της τα αφήνει κενά και σε στέλνει στην επίσημη πηγή.
- Δεν εφευρίσκουμε **ώρες εκδηλώσεων**. Αν μια πηγή δίνει μόνο ημερομηνία, βλέπεις μόνο ημερομηνία.
- Δεν τοποθετούμε στον χάρτη ό,τι δεν ξέρουμε **πού ακριβώς είναι**.

Όπου η πληροφορία λείπει, προτιμούμε να φαίνεται ότι λείπει.

## Οι φωτογραφίες
Οι περισσότερες εικόνες του site είναι **δικές μας**. Όσες προέρχονται από το Wikimedia Commons φέρουν **πλήρη απόδοση**: δημιουργό, άδεια και σύνδεσμο στην πηγή. Φωτογραφίες επιχειρήσεων δημοσιεύονται μόνο όταν τις δίνει ο ιδιοκτήτης.

## Το περιεχόμενο
Πέρα από τον κατάλογο, το site γράφει: οδηγούς για τις **στάσεις του μετρό**, για κάθε **γειτονιά**, για την πόλη **μήνα-μήνα**, για την ιστορία της, για το τι τρώγεται εδώ και γιατί. Αυτό είναι το κομμάτι στο οποίο δίνουμε τον περισσότερο χρόνο.

## Αδελφικό site
Το **[chalkidikihub.gr](https://chalkidikihub.gr)** καλύπτει τη Χαλκιδική με την ίδια λογική.

## Διορθώσεις
Αν δεις κάτι λάθος, **πες μας το**. Οι διορθώσεις είναι ευπρόσδεκτες και γίνονται γρήγορα.`,
      en: `**ThessalonikiHub** is a bilingual guide to Thessaloniki. It is not a booking platform and it sells nothing: it gathers, writes and organises information about the city, in Greek and English.

## The rule
We publish **only what we can verify**. That sounds obvious and is not.

In practice it means:

- We do not invent **opening hours, prices or phone numbers**. If a business does not publish them, its page leaves them empty and sends you to the official source.
- We do not invent **event times**. If a source gives only a date, you see only a date.
- We do not put anything on the map whose **exact location** we do not know.

Where information is missing, we would rather it looked missing.

## The photographs
Most images on the site are **our own**. Those from Wikimedia Commons carry **full attribution**: author, licence and a link to the source. Business photographs are published only when the owner supplies them.

## The writing
Beyond the directory, the site writes: guides to every **metro station**, to each **neighbourhood**, to the city **month by month**, to its history, and to what is eaten here and why. That is the part we give the most time to.

## Sister site
**[chalkidikihub.gr](https://chalkidikihub.gr)** covers Chalkidiki on the same principles.

## Corrections
If you see something wrong, **tell us**. Corrections are welcome and made quickly.`,
    },
    updatedAt: "2026-09-11",
  },
  {
    slug: "contact",
    title: { el: "Επικοινωνία", en: "Contact" },
    intro: {
      el: "Διορθώσεις, καταχωρήσεις, συνεργασίες ή απλώς μια παρατήρηση.",
      en: "Corrections, listings, partnerships, or simply a remark.",
    },
    body: {
      el: `## Email
**${CONTACT_EMAIL}**

Απαντάμε σε όλα, αν και όχι πάντα την ίδια μέρα.

## Καταχώρηση επιχείρησης
Αν έχεις κατάλυμα, εστιατόριο, μπαρ ή υπηρεσία στη Θεσσαλονίκη, μπορείς να το **[καταχωρήσεις μόνος σου](/submit)**. Η καταχώρηση είναι δωρεάν και ελέγχεται πριν δημοσιευτεί.

Αν η επιχείρησή σου υπάρχει ήδη στο site και θέλεις να τη διαχειρίζεσαι — ωράριο, φωτογραφίες, προσφορές — μπορείς να **τη διεκδικήσεις** από τη σελίδα της.

## Διορθώσεις
Αν κάτι είναι λάθος ή έχει αλλάξει, γράψε μας τη **διεύθυνση της σελίδας** και τι ισχύει. Δεν χρειάζεται να είσαι ευγενικός· χρειάζεται να είσαι συγκεκριμένος.

## Φωτογραφίες
Αν είσαι φωτογράφος και θέλεις να δεις δουλειά σου εδώ, ή αν θεωρείς ότι μια εικόνα χρησιμοποιείται χωρίς σωστή απόδοση, στείλε μας μήνυμα και θα το δούμε άμεσα.

## Τύπος & συνεργασίες
Για δημοσιογραφικά αιτήματα ή προτάσεις συνεργασίας, στο ίδιο email.`,
      en: `## Email
**${CONTACT_EMAIL}**

We answer everything, though not always the same day.

## Listing a business
If you run accommodation, a restaurant, a bar or a service in Thessaloniki, you can **[add it yourself](/en/submit)**. Listing is free and is reviewed before it goes live.

If your business is already on the site and you would like to manage it — hours, photographs, offers — you can **claim it** from its page.

## Corrections
If something is wrong or has changed, send us the **page address** and what is actually the case. You do not need to be polite; you need to be specific.

## Photographs
If you are a photographer and would like to see your work here, or if you believe an image is used without proper attribution, write to us and we will look at it straight away.

## Press & partnerships
For press enquiries or partnership proposals, the same address.`,
    },
    updatedAt: "2026-09-11",
  },
  {
    slug: "privacy",
    title: { el: "Πολιτική Απορρήτου", en: "Privacy Policy" },
    intro: {
      el: "Τι δεδομένα κρατάμε, γιατί, πού, και πώς τα διαγράφεις.",
      en: "What data we keep, why, where, and how to have it deleted.",
    },
    body: {
      el: `Αυτή η σελίδα περιγράφει τι κάνει πραγματικά το ThessalonikiHub με τα προσωπικά δεδομένα. Είναι γραμμένη σε απλή γλώσσα από όσους έφτιαξαν το site, όχι από δικηγόρο.

## Τι συλλέγουμε

**Αν εγγραφείς στο newsletter:** τη **διεύθυνση email** σου και τη γλώσσα προτίμησης.

**Αν φτιάξεις λογαριασμό:** τη **διεύθυνση email** σου και, προαιρετικά, ένα **όνομα**. Αν συνδεθείς με Google, λαμβάνουμε το email και το όνομα από τον λογαριασμό σου — όχι τον κωδικό σου.

**Αν καταχωρήσεις επιχείρηση:** τα στοιχεία που συμπληρώνεις εσύ στη φόρμα.

**Αν αποθηκεύσεις μέρη:** τη λίστα των αποθηκευμένων, δεμένη με τον λογαριασμό σου.

Δεν χρησιμοποιούμε Google Analytics ή αντίστοιχο εργαλείο τρίτου, και δεν σε παρακολουθούμε ανάμεσα σε ιστοσελίδες.

Μετράμε ένα μόνο πράγμα, μόνοι μας: **πόσες φορές άνοιξε κάθε καταχώρηση κάθε μέρα**, ώστε ο ιδιοκτήτης της να ξέρει αν τη διαβάζει κόσμος. Αποθηκεύεται ένας αριθμός ανά καταχώρηση ανά ημέρα — χωρίς IP, χωρίς cookie, χωρίς αναγνωριστικό, χωρίς τίποτα αποθηκευμένο στη συσκευή σου. Από αυτόν τον αριθμό δεν προκύπτει ποιος είδε τι.

## Γιατί
- **Newsletter:** για να σου στείλουμε αυτό που ζήτησες. Μόνο γι' αυτό.
- **Λογαριασμός:** για να σε αναγνωρίζουμε, να κρατάς τη λίστα σου και να διαχειρίζεσαι την καταχώρησή σου.
- **Καταχωρήσεις:** για να τις ελέγξουμε και να τις δημοσιεύσουμε.

## Πού αποθηκεύονται
- Η **βάση δεδομένων** και η υπηρεσία λογαριασμών φιλοξενούνται στο **Supabase**, σε εξυπηρετητές εντός **Ευρωπαϊκής Ένωσης** (περιοχή eu-central-1, Φρανκφούρτη).
- Η **φιλοξενία του site** γίνεται από τη **Vercel**.

Και οι δύο ενεργούν ως εκτελούντες την επεξεργασία για λογαριασμό μας.

## Cookies
Χρησιμοποιούμε μόνο όσα χρειάζονται για να λειτουργεί το site:

- **Cookie συνεδρίας**, αν έχεις συνδεθεί, ώστε να παραμένεις συνδεδεμένος.
- **Προτίμηση γλώσσας**, ώστε να μη σε ρωτάμε κάθε φορά.

Δεν υπάρχουν cookies διαφήμισης ή ανάλυσης αυτή τη στιγμή. **Αν προστεθούν διαφημίσεις στο μέλλον**, αυτή η σελίδα θα ενημερωθεί πριν από την ενεργοποίησή τους και θα υπάρξει η ανάλογη επιλογή συγκατάθεσης.

## Πόσο καιρό
- **Newsletter:** μέχρι να διαγραφείς. Κάθε email περιέχει σύνδεσμο διαγραφής.
- **Λογαριασμός:** όσο υπάρχει ο λογαριασμός.
- **Καταχωρήσεις που απορρίφθηκαν:** διαγράφονται οριστικά 30 ημέρες μετά την απόρριψη. Στο διάστημα αυτό βλέπεις τον λόγο και μπορείς να διορθώσεις και να υποβάλεις ξανά.
- **Μετρήσεις προβολών:** 14 μήνες, ώστε να συγκρίνεται η ίδια σεζόν με την περσινή.

## Τα δικαιώματά σου
Σύμφωνα με τον **GDPR**, έχεις δικαίωμα πρόσβασης, διόρθωσης, διαγραφής, περιορισμού, φορητότητας και εναντίωσης.

Για οποιοδήποτε από αυτά, στείλε μήνυμα στο **${CONTACT_EMAIL}** από τη διεύθυνση που μας έχεις δώσει. Απαντάμε το συντομότερο δυνατό.

Αν θεωρείς ότι δεν χειριστήκαμε σωστά τα δεδομένα σου, μπορείς να υποβάλεις καταγγελία στην **Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα** (dpa.gr).

## Παιδιά
Το site δεν απευθύνεται σε παιδιά κάτω των 16 και δεν συλλέγουμε εν γνώσει μας δεδομένα τους.

## Αλλαγές
Αν αλλάξει κάτι ουσιώδες, θα ενημερωθεί η ημερομηνία στο τέλος αυτής της σελίδας.`,
      en: `This page describes what ThessalonikiHub actually does with personal data. It is written in plain language by the people who built the site, not by a lawyer.

## What we collect

**If you sign up to the newsletter:** your **email address** and your language preference.

**If you create an account:** your **email address** and, optionally, a **name**. If you sign in with Google, we receive the email and name from your account — not your password.

**If you submit a business:** the details you fill in yourself.

**If you save places:** your saved list, tied to your account.

We use no Google Analytics or comparable third-party tool, and we do not track you across websites.

We measure exactly one thing, ourselves: **how many times each listing was opened each day**, so that its owner knows whether anyone is reading it. What is stored is one number per listing per day — no IP address, no cookie, no identifier, nothing kept on your device. That number cannot say who looked at what.

## Why
- **Newsletter:** to send you what you asked for. Nothing else.
- **Account:** to recognise you, keep your list, and let you manage your listing.
- **Submissions:** to review and publish them.

## Where it is stored
- The **database** and the account service are hosted on **Supabase**, on servers within the **European Union** (eu-central-1, Frankfurt).
- The **site itself** is hosted by **Vercel**.

Both act as processors on our behalf.

## Cookies
We use only what the site needs to work:

- A **session cookie**, if you are signed in, so that you stay signed in.
- A **language preference**, so we do not ask every time.

There are no advertising or analytics cookies at present. **If advertising is added in future**, this page will be updated before it goes live and an appropriate consent choice will be offered.

## How long
- **Newsletter:** until you unsubscribe. Every email carries an unsubscribe link.
- **Account:** for as long as the account exists.
- **Rejected submissions:** permanently deleted 30 days after rejection. Until then you can read the reason, fix the listing and submit it again.
- **View counts:** 14 months, so a season can be compared with the same season last year.

## Your rights
Under the **GDPR** you have the right of access, rectification, erasure, restriction, portability and objection.

For any of these, write to **${CONTACT_EMAIL}** from the address you gave us. We answer as soon as we can.

If you believe we have handled your data badly, you may complain to the **Hellenic Data Protection Authority** (dpa.gr).

## Children
The site is not aimed at children under 16 and we do not knowingly collect their data.

## Changes
If anything material changes, the date at the foot of this page will be updated.`,
    },
    updatedAt: "2026-09-11",
  },
  {
    slug: "terms",
    title: { el: "Όροι Χρήσης", en: "Terms of Use" },
    intro: {
      el: "Τι μπορείς να περιμένεις από εμάς, και τι περιμένουμε αν καταχωρήσεις κάτι.",
      en: "What you can expect from us, and what we expect if you submit something.",
    },
    body: {
      el: `## Το περιεχόμενο
Προσπαθούμε να είναι ακριβές και το ελέγχουμε, αλλά η πόλη αλλάζει. **Ωράρια, τιμές και διαθεσιμότητα επιβεβαιώνονται πάντα από την επίσημη πηγή** πριν βασιστείς σε αυτά.

Τα κείμενα και οι φωτογραφίες μας ανήκουν, εκτός αν δηλώνεται διαφορετικά. Οι εικόνες από το Wikimedia Commons φέρουν τη δική τους άδεια, η οποία αναγράφεται δίπλα τους.

## Αν καταχωρήσεις επιχείρηση
Καταχωρώντας, δηλώνεις ότι:

- Έχεις **δικαίωμα** να δώσεις αυτά τα στοιχεία.
- Τα στοιχεία είναι **αληθή** και σε αφορούν.
- Έχεις τα **δικαιώματα των φωτογραφιών** που ανεβάζεις, ή άδεια να τις χρησιμοποιήσουμε.

Διατηρούμε το δικαίωμα να **επεξεργαστούμε, να μεταφράσουμε ή να απορρίψουμε** μια καταχώρηση, και να αφαιρέσουμε ό,τι αποδειχθεί ανακριβές.

Η καταχώρηση είναι **δωρεάν**. Δεν χρεώνουμε για θέση στη λίστα ούτε για καλύτερη κατάταξη.

## Αν διεκδικήσεις επιχείρηση
Η διεκδίκηση σού δίνει τη δυνατότητα να ενημερώνεις **ωράριο, στοιχεία επικοινωνίας και προσφορές**. Δεν σου δίνει έλεγχο του συντακτικού κειμένου ή της κατηγορίας, ώστε μια καταχώρηση να μη μπορεί να μετατραπεί σε διαφήμιση.

## Εξωτερικοί σύνδεσμοι
Συνδέουμε σε επίσημους ιστότοπους και σελίδες κρατήσεων. Δεν ελέγχουμε το περιεχόμενό τους και δεν ευθυνόμαστε γι' αυτό.

## Ευθύνη
Το site παρέχεται **ως έχει**. Δεν φέρουμε ευθύνη για ζημία από τη χρήση πληροφορίας που δεν επιβεβαιώθηκε από την επίσημη πηγή.

## Επικοινωνία
Για οτιδήποτε σχετικό: **${CONTACT_EMAIL}**`,
      en: `## The content
We try to keep it accurate and we check it, but the city changes. **Always confirm opening hours, prices and availability with the official source** before relying on them.

Our text and photographs are ours unless stated otherwise. Images from Wikimedia Commons carry their own licence, which is shown beside them.

## If you submit a business
By submitting, you confirm that:

- You have the **right** to provide these details.
- The details are **true** and relate to you.
- You hold the **rights to the photographs** you upload, or permission for us to use them.

We reserve the right to **edit, translate or reject** a submission, and to remove anything shown to be inaccurate.

Listing is **free**. We do not charge for a place on the list or for better placement.

## If you claim a business
Claiming lets you keep **hours, contact details and offers** up to date. It does not give you control of the editorial text or the category, so that a listing cannot be turned into an advertisement.

## External links
We link to official websites and booking pages. We do not control their content and are not responsible for it.

## Liability
The site is provided **as is**. We accept no liability for loss arising from the use of information that was not confirmed with the official source.

## Contact
For anything at all: **${CONTACT_EMAIL}**`,
    },
    updatedAt: "2026-09-11",
  },
];

export function getStaticPage(slug: string): StaticPage | undefined {
  return staticPages.find((p) => p.slug === slug);
}
