/**
 * Unit checks for the rule-based half of the event importer.
 *
 * Every phrasing below is taken verbatim from an event this site has actually
 * imported. These regexes decide what time a reader turns up and whether they
 * expect to pay, so they get tests; the model that rewrites the prose around
 * them does not need any, because a bad rewrite leaves the event in the queue
 * while a bad time goes live looking correct.
 *
 *   npm run test:events
 */
import { extractTimes, extractPrice, extractVenueName } from "@/lib/events/extract";

let failures = 0;
function check(label: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  const ok = a === e;
  if (!ok) failures++;
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${label.padEnd(44)} ${ok ? a : `${a}  expected ${e}`}`);
}

console.log("TIMES");
check("Ώρα: 19:00 – 19:46", extractTimes("Πέμπτη 17 Σεπτεμβρίου 2026 Ώρα: 19:00 – 19:46 Χώρος: Αίθουσα"), { start: "19:00", end: "19:46" });
check("από τις 19:00 έως τις 21:30", extractTimes("παρουσιάζεται από τις 19:00 έως τις 21:30, στο Γενί Τζαμί"), { start: "19:00", end: "21:30" });
check("Έναρξη Αγώνων: 13:00", extractTimes("Σάββατο 19 Σεπτεμβρίου 2026 Έναρξη Αγώνων: 13:00 Παραλία"), { start: "13:00", end: null });
check("Ώρα 20:00", extractTimes("Κυριακή 20 & Δευτέρα 21 Σεπτεμβρίου 2026 – Ώρα 20:00 Δημοτικό"), { start: "20:00", end: null });
check("no time stated", extractTimes("Το φεστιβάλ επιστρέφει για τρεις ημέρες τον Σεπτέμβριο."), { start: null, end: null });
check("a date is not a time", extractTimes("25-26-27 Σεπτεμβρίου 2026 στο Θέατρο Κήπου"), { start: null, end: null });
check("a distance is not a time", extractTimes("Αγωνιστικό δρόμο 14 χιλιομέτρων και 2,1 χιλιομέτρων."), { start: null, end: null });

console.log("\nPRICE");
check("Είσοδος Ελεύθερη", extractPrice("Χώρος: Αίθουσα Μανόλης Ανδρόνικος Είσοδος Ελεύθερη Προβολή"), { el: "Είσοδος ελεύθερη", en: "Free entry" });
check("Ελεύθερη είσοδος (…)", extractPrice("Ελεύθερη είσοδος (απαιτείται τηλεφωνική κράτηση στο 2310-602599)"), { el: "Είσοδος ελεύθερη", en: "Free entry" });
check("δωρεάν συμμετοχή", extractPrice("άλσους, με δωρεάν συμμετοχή των πολιτών. Δηλώσεις"), { el: "Δωρεάν συμμετοχή", en: "Free to take part" });
check("Εισιτήριο 12€", extractPrice("Εισιτήριο: 12€ στην είσοδο"), { el: "Εισιτήριο 12€", en: "Ticket €12" });
check("no price stated", extractPrice("Δύο κουαρτέτα. Μία σκηνή. Μια βραδιά σύγχρονης jazz."), null);

console.log("\nVENUE");
check("Χώρος: …", extractVenueName("Ώρα: 19:00 Χώρος: Αίθουσα Μανόλης Ανδρόνικος Είσοδος"), "Αίθουσα Μανόλης Ανδρόνικος");
check("στο Θέατρο Κήπου + run-on", extractVenueName("στο Θέατρο Κήπου έρχεται για άλλη μια χρονιά στην πόλη"), "Θέατρο Κήπου");
check("στο Πάρκο «Ατλαντίδα»", extractVenueName("στο Πάρκο «Ατλαντίδα» του Σέιχ Σου, στο πλαίσιο"), "Πάρκο «Ατλαντίδα»");
check("στην Αίθουσα Φίλων Μουσικής", extractVenueName("στην Αίθουσα Φίλων Μουσικής Μ1 Εμπνευσμένο"), "Αίθουσα Φίλων Μουσικής Μ1");
check("no venue frame", extractVenueName("Οι Sólstafir επιστρέφουν στην Ελλάδα τον Νοέμβριο."), null);

console.log(`\n  ${failures === 0 ? "all passed" : `${failures} FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
