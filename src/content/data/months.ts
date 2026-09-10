import type { Localized } from "@/lib/types";

/**
 * "Thessaloniki in <month>" pages: weather, what's on, and what to do.
 *
 * Climate figures are MONTHLY AVERAGES, rounded, and are labelled as
 * approximate on the page. Anchors cross-checked (Sept 2026): Köppen Cfa;
 * annual precipitation ~658 mm; August driest (~35 mm), December wettest
 * (~76 mm); warmest months July-August (~32 °C daily max), coldest January
 * (~10 °C max / ~3 °C min). They are climate normals, never a forecast.
 *
 * Recurring events named here are long-standing, publicly documented fixtures.
 * Exact dates change year to year, so no page states one.
 */
export interface CityMonth {
  slug: string;
  /** 1-12, for ordering and date handling. */
  number: number;
  name: Localized<string>;
  /** Accusative form, needed for Greek: "Θεσσαλονίκη τον Σεπτέμβριο". */
  nameAcc: Localized<string>;
  season: Localized<string>;
  /** Average daily maximum, °C, approximate. */
  tempHigh: number;
  /** Average daily minimum, °C, approximate. */
  tempLow: number;
  /** Relative rainfall through the year. */
  rain: "low" | "medium" | "high";
  /** How busy the city feels for a visitor. */
  crowds: "low" | "medium" | "high";
  /** Whether the sea is realistically warm enough for swimming. */
  seaSwimmable: boolean;
  blurb: Localized<string>;
  long: Localized<string>;
  /** Recurring fixtures this month. No exact dates, they move each year. */
  highlights: Localized<string>[];
}

export const cityMonths: CityMonth[] = [
  {
    slug: "january",
    number: 1,
    name: { el: "Ιανουάριος", en: "January" },
    nameAcc: { el: "Ιανουάριο", en: "January" },
    season: { el: "Καρδιά του χειμώνα", en: "Deep winter" },
    tempHigh: 10,
    tempLow: 3,
    rain: "medium",
    crowds: "low",
    seaSwimmable: false,
    blurb: {
      el: "Ο πιο κρύος μήνας, με άδεια αξιοθέατα, φθηνή διαμονή και μια πόλη που ανήκει ξανά στους κατοίκους της.",
      en: "The coldest month, with empty sights, cheap rooms and a city that belongs to its residents again.",
    },
    long: {
      el: `## Ο καιρός
Ο ψυχρότερος μήνας του χρόνου: μέση μέγιστη γύρω στους **10 °C** και ελάχιστη γύρω στους **3 °C**. Ο Βαρδάρης, ο βόρειος άνεμος που κατεβαίνει από την κοιλάδα του Αξιού, κάνει την αίσθηση αρκετά πιο κρύα από όσο δείχνει το θερμόμετρο. Χιόνι στο κέντρο πέφτει σπάνια, στο Πανόραμα και τα Χορτιάτη πιο συχνά.

## Τι γίνεται
Η πόλη ξεκινά με τα **Θεοφάνεια**, όταν ο αγιασμός των υδάτων γίνεται στην παραλία και κολυμβητές βουτούν στον χειμωνιάτικο Θερμαϊκό. Ακολουθούν οι χειμερινές εκπτώσεις και μια πυκνή θεατρική και μουσική σεζόν. Ο Ιανουάριος είναι από τους πιο δραστήριους μήνες για παραστάσεις.

## Τι να κάνεις
Είναι ο ιδανικός μήνας για **μουσεία** χωρίς ουρές: Αρχαιολογικό, Βυζαντινού Πολιτισμού, MOMus. Οι ζεστές μπουγατσαρίες και τα καφενεία λειτουργούν ως καταφύγιο, και η Άνω Πόλη με καθαρό χειμωνιάτικο αέρα δίνει την πιο καθαρή θέα του χρόνου προς τον Όλυμπο.

## Τι να πάρεις μαζί
Χειμωνιάτικο μπουφάν, κασκόλ και αδιάβροχα παπούτσια. Τα πεζοδρόμια γλιστρούν όταν βρέχει.`,
      en: `## The weather
The coldest month of the year: average highs around **10 °C** and lows near **3 °C**. The Vardaris, the northerly wind funnelling down the Axios valley, makes it feel considerably colder than the thermometer suggests. Snow rarely settles in the centre, more often up in Panorama and Chortiatis.

## What's on
The year opens with **Epiphany**, when the blessing of the waters takes place on the waterfront and swimmers dive into the winter Thermaic Gulf. The winter sales follow, along with a dense theatre and music season, January is one of the busiest months for performances.

## What to do
This is the ideal month for **museums** without queues: the Archaeological, Byzantine Culture and MOMus. Warm bougatsa shops and cafés serve as refuges, and Ano Poli in clear winter air gives the sharpest view of the year toward Mount Olympus.

## What to pack
A winter coat, a scarf and waterproof shoes. The pavements get slippery in the rain.`,
    },
    highlights: [
      { el: "Θεοφάνεια και αγιασμός των υδάτων στην παραλία", en: "Epiphany and the blessing of the waters on the seafront" },
      { el: "Χειμερινές εκπτώσεις", en: "Winter sales" },
      { el: "Κορύφωση της θεατρικής σεζόν", en: "Peak of the theatre season" },
    ],
  },
  {
    slug: "february",
    number: 2,
    name: { el: "Φεβρουάριος", en: "February" },
    nameAcc: { el: "Φεβρουάριο", en: "February" },
    season: { el: "Τέλος χειμώνα", en: "Late winter" },
    tempHigh: 12,
    tempLow: 4,
    rain: "medium",
    crowds: "low",
    seaSwimmable: false,
    blurb: {
      el: "Κρύος ακόμα, αλλά με τις Απόκριες να ζεσταίνουν την πόλη και τις πρώτες ηλιόλουστες μέρες στην παραλία.",
      en: "Still cold, but Carnival warms the city and the first sunny days appear on the seafront.",
    },
    long: {
      el: `## Ο καιρός
Ελαφρώς ηπιότερος από τον Ιανουάριο: μέση μέγιστη γύρω στους **12 °C**, ελάχιστη γύρω στους **4 °C**. Εμφανίζονται οι πρώτες καθαρές, ηλιόλουστες μέρες όπου η παραλία γεμίζει κόσμο με παλτά και καφέδες.

## Τι γίνεται
Οι **Απόκριες** κυριαρχούν. Η ακριβής ημερομηνία αλλάζει κάθε χρόνο γιατί ακολουθεί το Πάσχα. Οι γειτονιές διοργανώνουν παρελάσεις, τα σχολεία μασκαράδες και τα μπαρ θεματικά πάρτι. Στην ευρύτερη Μακεδονία επιβιώνουν αρχαϊκά έθιμα με κουδούνια και μεταμφιέσεις που κρατούν από διονυσιακές τελετές.

## Τι να κάνεις
Είναι ο μήνας για **τσίπουρο και μεζέδες** σε ζεστά μεζεδοπωλεία, για τα σκεπαστά **Μοδιάνο** και **Καπάνι**, και για μουσεία. Αν πετύχεις ηλιόλουστο Σαββατοκύριακο, η βόλτα στη Νέα Παραλία μέχρι τις «Ομπρέλες» είναι από τις καλύτερες του χρόνου, χωρίς ζέστη και χωρίς πλήθος.

## Τι να πάρεις μαζί
Ζεστά ρούχα σε στρώσεις: οι μέρες μπορεί να ξεκινούν παγωμένες και να κλείνουν ήπιες.`,
      en: `## The weather
Slightly milder than January: average highs around **12 °C**, lows near **4 °C**. The first clear, sunny days appear, when the seafront fills with people in coats holding coffees.

## What's on
**Carnival** dominates. The exact dates shift each year because they follow Easter. Neighbourhoods organise parades, schools dress up and bars run themed parties. Across wider Macedonia, archaic customs with bells and masks survive from Dionysian rites.

## What to do
This is the month for **tsipouro and mezedes** in warm meze houses, for the covered **Modiano** and **Kapani** markets, and for museums. If you catch a sunny weekend, the walk along the Nea Paralia to the "Umbrellas" is one of the year's best: no heat, no crowds.

## What to pack
Warm layers: days can start freezing and end mild.`,
    },
    highlights: [
      { el: "Απόκριες και καρναβαλικές εκδηλώσεις (κινητή ημερομηνία)", en: "Carnival season (movable dates)" },
      { el: "Παραδοσιακά δρώμενα στη Μακεδονία", en: "Traditional customs across Macedonia" },
    ],
  },
  {
    slug: "march",
    number: 3,
    name: { el: "Μάρτιος", en: "March" },
    nameAcc: { el: "Μάρτιο", en: "March" },
    season: { el: "Αρχή άνοιξης", en: "Early spring" },
    tempHigh: 16,
    tempLow: 7,
    rain: "medium",
    crowds: "low",
    seaSwimmable: false,
    blurb: {
      el: "Η άνοιξη ξεκινά, το Φεστιβάλ Ντοκιμαντέρ γεμίζει τις αίθουσες και η πόλη βγαίνει ξανά έξω.",
      en: "Spring begins, the Documentary Festival fills the cinemas and the city moves outdoors again.",
    },
    long: {
      el: `## Ο καιρός
Απότομη βελτίωση: μέση μέγιστη γύρω στους **16 °C**. Οι μέρες μεγαλώνουν αισθητά και τα τραπεζάκια βγαίνουν ξανά στα πεζοδρόμια, αν και τα βράδια παραμένουν δροσερά και οι βροχές συχνές.

## Τι γίνεται
Το **Φεστιβάλ Ντοκιμαντέρ Θεσσαλονίκης** είναι το μεγάλο γεγονός του μήνα και μετατρέπει το λιμάνι και τις αίθουσες του κέντρου σε τόπο συνάντησης. Η **25η Μαρτίου** φέρνει στρατιωτική παρέλαση στην παραλία, ενώ η **Καθαρά Δευτέρα** (κινητή ημερομηνία) βγάζει τους Θεσσαλονικείς στα υψώματα με χαρταετούς και νηστίσιμο τραπέζι.

## Τι να κάνεις
Ιδανικός μήνας για **περπάτημα**: τα βυζαντινά τείχη, η Άνω Πόλη και το Επταπύργιο χωρίς τη ζέστη του καλοκαιριού. Η φύση γύρω από την πόλη ανθίζει, οπότε αξίζει και μια εκδρομή προς τη Βεργίνα ή την Έδεσσα.

## Τι να πάρεις μαζί
Ένα αδιάβροχο και ρούχα σε στρώσεις. Ο Μάρτιος αλλάζει διάθεση μέσα στην ίδια μέρα.`,
      en: `## The weather
A sharp improvement: average highs around **16 °C**. Days lengthen noticeably and tables return to the pavements, though evenings stay cool and rain is frequent.

## What's on
The **Thessaloniki Documentary Festival** is the month's big event, turning the port and the city's cinemas into a meeting place. **25 March** brings a military parade along the waterfront, while **Clean Monday** (a movable date) sends locals up to the hills with kites and a Lenten spread.

## What to do
An ideal month for **walking**: the Byzantine walls, Ano Poli and the Heptapyrgion without summer heat. The countryside around the city is in bloom, so a day trip to Vergina or Edessa is well worth it.

## What to pack
A raincoat and layers. March changes its mind within a single day.`,
    },
    highlights: [
      { el: "Φεστιβάλ Ντοκιμαντέρ Θεσσαλονίκης", en: "Thessaloniki Documentary Festival" },
      { el: "Παρέλαση 25ης Μαρτίου", en: "25 March parade" },
      { el: "Καθαρά Δευτέρα με χαρταετούς (κινητή ημερομηνία)", en: "Clean Monday kite-flying (movable date)" },
    ],
  },
  {
    slug: "april",
    number: 4,
    name: { el: "Απρίλιος", en: "April" },
    nameAcc: { el: "Απρίλιο", en: "April" },
    season: { el: "Άνοιξη", en: "Spring" },
    tempHigh: 19,
    tempLow: 11,
    rain: "medium",
    crowds: "medium",
    seaSwimmable: false,
    blurb: {
      el: "Ίσως ο ωραιότερος μήνας για να δεις την πόλη: ήπιος καιρός, ανθισμένη παραλία και ελληνικό Πάσχα.",
      en: "Perhaps the loveliest month to see the city: mild weather, a blossoming seafront and Greek Easter.",
    },
    long: {
      el: `## Ο καιρός
Μέση μέγιστη γύρω στους **19 °C**: ζεστά για περπάτημα, δροσερά για να μη σε κουράζει ο ήλιος. Η θάλασσα είναι ακόμη κρύα για κολύμπι.

## Τι γίνεται
Το **ελληνικό Πάσχα** πέφτει συνήθως τον Απρίλιο (η ημερομηνία αλλάζει κάθε χρόνο). Τη Μεγάλη Παρασκευή οι επιτάφιοι βγαίνουν στους δρόμους και η πόλη σιωπά· το Σάββατο τα μεσάνυχτα ανάβουν τα κεριά και ακολουθεί μαγειρίτσα. Πολλά μαγαζιά κλείνουν για μερικές μέρες και οι κάτοικοι φεύγουν στα χωριά. Η πόλη γίνεται ασυνήθιστα ήσυχη.

## Τι να κάνεις
Ο καλύτερος μήνας για τα **υπαίθρια αξιοθέατα**: Ροτόντα, Αψίδα Γαλερίου, Ρωμαϊκή Αγορά και τα τείχη, όλα χωρίς καύσωνα. Η Νέα Παραλία γεμίζει ποδήλατα και οικογένειες, και τα rooftops ανοίγουν ξανά.

## Τι να πάρεις μαζί
Ελαφριά ρούχα και ένα μπουφάν για το βράδυ. Αν ταξιδεύεις το Πάσχα, κλείσε διαμονή νωρίς.`,
      en: `## The weather
Average highs around **19 °C**: warm enough for walking, cool enough that the sun never wears you down. The sea is still too cold for swimming.

## What's on
**Greek Easter** usually falls in April (the date moves each year). On Good Friday the epitaphioi are carried through the streets and the city falls silent; at midnight on Saturday candles are lit and magiritsa follows. Many businesses close for a few days and residents leave for their villages. The city turns unusually quiet.

## What to do
The best month for **outdoor sights**: the Rotunda, the Arch of Galerius, the Roman Forum and the walls, all without a heatwave. The Nea Paralia fills with bicycles and families, and the rooftops reopen.

## What to pack
Light clothes and a jacket for the evening. If you're travelling over Easter, book accommodation early.`,
    },
    highlights: [
      { el: "Ελληνικό Πάσχα: επιτάφιοι και Ανάσταση (κινητή ημερομηνία)", en: "Greek Easter: epitaphioi and the Resurrection (movable date)" },
      { el: "Πρωτομαγιά στα προάστια (τέλος μήνα)", en: "May Day preparations in the suburbs" },
    ],
  },
  {
    slug: "may",
    number: 5,
    name: { el: "Μάιος", en: "May" },
    nameAcc: { el: "Μάιο", en: "May" },
    season: { el: "Τέλος άνοιξης", en: "Late spring" },
    tempHigh: 25,
    tempLow: 15,
    rain: "medium",
    crowds: "medium",
    seaSwimmable: false,
    blurb: {
      el: "Ζέστη χωρίς καύσωνα, μεγάλες μέρες και η πόλη στην καλύτερη διάθεσή της πριν το καλοκαίρι.",
      en: "Warmth without a heatwave, long days and the city at its best mood before summer.",
    },
    long: {
      el: `## Ο καιρός
Μέση μέγιστη γύρω στους **25 °C**. Είναι το σημείο ισορροπίας του χρόνου: αρκετά ζεστά για κοντομάνικο και βραδινή έξοδο χωρίς μπουφάν, αλλά χωρίς την αποπνικτική υγρασία του Ιουλίου.

## Τι γίνεται
Η **Πρωτομαγιά** βγάζει τον κόσμο στην εξοχή. Ξεκινούν τα υπαίθρια φεστιβάλ και οι συναυλίες, τα rooftops δουλεύουν κάθε βράδυ και η φοιτητική ζωή φτάνει στο τελευταίο της κύμα πριν την εξεταστική.

## Τι να κάνεις
Ο ιδανικός μήνας για **βόλτα με σκάφος** στον Θερμαϊκό στο ηλιοβασίλεμα και για τη διαδρομή στη Νέα Παραλία με ποδήλατο. Καλή στιγμή και για την πρώτη εκδρομή προς **Χαλκιδική**: οι παραλίες είναι ακόμη άδειες, αν και η θάλασσα μόλις αρχίζει να ζεσταίνεται.

## Τι να πάρεις μαζί
Αντηλιακό και καπέλο. Ο ήλιος του Μαΐου δυναμώνει απότομα.`,
      en: `## The weather
Average highs around **25 °C**. This is the year's balance point: warm enough for short sleeves and jacket-free evenings, without July's stifling humidity.

## What's on
**May Day** sends everyone out to the countryside. Open-air festivals and concerts begin, rooftops work every night, and student life reaches its last wave before exams.

## What to do
The ideal month for a **boat trip** on the Thermaic Gulf at sunset and for cycling the Nea Paralia. Also a good moment for a first run down to **Chalkidiki**: the beaches are still empty, though the sea is only starting to warm.

## What to pack
Sunscreen and a hat. The May sun strengthens abruptly.`,
    },
    highlights: [
      { el: "Πρωτομαγιά", en: "May Day" },
      { el: "Έναρξη υπαίθριων φεστιβάλ και συναυλιών", en: "Open-air festivals and concerts begin" },
    ],
  },
  {
    slug: "june",
    number: 6,
    name: { el: "Ιούνιος", en: "June" },
    nameAcc: { el: "Ιούνιο", en: "June" },
    season: { el: "Αρχή καλοκαιριού", en: "Early summer" },
    tempHigh: 29,
    tempLow: 20,
    rain: "low",
    crowds: "medium",
    seaSwimmable: true,
    blurb: {
      el: "Το καλοκαίρι ξεκινά, η θάλασσα ζεσταίνεται και η πόλη ζει έξω μέχρι αργά.",
      en: "Summer starts, the sea warms up and the city lives outdoors until late.",
    },
    long: {
      el: `## Ο καιρός
Μέση μέγιστη γύρω στους **29 °C** και οι μεγαλύτερες μέρες του χρόνου. Οι βροχές αραιώνουν αισθητά. Η υγρασία ανεβαίνει προς το τέλος του μήνα, αλλά ο Ιούνιος σπάνια φτάνει τον πνιγηρό καύσωνα του Αυγούστου.

## Τι γίνεται
Οι φοιτητές φεύγουν και η πόλη αλλάζει ρυθμό. Ξεκινούν τα **θερινά σινεμά** και οι υπαίθριες συναυλίες, ενώ τα παραλιακά μαγαζιά σε Αρετσού και Περαία δουλεύουν κάθε μέρα.

## Τι να κάνεις
Πρώτος μήνας με **κολυμπήσιμη θάλασσα**. Στην ίδια την πόλη δεν κολυμπάς: πας Περαία, Αγία Τριάδα ή Χαλκιδική, μισή ώρα με μία ώρα δρόμο. Τα αξιοθέατα βλέπονται καλύτερα νωρίς το πρωί ή μετά τις 18:00.

## Τι να πάρεις μαζί
Μαγιό, αντηλιακό και ένα μπουκάλι νερό. Το κέντρο έχει βρύσες, αλλά ο ήλιος στα ανοιχτά μνημεία δεν συγχωρεί.`,
      en: `## The weather
Average highs around **29 °C** and the longest days of the year. Rain thins out noticeably. Humidity climbs toward month's end, but June rarely reaches August's suffocating heat.

## What's on
The students leave and the city changes rhythm. **Open-air cinemas** and outdoor concerts begin, while the seaside places in Aretsou and Peraia work every day.

## What to do
The first month with a **swimmable sea**. You don't swim in the city itself; you go to Peraia, Agia Triada or Chalkidiki, thirty minutes to an hour away. Sights are best seen early in the morning or after 18:00.

## What to pack
Swimwear, sunscreen and a water bottle. The centre has fountains, but the sun at the open monuments is unforgiving.`,
    },
    highlights: [
      { el: "Έναρξη θερινών κινηματογράφων", en: "Open-air cinemas open" },
      { el: "Υπαίθριες συναυλίες και φεστιβάλ", en: "Outdoor concerts and festivals" },
    ],
  },
  {
    slug: "july",
    number: 7,
    name: { el: "Ιούλιος", en: "July" },
    nameAcc: { el: "Ιούλιο", en: "July" },
    season: { el: "Καρδιά του καλοκαιριού", en: "High summer" },
    tempHigh: 32,
    tempLow: 22,
    rain: "low",
    crowds: "low",
    seaSwimmable: true,
    blurb: {
      el: "Ζέστη και υγρασία, οι ντόπιοι φεύγουν για Χαλκιδική και το κέντρο ανήκει σε όσους μένουν πίσω.",
      en: "Heat and humidity, locals leave for Chalkidiki and the centre belongs to whoever stays.",
    },
    long: {
      el: `## Ο καιρός
Μαζί με τον Αύγουστο, ο πιο ζεστός μήνας: μέση μέγιστη γύρω στους **32 °C** και ελάχιστη που δύσκολα πέφτει κάτω από τους **22 °C**. Η υγρασία από τον Θερμαϊκό κάνει τα βράδια αποπνικτικά, ιδίως στο κλειστό κέντρο. Βροχή σχεδόν δεν πέφτει.

## Τι γίνεται
Η Θεσσαλονίκη **αδειάζει**: όποιος μπορεί φεύγει για Χαλκιδική και Πιερία. Πολλά μαγαζιά του κέντρου κλείνουν για διακοπές, ενώ η ζωή μετακομίζει στα παραλιακά προάστια και τα rooftops.

## Τι να κάνεις
Αντίστροφο πρόγραμμα: αξιοθέατα και μουσεία **πριν τις 11:00**, μεσημέρι σε κλιματιζόμενο χώρο ή στη θάλασσα, έξοδος μετά τη δύση. Το ηλιοβασίλεμα από την Άνω Πόλη ή την Αρετσού είναι η αποζημίωση της ημέρας.

## Τι να πάρεις μαζί
Καπέλο, αντηλιακό, νερό και ρούχα από βαμβάκι ή λινό. Απόφυγε το μαύρο.`,
      en: `## The weather
Along with August, the hottest month: average highs around **32 °C** and lows that barely drop below **22 °C**. Humidity off the Thermaic Gulf makes evenings stifling, especially in the enclosed centre. Rain is almost absent.

## What's on
Thessaloniki **empties out**: everyone who can leaves for Chalkidiki and Pieria. Many businesses in the centre close for the holidays, while life moves to the coastal suburbs and the rooftops.

## What to do
Reverse your schedule: sights and museums **before 11:00**, midday somewhere air-conditioned or in the sea, out after sunset. Sunset from Ano Poli or Aretsou is the day's reward.

## What to pack
A hat, sunscreen, water and cotton or linen. Avoid black.`,
    },
    highlights: [
      { el: "Θερινά σινεμά κάθε βράδυ", en: "Open-air cinemas every night" },
      { el: "Παραλιακά προάστια και Χαλκιδική στην κορύφωσή τους", en: "Coastal suburbs and Chalkidiki at their peak" },
    ],
  },
  {
    slug: "august",
    number: 8,
    name: { el: "Αύγουστος", en: "August" },
    nameAcc: { el: "Αύγουστο", en: "August" },
    season: { el: "Κορύφωση καλοκαιριού", en: "Peak summer" },
    tempHigh: 32,
    tempLow: 22,
    rain: "low",
    crowds: "low",
    seaSwimmable: true,
    blurb: {
      el: "Ο πιο ξηρός μήνας του χρόνου και η πιο άδεια πόλη: φθηνή διαμονή, μηδέν ουρές, πολλή ζέστη.",
      en: "The driest month and the emptiest city: cheap rooms, no queues, plenty of heat.",
    },
    long: {
      el: `## Ο καιρός
Ο **πιο ξηρός μήνας** του χρόνου, με βροχόπτωση γύρω στα 35 mm και μέση μέγιστη κοντά στους **32 °C**. Οι νύχτες μένουν ζεστές και υγρές.

## Τι γίνεται
Στις **15 Αυγούστου**, τον Δεκαπενταύγουστο, η πόλη φτάνει στο απόλυτο κενό της: κλειστά καταστήματα, άδειοι δρόμοι, μεγάλες γιορτές στα χωριά της Μακεδονίας. Προς το τέλος του μήνα η πόλη αρχίζει να επιστρέφει, καθώς πλησιάζει η ΔΕΘ.

## Τι να κάνεις
Παραδόξως, καλός μήνας για επίσκεψη αν αντέχεις τη ζέστη: **μηδέν ουρές** στα μνημεία, φθηνότερη διαμονή και εύκολο παρκάρισμα. Συνδύασέ τον με θάλασσα, από Περαία μέχρι Σιθωνία.

## Τι να πάρεις μαζί
Ό,τι και τον Ιούλιο, συν υπομονή για τα κλειστά μαγαζιά γύρω στις 15 του μήνα.`,
      en: `## The weather
The **driest month** of the year, with rainfall around 35 mm and average highs near **32 °C**. Nights stay warm and humid.

## What's on
On **15 August**, the Dekapentavgoustos, the city reaches its emptiest point: shuttered shops, empty streets, and large festivals in the Macedonian villages. Toward month's end the city begins to return as the trade fair approaches.

## What to do
Paradoxically a good month to visit if you can take the heat: **no queues** at the monuments, cheaper accommodation and easy parking. Pair it with the sea, from Peraia down to Sithonia.

## What to pack
Everything you'd bring in July, plus patience for closed shops around the 15th.`,
    },
    highlights: [
      { el: "Δεκαπενταύγουστος: γιορτές στη Μακεδονία", en: "15 August: festivals across Macedonia" },
      { el: "Η πιο ήσυχη περίοδος στα αξιοθέατα", en: "The quietest period at the sights" },
    ],
  },
  {
    slug: "september",
    number: 9,
    name: { el: "Σεπτέμβριος", en: "September" },
    nameAcc: { el: "Σεπτέμβριο", en: "September" },
    season: { el: "Τέλος καλοκαιριού", en: "Late summer" },
    tempHigh: 27,
    tempLow: 18,
    rain: "low",
    crowds: "high",
    seaSwimmable: true,
    blurb: {
      el: "Ο μήνας της ΔΕΘ: η πόλη γεμίζει ξανά, ο καιρός τελειοποιείται και η θάλασσα είναι ακόμη ζεστή.",
      en: "Trade fair month: the city refills, the weather turns ideal and the sea is still warm.",
    },
    long: {
      el: `## Ο καιρός
Ίσως ο **καλύτερος μήνας του χρόνου**: μέση μέγιστη γύρω στους **27 °C**, χωρίς την υγρασία του Αυγούστου, και θάλασσα που παραμένει ζεστή από το καλοκαίρι.

## Τι γίνεται
Η **Διεθνής Έκθεση Θεσσαλονίκης (ΔΕΘ)** κυριαρχεί. Είναι ο κορυφαίος εκθεσιακός θεσμός της χώρας εδώ και έναν αιώνα και φέρνει δεκάδες χιλιάδες επισκέπτες, πολιτικές ομιλίες και συναυλίες. Παράλληλα τρέχουν το **Πικ Νικ Urban Festival** στις γειτονιές και το **«Σινεμά στις Γειτονιές»**, με δωρεάν προβολές σε πλατείες και σχολικές αυλές.

## Τι να κάνεις
Όλα. Κολύμπι στη Χαλκιδική το πρωί, μνημεία το απόγευμα, συναυλία το βράδυ. Ο σταθμός μετρό **Πανεπιστήμιο** εξυπηρετεί απευθείας τον χώρο της ΔΕΘ.

## Τι να πάρεις μαζί
Καλοκαιρινά ρούχα και κάτι ελαφρύ για τα πρώτα δροσερά βράδια. **Κλείσε διαμονή νωρίς**, τις μέρες της ΔΕΘ τα ξενοδοχεία γεμίζουν και οι τιμές ανεβαίνουν.`,
      en: `## The weather
Perhaps the **best month of the year**: average highs around **27 °C**, without August's humidity, and a sea still warm from summer.

## What's on
The **Thessaloniki International Fair (TIF)** dominates. It has been the country's leading exhibition institution for a century, drawing tens of thousands of visitors, political speeches and concerts. Alongside it run the **Pik Nik Urban Festival** in the neighbourhoods and **"Cinema in the Neighbourhoods"**, with free screenings in squares and schoolyards.

## What to do
Everything. Swim in Chalkidiki in the morning, monuments in the afternoon, a concert at night. The **Panepistimio** metro station serves the fairgrounds directly.

## What to pack
Summer clothes plus something light for the first cool evenings. **Book early**, during the fair hotels fill up and prices climb.`,
    },
    highlights: [
      { el: "Διεθνής Έκθεση Θεσσαλονίκης (ΔΕΘ)", en: "Thessaloniki International Fair (TIF)" },
      { el: "Πικ Νικ Urban Festival", en: "Pik Nik Urban Festival" },
      { el: "«Σινεμά στις Γειτονιές»: δωρεάν προβολές", en: "\"Cinema in the Neighbourhoods\": free screenings" },
    ],
  },
  {
    slug: "october",
    number: 10,
    name: { el: "Οκτώβριος", en: "October" },
    nameAcc: { el: "Οκτώβριο", en: "October" },
    season: { el: "Φθινόπωρο", en: "Autumn" },
    tempHigh: 22,
    tempLow: 13,
    rain: "medium",
    crowds: "medium",
    seaSwimmable: false,
    blurb: {
      el: "Ο μήνας της πόλης: γιορτή του πολιούχου, επέτειος απελευθέρωσης, Δημήτρια και τέλειος καιρός για περπάτημα.",
      en: "The city's own month: its patron saint, the liberation anniversary, the Dimitria festival and perfect walking weather.",
    },
    long: {
      el: `## Ο καιρός
Ήπιο φθινόπωρο με μέση μέγιστη γύρω στους **22 °C**. Οι βροχές επιστρέφουν αλλά οι ηλιόλουστες μέρες παραμένουν πολλές, από τους καλύτερους μήνες για περπάτημα.

## Τι γίνεται
Ο Οκτώβριος είναι ο πιο **θεσσαλονικιώτικος** μήνας του χρόνου. Στις **26 Οκτωβρίου** γιορτάζει ο πολιούχος **Άγιος Δημήτριος**, την ίδια ημερομηνία που το 1912 ο ελληνικός στρατός μπήκε στην πόλη. Δύο μέρες μετά, η **28η Οκτωβρίου** φέρνει τη μεγάλη στρατιωτική παρέλαση στην παραλία, τη σημαντικότερη της χώρας. Γύρω από τη γιορτή του πολιούχου διοργανώνονται παραδοσιακά τα **Δημήτρια**, ο κορυφαίος πολιτιστικός θεσμός της πόλης.

## Τι να κάνεις
Επίσκεψη στον **Άγιο Δημήτριο**, τον μεγαλύτερο ναό της πόλης και μνημείο UNESCO, με την κρύπτη του. Το φθινοπωρινό φως κάνει την Άνω Πόλη και τα τείχη ιδανικά για φωτογραφία.

## Τι να πάρεις μαζί
Ένα ελαφρύ μπουφάν και ομπρέλα. Αν έρχεσαι για την παρέλαση, η παραλία κλείνει και γεμίζει από νωρίς.`,
      en: `## The weather
A mild autumn with average highs around **22 °C**. Rain returns but sunny days remain plentiful, one of the best months for walking.

## What's on
October is the most **Thessalonian** month of the year. On **26 October** the city honours its patron **Saint Demetrios**: the same date on which, in 1912, the Greek army entered the city. Two days later, **28 October** brings the great military parade along the waterfront, the country's most important. Around the patron saint's feast the city traditionally stages the **Dimitria**, its foremost cultural institution.

## What to do
Visit **Agios Dimitrios**, the city's largest church and a UNESCO monument, with its crypt. Autumn light makes Ano Poli and the walls ideal for photography.

## What to pack
A light jacket and an umbrella. If you're coming for the parade, the seafront closes and fills up early.`,
    },
    highlights: [
      { el: "Άγιος Δημήτριος, πολιούχος (26 Οκτωβρίου)", en: "Saint Demetrios, patron saint (26 October)" },
      { el: "Επέτειος απελευθέρωσης της Θεσσαλονίκης (1912)", en: "Anniversary of the city's liberation (1912)" },
      { el: "Στρατιωτική παρέλαση 28ης Οκτωβρίου", en: "28 October military parade" },
      { el: "Δημήτρια: ο μεγάλος πολιτιστικός θεσμός της πόλης", en: "Dimitria: the city's major cultural festival" },
    ],
  },
  {
    slug: "november",
    number: 11,
    name: { el: "Νοέμβριος", en: "November" },
    nameAcc: { el: "Νοέμβριο", en: "November" },
    season: { el: "Τέλος φθινοπώρου", en: "Late autumn" },
    tempHigh: 16,
    tempLow: 8,
    rain: "high",
    crowds: "medium",
    seaSwimmable: false,
    blurb: {
      el: "Ο μήνας του Φεστιβάλ Κινηματογράφου: βροχερός έξω, γεμάτος αίθουσες και κουβέντες μέσα.",
      en: "Film festival month: rainy outside, full of cinemas and conversation inside.",
    },
    long: {
      el: `## Ο καιρός
Το φθινόπωρο σοβαρεύει: μέση μέγιστη γύρω στους **16 °C** και αισθητά περισσότερες βροχές. Νυχτώνει νωρίς και η πόλη μετακομίζει σε εσωτερικούς χώρους.

## Τι γίνεται
Το **Φεστιβάλ Κινηματογράφου Θεσσαλονίκης** μεταμορφώνει κάθε Νοέμβριο την πόλη. Για δέκα μέρες οι αποθήκες του λιμανιού και οι αίθουσες του κέντρου γεμίζουν προβολές, σκηνοθέτες και συζητήσεις μέχρι αργά· είναι από τα σημαντικότερα φεστιβάλ της Νοτιοανατολικής Ευρώπης και το πιο χαρακτηριστικό γεγονός της πόλης μετά τη ΔΕΘ.

## Τι να κάνεις
Είναι ο μήνας των **εσωτερικών χώρων**: μουσεία, βιβλιοπωλεία, ζεστά καφέ και μεζεδοπωλεία με τσίπουρο. Η περιοχή του λιμανιού γύρω από το φεστιβάλ αποκτά ξεχωριστή ενέργεια.

## Τι να πάρεις μαζί
Αδιάβροχο, ομπρέλα και παπούτσια που αντέχουν το νερό.`,
      en: `## The weather
Autumn turns serious: average highs around **16 °C** and noticeably more rain. It gets dark early and the city moves indoors.

## What's on
The **Thessaloniki International Film Festival** transforms the city every November. For ten days the port warehouses and downtown cinemas fill with screenings, directors and conversations that run late; it is one of South-Eastern Europe's most important festivals and the city's defining event after the trade fair.

## What to do
This is the month for **interiors**: museums, bookshops, warm cafés and meze houses with tsipouro. The port area around the festival takes on a distinct energy.

## What to pack
A raincoat, an umbrella and shoes that survive water.`,
    },
    highlights: [
      { el: "Φεστιβάλ Κινηματογράφου Θεσσαλονίκης", en: "Thessaloniki International Film Festival" },
      { el: "Επέτειος έναρξης λειτουργίας του μετρό (30 Νοεμβρίου 2024)", en: "Anniversary of the metro opening (30 November 2024)" },
    ],
  },
  {
    slug: "december",
    number: 12,
    name: { el: "Δεκέμβριος", en: "December" },
    nameAcc: { el: "Δεκέμβριο", en: "December" },
    season: { el: "Αρχή χειμώνα", en: "Early winter" },
    tempHigh: 11,
    tempLow: 4,
    rain: "high",
    crowds: "medium",
    seaSwimmable: false,
    blurb: {
      el: "Ο πιο βροχερός μήνας, αλλά και ο πιο φωτεινός: η Αριστοτέλους στολίζεται και η πόλη γιορτάζει.",
      en: "The wettest month, and the brightest: Aristotelous is decorated and the city celebrates.",
    },
    long: {
      el: `## Ο καιρός
Ο **πιο βροχερός μήνας** του χρόνου, με βροχόπτωση γύρω στα 76 mm. Μέση μέγιστη κοντά στους **11 °C**. Κρύο, υγρό, με σύντομες μέρες, αλλά σπάνια παγωμένο.

## Τι γίνεται
Η πόλη στολίζεται. Το χριστουγεννιάτικο δέντρο στην **Πλατεία Αριστοτέλους** και τα φώτα στην Τσιμισκή και τη Νέα Παραλία δίνουν στο κέντρο άλλη όψη. Λειτουργούν χριστουγεννιάτικα χωριά και υπαίθριες αγορές, ενώ η εορταστική αγορά κρατά τα καταστήματα ανοιχτά μέχρι αργά.

## Τι να κάνεις
Βραδινή βόλτα από την Αριστοτέλους μέχρι τον Λευκό Πύργο με τα φώτα αναμμένα. Ζεστή σοκολάτα, ρεβεγιόν στα εστιατόρια του κέντρου και μια επίσκεψη στα μουσεία τις βροχερές μέρες.

## Τι να πάρεις μαζί
Χειμωνιάτικα ρούχα και οπωσδήποτε ομπρέλα. Αν έρχεσαι για Πρωτοχρονιά, κλείσε τραπέζι από νωρίς.`,
      en: `## The weather
The **wettest month** of the year, with rainfall around 76 mm. Average highs near **11 °C**. Cold, damp and short on daylight, but rarely freezing.

## What's on
The city dresses up. The Christmas tree on **Aristotelous Square** and the lights along Tsimiski and the Nea Paralia give the centre a different face. Christmas villages and open-air markets operate, while the festive shopping season keeps stores open late.

## What to do
An evening walk from Aristotelous to the White Tower with the lights on. Hot chocolate, New Year's Eve dinners in the centre, and museums on the rainy days.

## What to pack
Winter clothes and, without question, an umbrella. If you're coming for New Year, book a table early.`,
    },
    highlights: [
      { el: "Χριστουγεννιάτικος στολισμός στην Αριστοτέλους", en: "Christmas lights on Aristotelous Square" },
      { el: "Χριστουγεννιάτικα χωριά και εορταστικές αγορές", en: "Christmas villages and festive markets" },
      { el: "Ρεβεγιόν και Πρωτοχρονιά", en: "New Year's Eve celebrations" },
    ],
  },
];

const monthBySlug = new Map(cityMonths.map((m) => [m.slug, m]));

export function getCityMonth(slug: string): CityMonth | undefined {
  return monthBySlug.get(slug);
}

export function getCityMonths(): CityMonth[] {
  return [...cityMonths].sort((a, b) => a.number - b.number);
}

/** The month we are in now, for "right now" prompts on the hub. */
export function getCurrentMonth(now = new Date()): CityMonth {
  return cityMonths.find((m) => m.number === now.getMonth() + 1) ?? cityMonths[0];
}
