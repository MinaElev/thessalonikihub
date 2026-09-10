import type { Localized } from "@/lib/types";

/**
 * Self-guided walking routes.
 *
 * Every stop that corresponds to an existing attraction reuses that entity's
 * exact coordinates and links to its page, so the routes stay consistent with
 * the rest of the site. Distances and times are realistic walking estimates
 * for an unhurried pace with stops; they are labelled as approximate.
 */
export interface RouteStop {
  name: Localized<string>;
  lat: number;
  lng: number;
  /** Why this stop is here and what to notice. */
  note: Localized<string>;
  /** Slug of the matching place, when one exists, for cross-linking. */
  placeSlug?: string;
}

export interface WalkingRoute {
  slug: string;
  name: Localized<string>;
  blurb: Localized<string>;
  /** Approximate walking distance in kilometres. */
  distanceKm: number;
  /** Approximate time in minutes, at an unhurried pace with stops. */
  durationMin: number;
  difficulty: "easy" | "moderate";
  /** Best time of day to walk it. */
  bestTime: Localized<string>;
  intro: Localized<string>;
  stops: RouteStop[];
  /** Closing practical notes (markdown). */
  outro: Localized<string>;
  area?: string;
  metroStation?: string;
  featured?: boolean;
}

export const walkingRoutes: WalkingRoute[] = [
  {
    slug: "romaiki-thessaloniki",
    name: { el: "Η ρωμαϊκή Θεσσαλονίκη", en: "Roman Thessaloniki" },
    blurb: {
      el: "Το αυτοκρατορικό συγκρότημα του Γαλερίου σε μία ώρα: αγορά, αψίδα, ανάκτορο και Ροτόντα, όλα με τα πόδια.",
      en: "Galerius' imperial complex in an hour: forum, arch, palace and Rotunda, all on foot.",
    },
    distanceKm: 1.6,
    durationMin: 90,
    difficulty: "easy",
    bestTime: { el: "Πρωί ή αργό απόγευμα", en: "Morning or late afternoon" },
    intro: {
      el: `Στα τέλη του 3ου και στις αρχές του 4ου αιώνα, ο **Γαλέριος** έκανε τη Θεσσαλονίκη μία από τις πρωτεύουσές του και έχτισε ένα ενιαίο αυτοκρατορικό συγκρότημα: ανάκτορο, ιππόδρομο, θριαμβική αψίδα και ένα κυκλικό οικοδόμημα που στέκει ακόμη.

Το εντυπωσιακό είναι ότι αυτά τα μνημεία **δεν είναι διάσπαρτα**. Βρίσκονται σε ευθεία γραμμή, μέσα σε λίγα λεπτά περπάτημα, γιατί ήταν σχεδιασμένα ως ένα σύνολο. Αυτή η διαδρομή τα ακολουθεί με τη σειρά.`,
      en: `In the late 3rd and early 4th century, **Galerius** made Thessaloniki one of his capitals and built a single imperial complex: a palace, a hippodrome, a triumphal arch and a circular building that still stands.

What's striking is that these monuments **aren't scattered**. They sit in a straight line, minutes apart on foot, because they were designed as one composition. This route follows them in order.`,
    },
    stops: [
      {
        name: { el: "Ρωμαϊκή Αγορά", en: "Roman Forum" },
        lat: 40.6376,
        lng: 22.947,
        placeSlug: "roman-forum",
        note: {
          el: "Ξεκίνα από το διοικητικό κέντρο της αρχαίας πόλης. Κατέβα στο υπόγειο μουσείο και δες το ωδείο από ψηλά, από εδώ περνούσε η καθημερινή ζωή της ρωμαϊκής Θεσσαλονίκης.",
          en: "Start at the administrative heart of the ancient city. Go down to the underground museum and look at the odeon from above. The daily life of Roman Thessaloniki passed through here.",
        },
      },
      {
        name: { el: "Παναγία Χαλκέων", en: "Panagia Chalkeon" },
        lat: 40.636,
        lng: 22.947,
        placeSlug: "panagia-chalkeon",
        note: {
          el: "Μικρή παράκαμψη μερικών μέτρων: ο πλίνθινος ναός του 1028 δείχνει τι ακολούθησε τους Ρωμαίους. Χτίστηκε πάνω στο ίδιο αστικό πλέγμα.",
          en: "A short detour of a few metres: the brick church of 1028 shows what followed the Romans. It was built on the same urban grid.",
        },
      },
      {
        name: { el: "Αψίδα του Γαλερίου (Καμάρα)", en: "Arch of Galerius (Kamara)" },
        lat: 40.6323,
        lng: 22.9516,
        placeSlug: "arch-of-galerius",
        note: {
          el: "Η θριαμβική αψίδα του 4ου αι., στημένη για τη νίκη επί των Περσών. Πλησίασε τα ανάγλυφα: αφηγούνται τη μάχη σε ζώνες, σαν κόμικ σε μάρμαρο.",
          en: "The 4th-century triumphal arch, raised for the victory over the Persians. Get close to the reliefs: they narrate the battle in bands, like a comic strip in marble.",
        },
      },
      {
        name: { el: "Ανάκτορα Γαλερίου (Πλατεία Ναυαρίνου)", en: "Palace of Galerius (Navarinou Square)" },
        lat: 40.6308,
        lng: 22.9508,
        note: {
          el: "Τα ερείπια του ανακτόρου βρίσκονται σκαμμένα κάτω από το επίπεδο του δρόμου, με καφέ και φοιτητές γύρω τους. Είναι η πιο χαρακτηριστική εικόνα της πόλης: αρχαία και καθημερινότητα στο ίδιο κάδρο.",
          en: "The palace ruins lie excavated below street level, ringed by cafés and students. It's the city's most characteristic image: antiquity and everyday life in one frame.",
        },
      },
      {
        name: { el: "Ροτόντα", en: "Rotunda" },
        lat: 40.6333,
        lng: 22.9531,
        placeSlug: "rotunda",
        note: {
          el: "Το φινάλε. Κυκλικό οικοδόμημα του 4ου αι. με τοίχους πάχους έξι μέτρων, που υπήρξε διαδοχικά ναός, εκκλησία και τζαμί. Ο μιναρές δίπλα του σώζεται ακόμη. Μνημείο UNESCO.",
          en: "The finale. A 4th-century circular building with walls six metres thick, successively a temple, a church and a mosque, its minaret still stands beside it. A UNESCO monument.",
        },
      },
    ],
    outro: {
      el: `## Πρακτικά
- **Αφετηρία:** σταθμός μετρό **Βενιζέλου**· **τερματισμός:** σταθμός **Σιντριβάνι**. Δεν χρειάζεσαι επιστροφή με τα πόδια.
- Η διαδρομή είναι σχεδόν **επίπεδη** και γίνεται άνετα με καροτσάκι.
- Τα μνημεία έχουν δικά τους ωράρια λειτουργίας και εισιτήρια: έλεγξέ τα πριν, ιδίως Δευτέρα.
- Το καλοκαίρι απόφυγε το μεσημέρι: τα περισσότερα σημεία είναι **ακάλυπτα**.

## Τι να συνδυάσεις
Αν σου περισσεύει χρόνος, από τη Ροτόντα ανηφόρισε προς την **Άνω Πόλη** ή κατηφόρισε τη Δημητρίου Γούναρη προς τη θάλασσα και τον **Λευκό Πύργο**.`,
      en: `## Practicalities
- **Start:** **Venizelou** metro station; **finish:** **Sintrivani** station. No need to walk back.
- The route is almost entirely **flat** and manages fine with a pushchair.
- The monuments keep their own opening hours and ticketing: check before you go, especially on Mondays.
- In summer avoid midday: most of the stops are **unshaded**.

## What to combine it with
If you have time left, climb from the Rotunda toward **Ano Poli**, or walk down Dimitriou Gounari to the sea and the **White Tower**.`,
    },
    area: "center",
    metroStation: "venizelou",
    featured: true,
  },
  {
    slug: "ano-poli-iliovasilema",
    name: { el: "Άνω Πόλη στο ηλιοβασίλεμα", en: "Ano Poli at sunset" },
    blurb: {
      el: "Ανηφόρα μέσα από τα τείχη μέχρι το Επταπύργιο, με τη θέα να ανοίγει σε κάθε στροφή.",
      en: "A climb through the walls to the Heptapyrgion, the view opening at every turn.",
    },
    distanceKm: 2.4,
    durationMin: 120,
    difficulty: "moderate",
    bestTime: { el: "Δύο ώρες πριν τη δύση", en: "Two hours before sunset" },
    intro: {
      el: `Η Άνω Πόλη είναι το κομμάτι της Θεσσαλονίκης που **γλίτωσε από τη μεγάλη πυρκαγιά του 1917**. Γι' αυτό εδώ σώζονται ακόμη τα στενά σοκάκια, τα οθωμανικά σπίτια με τα σαχνισιά και ο πολεοδομικός ιστός των προηγούμενων αιώνων.

Είναι επίσης η μόνη διαδρομή αυτού του οδηγού με **πραγματική ανηφόρα**. Η ανταμοιβή είναι ότι σε κάθε στροφή η πόλη απλώνεται πιο χαμηλά και ο Θερμαϊκός φαίνεται όλο και περισσότερο. Ξεκίνα με χρόνο ώστε να είσαι ψηλά όταν πέφτει ο ήλιος.`,
      en: `Ano Poli is the part of Thessaloniki that **escaped the great fire of 1917**. That's why the narrow lanes, the Ottoman houses with their overhanging bays and the street pattern of earlier centuries survive here.

It is also the only route in this guide with a **real climb**. The reward is that at every turn the city spreads out lower and more of the Thermaic Gulf comes into view. Start early enough to be high up when the sun drops.`,
    },
    stops: [
      {
        name: { el: "Παναγία Αχειροποίητος", en: "Acheiropoietos" },
        lat: 40.6349,
        lng: 22.949,
        placeSlug: "acheiropoietos",
        note: {
          el: "Αφετηρία στο επίπεδο της Εγνατίας. Παλαιοχριστιανική βασιλική του 5ου αιώνα, από τα παλαιότερα μνημεία UNESCO της πόλης. Από εδώ αρχίζει η ανηφόρα.",
          en: "Start at Egnatia level. A 5th-century basilica and one of the city's oldest UNESCO monuments. The climb begins here.",
        },
      },
      {
        name: { el: "Άγιος Δημήτριος", en: "Agios Dimitrios" },
        lat: 40.6389,
        lng: 22.9476,
        placeSlug: "agios-dimitrios",
        note: {
          el: "Ο ναός του πολιούχου, ο μεγαλύτερος της πόλης. Μη φύγεις χωρίς να κατέβεις στην **κρύπτη**, όπου βρίσκεται το σημείο του μαρτυρίου του αγίου.",
          en: "The patron saint's church, the city's largest. Don't leave without going down into the **crypt**, the site of the saint's martyrdom.",
        },
      },
      {
        name: { el: "Βυζαντινά Τείχη", en: "Byzantine Walls" },
        lat: 40.641,
        lng: 22.956,
        placeSlug: "byzantine-walls",
        note: {
          el: "Εδώ συναντάς τα τείχη. Περπάτησε παράλληλα με αυτά: το πάχος και το ύψος τους εξηγούν γιατί η πόλη άντεξε τόσες πολιορκίες.",
          en: "Here you meet the walls. Walk alongside them: their thickness and height explain why the city withstood so many sieges.",
        },
      },
      {
        name: { el: "Μονή Βλατάδων", en: "Vlatadon Monastery" },
        lat: 40.643,
        lng: 22.954,
        placeSlug: "vlatadon-monastery",
        note: {
          el: "Βυζαντινό μοναστήρι του 14ου αιώνα, ακόμη ενεργό, με ήσυχη αυλή και παγώνια. Καλή στάση για ανάσα πριν την τελευταία ανηφόρα.",
          en: "A 14th-century Byzantine monastery, still active, with a quiet courtyard and peacocks. A good place to catch your breath before the last climb.",
        },
      },
      {
        name: { el: "Επταπύργιο (Γεντί Κουλέ)", en: "Heptapyrgion (Yedi Kule)" },
        lat: 40.6444,
        lng: 22.9603,
        placeSlug: "heptapyrgion",
        note: {
          el: "Το ψηλότερο σημείο. Βυζαντινή ακρόπολη που χρησιμοποιήθηκε ως φυλακή μέχρι το 1989. Η θέα από έξω, με τον ήλιο να πέφτει πίσω από τον Όλυμπο, είναι ο λόγος που ανέβηκες.",
          en: "The highest point. A Byzantine acropolis used as a prison until 1989. The view from outside, with the sun dropping behind Mount Olympus, is why you climbed.",
        },
      },
    ],
    outro: {
      el: `## Πρακτικά
- **Φόρα κανονικά παπούτσια.** Τα καλντερίμια είναι ανώμαλα και απότομα σε σημεία.
- Η ανηφόρα είναι υπαρκτή αλλά σταδιακή. Υπολόγισε **δύο ώρες** με στάσεις και φωτογραφίες.
- Για την **κατηφόρα** υπάρχουν αστικά λεωφορεία από την Άνω Πόλη προς το κέντρο: αν τα γόνατα διαμαρτύρονται, μη διστάσεις.
- Τα καφενεία στην Άνω Πόλη έχουν από τις καλύτερες θέες της πόλης· η τιμή του καφέ το αντανακλά.

## Πότε
Το **φθινόπωρο και την άνοιξη** είναι ιδανικά. Τον Ιούλιο και τον Αύγουστο ξεκίνα το νωρίτερο δύο ώρες πριν τη δύση, όχι νωρίτερα. Η ανηφόρα στη ζέστη είναι δυσάρεστη.`,
      en: `## Practicalities
- **Wear proper shoes.** The cobbles are uneven and steep in places.
- The climb is real but gradual. Allow **two hours** with stops and photographs.
- For the **descent** there are city buses from Ano Poli down to the centre: if your knees object, don't hesitate.
- The cafés up in Ano Poli have some of the best views in the city; the price of the coffee reflects it.

## When
**Autumn and spring** are ideal. In July and August set off no earlier than two hours before sunset. The climb in the heat is unpleasant.`,
    },
    area: "ano-poli",
    metroStation: "agias-sofias",
    featured: true,
  },
  {
    slug: "paralia-nea-paralia",
    name: { el: "Η παραλία, άκρη σε άκρη", en: "The seafront, end to end" },
    blurb: {
      el: "Πέντε χιλιόμετρα δίπλα στη θάλασσα, από τον Λευκό Πύργο μέχρι το Μέγαρο Μουσικής, χωρίς ούτε μία ανηφόρα.",
      en: "Five kilometres beside the sea, from the White Tower to the Concert Hall, without a single hill.",
    },
    distanceKm: 5,
    durationMin: 90,
    difficulty: "easy",
    bestTime: { el: "Ηλιοβασίλεμα", en: "Sunset" },
    intro: {
      el: `Η **Νέα Παραλία** είναι το πιο πετυχημένο σύγχρονο έργο της Θεσσαλονίκης. Ένας πεζόδρομος και ποδηλατόδρομος πέντε χιλιομέτρων δίπλα στο νερό, οργανωμένος σε διαδοχικούς θεματικούς κήπους, που έδωσε ξανά στην πόλη τη θάλασσά της.

Είναι η διαδρομή που κάνουν οι ίδιοι οι Θεσσαλονικείς: τρέχοντας, με ποδήλατο, με καρότσι, ή απλώς περπατώντας μέχρι να νυχτώσει. Δεν έχει αξιοθέατα με εισιτήριο· έχει την ίδια την πόλη σε κίνηση.`,
      en: `The **Nea Paralia** is Thessaloniki's most successful modern project. A five-kilometre pedestrian and cycle promenade beside the water, organised as a sequence of themed gardens, which gave the city back its sea.

It's the walk locals themselves do: running, cycling, pushing a pram, or simply walking until dark. There are no ticketed sights on it; there is the city itself in motion.`,
    },
    stops: [
      {
        name: { el: "Λευκός Πύργος", en: "White Tower" },
        lat: 40.6264,
        lng: 22.9483,
        placeSlug: "white-tower",
        note: {
          el: "Το σύμβολο της πόλης και η φυσική αφετηρία. Αν έχεις χρόνο, ανέβα: το μουσείο στους έξι ορόφους αφηγείται την ιστορία της Θεσσαλονίκης και η ταράτσα δίνει πανοραμική θέα.",
          en: "The city's symbol and the natural starting point. If you have time, go up: the museum across six floors tells Thessaloniki's story and the roof gives a panoramic view.",
        },
      },
      {
        name: { el: "Αρχαιολογικό Μουσείο & Μουσείο Βυζαντινού Πολιτισμού", en: "Archaeological & Byzantine Culture Museums" },
        lat: 40.6212,
        lng: 22.9557,
        placeSlug: "archaeological-museum",
        note: {
          el: "Μικρή παράκαμψη προς τα μέσα. Τα δύο κορυφαία μουσεία της πόλης βρίσκονται δίπλα-δίπλα: αν βρέξει, εδώ σώζεσαι.",
          en: "A short detour inland. The city's two leading museums stand side by side: if it rains, this is your refuge.",
        },
      },
      {
        name: { el: "Άγαλμα Μεγάλου Αλεξάνδρου", en: "Alexander the Great statue" },
        lat: 40.6218,
        lng: 22.9492,
        note: {
          el: "Το έφιππο άγαλμα στην παραλία, με τις σάρισες γύρω του. Κλασικό σημείο φωτογραφίας και συνάντησης.",
          en: "The equestrian statue on the waterfront, ringed by sarissas. A classic photo and meeting point.",
        },
      },
      {
        name: { el: "Ομπρέλες του Ζογγολόπουλου", en: "Zongolopoulos' Umbrellas" },
        lat: 40.6098,
        lng: 22.9552,
        note: {
          el: "Το πιο φωτογραφημένο γλυπτό της πόλης, στημένο μέσα στο νερό. Στη δύση, ο ήλιος περνά ανάμεσα από τις ομπρέλες, γι' αυτό μαζεύεται τόσος κόσμος εδώ.",
          en: "The city's most photographed sculpture, standing in the water. At sunset the light passes between the umbrellas, which is why so many people gather here.",
        },
      },
      {
        name: { el: "Μέγαρο Μουσικής Θεσσαλονίκης", en: "Thessaloniki Concert Hall" },
        lat: 40.6031,
        lng: 22.9556,
        note: {
          el: "Το νότιο άκρο της διαδρομής. Από εδώ η θέα προς τα πίσω δείχνει ολόκληρη την πόλη ανεβασμένη στον λόφο, με την Άνω Πόλη στην κορυφή.",
          en: "The southern end of the walk. Looking back from here you see the whole city stacked up the hill, with Ano Poli at the top.",
        },
      },
    ],
    outro: {
      el: `## Πρακτικά
- **Εντελώς επίπεδη** και προσβάσιμη σε όλο το μήκος της. Ιδανική με καρότσι ή αναπηρικό αμαξίδιο.
- Υπάρχει **ξεχωριστός ποδηλατόδρομος**: μείνε στη ζώνη των πεζών, οι ποδηλάτες κινούνται γρήγορα.
- Οι κήποι έχουν όνομα και θέμα ο καθένας (Κήπος του Ήχου, της Μεσογείου, του Απογεύματος κ.ά.). Αξίζει να τους προσέξεις.
- Δεν χρειάζεται να την κάνεις ολόκληρη. Τα πρώτα δύο χιλιόμετρα μέχρι τις Ομπρέλες είναι το πιο πυκνό κομμάτι.

## Επιστροφή
Λεωφορεία κινούνται παράλληλα με την παραλία προς το κέντρο. Εναλλακτικά, από τα ανατολικά σημεία μπορείς να κόψεις προς τα μέσα και να βρεις τον σταθμό μετρό **Πανεπιστήμιο**.`,
      en: `## Practicalities
- **Completely flat** and accessible along its whole length. Ideal with a pushchair or wheelchair.
- There is a **separate cycle lane**: stay in the pedestrian zone, the cyclists move fast.
- Each garden has its own name and theme (Garden of Sound, of the Mediterranean, of the Afternoon and others). They're worth noticing.
- You don't have to do all of it. The first two kilometres to the Umbrellas are the densest stretch.

## Getting back
Buses run parallel to the seafront toward the centre. Alternatively, from the eastern stretch you can cut inland to the **Panepistimio** metro station.`,
    },
    area: "waterfront",
    metroStation: "panepistimio",
    featured: true,
  },
];

const bySlug = new Map(walkingRoutes.map((r) => [r.slug, r]));

export function getWalkingRoute(slug: string): WalkingRoute | undefined {
  return bySlug.get(slug);
}

export function getWalkingRoutes(): WalkingRoute[] {
  return walkingRoutes;
}
