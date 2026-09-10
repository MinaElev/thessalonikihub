import type { Localized } from "@/lib/types";

/**
 * Combined Thessaloniki + Chalkidiki itineraries.
 *
 * The city and the peninsulas are an hour apart and are almost always
 * searched together, yet guides treat them separately. These itineraries
 * bridge the two and link onward to chalkidikihub.gr, this site's sister
 * guide, which covers the Chalkidiki half in depth.
 *
 * Driving times are typical, not guaranteed, traffic on the way out of the
 * city varies a lot, especially on summer weekends.
 */
export interface ComboDay {
  /** Day number within the itinerary. */
  day: number;
  where: Localized<string>;
  title: Localized<string>;
  detail: Localized<string>;
  /** In-app path this day links to, when one fits. */
  href?: string;
}

export interface Combo {
  slug: string;
  name: Localized<string>;
  nights: number;
  bestFor: Localized<string>;
  blurb: Localized<string>;
  days: ComboDay[];
}

export const combos: Combo[] = [
  {
    slug: "long-weekend",
    name: { el: "Τριήμερο: πόλη και μια βουτιά", en: "Three days: the city and one swim" },
    nights: 3,
    bestFor: {
      el: "Πρώτη επίσκεψη, χωρίς αυτοκίνητο για τις δύο πρώτες μέρες",
      en: "A first visit, no car needed for the first two days",
    },
    blurb: {
      el: "Δύο μέρες στην πόλη με τα πόδια και το μετρό, και μία μέρα στη θάλασσα.",
      en: "Two days in the city on foot and by metro, and one day at the sea.",
    },
    days: [
      {
        day: 1,
        where: { el: "Θεσσαλονίκη", en: "Thessaloniki" },
        title: { el: "Το ιστορικό κέντρο", en: "The historic centre" },
        detail: {
          el: "Ξεκίνα με μπουγάτσα, μετά η ρωμαϊκή διαδρομή: Αγορά, Καμάρα, Ροτόντα. Απόγευμα στην Αριστοτέλους και βόλτα στην παραλία μέχρι τον Λευκό Πύργο.",
          en: "Start with a bougatsa, then the Roman route: Forum, Kamara, Rotunda. Afternoon on Aristotelous and a walk along the seafront to the White Tower.",
        },
        href: "/routes/romaiki-thessaloniki",
      },
      {
        day: 2,
        where: { el: "Θεσσαλονίκη", en: "Thessaloniki" },
        title: { el: "Άνω Πόλη και αγορές", en: "Ano Poli and the markets" },
        detail: {
          el: "Πρωί στις αγορές Μοδιάνο και Καπάνι, μεσημέρι τσίπουρο με μεζέδες. Απόγευμα ανηφόρα στην Άνω Πόλη για το ηλιοβασίλεμα από το Επταπύργιο.",
          en: "Morning in the Modiano and Kapani markets, midday tsipouro with mezedes. Afternoon climb to Ano Poli for sunset from the Heptapyrgion.",
        },
        href: "/routes/ano-poli-iliovasilema",
      },
      {
        day: 3,
        where: { el: "Χαλκιδική", en: "Chalkidiki" },
        title: { el: "Κασσάνδρα, μονοήμερη", en: "Kassandra, a day trip" },
        detail: {
          el: "Μία ώρα οδήγηση στο πρώτο «πόδι». Οργανωμένες παραλίες, μεσημεριανό σε ψαροταβέρνα και επιστροφή το βράδυ. Ιδανικό αν δεν θέλεις να αλλάξεις κατάλυμα.",
          en: "An hour's drive to the first 'leg'. Organised beaches, lunch at a fish taverna and back in the evening. Ideal if you'd rather not change accommodation.",
        },
        href: "/day-trips/chalkidiki",
      },
    ],
  },
  {
    slug: "week",
    name: { el: "Πέντε μέρες: πόλη + Σιθωνία", en: "Five days: city plus Sithonia" },
    nights: 5,
    bestFor: {
      el: "Ζευγάρια και παρέες, με αυτοκίνητο από την 3η μέρα",
      en: "Couples and groups, with a car from day three",
    },
    blurb: {
      el: "Τρεις μέρες πόλη, δύο νύχτες στη Σιθωνία. Ο κλασικός συνδυασμός των ίδιων των Θεσσαλονικέων.",
      en: "Three days in the city, two nights in Sithonia. The combination locals themselves make.",
    },
    days: [
      {
        day: 1,
        where: { el: "Θεσσαλονίκη", en: "Thessaloniki" },
        title: { el: "Κέντρο και μνημεία", en: "Centre and monuments" },
        detail: {
          el: "Αγία Σοφία, Άγιος Δημήτριος με την κρύπτη, Ροτόντα. Βράδυ στα Λαδάδικα.",
          en: "Hagia Sophia, Agios Dimitrios with its crypt, the Rotunda. Evening in Ladadika.",
        },
        href: "/discover",
      },
      {
        day: 2,
        where: { el: "Θεσσαλονίκη", en: "Thessaloniki" },
        title: { el: "Μουσεία και παραλία", en: "Museums and the seafront" },
        detail: {
          el: "Αρχαιολογικό και Βυζαντινού Πολιτισμού το πρωί, τα πέντε χιλιόμετρα της Νέας Παραλίας το απόγευμα μέχρι τις Ομπρέλες.",
          en: "The Archaeological and Byzantine Culture museums in the morning, the five kilometres of the Nea Paralia in the afternoon to the Umbrellas.",
        },
        href: "/routes/paralia-nea-paralia",
      },
      {
        day: 3,
        where: { el: "Μετάβαση", en: "Transfer" },
        title: { el: "Προς Σιθωνία", en: "On to Sithonia" },
        detail: {
          el: "Ξεκίνα νωρίς, περίπου 1.5 ώρα οδήγηση. Στάση για μπάνιο στον δρόμο και τακτοποίηση στο κατάλυμα. Το απόγευμα σε έναν από τους μικρούς όρμους.",
          en: "Leave early, roughly an hour and a half. Stop for a swim on the way and settle into your base. Spend the afternoon in one of the small coves.",
        },
      },
      {
        day: 4,
        where: { el: "Χαλκιδική", en: "Chalkidiki" },
        title: { el: "Παραλίες Σιθωνίας", en: "Sithonia's beaches" },
        detail: {
          el: "Η μέρα της θάλασσας. Η Σιθωνία έχει δεκάδες μικρούς κόλπους. Ο ένας μετά τον άλλον κατά μήκος του παραλιακού δρόμου.",
          en: "The sea day. Sithonia has dozens of small bays, one after another along the coast road.",
        },
      },
      {
        day: 5,
        where: { el: "Επιστροφή", en: "Return" },
        title: { el: "Πίσω στην πόλη", en: "Back to the city" },
        detail: {
          el: "Πρωινό μπάνιο, επιστροφή το μεσημέρι. Αν προλαβαίνεις, μια τελευταία στάση για γλυκό στο Πανόραμα με θέα την πόλη.",
          en: "A morning swim and back around midday. If there's time, a last stop for a pastry in Panorama with the city below.",
        },
        href: "/what-to-eat/trigono-panoramatos",
      },
    ],
  },
  {
    slug: "history-and-sea",
    name: { el: "Επτά μέρες: ιστορία και θάλασσα", en: "Seven days: history and sea" },
    nights: 7,
    bestFor: {
      el: "Όσους θέλουν και τη Μακεδονία, όχι μόνο την παραλία",
      en: "Those who want Macedonia too, not only the beach",
    },
    blurb: {
      el: "Η πλήρης εκδοχή: πόλη, βασιλικοί τάφοι, Όλυμπος και Χαλκιδική σε μία εβδομάδα.",
      en: "The full version: city, royal tombs, Mount Olympus and Chalkidiki in one week.",
    },
    days: [
      {
        day: 1,
        where: { el: "Θεσσαλονίκη", en: "Thessaloniki" },
        title: { el: "Πρώτη γνωριμία", en: "First impressions" },
        detail: {
          el: "Κέντρο με τα πόδια, Αριστοτέλους, παραλία, Λευκός Πύργος. Βράδυ για τσίπουρο.",
          en: "The centre on foot, Aristotelous, the seafront, the White Tower. Tsipouro in the evening.",
        },
        href: "/what-to-eat/tsipouro-meze",
      },
      {
        day: 2,
        where: { el: "Θεσσαλονίκη", en: "Thessaloniki" },
        title: { el: "Βυζαντινή πόλη", en: "The Byzantine city" },
        detail: {
          el: "Τα μνημεία UNESCO και η Άνω Πόλη. Το μετρό κάνει τις μετακινήσεις εύκολες.",
          en: "The UNESCO monuments and Ano Poli. The metro makes getting around easy.",
        },
        href: "/metro",
      },
      {
        day: 3,
        where: { el: "Βεργίνα", en: "Vergina" },
        title: { el: "Οι βασιλικοί τάφοι", en: "The royal tombs" },
        detail: {
          el: "Μονοήμερη στην αρχαία Αιγές και τον τάφο του Φιλίππου Β΄: μνημείο UNESCO, περίπου μία ώρα δυτικά.",
          en: "A day trip to ancient Aigai and the tomb of Philip II. A UNESCO site about an hour west.",
        },
        href: "/day-trips/vergina",
      },
      {
        day: 4,
        where: { el: "Όλυμπος", en: "Mount Olympus" },
        title: { el: "Το βουνό των θεών", en: "The mountain of the gods" },
        detail: {
          el: "Λιτόχωρο και το φαράγγι του Ενιπέα, ή απλώς η θέα από τα χαμηλά. Νότια της πόλης, περίπου 1.5 ώρα.",
          en: "Litochoro and the Enipeas gorge, or simply the view from below. South of the city, about an hour and a half.",
        },
        href: "/day-trips/mount-olympus",
      },
      {
        day: 5,
        where: { el: "Μετάβαση", en: "Transfer" },
        title: { el: "Προς Χαλκιδική", en: "On to Chalkidiki" },
        detail: {
          el: "Διάλεξε χερσόνησο: Κασσάνδρα για οργανωμένες παραλίες και ζωή, Σιθωνία για άγρια ομορφιά και μικρούς όρμους.",
          en: "Pick a peninsula: Kassandra for organised beaches and nightlife, Sithonia for wilder scenery and small coves.",
        },
        href: "/day-trips/chalkidiki",
      },
      {
        day: 6,
        where: { el: "Χαλκιδική", en: "Chalkidiki" },
        title: { el: "Θάλασσα", en: "Sea" },
        detail: {
          el: "Ολόκληρη μέρα στο νερό, χωρίς πρόγραμμα. Το βράδυ ψάρι σε παραθαλάσσιο χωριό.",
          en: "A whole day in the water, with no plan. Fish in a seaside village in the evening.",
        },
      },
      {
        day: 7,
        where: { el: "Επιστροφή", en: "Return" },
        title: { el: "Τελευταία μέρα", en: "Last day" },
        detail: {
          el: "Επιστροφή στη Θεσσαλονίκη. Αν η πτήση σου είναι αργά, το μετρό σε πάει μέχρι τη Μίκρα και από εκεί η γραμμή Χ3 στο αεροδρόμιο.",
          en: "Back to Thessaloniki. If your flight is late, the metro takes you to Mikra and bus X3 continues to the airport.",
        },
        href: "/metro/mikra",
      },
    ],
  },
];

export function getCombos(): Combo[] {
  return combos;
}
