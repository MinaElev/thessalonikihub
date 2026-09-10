import type { Localized } from "@/lib/types";

/**
 * Thessaloniki's institutional festivals — permanent anchor pages.
 *
 * These are long-standing fixtures with documented histories, researched and
 * cross-checked (Sept 2026). Each page is a permanent URL that is refreshed
 * each year rather than recreated, so it accumulates authority.
 *
 * Rule: NO exact edition dates. They move every year, and a stale date is
 * worse than none. Pages name the month and point to the official organiser.
 */
export interface Festival {
  slug: string;
  name: Localized<string>;
  /** Short form used on cards and chips, e.g. "ΔΕΘ". */
  shortName: Localized<string>;
  /** Calendar month it is normally held in (1-12). */
  month: number;
  monthLabel: Localized<string>;
  /** Year the institution began (or was revived). */
  founded: number;
  blurb: Localized<string>;
  long: Localized<string>;
  /** Official organiser's site. */
  officialUrl?: string;
  /** Area slug, for cross-linking. */
  area?: string;
  /** Nearest metro station slug, for cross-linking. */
  metroStation?: string;
  /** Slug of the month page this festival belongs to. */
  monthSlug: string;
  featured?: boolean;
}

export const festivals: Festival[] = [
  {
    slug: "deth-diethnis-ekthesi",
    name: {
      el: "Διεθνής Έκθεση Θεσσαλονίκης (ΔΕΘ)",
      en: "Thessaloniki International Fair (TIF)",
    },
    shortName: { el: "ΔΕΘ", en: "TIF" },
    month: 9,
    monthLabel: { el: "Σεπτέμβριος", en: "September" },
    founded: 1926,
    monthSlug: "september",
    area: "waterfront",
    metroStation: "panepistimio",
    officialUrl: "https://www.helexpo.gr",
    blurb: {
      el: "Ο θεσμός που σημάδεψε την πόλη επί έναν αιώνα: εμπόριο, πολιτική και πλήθος κόσμου κάθε Σεπτέμβριο στο κέντρο της Θεσσαλονίκης.",
      en: "The institution that has marked the city for a century: trade, politics and crowds every September in the heart of Thessaloniki.",
    },
    long: {
      el: `Αν υπάρχει ένα γεγονός που ορίζει τον χρόνο στη Θεσσαλονίκη, είναι η ΔΕΘ. Κάθε Σεπτέμβριο η πόλη γυρίζει διακόπτη: επιστρέφουν οι κάτοικοι από τις διακοπές, γεμίζουν τα ξενοδοχεία, και για δέκα περίπου μέρες το κέντρο ζει στον ρυθμό της έκθεσης.

## Η ιστορία
Η ιδέα ανήκε στον **Νικόλαο Γερμανό**, καθηγητή ζωολογίας και βουλευτή, που οραματίστηκε μια «διεθνή ετήσια εμποροπανήγυρη» για τη Θεσσαλονίκη και τη στήριξε με επιμονή μέχρι να γίνει πράξη. Η πρόταση έγινε δεκτή από την κυβέρνηση το 1925 και η **1η ΔΕΘ εγκαινιάστηκε στις 3 Οκτωβρίου 1926** στο Πεδίον του Άρεως.

Τα νούμερα εκείνης της πρώτης χρονιάς παραμένουν εντυπωσιακά για την εποχή: περίπου **600 εκθέτες**, οι μισοί από το εξωτερικό, και πάνω από **150.000 επισκέπτες** — σε μια πόλη που μόλις είχε ανασυγκροτηθεί μετά τη μεγάλη πυρκαγιά του 1917 και την υποδοχή των προσφύγων της Μικράς Ασίας.

Ο θεσμός άντεξε πολέμους, κατοχή και κρίσεις. Το **1977** ο φορέας μετασχηματίστηκε σε **Helexpo–ΔΕΘ**, και γύρω από την κεντρική έκθεση αναπτύχθηκαν δεκάδες κλαδικές εκθέσεις που φέρνουν επαγγελματίες στην πόλη όλο τον χρόνο. Το **2026 συμπληρώνονται εκατό χρόνια** από την πρώτη διοργάνωση.

## Γιατί δεν είναι απλώς μια εμπορική έκθεση
Η ΔΕΘ είναι από τα λίγα γεγονότα στην Ελλάδα όπου συναντιούνται η οικονομία, η πολιτική και η καθημερινή ζωή. Ο **πρωθυπουργός εξαγγέλλει παραδοσιακά την οικονομική πολιτική του χρόνου** από το βήμα της έκθεσης, οι αρχηγοί των κομμάτων ακολουθούν, και το τριήμερο των ομιλιών κυριαρχεί στην ειδησεογραφία.

Παράλληλα, για τους Θεσσαλονικείς η ΔΕΘ είναι παιδική ανάμνηση: τα περίπτερα των χωρών, τα δείγματα, τα λούνα παρκ των παλιότερων δεκαετιών, το περπάτημα μέχρι να πονέσουν τα πόδια.

## Πού γίνεται
Στον εκθεσιακό χώρο της **HELEXPO**, στην καρδιά της πόλης, δίπλα στο Αριστοτέλειο Πανεπιστήμιο και τον Πύργο του ΟΤΕ. Είναι από τα ελάχιστα διεθνή εκθεσιακά κέντρα που βρίσκονται μέσα στον αστικό ιστό και όχι στην περιφέρεια.

## Πώς θα πας
Ο σταθμός μετρό **Πανεπιστήμιο** εξυπηρετεί απευθείας τον χώρο. Τις μέρες της έκθεσης το μετρό είναι σαφώς η καλύτερη επιλογή: η κίνηση στους γύρω δρόμους είναι έντονη και το παρκάρισμα πρακτικά αδύνατο.

## Καλό να ξέρεις
- Οι ημερομηνίες αλλάζουν κάθε χρόνο και ανακοινώνονται από τη HELEXPO — έλεγξε τον επίσημο ιστότοπο πριν προγραμματίσεις.
- **Κλείσε διαμονή νωρίς.** Τις μέρες της ΔΕΘ τα ξενοδοχεία της πόλης γεμίζουν και οι τιμές ανεβαίνουν αισθητά.
- Ο Σεπτέμβριος έχει από τον καλύτερο καιρό του χρόνου, οπότε συνδύασέ το με βόλτα στην παραλία και τα μουσεία που είναι δίπλα.`,
      en: `If one event defines the year in Thessaloniki, it is the trade fair. Every September the city flips a switch: residents return from the holidays, hotels fill, and for roughly ten days the centre lives to the rhythm of the exhibition.

## The history
The idea belonged to **Nikolaos Germanos**, a professor of zoology and member of parliament, who envisaged an "international annual trade fair" for Thessaloniki and pushed it until it happened. The proposal was accepted by the government in 1925 and the **first fair opened on 3 October 1926** at the Pedion tou Areos.

That first year's numbers remain striking for the period: around **600 exhibitors**, half of them foreign, and more than **150,000 visitors** — in a city only just rebuilt after the great fire of 1917 and the arrival of the refugees from Asia Minor.

The institution survived wars, occupation and crises. In **1977** the organiser was restructured as **Helexpo–TIF**, and around the main fair dozens of trade exhibitions grew up, bringing professionals to the city year-round. **2026 marks a hundred years** since that first edition.

## Why it isn't just a trade show
The fair is one of the few occasions in Greece where the economy, politics and everyday life meet. The **prime minister traditionally announces the year's economic policy** from its podium, party leaders follow, and the three days of speeches dominate the news.

At the same time, for locals the fair is a childhood memory: the national pavilions, the free samples, the funfairs of earlier decades, walking until your feet hurt.

## Where it happens
At the **HELEXPO** exhibition grounds, in the heart of the city, beside the Aristotle University and the OTE Tower. It is one of very few international exhibition centres located inside the urban fabric rather than out on the edge of town.

## Getting there
The **Panepistimio** metro station serves the grounds directly. During the fair the metro is clearly the best option: traffic on the surrounding streets is heavy and parking practically impossible.

## Good to know
- Dates change every year and are announced by HELEXPO — check the official site before planning.
- **Book accommodation early.** During the fair the city's hotels fill up and prices rise noticeably.
- September brings some of the year's best weather, so pair it with the seafront and the museums right next door.`,
    },
    featured: true,
  },
  {
    slug: "festival-kinimatografou",
    name: {
      el: "Φεστιβάλ Κινηματογράφου Θεσσαλονίκης",
      en: "Thessaloniki International Film Festival",
    },
    shortName: { el: "ΦΚΘ", en: "TIFF" },
    month: 11,
    monthLabel: { el: "Νοέμβριος", en: "November" },
    founded: 1960,
    monthSlug: "november",
    area: "limani",
    metroStation: "venizelou",
    officialUrl: "https://www.filmfestival.gr",
    blurb: {
      el: "Από το 1960: δέκα μέρες κάθε Νοέμβριο που μετατρέπουν το Ολύμπιον και τις αποθήκες του λιμανιού στο κέντρο του κινηματογράφου στη ΝΑ Ευρώπη.",
      en: "Since 1960: ten November days that turn the Olympion and the port warehouses into South-East Europe's cinema hub.",
    },
    long: {
      el: `Κάθε Νοέμβριο, όταν ο καιρός χαλάει και η πόλη μαζεύεται σε εσωτερικούς χώρους, το Φεστιβάλ Κινηματογράφου δίνει στη Θεσσαλονίκη τον πιο χαρακτηριστικό της ρυθμό μετά τη ΔΕΘ: ουρές έξω από αίθουσες, συζητήσεις σε καφενεία μέχρι αργά, και ένα κοινό που βλέπει τέσσερις ταινίες τη μέρα.

## Η ιστορία
Ξεκίνησε το **1960** ως **«1η Εβδομάδα Ελληνικού Κινηματογράφου»**, από τις 20 έως τις 26 Σεπτεμβρίου, στον ιστορικό κινηματογράφο **Ολύμπιον** στην Πλατεία Αριστοτέλους. Ήταν μια γιορτή της ελληνικής παραγωγής σε μια εποχή που ο ελληνικός κινηματογράφος ζούσε τη χρυσή του δεκαετία.

Στα πρώτα χρόνια βραβεύτηκαν ταινίες που σήμερα θεωρούνται κλασικές — *Ο Δράκος*, *Στέλλα*, *Το ξύλο βγήκε από τον Παράδεισο*. Με τα χρόνια ο θεσμός άνοιξε διεθνώς και μετακινήθηκε στον Νοέμβριο, εξελισσόμενος σε ένα από τα σημαντικότερα φεστιβάλ της Νοτιοανατολικής Ευρώπης.

## Ο Χρυσός Αλέξανδρος
Το κορυφαίο βραβείο του φεστιβάλ είναι ο **Χρυσός Αλέξανδρος**, που πήρε το όνομά του από τον Μέγα Αλέξανδρο, γεννημένο στη Μακεδονία. Είναι το βραβείο που κυνηγούν σκηνοθέτες από όλο τον κόσμο και το πιο αναγνωρίσιμο σύμβολο του θεσμού.

## Πού γίνεται
Σε δύο πόλους που δίνουν στο φεστιβάλ τον χαρακτήρα του:

- Το **Ολύμπιον**, το ιστορικό θέατρο πάνω στην Πλατεία Αριστοτέλους, με την κλασική του αίθουσα.
- Οι **αποθήκες του παλιού λιμανιού**, βιομηχανικά κτίρια που μετατράπηκαν σε αίθουσες προβολής. Το σκηνικό —τσιμέντο, θάλασσα, γερανοί— είναι από τα πιο ιδιαίτερα φεστιβαλικά τοπία στην Ευρώπη.

## Τι να περιμένεις
Πέρα από τις προβολές, το φεστιβάλ φέρνει masterclasses, αφιερώματα, συζητήσεις με σκηνοθέτες και μια πόλη γεμάτη κόσμο του σινεμά. Η περιοχή του λιμανιού αποκτά ξεχωριστή ενέργεια, με τα μπαρ και τα καφέ γύρω να δουλεύουν μέχρι αργά.

## Καλό να ξέρεις
- Οι ακριβείς ημερομηνίες και το πρόγραμμα ανακοινώνονται κάθε χρόνο από τους διοργανωτές — δες τον επίσημο ιστότοπο.
- Οι δημοφιλείς προβολές γεμίζουν· αξίζει να κοιτάξεις εισιτήρια από νωρίς.
- Ο πλησιέστερος σταθμός μετρό για το Ολύμπιον και το λιμάνι είναι η **Βενιζέλου**.
- Τον Μάρτιο, ο ίδιος οργανισμός διοργανώνει το **Φεστιβάλ Ντοκιμαντέρ** στους ίδιους χώρους.`,
      en: `Every November, when the weather turns and the city moves indoors, the Film Festival gives Thessaloniki its most characteristic rhythm after the trade fair: queues outside cinemas, conversations in cafés running late, and audiences watching four films a day.

## The history
It began in **1960** as the **"1st Week of Greek Cinema"**, from 20 to 26 September, at the historic **Olympion** cinema on Aristotelous Square. It was a celebration of Greek production at a time when Greek cinema was living its golden decade.

Its early years honoured films now considered classics of Greek cinema — *O Drakos*, *Stella* and *To xylo vgike apo ton Paradeiso*. Over time the institution opened internationally and moved to November, growing into one of the most important festivals in South-Eastern Europe.

## The Golden Alexander
The festival's top award is the **Golden Alexander**, named after Alexander the Great, born in Macedonia. It is the prize directors from around the world compete for, and the institution's most recognisable symbol.

## Where it happens
Across two poles that give the festival its character:

- The **Olympion**, the historic theatre on Aristotelous Square, with its classic auditorium.
- The **old port warehouses**, industrial buildings converted into screening rooms. The setting — concrete, sea, cranes — is one of the most distinctive festival landscapes in Europe.

## What to expect
Beyond the screenings, the festival brings masterclasses, retrospectives, conversations with directors and a city full of film people. The port area takes on a particular energy, with the surrounding bars and cafés working late.

## Good to know
- Exact dates and the programme are announced each year by the organisers — see the official site.
- Popular screenings sell out; it's worth looking at tickets early.
- The nearest metro station for the Olympion and the port is **Venizelou**.
- In March the same organisation runs the **Documentary Festival** in the same venues.`,
    },
    featured: true,
  },
  {
    slug: "dimitria",
    name: { el: "Δημήτρια", en: "Dimitria Festival" },
    shortName: { el: "Δημήτρια", en: "Dimitria" },
    month: 10,
    monthLabel: { el: "Οκτώβριος", en: "October" },
    founded: 1966,
    monthSlug: "october",
    area: "center",
    metroStation: "agias-sofias",
    officialUrl: "https://dimitria.thessaloniki.gr",
    blurb: {
      el: "Ο πολιτιστικός θεσμός της πόλης, με ρίζες στη βυζαντινή εμποροπανήγυρη του πολιούχου και αναβίωση από το 1966.",
      en: "The city's own cultural institution, rooted in the Byzantine fair of its patron saint and revived in 1966.",
    },
    long: {
      el: `Τα Δημήτρια είναι το πιο «δικό της» γεγονός που έχει η Θεσσαλονίκη. Δεν εισήχθη από κάπου αλλού και δεν σχεδιάστηκε για τουρίστες: βγαίνει κατευθείαν από την ιστορία της πόλης και το όνομα του πολιούχου της.

## Οι ρίζες
Τα αρχικά Δημήτρια ήταν η μεγάλη **εμποροπανήγυρη** που γινόταν έξω από τη **Χρυσή Πύλη**, τη δυτική πύλη των τειχών, γύρω από τη γιορτή του **Αγίου Δημητρίου**. Επί βυζαντινών χρόνων ήταν από τα σημαντικότερα εμπορικά γεγονότα της αυτοκρατορίας: έμποροι από τα Βαλκάνια, την Ιταλία και την Ανατολή κατέβαιναν στη Θεσσαλονίκη, και η πόλη μετατρεπόταν για μέρες σε αγορά και γιορτή μαζί.

## Η αναβίωση του 1966
Ο θεσμός επανήλθε το **1966**, με πρωτοβουλία της υπηρεσίας τουριστικών εκδηλώσεων του ΕΟΤ. Η τελετή έναρξης έγινε στις **4 Οκτωβρίου 1966** και το πρόγραμμα περιλάμβανε **έντεκα εκδηλώσεις**: συναυλίες, θεατρικές και χορευτικές παραστάσεις, εκθέσεις ζωγραφικής.

Στην πρώτη εκείνη διοργάνωση συμμετείχαν το **Κρατικό Θέατρο Βορείου Ελλάδος**, η **Εθνική Λυρική Σκηνή** και το **Λύκειο Ελληνίδων**, ενώ ανάμεσα στους καλλιτέχνες βρέθηκαν ο **Μάνος Κατράκης**, ο **Σπύρος Βασιλείου** και ο **Πολύκλειτος Ρέγκος**. Από τότε ο θεσμός μετρά εξήντα και πλέον διοργανώσεις.

## Τι είναι σήμερα
Τα Δημήτρια διοργανώνονται από τον **Δήμο Θεσσαλονίκης** και απλώνονται σε ολόκληρη την πόλη: συναυλίες, θέατρο, χορός, εικαστικά, περφόρμανς και εκδηλώσεις σε γειτονιές. Ο χαρακτήρας τους είναι σκόπιμα ανοιχτός — πολλά από τα δρώμενα είναι δωρεάν και γίνονται σε δημόσιους χώρους.

Δεν είναι φεστιβάλ ενός είδους, όπως ο κινηματογράφος ή το ντοκιμαντέρ. Είναι μια ομπρέλα κάτω από την οποία η πόλη παρουσιάζει τι κάνει καλλιτεχνικά μέσα σε μία περίοδο.

## Ο Οκτώβριος της Θεσσαλονίκης
Τα Δημήτρια πέφτουν στον πιο θεσσαλονικιώτικο μήνα του χρόνου. Στις **26 Οκτωβρίου** γιορτάζει ο Άγιος Δημήτριος — την ίδια ημερομηνία που το **1912** ο ελληνικός στρατός μπήκε στην πόλη — και δύο μέρες αργότερα γίνεται η μεγάλη παρέλαση της **28ης Οκτωβρίου** στην παραλία. Οι τρεις αυτές μέρες συμπυκνώνουν θρησκευτική γιορτή, εθνική επέτειο και πολιτισμό.

## Καλό να ξέρεις
- Το πρόγραμμα και οι ακριβείς ημερομηνίες ανακοινώνονται κάθε χρόνο από τον Δήμο Θεσσαλονίκης.
- Πολλές εκδηλώσεις είναι **ελεύθερης εισόδου**, αλλά οι δημοφιλείς παραστάσεις θέλουν κράτηση.
- Συνδύασέ το με επίσκεψη στον **Άγιο Δημήτριο**, τον μεγαλύτερο ναό της πόλης και μνημείο UNESCO, και στην κρύπτη του.`,
      en: `The Dimitria is the most genuinely local event Thessaloniki has. It wasn't imported and it wasn't designed for tourists: it comes straight out of the city's history and the name of its patron saint.

## The roots
The original Dimitria was the great **trade fair** held outside the **Golden Gate**, the western gate in the walls, around the feast of **Saint Demetrios**. In Byzantine times it was among the most important commercial events in the empire: merchants from the Balkans, Italy and the East came down to Thessaloniki, and for days the city became market and festival at once.

## The 1966 revival
The institution returned in **1966**, on the initiative of the Greek tourism organisation's events service. The opening ceremony took place on **4 October 1966** and the programme comprised **eleven events**: concerts, theatre and dance performances, and painting exhibitions.

That first edition involved the **State Theatre of Northern Greece**, the **Greek National Opera** and the **Lyceum Club of Greek Women**, while the artists included **Manos Katrakis**, **Spyros Vassiliou** and **Polykleitos Rengos**. The institution has since passed sixty editions.

## What it is today
The Dimitria is organised by the **Municipality of Thessaloniki** and spreads across the whole city: concerts, theatre, dance, visual arts, performance and neighbourhood events. Its character is deliberately open — many of the events are free and take place in public spaces.

It is not a single-genre festival like the film or documentary festivals. It is an umbrella under which the city presents what it is making artistically within one season.

## Thessaloniki's October
The Dimitria falls in the most Thessalonian month of the year. On **26 October** the city honours Saint Demetrios — the same date on which, in **1912**, the Greek army entered the city — and two days later comes the great **28 October** parade along the waterfront. Those three days compress religious feast, national anniversary and culture into one.

## Good to know
- The programme and exact dates are announced each year by the Municipality of Thessaloniki.
- Many events are **free to attend**, but popular performances need booking.
- Combine it with a visit to **Agios Dimitrios**, the city's largest church and a UNESCO monument, and its crypt.`,
    },
    featured: true,
  },
  {
    slug: "festival-ntokimanter",
    name: {
      el: "Φεστιβάλ Ντοκιμαντέρ Θεσσαλονίκης",
      en: "Thessaloniki Documentary Festival",
    },
    shortName: { el: "Φεστιβάλ Ντοκιμαντέρ", en: "Documentary Festival" },
    month: 3,
    monthLabel: { el: "Μάρτιος", en: "March" },
    founded: 1999,
    monthSlug: "march",
    area: "limani",
    metroStation: "venizelou",
    officialUrl: "https://www.filmfestival.gr/el/festival-gr/documentary-festival",
    blurb: {
      el: "«Εικόνες του 21ου Αιώνα»: κάθε Μάρτιο, το ντοκιμαντέρ φέρνει τον κόσμο στις αποθήκες του λιμανιού.",
      en: "\"Images of the 21st Century\": every March, documentary brings the world to the port warehouses.",
    },
    long: {
      el: `Αν το Φεστιβάλ Κινηματογράφου είναι η γιορτή της μυθοπλασίας τον Νοέμβριο, το Φεστιβάλ Ντοκιμαντέρ είναι η αντίστοιχη γιορτή της πραγματικότητας τον Μάρτιο — και για πολλούς Θεσσαλονικείς είναι το αγαπημένο τους από τα δύο.

## Η ιστορία
Ιδρύθηκε το **1999** με πρωτοβουλία του **Δημήτρη Εϊπίδη**, ο οποίος παρέμεινε διευθυντής του μέχρι το **2016**. Η πρόταση για τη δημιουργία του έγινε στις **15 Μαρτίου 1999** στο **Ολύμπιον**, στην Πλατεία Αριστοτέλους.

Ο πλήρης τίτλος του, **«Εικόνες του 21ου Αιώνα»**, δηλώνει και τη φιλοδοξία του: να καταγράφει τον κόσμο τη στιγμή που αλλάζει. Μέσα σε δύο δεκαετίες εξελίχθηκε σε έναν από τους σημαντικότερους διαγωνιστικούς θεσμούς ντοκιμαντέρ διεθνώς.

## Πού γίνεται
Στους ίδιους χώρους με το αδελφό του φεστιβάλ:

- Το ιστορικό **Ολύμπιον** στην Πλατεία Αριστοτέλους.
- **Τέσσερις αίθουσες** διαμορφωμένες μέσα σε παλιές **αποθήκες του Οργανισμού Λιμένος Θεσσαλονίκης**.
- Προβολές και σε **γειτονιές** της πόλης, ώστε το φεστιβάλ να μη μένει μόνο στο κέντρο.

## Γιατί αξίζει
Το ντοκιμαντέρ έχει διαφορετικό κοινό από τη μυθοπλασία: πιο συζητητικό, πιο πολιτικοποιημένο, πιο πρόθυμο να μείνει μετά την προβολή. Οι κουβέντες με τους σκηνοθέτες μετά τις ταινίες συχνά τραβούν περισσότερο από την ίδια την ταινία, και η ατμόσφαιρα στο λιμάνι τον Μάρτιο — με τη θάλασσα δίπλα και το κρύο ακόμη στον αέρα — έχει κάτι που το κοινό επιστρέφει να ξαναβρεί.

## Ο Μάρτιος στην πόλη
Είναι ο μήνας που η Θεσσαλονίκη βγαίνει από τον χειμώνα. Οι μέρες μεγαλώνουν, τα τραπεζάκια επιστρέφουν στα πεζοδρόμια, και το φεστιβάλ λειτουργεί ως το πρώτο μεγάλο ραντεβού της χρονιάς μετά τις γιορτές.

## Καλό να ξέρεις
- Ακριβείς ημερομηνίες και πρόγραμμα ανακοινώνονται κάθε χρόνο από τους διοργανωτές.
- Πλησιέστερος σταθμός μετρό για Ολύμπιον και λιμάνι: **Βενιζέλου**.
- Ο ίδιος οργανισμός διοργανώνει τον Νοέμβριο το **Φεστιβάλ Κινηματογράφου**.`,
      en: `If the Film Festival is November's celebration of fiction, the Documentary Festival is March's celebration of reality — and for many locals it is the favourite of the two.

## The history
It was founded in **1999** on the initiative of **Dimitris Eipidis**, who remained its director until **2016**. The proposal to create it was made on **15 March 1999** at the **Olympion** on Aristotelous Square.

Its full title, **"Images of the 21st Century"**, states its ambition: to record the world at the moment it changes. Within two decades it grew into one of the most significant competitive documentary institutions internationally.

## Where it happens
In the same venues as its sister festival:

- The historic **Olympion** on Aristotelous Square.
- **Four screening rooms** built inside old **Thessaloniki Port Authority warehouses**.
- Screenings in the city's **neighbourhoods**, so the festival doesn't stay confined to the centre.

## Why it's worth it
Documentary draws a different audience from fiction: more talkative, more political, more willing to stay behind afterwards. The conversations with directors after screenings often run longer than the films themselves, and the atmosphere at the port in March — the sea beside you, cold still in the air — is something audiences come back for.

## March in the city
This is the month Thessaloniki comes out of winter. Days lengthen, tables return to the pavements, and the festival serves as the year's first big appointment after the holidays.

## Good to know
- Exact dates and the programme are announced each year by the organisers.
- Nearest metro station for the Olympion and the port: **Venizelou**.
- The same organisation runs the **Film Festival** in November.`,
    },
  },
];

const bySlug = new Map(festivals.map((f) => [f.slug, f]));

export function getFestival(slug: string): Festival | undefined {
  return bySlug.get(slug);
}

/** Festivals in calendar order through the year. */
export function getFestivals(): Festival[] {
  return [...festivals].sort((a, b) => a.month - b.month);
}

/** Festivals that normally fall in a given calendar month (1-12). */
export function getFestivalsInMonth(month: number): Festival[] {
  return festivals.filter((f) => f.month === month);
}
