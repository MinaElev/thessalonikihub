import type { Localized, Photo } from "@/lib/types";

/**
 * Thessaloniki Metro stations.
 *
 * Facts verified against Greek/English Wikipedia and Greek press coverage
 * (Sept 2026):
 *  - Line 1 opened 30 November 2024: 13 stations, ~9.6 km.
 *  - The Kalamaria branch opened 27 August 2026: 5 stations, ~4.8 km,
 *    branching off the trunk at 25is Martiou.
 *  - 18 distinct stations, ~14.4 km, driverless, with platform screen doors.
 *  - The metro does NOT reach the airport; bus X3 links Mikra to "Makedonia".
 *
 * Coordinates are approximate street-level positions, used only to place the
 * station on the map. Nothing here invents opening times, prices or services.
 */
export interface MetroStation {
  slug: string;
  name: Localized<string>;
  /** "trunk" = shared by both branches; then the branch it belongs to. */
  branch: "trunk" | "nea-elvetia" | "kalamaria";
  /** Position along the network, north-west to south-east. */
  order: number;
  /** ISO date the station opened to the public. */
  opened: string;
  /** One-line summary for cards and search results. */
  blurb: Localized<string>;
  /** Rich editorial description (markdown) for the station page. */
  long: Localized<string>;
  /** Approximate position, for the station map. */
  center: { lat: number; lng: number };
  /** Area slug this station serves, for cross-linking. */
  area?: string;
  /** Slugs of places within walking distance, for cross-linking. */
  nearbyPlaces?: string[];
  /** Onward connections (rail, bus), only where publicly documented. */
  connections?: Localized<string>;
  featured?: boolean;
  /**
   * Hand-written title and meta description. Eighteen stations sharing one
   * generated title pattern read to a search engine as eighteen copies of the
   * same page, which is most of why they sat unindexed. Each one is written
   * here instead, around the question a person actually types.
   */
  seoTitle?: Localized<string>;
  seoDescription?: Localized<string>;
  /** ISO date this entry's text was last revised, for the sitemap. */
  updated?: string;
  /**
   * Operator-published station detail.
   *
   * Verified against the Greek Wikipedia station articles, September 2026 —
   * street address, platform layout, step-free access and the bus lines that
   * call there. These are the questions people actually search for and the
   * pages answered none of them. Optional throughout: a station without a
   * checked figure shows nothing rather than a guess.
   */
  address?: Localized<string>;
  /** Platform layout, e.g. one central platform serving two tracks. */
  platforms?: Localized<string>;
  /** Step-free access, only where the operator documents it. */
  stepFree?: boolean;
  /** Named exits and what each one leads to. */
  exits?: Localized<string>[];
  /** Connecting bus lines, as published. */
  busLines?: string[];
  /**
   * A photograph of the station itself.
   *
   * Three of the four pages Search Console left pending had no image at all,
   * and every station page fell back to the same site-wide social card. Goes
   * through `Photo`, so a picture cannot be published here without recording
   * who took it and under what licence — the station photographs in
   * circulation are press images with a named copyright holder, not free ones.
   */
  photo?: Photo;
}

/**
 * The junction. Every train shares the trunk up to here; south and east of it
 * the network is two separate branches, which is what makes "how many stops"
 * a real question rather than simple subtraction.
 */
const JUNCTION_ORDER = 11;

export const metroStations: MetroStation[] = [
  {
    slug: "neos-sidirodromikos-stathmos",
    name: { el: "Νέος Σιδηροδρομικός Σταθμός", en: "New Railway Station" },
    branch: "trunk",
    order: 1,
    opened: "2024-11-30",
    blurb: {
      el: "Το δυτικό τέρμα της γραμμής, κάτω από τον κεντρικό σιδηροδρομικό σταθμό. Η πρώτη επαφή με την πόλη αν φτάνεις με τρένο.",
      en: "The western terminus, beneath the main railway station, your first contact with the city if you arrive by train.",
    },
    long: {
      el: `Ο δυτικός τερματικός σταθμός του δικτύου βρίσκεται ακριβώς δίπλα στον **κεντρικό σιδηροδρομικό σταθμό** της Θεσσαλονίκης. Αν φτάνεις με τρένο από την Αθήνα, τη Λάρισα, την Έδεσσα ή τις Σέρρες, κατεβαίνεις από το βαγόνι και μπαίνεις στο μετρό χωρίς να βγεις στον δρόμο.

## Πού σε βγάζει
Στο δυτικό άκρο του κέντρου, στην περιοχή του **Βαρδάρη**. Δεν είναι τουριστική γειτονιά· είναι η πρακτική πύλη της πόλης, με υπεραστικά λεωφορεία, εμπορικά καταστήματα και έντονο πολυπολιτισμικό χαρακτήρα.

## Κατέβα εδώ για
- **Τρένα** προς και από την υπόλοιπη Ελλάδα.
- Την περιοχή του **Βαρδάρη** και τα σωζόμενα ίχνη των δυτικών τειχών.

## Καλό να ξέρεις
Από εδώ μέχρι το ιστορικό κέντρο είναι μόλις 3–4 στάσεις. Αν κουβαλάς αποσκευές, το μετρό είναι σαφώς ταχύτερο και φθηνότερο από το ταξί μέσα στην κίνηση της Εγνατίας.`,
      en: `The network's western terminus sits directly beside Thessaloniki's **main railway station**. If you arrive by train from Athens, Larissa, Edessa or Serres, you step off the carriage and into the metro without going out to the street.

## Where it puts you
At the western edge of the centre, in the **Vardaris** district. This isn't a tourist neighbourhood; it's the city's practical gateway, with intercity buses, shops and a strongly multicultural character.

## Get off here for
- **Trains** to and from the rest of Greece.
- The **Vardaris** area and the surviving traces of the western walls.

## Good to know
The historic centre is only 3–4 stops away. If you're carrying luggage, the metro is clearly faster and cheaper than a taxi stuck in Egnatia traffic.`,
    },
    center: { lat: 40.644, lng: 22.93 },
    area: "vardaris",
    connections: {
      el: "Σιδηρόδρομος (υπεραστικά και προαστιακά δρομολόγια), αστικά λεωφορεία.",
      en: "Mainline and suburban rail, city buses.",
    },
  },
  {
    slug: "dimokratias",
    name: { el: "Δημοκρατίας", en: "Dimokratias" },
    branch: "trunk",
    order: 2,
    opened: "2024-11-30",
    blurb: {
      el: "Η Πλατεία Δημοκρατίας: εκεί όπου βρισκόταν η δυτική πύλη της οχυρωμένης πόλης, και η πιο κοντινή στάση στα Λαδάδικα από τα δυτικά.",
      en: "Dimokratias Square: the site of the fortified city's western gate, and the closest western stop to Ladadika.",
    },
    long: {
      el: `Ο σταθμός βγάζει στην **Πλατεία Δημοκρατίας**, γνωστή σε όλους ως Βαρδάρης. Εδώ ξεκινά η Εγνατία, ο δρόμος που διασχίζει την πόλη από άκρη σε άκρη ακολουθώντας τη ρωμαϊκή χάραξη.

## Πού σε βγάζει
Στο δυτικό όριο του ιστορικού κέντρου. Στο σημείο αυτό βρισκόταν η **δυτική πύλη των τειχών**. Η «Χρυσή Πύλη» απ' όπου έμπαιναν όσοι έρχονταν από τη Ρώμη μέσω της Εγνατίας Οδού.

## Κατέβα εδώ για
- **Λαδάδικα**: περίπου 10 λεπτά με τα πόδια προς τη θάλασσα.
- Το **λιμάνι** και τον Φραγκομαχαλά.
- Την εμπορική, καθημερινή Θεσσαλονίκη γύρω από τη Δημοκρατίας.

## Καλό να ξέρεις
Η περιοχή έχει έντονη κίνηση τη μέρα και είναι πιο ήσυχη τη νύχτα. Για βραδινή έξοδο στα Λαδάδικα, οι περισσότεροι προτιμούν να κατέβουν στη **Βενιζέλου** και να κατηφορίσουν.`,
      en: `The station opens onto **Dimokratias Square**, known to everyone as Vardaris. This is where Egnatia Street begins, the road that crosses the city end to end along the Roman alignment.

## Where it puts you
At the western edge of the historic centre. This was the site of the **western gate in the walls**. The "Golden Gate" through which travellers arriving from Rome along the Via Egnatia entered the city.

## Get off here for
- **Ladadika**: about a 10-minute walk toward the sea.
- The **port** and Frangomahalas.
- The commercial, everyday Thessaloniki around Dimokratias.

## Good to know
The area is busy by day and quieter at night. For an evening out in Ladadika, most people prefer to get off at **Venizelou** and walk down.`,
    },
    center: { lat: 40.6408, lng: 22.9345 },
    area: "vardaris",
  },
  {
    slug: "venizelou",
    name: { el: "Βενιζέλου", en: "Venizelou" },
    branch: "trunk",
    order: 3,
    opened: "2024-11-30",
    blurb: {
      el: "Ο σταθμός-μουσείο: η ρωμαϊκή Decumanus Maximus διατηρημένη στη θέση της, ο πρώτος ανοιχτός αρχαιολογικός χώρος μέσα σε σταθμό μετρό στον κόσμο.",
      en: "The museum station: the Roman Decumanus Maximus preserved in place. The world's first open archaeological site inside a metro station.",
    },
    long: {
      el: `Αν κατεβείς σε έναν μόνο σταθμό του μετρό για τον ίδιο τον σταθμό, αυτός είναι. Στη Βενιζέλου, η ανασκαφή δεν μεταφέρθηκε και δεν καλύφθηκε: **έμεινε εκεί που τη βρήκαν**.

## Τι θα δεις
Σε βάθος περίπου έξι μέτρων αποκαλύφθηκε τμήμα της **Decumanus Maximus**, του κεντρικού ρωμαϊκού άξονα που διέσχιζε την πόλη από τα δυτικά προς τα ανατολικά, και το σταυροδρόμι του με κάθετο *cardo*. Είναι ο δρόμος που πατούσαν οι κάτοικοι της πόλης επί αιώνες, με τις μαρμάρινες πλάκες και τα κτίσματα της ύστερης αρχαιότητας γύρω του.

Ο σταθμός σχεδιάστηκε ώστε οι επιβάτες να **περπατούν πάνω από τα αρχαία**, με αναρτημένα «μπαλκόνια» θέασης απ' όπου μπορείς να σταθείς, να δεις και να φωτογραφίσεις. Είναι ο πρώτος ανοιχτός, επισκέψιμος αρχαιολογικός χώρος που διατηρείται *in situ* μέσα σε σταθμό μετρό παγκοσμίως.

## Κατέβα εδώ για
- Τις σκεπαστές αγορές **Μοδιάνο** και **Καπάνι**.
- Το **Μπεζεστένι** και το **Μπέη Χαμάμ**, οθωμανικά μνημεία πάνω στην Εγνατία.
- Την **Παναγία Χαλκέων**, βυζαντινό ναό του 1028, μνημείο UNESCO.
- Την **Πλατεία Αριστοτέλους** και τα **Λαδάδικα**, λίγα λεπτά προς τη θάλασσα.

## Καλό να ξέρεις
Η θέαση των αρχαίων γίνεται μέσα από τον χώρο του σταθμού, στη διαδρομή προς τις αποβάθρες. Δεν χρειάζεσαι ξεχωριστό εισιτήριο μουσείου, αρκεί το εισιτήριο του μετρό.`,
      en: `If you get off at one metro station for the station itself, this is the one. At Venizelou the excavation was neither moved nor covered over: **it stayed exactly where it was found**.

## What you'll see
About six metres down, archaeologists uncovered a stretch of the **Decumanus Maximus**, the main Roman axis running east to west through the city, and its crossroads with a perpendicular *cardo*. This is the street the city's inhabitants walked for centuries, with its marble paving and the late-antique buildings around it.

The station was designed so passengers **walk above the antiquities**, with suspended viewing balconies where you can stop, look and photograph. It is the world's first open, publicly accessible archaeological site preserved *in situ* within a metro station.

## Get off here for
- The covered **Modiano** and **Kapani** markets.
- The **Bezesteni** and **Bey Hamam**, Ottoman monuments on Egnatia.
- **Panagia Chalkeon**, a Byzantine church of 1028 and a UNESCO monument.
- **Aristotelous Square** and **Ladadika**, a few minutes toward the sea.

## Good to know
You view the antiquities from inside the station, on the way to the platforms. No separate museum ticket is needed, your metro ticket is enough.`,
    },
    center: { lat: 40.6376, lng: 22.941 },
    area: "center",
    nearbyPlaces: ["panagia-chalkeon", "aristotelous-square", "roman-forum"],
    featured: true,
  },
  {
    slug: "agias-sofias",
    name: { el: "Αγία Σοφία", en: "Agia Sofia" },
    branch: "trunk",
    order: 4,
    opened: "2024-11-30",
    blurb: {
      el: "Δύο βήματα από τον ομώνυμο ναό του 8ου αιώνα και από τους εμπορικούς δρόμους της Τσιμισκή.",
      en: "Two steps from the 8th-century church of the same name and from the Tsimiski shopping streets.",
    },
    long: {
      el: `Ο σταθμός πήρε το όνομά του από έναν από τους σημαντικότερους ναούς της πόλης, που στέκει λίγα μόλις μέτρα μακριά.

## Κατέβα εδώ για
- Την **Αγία Σοφία**, ναό του 8ου αιώνα με σπουδαία ψηφιδωτά, ένα από τα δεκαπέντε παλαιοχριστιανικά και βυζαντινά μνημεία της πόλης στον κατάλογο της **UNESCO**.
- Την **Παναγία Αχειροποίητο**, παλαιοχριστιανική βασιλική του 5ου αιώνα, λίγα λεπτά βόρεια.
- Την **Τσιμισκή**, τον κεντρικό εμπορικό δρόμο της Θεσσαλονίκης.
- Την **Πλατεία Αριστοτέλους** και την παραλία, κατηφορίζοντας προς τη θάλασσα.

## Πού σε βγάζει
Στην καρδιά του κέντρου. Από εδώ σχεδόν όλα γίνονται με τα πόδια: αγορές, μνημεία, καφέ και θάλασσα βρίσκονται μέσα σε δεκαπέντε λεπτά περπάτημα.

## Καλό να ξέρεις
Είναι ο πιο βολικός σταθμός για ψώνια στο κέντρο, γιατί σε αφήνει ανάμεσα στην Εγνατία και την Τσιμισκή, τους δύο μεγάλους παράλληλους άξονες.`,
      en: `The station takes its name from one of the city's most important churches, standing just a few metres away.

## Get off here for
- **Hagia Sophia**, an 8th-century church with remarkable mosaics and one of the city's fifteen Palaeochristian and Byzantine monuments on the **UNESCO** list.
- **Panagia Acheiropoietos**, a 5th-century basilica a few minutes north.
- **Tsimiski**, Thessaloniki's main shopping street.
- **Aristotelous Square** and the seafront, walking down toward the water.

## Where it puts you
In the heart of the centre. From here almost everything is walkable: markets, monuments, cafés and the sea are all within a fifteen-minute walk.

## Good to know
It's the handiest station for shopping in the centre, because it leaves you between Egnatia and Tsimiski, the two great parallel axes.`,
    },
    center: { lat: 40.6355, lng: 22.9455 },
    area: "center",
    nearbyPlaces: ["hagia-sophia", "acheiropoietos"],
  },
  {
    slug: "sintrivani",
    name: { el: "Σιντριβάνι", en: "Sintrivani" },
    branch: "trunk",
    order: 5,
    opened: "2024-11-30",
    blurb: {
      el: "Η στάση της Ροτόντας και της Καμάρας, και η πύλη προς τη φοιτητική Ναυαρίνου.",
      en: "The stop for the Rotunda and Kamara, and the gateway to student Navarinou.",
    },
    long: {
      el: `Στην Πλατεία Σιντριβανίου το κέντρο αρχίζει να δίνει τη θέση του στην πανεπιστημιούπολη. Είναι ο σταθμός με τη μεγαλύτερη πυκνότητα ρωμαϊκών μνημείων γύρω του, πάνω στην **Εγνατία**, και ταυτόχρονα ο μεγαλύτερος συγκοινωνιακός κόμβος του δικτύου στην επιφάνεια.

## Κατέβα εδώ για
- Τη **Ροτόντα**, το επιβλητικό κυκλικό οικοδόμημα του 4ου αιώνα με τα ψηφιδωτά, μνημείο UNESCO.
- Την **Αψίδα του Γαλερίου**, την **Καμάρα**, το κλασικό ραντεβού της πόλης.
- Την **Πλατεία Ναυαρίνου** με τα ερείπια του ανακτόρου του Γαλερίου και τα φοιτητικά καφέ γύρω της.
- Τον πεζόδρομο της **Δημητρίου Γούναρη**, που κατηφορίζει προς τη θάλασσα.

## Διάλεξε σωστή έξοδο
Ο σταθμός έχει δύο εξόδους που σε βγάζουν σε διαφορετικούς κόσμους, και η διαφορά μετράει σε λεπτά περπατήματος:

- Έξοδος **Εθνικής Αμύνης**, προς το Άσυλο του Παιδιού: η πλευρά του πανεπιστημίου και της ανηφόρας προς τη Ροτόντα.
- Έξοδος **Αγγελάκη**, προς τη **ΔΕΘ**: η πλευρά του εκθεσιακού κέντρου, του Αρχαιολογικού Μουσείου και της καθόδου προς τη Νέα Παραλία.

Αν πας για τη Ροτόντα και την Καμάρα, βγες από την Εθνικής Αμύνης. Αν πας για ΔΕΘ ή μουσεία, από την Αγγελάκη.

## Ο κόμβος των λεωφορείων
Εδώ καταλήγουν ή ξεκινούν **δώδεκα λεωφορειακές γραμμές**: 01Χ, 02Κ, 11, 14, 17, 27, 28, 32Ν, 37, 43Υ, 45 και 83. Είναι, με διαφορά, το σημείο του δικτύου όπου το μετρό συναντά τα περισσότερα αστικά δρομολόγια — χρήσιμο αν ο προορισμός σου είναι στα ανατολικά ή στην Άνω Πόλη, όπου το μετρό δεν φτάνει.

## Πού σε βγάζει
Ανάμεσα στο ιστορικό κέντρο και τη νεανική γειτονιά της Ροτόντας. Είναι η καλύτερη αφετηρία αν θέλεις να δεις το ρωμαϊκό συγκρότημα του Γαλερίου συνολικά: αψίδα, ανάκτορο και Ροτόντα ήταν μέρη του ίδιου αυτοκρατορικού σχεδίου, χτισμένα ως ενιαίο σύνολο στις αρχές του 4ου αιώνα.

## Καλό να ξέρεις
Η περιοχή είναι ζωντανή κάθε μέρα της εβδομάδας, όχι μόνο τα σαββατοκύριακα· είναι φοιτητική γειτονιά. Ο σταθμός βρίσκεται στο κοινό τμήμα, οπότε εξυπηρετείται και από τη **Γραμμή 1** και από τη **Γραμμή 2** — ό,τι συρμός κι αν έρθει, σε πάει προς το κέντρο. Έχει **μία κεντρική αποβάθρα** με δύο τροχιές και **πρόσβαση για ΑμεΑ**, και άνοιξε στις 30 Νοεμβρίου 2024.`,
      en: `At Sintrivani Square the centre begins to give way to the university district. This is the station with the greatest concentration of Roman monuments around it, on **Egnatia Street**, and at the same time the network's largest surface interchange.

## Get off here for
- The **Rotunda**, the imposing 4th-century circular building with its mosaics. A UNESCO monument.
- The **Arch of Galerius**, **Kamara**, the city's classic meeting point.
- **Navarinou Square**, with the ruins of the Palace of Galerius and the student cafés around it.
- The **Dimitriou Gounari** pedestrian street, running down toward the sea.

## Pick the right exit
The station has two exits that open onto different worlds, and the difference is measured in minutes of walking:

- The **Ethnikis Amynis** exit, by the Asylo tou Paidiou: the university side, and the climb toward the Rotunda.
- The **Angelaki** exit, toward the **trade fair grounds**: the side for the exhibition centre, the Archaeological Museum and the walk down to the seafront.

For the Rotunda and Kamara, take Ethnikis Amynis. For the trade fair or the museums, take Angelaki.

## The bus interchange
**Twelve bus lines** terminate or begin here: 01X, 02K, 11, 14, 17, 27, 28, 32N, 37, 43Y, 45 and 83. It is by some distance the point where the metro meets the most city bus routes — useful if your destination is east of the centre or up in the Ano Poli, where the metro does not reach.

## Where it puts you
Between the historic centre and the youthful Rotunda neighbourhood. It's the best starting point if you want to see the Galerian complex as a whole: the arch, the palace and the Rotunda were all part of the same imperial plan, built as one scheme in the early 4th century.

## Good to know
The area is lively every day of the week, not just at weekends; this is a student neighbourhood. The station sits on the shared trunk, so both **Line 1** and **Line 2** call here — whichever train arrives will take you toward the centre. It has **one central platform** with two tracks and **step-free access**, and it opened on 30 November 2024.`,
    },
    seoTitle: {
      el: "Μετρό Σιντριβάνι: Ροτόντα και Καμάρα",
      en: "Sintrivani metro: Rotunda and Kamara",
    },
    seoDescription: {
      el: "Η στάση με τη μεγαλύτερη πυκνότητα ρωμαϊκών μνημείων γύρω της: Ροτόντα, Αψίδα του Γαλερίου και η φοιτητική Ναυαρίνου σε λίγα λεπτά περπάτημα.",
      en: "The stop with the densest cluster of Roman monuments around it: the Rotunda, the Arch of Galerius and student Navarinou, all a short walk away.",
    },
    updated: "2026-09-17",
    address: { el: "Εγνατία, Θεσσαλονίκη", en: "Egnatia St, Thessaloniki" },
    platforms: { el: "Μία κεντρική αποβάθρα, δύο τροχιές", en: "One central platform serving two tracks" },
    stepFree: true,
    exits: [
      { el: "Εθνικής Αμύνης, προς το Άσυλο του Παιδιού", en: "Ethnikis Amynis, toward the Asylo tou Paidiou" },
      { el: "Αγγελάκη, προς τη ΔΕΘ", en: "Angelaki, toward the trade fair grounds" },
    ],
    busLines: ["01Χ", "02Κ", "11", "14", "17", "27", "28", "32Ν", "37", "43Υ", "45", "83"],
    center: { lat: 40.633, lng: 22.952 },
    area: "navarinou",
    nearbyPlaces: ["rotunda", "arch-of-galerius"],
    featured: true,
  },
  {
    slug: "panepistimio",
    name: { el: "Πανεπιστήμιο", en: "Panepistimio" },
    branch: "trunk",
    order: 6,
    opened: "2024-11-30",
    blurb: {
      el: "Ο σταθμός των μουσείων, του ΑΠΘ και της ΔΕΘ, και η πιο βολική πρόσβαση στον Λευκό Πύργο και τη Νέα Παραλία.",
      en: "The station for the museums, the university and the trade fair, and the easiest access to the White Tower and the seafront.",
    },
    long: {
      el: `Λίγοι σταθμοί εξυπηρετούν τόσα διαφορετικά πράγματα. Εδώ συναντιούνται η πανεπιστημιούπολη, ο εκθεσιακός χώρος της πόλης και δύο από τα σημαντικότερα μουσεία της Ελλάδας.

## Κατέβα εδώ για
- Το **Αρχαιολογικό Μουσείο Θεσσαλονίκης**, με τα ευρήματα της Μακεδονίας.
- Το **Μουσείο Βυζαντινού Πολιτισμού**, από τα κορυφαία του είδους του διεθνώς.
- Το **Αριστοτέλειο Πανεπιστήμιο**, τη μεγαλύτερη πανεπιστημιούπολη της χώρας.
- Τον χώρο της **ΔΕΘ (HELEXPO)** και τον Πύργο του ΟΤΕ.
- Τον **Λευκό Πύργο** και τη **Νέα Παραλία**, λίγα λεπτά με τα πόδια προς τη θάλασσα.

## Πού σε βγάζει
Στο ανατολικό άκρο του κέντρου, εκεί όπου η πόλη ανοίγει σε πάρκα και πλατείες. Είναι η πιο άνετη αφετηρία για περπάτημα στην παραλία μέχρι τις «Ομπρέλες» του Ζογγολόπουλου.

## Καλό να ξέρεις
Τις μέρες της **ΔΕΘ**, τον Σεπτέμβριο, ο σταθμός έχει πολύ μεγάλη κίνηση. Αν πηγαίνεις στην έκθεση, υπολόγισε επιπλέον χρόνο.`,
      en: `Few stations serve so many different things at once. Here the university campus, the city's exhibition grounds and two of Greece's most important museums all come together.

## Get off here for
- The **Archaeological Museum of Thessaloniki**, with the finds of Macedonia.
- The **Museum of Byzantine Culture**, among the finest of its kind anywhere.
- The **Aristotle University**, the largest campus in the country.
- The **TIF (HELEXPO)** exhibition grounds and the OTE Tower.
- The **White Tower** and the **Nea Paralia**, a few minutes' walk toward the sea.

## Where it puts you
At the eastern edge of the centre, where the city opens into parks and squares. It's the most comfortable starting point for a walk along the seafront to Zongolopoulos' "Umbrellas".

## Good to know
During the **TIF** trade fair in September the station gets very busy. If you're heading to the exhibition, allow extra time.`,
    },
    center: { lat: 40.63, lng: 22.957 },
    area: "waterfront",
    nearbyPlaces: ["white-tower", "nea-paralia", "archaeological-museum", "museum-of-byzantine-culture"],
    featured: true,
  },
  {
    slug: "papafi",
    name: { el: "Παπάφη", en: "Papafi" },
    branch: "trunk",
    order: 7,
    opened: "2024-11-30",
    blurb: {
      el: "Καθημερινή ανατολική γειτονιά, εκτός τουριστικών διαδρομών, εδώ ζει η πόλη μακριά από το κέντρο.",
      en: "An everyday eastern neighbourhood off the tourist trail, where the city lives away from the centre.",
    },
    long: {
      el: `Μετά το Πανεπιστήμιο η γραμμή αφήνει το ιστορικό κέντρο και μπαίνει στις πυκνοκατοικημένες ανατολικές συνοικίες. Η Παπάφη είναι η πρώτη από αυτές.

## Πού σε βγάζει
Σε μια τυπική θεσσαλονικιώτικη γειτονιά: πολυκατοικίες, φούρνοι, ψητοπωλεία και καφενεία που εξυπηρετούν κατοίκους, όχι επισκέπτες. Η περιοχή πήρε το όνομά της από το **Παπάφειο**, το ιστορικό ίδρυμα που δεσπόζει στην περιοχή.

## Κατέβα εδώ για
- Φαγητό σε τιμές γειτονιάς, μακριά από τα τουριστικά κέντρα.
- Πρόσβαση στις ανατολικές συνοικίες χωρίς αυτοκίνητο.

## Καλό να ξέρεις
Δεν είναι στάση για αξιοθέατα. Είναι όμως χρήσιμη αν μένεις ανατολικά ή αν θέλεις να δεις πώς είναι η πόλη έξω από τη βιτρίνα της.`,
      en: `After Panepistimio the line leaves the historic centre and enters the densely populated eastern districts. Papafi is the first of them.

## Where it puts you
In a typical Thessaloniki neighbourhood: apartment blocks, bakeries, grill houses and cafés serving residents rather than visitors. The area takes its name from the **Papafeio**, the historic institution that dominates it.

## Get off here for
- Food at neighbourhood prices, away from the tourist centre.
- Access to the eastern districts without a car.

## Good to know
This isn't a stop for sights. It is useful, though, if you're staying to the east or want to see what the city looks like beyond its shop window.`,
    },
    center: { lat: 40.622, lng: 22.96 },
  },
  {
    slug: "efkleidis",
    name: { el: "Ευκλείδης", en: "Efkleidis" },
    branch: "trunk",
    order: 8,
    opened: "2024-11-30",
    blurb: {
      el: "Πυκνοκατοικημένη περιοχή ανάμεσα στο κέντρο και τη Χαριλάου, με έντονη καθημερινή κίνηση.",
      en: "A densely built area between the centre and Charilaou, busy with everyday life.",
    },
    long: {
      el: `Ο σταθμός εξυπηρετεί μία από τις πιο πυκνοκατοικημένες ζώνες της ανατολικής Θεσσαλονίκης, εκεί όπου το κέντρο έχει τελειώσει αλλά η πόλη συνεχίζει αδιάκοπα.

## Πού σε βγάζει
Σε περιοχή κατοικίας και μικρού εμπορίου, ανάμεσα στην Παπάφη και την Ανάληψη. Οι δρόμοι εδώ είναι στενοί και γεμάτοι μαγαζιά γειτονιάς.

## Κατέβα εδώ για
- Καθημερινές εξυπηρετήσεις και τοπικά μαγαζιά.
- Σύνδεση με λεωφορεία προς τις ανατολικές συνοικίες.

## Καλό να ξέρεις
Πριν από το μετρό, η διαδρομή από εδώ στο κέντρο μπορούσε να πάρει 30 λεπτά με λεωφορείο στην κίνηση. Τώρα είναι λίγες στάσεις.`,
      en: `The station serves one of the most densely populated zones of eastern Thessaloniki, where the centre has ended but the city continues without a break.

## Where it puts you
In an area of housing and small trade, between Papafi and Analipsi. The streets here are narrow and full of neighbourhood shops.

## Get off here for
- Everyday services and local shops.
- Bus connections toward the eastern districts.

## Good to know
Before the metro, the trip from here to the centre could take 30 minutes by bus in traffic. Now it's a few stops.`,
    },
    center: { lat: 40.618, lng: 22.964 },
  },
  {
    slug: "fleming",
    name: { el: "Φλέμινγκ", en: "Fleming" },
    branch: "trunk",
    order: 9,
    opened: "2024-11-30",
    blurb: {
      el: "Ανατολική συνοικία με έντονο οικιστικό χαρακτήρα, σε απόσταση αναπνοής από τη Χαριλάου.",
      en: "An eastern district, strongly residential, a short walk from Charilaou.",
    },
    long: {
      el: `Ο σταθμός Φλέμινγκ βρίσκεται στον οικιστικό ιστό της ανατολικής πόλης, ανάμεσα στον Ευκλείδη και την Ανάληψη.

## Πού σε βγάζει
Σε γειτονιά κατοίκων: πολυκατοικίες, σχολεία, πλατείες και μαγαζιά καθημερινής χρήσης. Κοντά βρίσκεται και η περιοχή της **Χαριλάου**, μία από τις μεγάλες ανατολικές συνοικίες.

## Κατέβα εδώ για
- Πρόσβαση στη Χαριλάου και τις γύρω γειτονιές.
- Τοπικές ταβέρνες και καφέ χωρίς τουριστικές τιμές.

## Καλό να ξέρεις
Όπως και οι γειτονικοί σταθμοί, εξυπηρετεί κυρίως καθημερινές μετακινήσεις. Για τα αξιοθέατα, συνέχισε προς το κέντρο.`,
      en: `Fleming station sits in the residential fabric of the eastern city, between Efkleidis and Analipsi.

## Where it puts you
In a residents' neighbourhood: apartment blocks, schools, squares and everyday shops. Nearby is **Charilaou**, one of the large eastern districts.

## Get off here for
- Access to Charilaou and the surrounding neighbourhoods.
- Local tavernas and cafés without tourist prices.

## Good to know
Like its neighbouring stations, it mainly serves daily commutes. For the sights, stay on toward the centre.`,
    },
    center: { lat: 40.615, lng: 22.967 },
  },
  {
    slug: "analipsi",
    name: { el: "Ανάληψη", en: "Analipsi" },
    branch: "trunk",
    order: 10,
    opened: "2024-11-30",
    blurb: {
      el: "Η τελευταία στάση πριν ο κόμβος χωρίσει το δίκτυο σε δύο κλάδους.",
      en: "The last stop before the junction splits the network into two branches.",
    },
    long: {
      el: `Η Ανάληψη είναι μια κλασική ανατολική γειτονιά της Θεσσαλονίκης, χτισμένη πυκνά και κατοικημένη από γενιές. Ο σταθμός βρίσκεται στη **Γεωργίου Δροσίνη 4** και εξυπηρετεί μια περιοχή που ζει όλο τον χρόνο, όχι μόνο την τουριστική σεζόν.

## Ο σταθμός που δυσκόλεψε τους μηχανικούς
Οι περισσότεροι σταθμοί του δικτύου σκάφτηκαν σε βάθος, με τη σήραγγα να περνά από κάτω. Στην Ανάληψη δεν γινόταν: η **οδός Δελφών**, όπου σχεδιαζόταν ο σταθμός, ήταν πολύ στενή. Έτσι επιλέχθηκε η μέθοδος του ανοιχτού ορύγματος με επικάλυψη, το λεγόμενο *cut-and-cover*, που σημαίνει ότι ο δρόμος ανοίγει από την επιφάνεια, χτίζεται ο σταθμός και μετά ξανακλείνει από πάνω.

Το κόστος το πλήρωσε η γειτονιά: από τον Σεπτέμβριο του 2011 έκλεισε τμήμα 250 μέτρων της Δελφών, **από την Μάρκου Μπότσαρη μέχρι την Πέτρου Συνδίκα**, και η κυκλοφορία εκτράπηκε στη Σόλωνος. Αν θυμάσαι τη γειτονιά εκείνα τα χρόνια, θυμάσαι το όρυγμα.

## Πού σε βγάζει
Σε περιοχή κατοικίας με πλατείες, σχολεία και εμπορικούς δρόμους γειτονιάς. Δεν υπάρχουν αξιοθέατα εδώ, και δεν έχει νόημα να προσποιηθούμε ότι υπάρχουν. Υπάρχει όμως κάτι που οι τουριστικοί οδηγοί σπάνια δείχνουν: η καθημερινή Θεσσαλονίκη, με τιμές κατοίκων και χωρίς μενού σε τέσσερις γλώσσες.

## Κατέβα εδώ για
- Τοπικά μαγαζιά, φούρνους και ταβέρνες γειτονιάς μακριά από το κέντρο.
- Τις γύρω ανατολικές συνοικίες, με τα πόδια.
- Ανταπόκριση με τις λεωφορειακές γραμμές **33, 33Α και 39Β**.

## Η επόμενη στάση αλλάζει τα πάντα
Η Ανάληψη είναι ο **τελευταίος σταθμός του κοινού τμήματος**. Μέχρι εδώ περνούν και οι δύο γραμμές του δικτύου, η **Γραμμή 1** και η **Γραμμή 2**, κάνοντας ακριβώς την ίδια διαδρομή από τον Νέο Σιδηροδρομικό Σταθμό. Από την επόμενη στάση, την **25ης Μαρτίου**, χωρίζουν: η Γραμμή 1 συνεχίζει προς τη Νέα Ελβετία, η Γραμμή 2 προς την Καλαμαριά και τη Μίκρα.

Πρακτικά αυτό σημαίνει ότι αν επιβιβαστείς εδώ με κατεύθυνση ανατολικά, πρέπει να κοιτάξεις τον τερματικό στην ένδειξη του συρμού. Προς την αντίθετη κατεύθυνση δεν χρειάζεται να προσέξεις τίποτα: όλα τα δρομολόγια καταλήγουν στον Νέο Σιδηροδρομικό Σταθμό.

## Καλό να ξέρεις
Ο σταθμός έχει **μία κεντρική αποβάθρα** που εξυπηρετεί και τις δύο κατευθύνσεις, οπότε δεν υπάρχει περίπτωση να βρεθείς σε λάθος πλευρά — αλλάζεις κατεύθυνση χωρίς να βγεις. Διαθέτει **πρόσβαση για ΑμεΑ**. Άνοιξε στις 30 Νοεμβρίου 2024, με την πρώτη γραμμή του μετρό.`,
      en: `Analipsi is a classic eastern Thessaloniki neighbourhood, densely built and lived in for generations. The station stands at **4 Georgiou Drosini Street** and serves an area that is busy all year, not only in season.

## The station that gave the engineers trouble
Most stations on the network were mined at depth, with the tunnel running beneath. At Analipsi that was not possible: **Delfon Street**, where the station was planned, was simply too narrow. Engineers used cut-and-cover instead — opening the street from the surface, building the station, then closing it over again.

The neighbourhood paid for it. From September 2011 a 250-metre stretch of Delfon closed, **from Markou Botsari to Petrou Syndika**, with traffic diverted along Solonos. If you remember the neighbourhood in those years, you remember the trench.

## Where it puts you
In a residential area of squares, schools and neighbourhood shopping streets. There are no sights here, and there is no point pretending otherwise. There is something guidebooks rarely show, though: everyday Thessaloniki, at residents' prices and without menus in four languages.

## Get off here for
- Local shops, bakeries and neighbourhood tavernas well away from the centre.
- The surrounding eastern districts, on foot.
- Connections with bus lines **33, 33A and 39B**.

## The next stop changes everything
Analipsi is the **last station on the shared section**. Both of the network's services, **Line 1** and **Line 2**, run through here along exactly the same route from the New Railway Station. From the next stop, **25is Martiou**, they part: Line 1 continues to Nea Elvetia, Line 2 to Kalamaria and Mikra.

In practice that means if you board here heading east, check the terminus on the train's display. In the opposite direction there is nothing to watch for: every service ends at the New Railway Station.

## Good to know
The station has **one central platform** serving both directions, so you cannot end up on the wrong side — you change direction without leaving. It has **step-free access**. It opened on 30 November 2024, with the metro's first line.`,
    },
    seoTitle: {
      el: "Μετρό Ανάληψη: η τελευταία πριν τον κόμβο",
      en: "Analipsi metro: last stop before the junction",
    },
    seoDescription: {
      el: "Η τελευταία στάση του κοινού τμήματος, πριν το δίκτυο χωριστεί σε Νέα Ελβετία και Καλαμαριά. Τι υπάρχει στη γειτονιά και πόσο απέχει το κέντρο.",
      en: "The last stop on the shared section, before the network splits toward Nea Elvetia and Kalamaria. What is in the neighbourhood and how far the centre is.",
    },
    updated: "2026-09-17",
    address: { el: "Γεωργίου Δροσίνη 4, Θεσσαλονίκη", en: "4 Georgiou Drosini St, Thessaloniki" },
    platforms: { el: "Μία κεντρική αποβάθρα, δύο τροχιές", en: "One central platform serving two tracks" },
    stepFree: true,
    busLines: ["33", "33Α", "39Β"],
    center: { lat: 40.612, lng: 22.97 },
  },
  {
    slug: "25is-martiou",
    name: { el: "25ης Μαρτίου", en: "25is Martiou" },
    branch: "trunk",
    order: 11,
    opened: "2024-11-30",
    blurb: {
      el: "Ο κόμβος του δικτύου: εδώ χωρίζονται ο κλάδος της Νέας Ελβετίας και ο κλάδος της Καλαμαριάς.",
      en: "The network's junction: here the Nea Elvetia branch and the Kalamaria branch divide.",
    },
    long: {
      el: `Ο πιο σημαντικός σταθμός του δικτύου από πλευράς λειτουργίας, και ο μόνος όπου πρέπει πραγματικά να προσέξεις ποιον συρμό παίρνεις. Βρίσκεται στην **25ης Μαρτίου 57**, σε πυκνοκατοικημένη ανατολική περιοχή, στα όρια ανάμεσα στις συνοικίες της Τούμπας και της Ανάληψης.

## Ο κόμβος
Μέχρι εδώ όλοι οι συρμοί ακολουθούν την ίδια διαδρομή από τον Νέο Σιδηροδρομικό Σταθμό. Από την 25ης Μαρτίου και μετά οι **δύο γραμμές** χωρίζουν:

- η **Γραμμή 1** συνεχίζει ανατολικά προς **Νέα Ελβετία** (Βούλγαρη → Νέα Ελβετία)·
- η **Γραμμή 2** στρίβει νότια προς **Μίκρα** (Νομαρχία → Καλαμαριά → Αρετσού → Νέα Κρήνη → Μίκρα).

Είναι το σημείο όπου η γεωμετρία του δικτύου γίνεται ερώτημα για τον επιβάτη. Παντού αλλού αρκεί να ξέρεις αν πας ανατολικά ή δυτικά. Εδώ όχι.

## Ποιον συρμό να πάρεις
Οι ενδείξεις στις αποβάθρες και μέσα στα βαγόνια δείχνουν τον **τερματικό σταθμό** κάθε δρομολογίου, όχι τον κλάδο. Οπότε:

- Για **Καλαμαριά, Αρετσού, Νέα Κρήνη ή το αεροδρόμιο**, θέλεις τη **Γραμμή 2** — ο συρμός πρέπει να γράφει **Μίκρα**.
- Για **Βούλγαρη ή τις ανατολικές συνοικίες**, θέλεις τη **Γραμμή 1** — ο συρμός πρέπει να γράφει **Νέα Ελβετία**.
- Προς το κέντρο δεν υπάρχει δίλημμα: όλα τα δρομολόγια καταλήγουν στον **Νέο Σιδηροδρομικό Σταθμό**.

## Αν μπεις σε λάθος συρμό
Δεν είναι δράμα, αλλά κοστίζει χρόνο. Κατεβαίνεις στην πρώτη στάση της λάθος γραμμής, περιμένεις τον επόμενο συρμό προς τα πίσω, επιστρέφεις στην 25ης Μαρτίου και ξεκινάς ξανά. Υπολόγισε δέκα με δεκαπέντε λεπτά. Το εισιτήριο δεν χάνεται: ισχύει για τη διαδρομή, όχι για τη γραμμή.

## Πού σε βγάζει
Σε καθημερινή ανατολική γειτονιά, χωρίς τουριστικό ενδιαφέρον αλλά με πλήρη εξυπηρέτηση. Από εδώ περνούν οι λεωφορειακές γραμμές **30, 33, 33Α και 33Β**, γεγονός που κάνει τον σταθμό χρήσιμο σημείο μετεπιβίβασης και προς τα ανατολικά προάστια.

## Καλό να ξέρεις
Παρά τον ρόλο του ως κόμβου, ο σταθμός έχει **μία κεντρική αποβάθρα** με δύο τροχιές — δεν υπάρχουν ξεχωριστές αποβάθρες ανά κλάδο. Αυτό ακριβώς είναι που κάνει την ένδειξη του τερματικού τόσο σημαντική: οι δύο κλάδοι φεύγουν από το ίδιο σημείο όπου στέκεσαι. Διαθέτει **πρόσβαση για ΑμεΑ** και άνοιξε στις 30 Νοεμβρίου 2024.`,
      en: `Operationally the most important station on the network, and the only one where you genuinely need to check which train you are boarding. It stands at **57 25is Martiou Street**, in a densely populated eastern area on the boundary between the Toumba and Analipsi districts.

## The junction
Up to this point every train follows the same route from the New Railway Station. From 25is Martiou onward the **two lines** part company:

- **Line 1** continues east to **Nea Elvetia** (Voulgari → Nea Elvetia);
- **Line 2** turns south to **Mikra** (Nomarchia → Kalamaria → Aretsou → Nea Krini → Mikra).

This is where the network's geometry becomes a question for the passenger. Everywhere else it is enough to know whether you are heading east or west. Not here.

## Which train to board
Platform and in-car displays show each service's **terminus**, not its branch. So:

- For **Kalamaria, Aretsou, Nea Krini or the airport**, you want **Line 2** — the train must read **Mikra**.
- For **Voulgari or the eastern districts**, you want **Line 1** — it must read **Nea Elvetia**.
- Toward the centre there is no dilemma: every service ends at the **New Railway Station**.

## If you board the wrong train
Not a disaster, but it costs time. Get off at the first stop on the wrong line, wait for the next service back, return to 25is Martiou and start again. Allow ten to fifteen minutes. Your ticket is not wasted: it covers the journey, not the line.

## Where it puts you
In an everyday eastern neighbourhood, of no tourist interest but fully served. Bus lines **30, 33, 33A and 33B** call here, which makes the station a useful interchange toward the eastern suburbs as well.

## Good to know
Despite its role as the junction, the station has **one central platform** with two tracks — there are no separate platforms per branch. That is exactly why the terminus display matters so much: both branches leave from the very spot where you are standing. It has **step-free access** and opened on 30 November 2024.`,
    },
    seoTitle: {
      el: "Μετρό 25ης Μαρτίου: ποιον συρμό να πάρεις",
      en: "25is Martiou metro: which train to board",
    },
    seoDescription: {
      el: "Ο κόμβος του δικτύου, ο μόνος σταθμός όπου πρέπει να προσέξεις τον τερματικό του συρμού. Πώς χωρίζονται οι δύο κλάδοι και πού πάει ο καθένας.",
      en: "The network's junction, the one station where you must check your train's terminus. How the two branches divide and where each one goes.",
    },
    updated: "2026-09-17",
    address: { el: "25ης Μαρτίου 57, Θεσσαλονίκη", en: "57 25is Martiou St, Thessaloniki" },
    platforms: { el: "Μία κεντρική αποβάθρα, δύο τροχιές", en: "One central platform serving two tracks" },
    stepFree: true,
    busLines: ["30", "33", "33Α", "33Β"],
    center: { lat: 40.608, lng: 22.972 },
    featured: true,
  },
  {
    slug: "voulgari",
    name: { el: "Βούλγαρη", en: "Voulgari" },
    branch: "nea-elvetia",
    order: 12,
    opened: "2024-11-30",
    blurb: {
      el: "Στον κλάδο της Νέας Ελβετίας, στην πλευρά της Τούμπας. Η στάση των ημερών αγώνα.",
      en: "On the Nea Elvetia branch, on the Toumba side. The stop for match days.",
    },
    long: {
      el: `Ο σταθμός βρίσκεται στον ανατολικό κλάδο, στην περιοχή που κατεβαίνει προς την **Τούμπα**.

## Κατέβα εδώ για
- Την περιοχή της **Τούμπας** και το **Στάδιο Τούμπας**, έδρα του ΠΑΟΚ, ένα από τα πιο θορυβώδη γήπεδα της Ελλάδας.
- Αυθεντικά ψητοπωλεία και μεζεδοπωλεία της γειτονιάς.

## Καλό να ξέρεις
Τις ημέρες αγώνα η κίνηση προς και από τον σταθμό είναι πολύ αυξημένη. Το μετρό είναι σαφώς η πιο εύκολη λύση για να πλησιάσεις την περιοχή, καθώς το παρκάρισμα εκεί είναι πρακτικά αδύνατο.

## Πού σε βγάζει
Σε πυκνοκατοικημένη γειτονιά με έντονο λαϊκό χαρακτήρα, χτισμένη σε μεγάλο βαθμό από πρόσφυγες της Μικράς Ασίας μετά το 1922.`,
      en: `The station sits on the eastern branch, in the area running down toward **Toumba**.

## Get off here for
- The **Toumba** district and **Toumba Stadium**, home of PAOK and one of the loudest grounds in Greece.
- Authentic neighbourhood grill houses and meze places.

## Good to know
On match days traffic to and from the station is very heavy. The metro is clearly the easiest way to reach the area, since parking there is practically impossible.

## Where it puts you
In a densely populated, strongly working-class neighbourhood, largely built by refugees from Asia Minor after 1922.`,
    },
    center: { lat: 40.605, lng: 22.976 },
    area: "toumba",
  },
  {
    slug: "nea-elvetia",
    name: { el: "Νέα Ελβετία", en: "Nea Elvetia" },
    branch: "nea-elvetia",
    order: 13,
    opened: "2024-11-30",
    blurb: {
      el: "Το ανατολικό τέρμα του δικτύου και βασικό σημείο μετεπιβίβασης προς τις ανατολικές συνοικίες και την Πυλαία.",
      en: "The network's eastern terminus and a key interchange for the eastern districts and Pylaia.",
    },
    long: {
      el: `Το ανατολικό τέρμα του ενός κλάδου. Λειτουργεί κυρίως ως **κόμβος μετεπιβίβασης**: εδώ καταλήγουν λεωφορειακές γραμμές από τις ανατολικές συνοικίες και τα προάστια.

## Κατέβα εδώ για
- Μετεπιβίβαση σε λεωφορεία προς **Πυλαία**, **Πανόραμα** και τις ανατολικές γειτονιές.
- Πρόσβαση προς τον περιφερειακό και τα μεγάλα εμπορικά κέντρα της Πυλαίας.

## Καλό να ξέρεις
Αν έρχεσαι από τα ανατολικά προάστια με αυτοκίνητο ή λεωφορείο, η Νέα Ελβετία είναι το φυσικό σημείο να αφήσεις τον δρόμο και να μπεις στο μετρό, γλιτώνεις την κίνηση της Εγνατίας και το παρκάρισμα στο κέντρο.

## Πού σε βγάζει
Στο ανατολικό όριο του πυκνού αστικού ιστού, εκεί όπου η πόλη αρχίζει να ανοίγει προς την Πυλαία και τον περιφερειακό.`,
      en: `The eastern terminus of one branch. It works mainly as an **interchange**: bus routes from the eastern districts and suburbs terminate here.

## Get off here for
- Bus connections toward **Pylaia**, **Panorama** and the eastern neighbourhoods.
- Access to the ring road and Pylaia's large shopping centres.

## Good to know
If you're coming in from the eastern suburbs by car or bus, Nea Elvetia is the natural place to leave the road and take the metro; you skip Egnatia's traffic and the parking problem downtown.

## Where it puts you
At the eastern edge of the dense urban fabric, where the city begins to open toward Pylaia and the ring road.`,
    },
    center: { lat: 40.601, lng: 22.98 },
    area: "pylaia",
  },
  {
    slug: "nomarchia",
    name: { el: "Νομαρχία", en: "Nomarchia" },
    branch: "kalamaria",
    order: 14,
    opened: "2026-08-27",
    blurb: {
      el: "Ο πρώτος σταθμός της επέκτασης προς Καλαμαριά, στο ύψος των κτιρίων της Περιφέρειας.",
      en: "The first station on the Kalamaria extension, by the regional authority buildings.",
    },
    long: {
      el: `Ο πρώτος από τους πέντε νέους σταθμούς που άνοιξαν στις **27 Αυγούστου 2026** με την επέκταση προς την Καλαμαριά.

## Πού σε βγάζει
Στην περιοχή όπου βρίσκονται τα κτίρια της **Περιφέρειας Κεντρικής Μακεδονίας**: από εκεί και το όνομα, που κρατά από την εποχή της Νομαρχίας. Είναι ζώνη γραφείων και δημόσιων υπηρεσιών, στα όρια ανάμεσα στον Δήμο Θεσσαλονίκης και την Καλαμαριά.

## Κατέβα εδώ για
- Δημόσιες υπηρεσίες και γραφεία της Περιφέρειας.
- Πρόσβαση στις γειτονιές ανάμεσα στην Τούμπα και την Καλαμαριά.

## Καλό να ξέρεις
Με το άνοιγμα της επέκτασης, διαδρομές που παλιά απαιτούσαν μετεπιβίβαση και μισή ώρα στην κίνηση γίνονται τώρα σε λίγα λεπτά.`,
      en: `The first of the five new stations that opened on **27 August 2026** with the extension toward Kalamaria.

## Where it puts you
In the area of the **Central Macedonia regional authority** buildings: hence the name, which survives from the old prefecture. This is a zone of offices and public services, on the boundary between the Municipality of Thessaloniki and Kalamaria.

## Get off here for
- Public services and regional authority offices.
- Access to the neighbourhoods between Toumba and Kalamaria.

## Good to know
With the extension open, journeys that once needed a transfer and half an hour in traffic now take a few minutes.`,
    },
    center: { lat: 40.5975, lng: 22.964 },
  },
  {
    slug: "kalamaria",
    name: { el: "Καλαμαριά", en: "Kalamaria" },
    branch: "kalamaria",
    order: 15,
    opened: "2026-08-27",
    blurb: {
      el: "Το κέντρο της Καλαμαριάς, πλέον λίγα λεπτά από την Αριστοτέλους. Η μεγαλύτερη αλλαγή που έφερε η επέκταση.",
      en: "The centre of Kalamaria, now minutes from Aristotelous. The biggest change the extension brought.",
    },
    long: {
      el: `Η Καλαμαριά είναι ένας από τους μεγαλύτερους δήμους του πολεοδομικού συγκροτήματος, και μέχρι το 2026 η σύνδεσή της με το κέντρο περνούσε αποκλειστικά από τη μόνιμη κίνηση της παραλιακής και της Βασιλίσσης Όλγας.

## Πού σε βγάζει
Στο εμπορικό κέντρο της Καλαμαριάς, με τα καταστήματα, τα καφέ και τις πλατείες της. Η περιοχή χτίστηκε από πρόσφυγες της Μικράς Ασίας και κρατά μέχρι σήμερα δικό της, ανεξάρτητο χαρακτήρα από τη Θεσσαλονίκη.

## Κατέβα εδώ για
- Το κέντρο και τους εμπορικούς δρόμους της **Καλαμαριάς**.
- Καφέ και εστιατόρια με πιο ήρεμο, οικογενειακό ύφος από το κέντρο.
- Πρόσβαση προς την παραλιακή ζώνη της Αρετσούς με τα πόδια.

## Καλό να ξέρεις
Είναι από τις πιο χρήσιμες στάσεις για επισκέπτες που μένουν ανατολικά: η διαδρομή προς το ιστορικό κέντρο γίνεται πλέον χωρίς αυτοκίνητο και χωρίς κίνηση.`,
      en: `Kalamaria is one of the largest municipalities in the urban area, and until 2026 its link to the centre ran entirely through the permanent traffic of the coastal road and Vasilissis Olgas.

## Where it puts you
In Kalamaria's commercial centre, among its shops, cafés and squares. The area was built by refugees from Asia Minor and to this day keeps its own identity, distinct from Thessaloniki.

## Get off here for
- The centre and shopping streets of **Kalamaria**.
- Cafés and restaurants with a calmer, more family-oriented feel than downtown.
- Walking access to the Aretsou seafront.

## Good to know
It's one of the most useful stops for visitors staying east: the trip to the historic centre now happens without a car and without traffic.`,
    },
    center: { lat: 40.583, lng: 22.956 },
    area: "kalamaria",
    featured: true,
  },
  {
    slug: "aretsou",
    name: { el: "Αρετσού", en: "Aretsou" },
    branch: "kalamaria",
    order: 16,
    opened: "2026-08-27",
    blurb: {
      el: "Η στάση της μαρίνας: το πιο ήρεμο ηλιοβασίλεμα της πόλης, πλέον με μετρό.",
      en: "The marina stop: the city's calmest sunset, now reachable by metro.",
    },
    long: {
      el: `Ένας από τους πιο ελκυστικούς νέους σταθμούς για επισκέπτες, γιατί σε αφήνει κοντά στη θάλασσα χωρίς αυτοκίνητο. Βρίσκεται στη συμβολή **Πόντου και Αγίου Ζαχαρίου**, στην Καλαμαριά, και άνοιξε στις 27 Αυγούστου 2026 μαζί με την υπόλοιπη επέκταση.

## Ένα όνομα που ήρθε από απέναντι
Η Αρετσού δεν είναι ελληνική τοπωνυμία με ρίζα στην περιοχή. Η γειτονιά λέγεται **Νέα Αρετσού** και πήρε το όνομά της από την **Αρετσού της Μικράς Ασίας**, παραθαλάσσια κωμόπολη κοντά στη Νικομήδεια, απ' όπου ήρθαν οι πρόσφυγες που εγκαταστάθηκαν εδώ μετά το 1922.

Το «Νέα» έπεσε με τον καιρό στην καθημερινή γλώσσα, όπως έπεσε και στη Νέα Κρήνη δίπλα. Ολόκληρη η θαλάσσια πλευρά της Καλαμαριάς είναι χτισμένη από προσφυγικές κοινότητες που έδωσαν στις νέες τους γειτονιές τα ονόματα εκείνων που άφησαν πίσω. Το ξέρεις περπατώντας: οι δρόμοι λέγονται Πόντου, Νικομηδείας, Κυζίκου.

## Κατέβα εδώ για
- Τη **μαρίνα Αρετσούς** με τα δεμένα ιστιοπλοϊκά.
- Τον παραλιακό πεζόδρομο της Καλαμαριάς, πιο ήσυχο και οικογενειακό από τη Νέα Παραλία.
- Καφέ και ψαροταβέρνες με θέα προς τον Θερμαϊκό και τον **Όλυμπο** απέναντι.

## Το ηλιοβασίλεμα
Είναι ο λόγος που αξίζει να προγραμματίσεις την επίσκεψη. Ο ήλιος δύει **πίσω από τον Όλυμπο**, ακριβώς απέναντι από την ακτή, και η Καλαμαριά έχει το πλεονέκτημα ότι κοιτάζει κατευθείαν προς τα εκεί — σε αντίθεση με τη Νέα Παραλία, που βλέπει πιο λοξά.

Μέχρι τον Αύγουστο του 2026 αυτό ήταν προνόμιο όσων είχαν αυτοκίνητο ή έμεναν στην περιοχή. Είναι η πιο συγκεκριμένη αλλαγή που έφερε η επέκταση: ένα ηλιοβασίλεμα που μπορείς πλέον να πιάσεις με ένα εισιτήριο των 0,60 €.

## Πού σε βγάζει
Στη Νέα Κρήνη και την Αρετσού, τη θαλάσσια πλευρά της Καλαμαριάς, με έντονο μεσογειακό χαρακτήρα. Η απόσταση μέχρι το νερό είναι μικρή και το περπάτημα εύκολο, σε επίπεδο έδαφος.

## Καλό να ξέρεις
Από τον σταθμό περνούν η τοπική γραμμή **07Τ** της Καλαμαριάς και η **04Β** των ΚΤΕΛ Χαλκιδικής — χρήσιμη λεπτομέρεια αν συνδυάζεις την πόλη με τη Χαλκιδική. Ο σταθμός ανήκει στη **Γραμμή 2** και έχει **μία κεντρική αποβάθρα** με **πρόσβαση για ΑμεΑ**. Προς το κέντρο όλοι οι συρμοί καταλήγουν στον Νέο Σιδηροδρομικό Σταθμό, οπότε δεν υπάρχει δίλημμα γραμμής από εδώ — το δίλημμα το συναντάς στην επιστροφή, αν αλλάξεις στην 25ης Μαρτίου.`,
      en: `One of the most appealing new stations for visitors, because it leaves you near the sea without a car. It stands at the corner of **Pontou and Agiou Zachariou** in Kalamaria, and opened on 27 August 2026 with the rest of the extension.

## A name that came from across the water
Aretsou is not a local Greek place name. The neighbourhood is properly **Nea Aretsou**, and it takes its name from **Aretsou in Asia Minor**, a coastal town near Nicomedia, from which the refugees who settled here came after 1922.

The "Nea" dropped out of everyday speech over time, as it did at neighbouring Nea Krini. The whole seaward side of Kalamaria was built by refugee communities who gave their new neighbourhoods the names of the ones they had left. You notice it walking: the streets are called Pontou, Nikomideias, Kyzikou.

## Get off here for
- **Aretsou Marina** and its moored sailing boats.
- Kalamaria's seafront promenade, quieter and more family-oriented than the Nea Paralia.
- Cafés and fish tavernas looking across the Thermaic Gulf to **Mount Olympus**.

## The sunset
This is the reason to plan your visit around a time of day. The sun sets **behind Mount Olympus**, directly across the water, and Kalamaria has the advantage of facing straight at it — unlike the Nea Paralia, which looks out at an angle.

Until August 2026 this was a privilege for people with a car or an address nearby. It is the most concrete change the extension brought: a sunset you can now reach on a €0.60 ticket.

## Where it puts you
In Nea Krini and Aretsou, the seaward side of Kalamaria, with a distinctly Mediterranean feel. The water is a short walk away, and the walk is flat and easy.

## Good to know
Kalamaria's local line **07T** and the Chalkidiki KTEL line **04B** both call here — useful if you are combining the city with Chalkidiki. The station is on **Line 2** and has **one central platform** with **step-free access**. Toward the centre every train ends at the New Railway Station, so there is no line to get wrong from here — that decision comes on the way back, if you change at 25is Martiou.`,
    },
    seoTitle: {
      el: "Μετρό Αρετσού: μαρίνα και ηλιοβασίλεμα",
      en: "Aretsou metro: the marina and the sunset",
    },
    seoDescription: {
      el: "Η στάση της μαρίνας Αρετσούς, με τον παραλιακό πεζόδρομο της Καλαμαριάς και θέα στον Όλυμπο. Προσβάσιμη χωρίς αυτοκίνητο από τον Αύγουστο του 2026.",
      en: "The stop for Aretsou Marina, with Kalamaria's seafront promenade and a view to Mount Olympus. Reachable without a car since August 2026.",
    },
    updated: "2026-09-17",
    address: { el: "Πόντου και Αγίου Ζαχαρίου, Καλαμαριά", en: "Pontou & Agiou Zachariou, Kalamaria" },
    platforms: { el: "Μία κεντρική αποβάθρα, δύο τροχιές", en: "One central platform serving two tracks" },
    stepFree: true,
    busLines: ["04Β", "07Τ"],
    center: { lat: 40.576, lng: 22.949 },
    area: "aretsou",
    featured: true,
  },
  {
    slug: "nea-krini",
    name: { el: "Νέα Κρήνη", en: "Nea Krini" },
    branch: "kalamaria",
    order: 17,
    opened: "2026-08-27",
    blurb: {
      el: "Προσφυγική γειτονιά δίπλα στη θάλασσα, με ήσυχο παραθαλάσσιο χαρακτήρα.",
      en: "A refugee-founded neighbourhood by the sea, with a quiet seaside character.",
    },
    long: {
      el: `Η Νέα Κρήνη πήρε το όνομά της από την **Κρήνη (Τσεσμέ)** της Μικράς Ασίας, από όπου ήρθαν οι πρόσφυγες που την έχτισαν μετά το 1922.

## Πού σε βγάζει
Σε ήσυχη παραθαλάσσια γειτονιά της Καλαμαριάς, με χαμηλά κτίρια, μικρές πλατείες και άμεση πρόσβαση στην ακτή.

## Κατέβα εδώ για
- Τον παραλιακό πεζόδρομο και τη βόλτα προς τη μαρίνα.
- Ταβέρνες και καφέ γειτονιάς με θέα στη θάλασσα.

## Καλό να ξέρεις
Μαζί με την Αρετσού συνθέτουν τη θαλάσσια πλευρά της Καλαμαριάς. Και οι δύο σταθμοί εξυπηρετούν την ίδια παραλιακή ζώνη, διάλεξε ανάλογα με το πού ακριβώς θέλεις να βγεις.`,
      en: `Nea Krini takes its name from **Krini (Çeşme)** in Asia Minor, home of the refugees who built it after 1922.

## Where it puts you
In a quiet seaside neighbourhood of Kalamaria, with low buildings, small squares and direct access to the shore.

## Get off here for
- The seafront promenade and the walk toward the marina.
- Neighbourhood tavernas and cafés looking out to sea.

## Good to know
Together with Aretsou it makes up the seaward side of Kalamaria. Both stations serve the same coastal strip, pick whichever suits where exactly you want to come out.`,
    },
    center: { lat: 40.571, lng: 22.945 },
    area: "aretsou",
  },
  {
    slug: "mikra",
    name: { el: "Μίκρα", en: "Mikra" },
    branch: "kalamaria",
    order: 18,
    opened: "2026-08-27",
    blurb: {
      el: "Το νότιο τέρμα και η στάση για το αεροδρόμιο, από εδώ η γραμμή Χ3 σε πάει στο «Μακεδονία».",
      en: "The southern terminus and the airport stop, bus X3 runs from here to Makedonia Airport.",
    },
    long: {
      el: `Το νότιο τέρμα του δικτύου και ο σταθμός με τη μεγαλύτερη πρακτική σημασία για όποιον ταξιδεύει αεροπορικώς.

## Το αεροδρόμιο
**Το μετρό δεν φτάνει στο αεροδρόμιο.** Η σύνδεση γίνεται με τη λεωφορειακή γραμμή **Χ3**, που ξεκινά από τον σταθμό Μίκρα και καταλήγει στο αεροδρόμιο **«Μακεδονία»**. Η γραμμή τέθηκε σε λειτουργία μαζί με την επέκταση, στις 27 Αυγούστου 2026, και έχει ειδικό κόμιστρο **2,00 €**, διαφορετικό από το κανονικό εισιτήριο του μετρό.

Η διαδρομή Μίκρα – κέντρο διαρκεί περίπου **15 λεπτά**, ενώ μέχρι τον Νέο Σιδηροδρομικό Σταθμό υπολογίζονται περίπου **24 έως 26 λεπτά**.

## Άλλες συνδέσεις
Από τη Μίκρα ξεκινά και η γραμμή **Μ2** προς το εμπορικό κέντρο IKEA, με κανονικό αστικό κόμιστρο, ενώ οι γραμμές **6Α/6Β** και **7Τ** συνδέουν τον σταθμό με την Καλαμαριά και τη Νέα Ελβετία.

## Καλό να ξέρεις
Αν έχεις πρωινή πτήση, υπολόγισε τον χρόνο της μετεπιβίβασης στη Μίκρα και το ωράριο του μετρό: τα δρομολόγια ξεκινούν στις 05:15.`,
      en: `The southern terminus, and the station that matters most to anyone flying.

## The airport
**The metro does not reach the airport.** The link is bus line **X3**, which runs from Mikra station to **"Makedonia" Airport**. The line began operating alongside the extension on 27 August 2026 and carries a special fare of **€2.00**, different from the standard metro ticket.

The trip from Mikra to the centre takes about **15 minutes**, while the New Railway Station is roughly **24 to 26 minutes** away.

## Other connections
Line **M2** also starts at Mikra, running to the IKEA shopping centre at the standard city fare, while lines **6A/6B** and **7T** connect the station with Kalamaria and Nea Elvetia.

## Good to know
If you have an early flight, allow time for the transfer at Mikra and check the metro's hours: services begin at 05:15.`,
    },
    center: { lat: 40.562, lng: 22.95 },
    connections: {
      el: "Λεωφορειακή γραμμή Χ3 προς το αεροδρόμιο «Μακεδονία» (ειδικό κόμιστρο 2,00 €), γραμμή Μ2 προς IKEA, γραμμές 6Α/6Β και 7Τ προς Καλαμαριά και Νέα Ελβετία.",
      en: "Bus X3 to \"Makedonia\" Airport (special fare €2.00), line M2 to IKEA, lines 6A/6B and 7T to Kalamaria and Nea Elvetia.",
    },
    featured: true,
  },
];

const stationBySlug = new Map(metroStations.map((s) => [s.slug, s]));

export function getMetroStation(slug: string): MetroStation | undefined {
  return stationBySlug.get(slug);
}

/** Stations in running order along the network. */
export function getMetroStations(): MetroStation[] {
  return [...metroStations].sort((a, b) => a.order - b.order);
}

/**
 * The numbered lines calling at a station.
 *
 * The operator names the two services Line 1 (to Nea Elvetia) and Line 2 (to
 * Mikra); both run the whole trunk, so eleven of the eighteen stations are
 * served by each. The site described these as «branches» everywhere and never
 * once by the number printed on the platform signage — which is also what
 * people type into a search box.
 */
export function linesFor(station: MetroStation): ("1" | "2")[] {
  if (station.branch === "nea-elvetia") return ["1"];
  if (station.branch === "kalamaria") return ["2"];
  return ["1", "2"];
}

/** Stations serving a given area slug. */
export function getStationsForArea(areaSlug: string): MetroStation[] {
  return metroStations.filter((s) => s.area === areaSlug);
}

/** Network facts, verified Sept 2026. Kept here so pages never hardcode them. */
export const metroFacts = {
  stations: 18,
  lengthKm: 14.4,
  openedLine1: "2024-11-30",
  openedKalamaria: "2026-08-27",
  firstTrain: "05:15",
  lastTrainWeek: "00:30",
  lastTrainWeekend: "02:00",
  singleTicketEur: 0.6,
  dayTicketEur: 2.5,
  airportBus: "X3",
  airportBusFareEur: 2,
};

/**
 * Distance in stops from the junction at 25is Martiou.
 *
 * `order` is one sequence across the whole network, so it cannot be subtracted
 * directly: the Kalamaria branch starts at 14 because the Nea Elvetia branch
 * took 12 and 13, yet its first station is one stop from the junction, not
 * three. Trunk stations count backwards from the junction; branch stations
 * count their position within their own branch.
 */
function distanceFromJunction(station: MetroStation): number {
  if (station.branch === "trunk") return JUNCTION_ORDER - station.order;
  return (
    metroStations
      .filter((s) => s.branch === station.branch)
      .sort((a, b) => a.order - b.order)
      .findIndex((s) => s.slug === station.slug) + 1
  );
}

/**
 * Stops between two stations, counting the way a passenger counts them.
 *
 * Two stations on the same arm of the network are a subtraction. Anything else
 * runs in to the junction and back out, so the two distances add — and where
 * both ends sit on different branches that also means changing trains, which
 * `requiresChange` reports separately.
 */
export function stopsBetween(a: MetroStation, b: MetroStation): number {
  const da = distanceFromJunction(a);
  const db = distanceFromJunction(b);
  return a.branch === b.branch ? Math.abs(da - db) : da + db;
}

/** True when the trip cannot be made without changing at the junction. */
export function requiresChange(a: MetroStation, b: MetroStation): boolean {
  return (
    a.branch !== "trunk" &&
    b.branch !== "trunk" &&
    a.branch !== b.branch
  );
}

/** The terminus a passenger reads on the platform display, per direction. */
export function terminiFor(station: MetroStation): {
  inbound: MetroStation;
  outbound: MetroStation[];
} {
  const all = getMetroStations();
  const inbound = all[0];
  const east = all.filter((s) => s.branch === "nea-elvetia").at(-1);
  const south = all.filter((s) => s.branch === "kalamaria").at(-1);
  if (station.branch === "nea-elvetia") {
    return { inbound, outbound: east ? [east] : [] };
  }
  if (station.branch === "kalamaria") {
    return { inbound, outbound: south ? [south] : [] };
  }
  // On the trunk both branch termini are served from the same platform, which
  // is exactly the thing people get wrong.
  return { inbound, outbound: [east, south].filter((s): s is MetroStation => Boolean(s)) };
}

/**
 * The handful of stations worth measuring every other station against: where
 * the trains are, where the historic centre is, and where the airport bus
 * leaves from. Gives each station page a table of real numbers that no other
 * station page carries.
 */
export const KEY_DESTINATIONS = [
  { slug: "neos-sidirodromikos-stathmos", reason: { el: "τρένα προς την υπόλοιπη Ελλάδα", en: "trains to the rest of Greece" } },
  { slug: "venizelou", reason: { el: "ιστορικό κέντρο και Λαδάδικα", en: "historic centre and Ladadika" } },
  { slug: "sintrivani", reason: { el: "Ροτόντα, Καμάρα και Ναυαρίνου", en: "Rotunda, Kamara and Navarinou" } },
  { slug: "kalamaria", reason: { el: "Καλαμαριά και παραλία Αρετσούς", en: "Kalamaria and the Aretsou seafront" } },
  { slug: "mikra", reason: { el: "μεταφορά για το αεροδρόμιο με Χ3", en: "airport transfer on bus X3" } },
] as const;

/** Key destinations other than the station you are standing on. */
export function keyDestinationsFrom(station: MetroStation): {
  station: MetroStation;
  stops: number;
  change: boolean;
  reason: Localized<string>;
}[] {
  return KEY_DESTINATIONS.flatMap(({ slug, reason }) => {
    const target = getMetroStation(slug);
    if (!target || target.slug === station.slug) return [];
    return [
      {
        station: target,
        stops: stopsBetween(station, target),
        change: requiresChange(station, target),
        reason,
      },
    ];
  });
}
