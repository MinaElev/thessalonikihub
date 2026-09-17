import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import type { WalkingRoute } from "@/content/data/routes";
import { getMetroStation, metroFacts } from "@/content/data/metro";
import { getArea } from "@/content/data/areas";

/**
 * Questions a walker actually has, answered from the route's own numbers.
 *
 * Distance, duration, stop count, difficulty and the starting station are all
 * already in the data and none of them were on the page as an answerable
 * question. Every figure differs per route, so this is not one FAQ repeated
 * six times — and "how long does it take" is the thing people search before
 * they decide to walk something.
 */
export interface RouteFaq {
  question: string;
  answer: string;
}

/** ISO 8601 duration, which is what `estimatedDuration` expects. */
export function isoDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}` || "PT0M";
}

function pace(route: WalkingRoute, locale: Locale): string {
  // Deliberately vague: the stored minutes include stopping and looking, so a
  // km/h figure derived from them would describe a pace nobody walks.
  return locale === "el"
    ? "Ο χρόνος είναι για αργό βάδισμα με στάσεις, όχι για ρυθμό διαδρομής."
    : "The time assumes an unhurried pace with stops, not a brisk walk.";
}

export function routeFaqs(route: WalkingRoute, locale: Locale): RouteFaq[] {
  const el = locale === "el";
  const name = pick(route.name, locale);
  const faqs: RouteFaq[] = [];
  const hours = Math.floor(route.durationMin / 60);
  const mins = route.durationMin % 60;
  const timeText = el
    ? hours
      ? `${hours} ${hours === 1 ? "ώρα" : "ώρες"}${mins ? ` και ${mins} λεπτά` : ""}`
      : `${mins} λεπτά`
    : hours
      ? `${hours} ${hours === 1 ? "hour" : "hours"}${mins ? ` ${mins} minutes` : ""}`
      : `${mins} minutes`;

  faqs.push({
    question: el
      ? `Πόση ώρα θέλει η διαδρομή «${name}»;`
      : `How long does the "${name}" walk take?`,
    answer: el
      ? `Περίπου ${timeText} για ${route.distanceKm} χιλιόμετρα και ${route.stops.length} στάσεις. ${pace(route, locale)} Αν μπεις σε μουσείο ή σταματήσεις για καφέ, πρόσθεσε ανάλογα.`
      : `About ${timeText} for ${route.distanceKm} km and ${route.stops.length} stops. ${pace(route, locale)} Add time for a museum or a coffee.`,
  });

  faqs.push({
    question: el
      ? `Είναι δύσκολη η διαδρομή;`
      : `Is the walk difficult?`,
    answer: el
      ? route.difficulty === "easy"
        ? `Όχι. Είναι εύκολη διαδρομή σε πόλη, κυρίως σε επίπεδο έδαφος και σε δρόμους με πεζοδρόμιο ή πεζόδρομο. Δεν χρειάζεται ειδικός εξοπλισμός, μόνο άνετα παπούτσια.`
        : `Έχει μέτρια δυσκολία: περιλαμβάνει ανηφόρες ή σκαλοπάτια. Τίποτα απαιτητικό για κάποιον που περπατά κανονικά, αλλά υπολόγισε ανάσες στη διαδρομή.`
      : route.difficulty === "easy"
        ? `No. It is an easy city walk, mostly flat, on pavements and pedestrian streets. No special kit — comfortable shoes are enough.`
        : `Moderate: it includes climbs or steps. Nothing demanding for a regular walker, but expect to catch your breath along the way.`,
  });

  faqs.push({
    question: el
      ? `Πότε είναι η καλύτερη ώρα για αυτή τη διαδρομή;`
      : `When is the best time to do this walk?`,
    answer: el
      ? `${pick(route.bestTime, locale)}. Στη Θεσσαλονίκη το καλοκαίρι το μεσημέρι είναι ζεστό και χωρίς σκιά σε αρκετά σημεία, οπότε νωρίς το πρωί ή μετά τις έξι το απόγευμα είναι σχεδόν πάντα προτιμότερο.`
      : `${pick(route.bestTime, locale)}. Thessaloniki's summer middays are hot and shadeless in places, so early morning or after six in the evening is almost always better.`,
  });

  const station = route.metroStation ? getMetroStation(route.metroStation) : undefined;
  if (station) {
    faqs.push({
      question: el
        ? `Πώς φτάνω στην αφετηρία;`
        : `How do I get to the start?`,
      answer: el
        ? `Με μετρό, στάση «${pick(station.name, locale)}». Το εισιτήριο κοστίζει ${metroFacts.singleTicketEur.toString().replace(".", ",")}0 € και το ημερήσιο ${metroFacts.dayTicketEur.toString().replace(".", ",")}0 €, με ισχύ 24 ωρών.`
        : `By metro, to ${pick(station.name, locale)} station. A single ticket is €${metroFacts.singleTicketEur.toFixed(2)} and a day ticket €${metroFacts.dayTicketEur.toFixed(2)}, valid 24 hours.`,
    });
  }

  const area = route.area ? getArea(route.area) : undefined;
  faqs.push({
    question: el
      ? `Χρειάζεται ξεναγός ή κράτηση;`
      : `Do I need a guide or a booking?`,
    answer: el
      ? `Όχι. Είναι διαδρομή αυτοξενάγησης: την περπατάς μόνος σου, με τη σειρά που θέλεις και στον ρυθμό σου. Δεν υπάρχει κόστος και δεν χρειάζεται κράτηση${area ? `. Όλες οι στάσεις βρίσκονται στην περιοχή «${pick(area.name, locale)}»` : ""}.`
      : `No. It is a self-guided walk: you do it on your own, in your own order and at your own pace. There is no cost and no booking${area ? `. Every stop is in ${pick(area.name, locale)}` : ""}.`,
  });

  return faqs;
}
