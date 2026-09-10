import type { Localized, Photo } from "@/lib/types";

/** A day trip from Thessaloniki. Real, well-known destinations, factual. */
export interface DayTrip {
  slug: string;
  name: Localized<string>;
  summary: Localized<string>;
  description: Localized<string>; // markdown
  distanceKm: number;
  drivingTime: Localized<string>;
  category: "history" | "nature" | "beach";
  photos: Photo[];
  featured?: boolean;
}

export const dayTrips: DayTrip[] = [
  {
    slug: "vergina",
    name: { el: "Βεργίνα (Αιγές)", en: "Vergina (Aigai)" },
    summary: {
      el: "Οι βασιλικοί τάφοι των Μακεδόνων και ο τάφος του Φιλίππου Β΄, μνημείο UNESCO.",
      en: "The royal Macedonian tombs and the tomb of Philip II. A UNESCO site.",
    },
    description: {
      el: `Η **Βεργίνα** είναι ίσως η σημαντικότερη εκδρομή από τη Θεσσαλονίκη για όποιον αγαπά την ιστορία: εδώ βρισκόταν η αρχαία **Αιγές**, η πρώτη πρωτεύουσα του μακεδονικού βασιλείου και ο ιερός τόπος ταφής των βασιλιάδων του.

## Ο τάφος του Φιλίππου Β΄
Το 1977 ο αρχαιολόγος **Μανόλης Ανδρόνικος** έφερε στο φως τον **ασύλητο βασιλικό τάφο**, που αποδίδεται στον **Φίλιππο Β΄**, πατέρα του Μεγάλου Αλεξάνδρου. Η ανακάλυψη συγκλόνισε τον κόσμο: χρυσή λάρνακα με το **άστρο της Βεργίνας**, χρυσό στεφάνι, πανοπλίες και κτερίσματα.

## Τι θα δεις
Το εντυπωσιακό **υπόγειο μουσείο** είναι χτισμένο μέσα στον Μεγάλο Τούμπα, γύρω από τους ίδιους τους τάφους, ώστε να τους βλέπεις στη θέση τους. Μια μοναδική εμπειρία. Μέρος των **Μνημείων Παγκόσμιας Κληρονομιάς UNESCO**.

## Πρακτικά
Απέχει περίπου **75 χλμ.** (~1 ώρα) νοτιοδυτικά της Θεσσαλονίκης. Ιδανικό για μισή ή μία μέρα· συνδυάζεται με τη γειτονική **Βέροια**. Για ώρες και εισιτήρια δες την επίσημη πηγή.`,
      en: `**Vergina** is perhaps the most important day trip from Thessaloniki for history lovers; this was ancient **Aigai**, the first capital of the Macedonian kingdom and the sacred burial place of its kings.

## The tomb of Philip II
In 1977 the archaeologist **Manolis Andronikos** brought to light the **unlooted royal tomb** attributed to **Philip II**, father of Alexander the Great. The discovery stunned the world: a gold larnax bearing the **Vergina Sun**, a gold wreath, armour and grave goods.

## What you'll see
The striking **underground museum** is built inside the Great Tumulus, around the tombs themselves, so you see them in situ. A unique experience. Part of the **UNESCO World Heritage** listing.

## Practical
It lies about **75 km** (~1 hour) southwest of Thessaloniki. Ideal for a half or full day; combine it with nearby **Veria**. Check the official source for hours and tickets.`,
    },
    distanceKm: 75,
    drivingTime: { el: "~1 ώρα", en: "~1 hour" },
    category: "history",
    photos: [
      {
        url: "/photos/658feadad2.webp",
        alt: { el: "Ο τάφος του Φιλίππου Β΄ στη Βεργίνα", en: "The tomb of Philip II at Vergina" },
        author: "Panegyrics of Granovetter (Sarah Murray)",
        license: "Public domain",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Facade_of_Philip_II_tomb_Vergina_Greece.jpg",
      },
    ],
    featured: true,
  },
  {
    slug: "mount-olympus",
    name: { el: "Όλυμπος", en: "Mount Olympus" },
    summary: {
      el: "Το ψηλότερο βουνό της Ελλάδας και μυθική κατοικία των θεών.",
      en: "Greece's highest mountain and the mythical home of the gods.",
    },
    description: {
      el: `Ο **Όλυμπος** είναι το **ψηλότερο βουνό της Ελλάδας** και, στη μυθολογία, η κατοικία των δώδεκα θεών: ένας μαγικός προορισμός για τη φύση, μόλις μία ώρα από τη Θεσσαλονίκη.

## Το βουνό των θεών
Η ψηλότερη κορυφή, ο **Μύτικας** (2.917 μ.), είναι ο θρυλικός θρόνος του Δία. Ο Όλυμπος ανακηρύχθηκε το **1938 ο πρώτος Εθνικός Δρυμός** της Ελλάδας, με σπάνια χλωρίδα και πανίδα και εντυπωσιακά φαράγγια.

## Τι μπορείς να κάνεις
- **Λιτόχωρο**: η γραφική «πύλη» του βουνού, βάση για κάθε ανάβαση.
- Πεζοπορία στο φαράγγι του **Ενιπέα** και μέχρι τα **Πριόνια** (αφετηρία μονοπατιών).
- Επίσκεψη στα Αρχαία Δίον, το ιερό των Μακεδόνων στους πρόποδες.

## Πρακτικά
Απέχει περίπου **90 χλμ.** (~1 ώρα 15′). Για απλή βόλτα/φαγητό αρκεί το Λιτόχωρο· η ανάβαση στις κορυφές θέλει εμπειρία, εξοπλισμό και ολόκληρη μέρα (ή διανυκτέρευση σε καταφύγιο).`,
      en: `**Mount Olympus** is the **highest mountain in Greece** and, in mythology, the home of the twelve gods. A magical nature destination just an hour from Thessaloniki.

## The mountain of the gods
Its highest peak, **Mytikas** (2,917 m), is the legendary throne of Zeus. Olympus was declared Greece's **first National Park in 1938**, with rare flora and fauna and dramatic gorges.

## What you can do
- **Litochoro**: the picturesque "gateway" to the mountain, base for every climb.
- Hike the **Enipeas gorge** and up to **Prionia** (trailhead for the paths).
- Visit ancient **Dion**, the Macedonians' sanctuary at the foothills.

## Practical
It lies about **90 km** (~1 hr 15 min) away. For a simple stroll/lunch, Litochoro is enough; climbing the peaks needs experience, gear and a full day (or an overnight at a refuge).`,
    },
    distanceKm: 90,
    drivingTime: { el: "~1 ώρα 15′", en: "~1 hr 15 min" },
    category: "nature",
    photos: [
      {
        url: "/photos/mount-olympus.webp",
        alt: {
          el: "Πεζοπόροι στο μονοπάτι του Ολύμπου, με τις κορυφές του Εθνικού Δρυμού στο βάθος",
          en: "Hikers on the Mount Olympus trail, the peaks of the national park beyond",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "edessa",
    name: { el: "Έδεσσα", en: "Edessa" },
    summary: {
      el: "Η πόλη των καταρρακτών, με πράσινο και νερά.",
      en: "The town of waterfalls, full of greenery and water.",
    },
    description: {
      el: `Η **Έδεσσα** είναι η «πόλη των νερών»: μια δροσερή, καταπράσινη απόδραση που ξεχωρίζει από κάθε άλλο προορισμό κοντά στη Θεσσαλονίκη.

## Οι καταρράκτες
Το σήμα κατατεθέν της πόλης είναι οι **καταρράκτες**, με μεγαλύτερο τον **Κάρανο** (~70 μ.), από τους μεγαλύτερους της Ελλάδας. Πέφτουν μέσα σε ένα οργανωμένο πάρκο με μονοπάτια, γεφυράκια και σπηλιά πίσω από το νερό.

## Τι άλλο να δεις
- Το παλιό συνοικιακό **Βαρόσι**, με παραδοσιακά αρχοντικά.
- Τους **Νερόμυλους** και το Ανοιχτό Μουσείο Νερού.
- Βόλτα δίπλα στα κανάλια που διασχίζουν την πόλη.

## Πρακτικά
Απέχει περίπου **90 χλμ.** (~1 ώρα) δυτικά. Ιδανική για μονοήμερη, ήρεμη οικογενειακή εκδρομή· δροσερή ακόμη και το καλοκαίρι.`,
      en: `**Edessa** is the "city of waters": a cool, green escape unlike any other destination near Thessaloniki.

## The waterfalls
The city's trademark is its **waterfalls**, the largest being **Karanos** (~70 m), among the tallest in Greece. They tumble through a landscaped park with paths, little bridges and a cave behind the water.

## What else to see
- The old **Varosi** quarter, with traditional mansions.
- The **Watermills** and the Open-Air Water Museum.
- A stroll along the canals that run through the town.

## Practical
It lies about **90 km** (~1 hour) to the west. Ideal for a calm one-day family trip; refreshing even in summer.`,
    },
    distanceKm: 90,
    drivingTime: { el: "~1 ώρα", en: "~1 hour" },
    category: "nature",
    photos: [
      {
        url: "/photos/edessa.webp",
        alt: {
          el: "Οι καταρράκτες της Έδεσσας να πέφτουν δίπλα στα παραδοσιακά σπίτια της πόλης",
          en: "The waterfalls of Edessa dropping beside the town's traditional houses",
        },
      },
    ],
  },
  {
    slug: "chalkidiki",
    name: { el: "Χαλκιδική", en: "Chalkidiki" },
    summary: {
      el: "Οι τρεις χερσόνησοι με τις διάσημες παραλίες, δίπλα στη Θεσσαλονίκη.",
      en: "The three peninsulas with famous beaches, right next to Thessaloniki.",
    },
    description: {
      el: `Η **Χαλκιδική** είναι η θάλασσα της Θεσσαλονίκης: ο πιο δημοφιλής παραθαλάσσιος προορισμός, με μερικές από τις ωραιότερες παραλίες της Ελλάδας μόλις μία ώρα από την πόλη.

## Τα τρία «πόδια»
- **Κασσάνδρα**: η πιο κοντινή και κοσμοπολίτικη χερσόνησος, με οργανωμένες παραλίες, beach bar και νυχτερινή ζωή.
- **Σιθωνία**: πιο άγρια και καταπράσινη, με μικρούς όρμους και εξωτικά νερά, αγαπημένη για κάμπινγκ και εξερεύνηση.
- **Άθως**: το **Άγιο Όρος**, αυτοδιοικούμενη μοναστική πολιτεία (η είσοδος επιτρέπεται μόνο σε άνδρες, με ειδική άδεια «διαμονητήριο»).

## Τι θα βρεις
Κρυστάλλινα νερά, γραφικά χωριά, φρέσκο ψάρι και ξεκούραστες αποδράσεις, από μια απλή μονοήμερη βουτιά ως ολιγοήμερες διακοπές.

## Πρακτικά
Η **Κασσάνδρα** ξεκινά περίπου **70–100 χλμ.** από τη Θεσσαλονίκη (~1 ώρα). Ιδανικά με αυτοκίνητο· υπάρχουν και υπεραστικά λεωφορεία (ΚΤΕΛ Χαλκιδικής).

## 👉 Αναλυτικός οδηγός
Για τα πάντα στη Χαλκιδική (παραλίες, καταλύματα, χωριά και προτάσεις) δες τον ειδικό οδηγό μας στο **[chalkidikihub.gr](https://chalkidikihub.gr)**, το αδελφό site του ThessalonikiHub αποκλειστικά για τη Χαλκιδική.`,
      en: `**Chalkidiki** is Thessaloniki's sea: the most popular seaside destination, with some of Greece's finest beaches just an hour from the city.

## The three "legs"
- **Kassandra**: the closest and most cosmopolitan peninsula, with organised beaches, beach bars and nightlife.
- **Sithonia**: wilder and greener, with small coves and exotic waters. A favourite for camping and exploring.
- **Athos**: **Mount Athos**, a self-governed monastic state (entry for men only, with a special permit, the *diamonitirion*).

## What you'll find
Crystal-clear waters, picturesque villages, fresh fish and easy escapes, from a simple day-trip swim to a few days' holiday.

## Practical
**Kassandra** starts about **70–100 km** from Thessaloniki (~1 hour). Best by car; intercity buses (KTEL Chalkidikis) also run.

## 👉 Full guide
For everything on Chalkidiki (beaches, stays, villages and tips) see our dedicated guide at **[chalkidikihub.gr](https://chalkidikihub.gr)**, ThessalonikiHub's sister site just for Chalkidiki.`,
    },
    distanceKm: 70,
    drivingTime: { el: "~1 ώρα (Κασσάνδρα)", en: "~1 hour (Kassandra)" },
    category: "beach",
    photos: [
      {
        url: "/photos/chalkidiki.webp",
        alt: {
          el: "Οι κολπίσκοι της Σιθωνίας στη Χαλκιδική από ψηλά, με τον Άθω στον ορίζοντα",
          en: "The coves of Sithonia in Chalkidiki from above, with Mount Athos on the horizon",
        },
      },
    ],
    featured: true,
  },
  {
    slug: "meteora",
    name: { el: "Μετέωρα", en: "Meteora" },
    summary: {
      el: "Τα βυζαντινά μοναστήρια πάνω σε βράχους, μνημείο UNESCO.",
      en: "Byzantine monasteries atop towering rocks. A UNESCO site.",
    },
    description: {
      el: `Τα **Μετέωρα** είναι ένα από τα πιο εντυπωσιακά τοπία του κόσμου: βυζαντινά μοναστήρια χτισμένα στην κορυφή τεράστιων, κατακόρυφων βράχων που υψώνονται σαν να αιωρούνται (γι' αυτό και το όνομα).

## Τι θα δεις
Από τα αρχικά μοναστήρια σώζονται και λειτουργούν σήμερα **έξι**, χτισμένα από τον 14ο–16ο αιώνα. Επισκέψιμα, με τοιχογραφίες, κειμήλια και θέα που κόβει την ανάσα. Βάση για την επίσκεψη είναι η **Καλαμπάκα** και το γραφικό **Καστράκι**.

## UNESCO
Ένα από τα ελάχιστα μνημεία στον κόσμο που είναι εγγεγραμμένα στην UNESCO **ταυτόχρονα ως πολιτιστικό και ως φυσικό** μνημείο.

## Πρακτικά
Είναι η **πιο μακρινή** εκδρομή της λίστας, περίπου **230 χλμ.** (~2 ώρες 45′). Θέλει **ολόκληρη, μεγάλη μέρα** (ξεκίνα νωρίς) ή διανυκτέρευση. Για τα μοναστήρια ισχύει κώδικας ενδυμασίας (καλυμμένοι ώμοι/γόνατα, φούστα για τις γυναίκες).`,
      en: `**Meteora** is one of the world's most spectacular landscapes: Byzantine monasteries built atop giant, sheer rock pillars that rise as if suspended in mid-air (hence the name).

## What you'll see
Of the original monasteries, **six** survive and function today, built between the 14th and 16th centuries. They are open to visitors, with frescoes, relics and breathtaking views. The base for a visit is **Kalambaka** and the picturesque village of **Kastraki**.

## UNESCO
One of very few sites in the world inscribed by UNESCO **both as a cultural and a natural** monument.

## Practical
It is the **most distant** trip on this list, about **230 km** (~2 hr 45 min). It needs a **full, long day** (start early) or an overnight. A dress code applies at the monasteries (covered shoulders/knees; a skirt for women).`,
    },
    distanceKm: 230,
    drivingTime: { el: "~2 ώρες 45′", en: "~2 hr 45 min" },
    category: "history",
    photos: [
      {
        url: "/photos/meteora.webp",
        alt: {
          el: "Τα μοναστήρια των Μετεώρων πάνω στους βράχους, στο φως του ηλιοβασιλέματος",
          en: "The monasteries of Meteora atop their rock pillars in the light of sunset",
        },
      },
    ],
  },
];

const bySlug = new Map(dayTrips.map((d) => [d.slug, d]));
export function getDayTrip(slug: string): DayTrip | undefined {
  return bySlug.get(slug);
}
