import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import {
  type MetroStation,
  getMetroStation,
  keyDestinationsFrom,
  linesFor,
  metroFacts,
  requiresChange,
  stopsBetween,
  terminiFor,
} from "@/content/data/metro";

/**
 * Per-station practical detail, derived rather than written.
 *
 * Eighteen station pages carrying the same three headings and about a hundred
 * words each read to a search engine as one page repeated, which is most of
 * why they went uncrawled. Everything here is computed from the network facts
 * already verified in `metro.ts` — how many stops, which way, which terminus —
 * so each page gains a block of numbers that is true and that no other station
 * page carries. Nothing is invented: where a fact is not in the data, no
 * sentence claims it.
 */

export interface StationFaq {
  question: string;
  answer: string;
}

/** A row of the "from this station" table. */
export interface Journey {
  slug: string;
  name: string;
  stops: number;
  change: boolean;
  reason: string;
}

export function journeysFrom(station: MetroStation, locale: Locale): Journey[] {
  return keyDestinationsFrom(station).map((d) => ({
    slug: d.station.slug,
    name: pick(d.station.name, locale),
    stops: d.stops,
    change: d.change,
    reason: pick(d.reason, locale),
  }));
}

function stopsWord(n: number, locale: Locale): string {
  if (locale === "el") return n === 1 ? "μία στάση" : `${n} στάσεις`;
  return n === 1 ? "one stop" : `${n} stops`;
}

/**
 * Questions a person actually types, answered from the network data.
 *
 * The numbers differ at every station, so these are not the same FAQ eighteen
 * times — and they are the questions the current pages answer nowhere: how far
 * the centre is, how to reach the airport, what the fare is.
 */
export function stationFaqs(
  station: MetroStation,
  locale: Locale,
): StationFaq[] {
  const el = locale === "el";
  const name = pick(station.name, locale);
  const faqs: StationFaq[] = [];

  const centre = getMetroStation("venizelou");
  if (centre && centre.slug !== station.slug) {
    const n = stopsBetween(station, centre);
    faqs.push({
      question: el
        ? `Πόσες στάσεις είναι από τον σταθμό «${name}» μέχρι το κέντρο;`
        : `How many stops is it from ${name} to the city centre?`,
      answer: el
        ? `Ο σταθμός Βενιζέλου, στην καρδιά του ιστορικού κέντρου, απέχει ${stopsWord(n, locale)} από τον σταθμό «${name}». Από εκεί η Αριστοτέλους και τα Λαδάδικα είναι λίγα λεπτά με τα πόδια.`
        : `Venizelou station, in the heart of the historic centre, is ${stopsWord(n, locale)} from ${name}. Aristotelous and Ladadika are a few minutes' walk from there.`,
    });
  }

  const mikra = getMetroStation("mikra");
  if (mikra) {
    const n = stopsBetween(station, mikra);
    const change = requiresChange(station, mikra);
    const same = mikra.slug === station.slug;
    faqs.push({
      question: el
        ? `Πώς πάω στο αεροδρόμιο από τον σταθμό «${name}»;`
        : `How do I get to the airport from ${name}?`,
      answer: el
        ? `Το μετρό δεν φτάνει στο αεροδρόμιο «Μακεδονία». ${
            same
              ? "Από εδώ"
              : `Φτάνεις πρώτα στο τέρμα Μίκρα, ${stopsWord(n, locale)}${change ? " με αλλαγή συρμού στην 25ης Μαρτίου" : ""}, και από εκεί`
          } παίρνεις τη λεωφορειακή γραμμή Χ3, που έχει δικό της κόμιστρο ${metroFacts.airportBusFareEur},00 € — δεν καλύπτεται από το εισιτήριο του μετρό.`
        : `The metro does not reach "Makedonia" Airport. ${
            same
              ? "From here"
              : `First reach the Mikra terminus, ${stopsWord(n, locale)}${change ? ", changing trains at 25is Martiou" : ""}, and from there`
          } take bus line ${metroFacts.airportBus}, which has its own fare of €${metroFacts.airportBusFareEur}.00 and is not covered by your metro ticket.`,
    });
  }

  const { inbound, outbound } = terminiFor(station);
  const outboundNames = outbound.map((s) => pick(s.name, locale));
  const lines = linesFor(station);
  const servedBy = el
    ? lines.length > 1
      ? "Τον σταθμό εξυπηρετούν και οι δύο γραμμές του δικτύου, η Γραμμή 1 και η Γραμμή 2."
      : `Ο σταθμός ανήκει στη Γραμμή ${lines[0]}.`
    : lines.length > 1
      ? "The station is served by both of the network's lines, Line 1 and Line 2."
      : `The station is on Line ${lines[0]}.`;
  if (outboundNames.length) {
    faqs.push({
      question: el
        ? `Ποιον συρμό πρέπει να πάρω από τον σταθμό «${name}»;`
        : `Which train should I board at ${name}?`,
      answer: el
        ? outboundNames.length > 1
          ? `${servedBy} Προς τα ανατολικά περνούν και οι δύο από την ίδια αποβάθρα, οπότε κοίτα τον τερματικό στην ένδειξη: «${outboundNames.join("» ή «")}». Προς την αντίθετη κατεύθυνση δεν χρειάζεται προσοχή — όλοι οι συρμοί έχουν τερματικό «${pick(inbound.name, locale)}».`
          : `${servedBy} Οι συρμοί δηλώνουν «${outboundNames[0]}» προς τη μία κατεύθυνση και «${pick(inbound.name, locale)}» προς την άλλη.`
        : outboundNames.length > 1
          ? `${servedBy} Eastbound they share one platform, so check the terminus on the display: ${outboundNames.join(" or ")}. In the other direction there is nothing to watch for — every train ends at ${pick(inbound.name, locale)}.`
          : `${servedBy} Trains show ${outboundNames[0]} in one direction and ${pick(inbound.name, locale)} in the other.`,
    });
  }

  faqs.push({
    question: el
      ? `Τι ώρα ξεκινά και τι ώρα κλείνει το μετρό;`
      : `What time does the metro start and finish?`,
    answer: el
      ? `Τα δρομολόγια ξεκινούν στις ${metroFacts.firstTrain}. Το τελευταίο φεύγει στις ${metroFacts.lastTrainWeek} από Κυριακή έως Πέμπτη και στις ${metroFacts.lastTrainWeekend} Παρασκευή και Σάββατο. Το ωράριο είναι ίδιο σε όλους τους σταθμούς του δικτύου.`
      : `Services begin at ${metroFacts.firstTrain}. The last train leaves at ${metroFacts.lastTrainWeek} Sunday to Thursday and at ${metroFacts.lastTrainWeekend} on Friday and Saturday. The hours are the same at every station on the network.`,
  });

  faqs.push({
    question: el
      ? `Πόσο κοστίζει το εισιτήριο;`
      : `How much does a ticket cost?`,
    answer: el
      ? `Η απλή διαδρομή κοστίζει ${metroFacts.singleTicketEur.toString().replace(".", ",")}0 € και το ημερήσιο εισιτήριο ${metroFacts.dayTicketEur.toString().replace(".", ",")}0 €, με ισχύ 24 ωρών από την πρώτη επικύρωση. Το κόμιστρο είναι ενιαίο, ανεξάρτητα από το πόσες στάσεις κάνεις.`
      : `A single costs €${metroFacts.singleTicketEur.toFixed(2)} and a day ticket €${metroFacts.dayTicketEur.toFixed(2)}, valid 24 hours from first validation. The fare is flat, however many stops you travel.`,
  });

  const opened = new Intl.DateTimeFormat(el ? "el-GR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(station.opened));
  faqs.push({
    question: el
      ? `Πότε άνοιξε ο σταθμός «${name}»;`
      : `When did ${name} station open?`,
    answer: el
      ? `Στις ${opened}${
          station.opened === metroFacts.openedKalamaria
            ? ", μαζί με την υπόλοιπη επέκταση προς την Καλαμαριά"
            : ", μαζί με την πρώτη γραμμή του μετρό"
        }.`
      : `On ${opened}${
          station.opened === metroFacts.openedKalamaria
            ? ", along with the rest of the Kalamaria extension"
            : ", with the metro's first line"
        }.`,
  });

  return faqs;
}
