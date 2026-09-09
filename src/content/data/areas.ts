import type { Localized } from "@/lib/types";

/** A Thessaloniki neighbourhood / area used across every pillar. */
export interface Area {
  slug: string;
  name: Localized<string>;
  /** One-line summary for cards and headers. */
  blurb: Localized<string>;
  /** Rich editorial description (markdown) for the area hub page. */
  long: Localized<string>;
  /** Approximate centre, for the area map. */
  center: { lat: number; lng: number };
  /** Neighbouring area slugs, for cross-linking. */
  nearby: string[];
  featured?: boolean;
}

export const areas: Area[] = [
  {
    slug: "center",
    name: { el: "Κέντρο", en: "City Center" },
    blurb: {
      el: "Η καρδιά της πόλης, γύρω από την Αριστοτέλους και την Τσιμισκή — αγορές, καφέ και αξιοθέατα σε απόσταση περιπάτου.",
      en: "The heart of the city around Aristotelous and Tsimiski — shops, cafés and landmarks all within walking distance.",
    },
    long: {
      el: `Το ιστορικό κέντρο της Θεσσαλονίκης είναι το σημείο όπου συναντιούνται όλες οι εποχές της πόλης — από τα ρωμαϊκά και βυζαντινά μνημεία μέχρι τη μεγάλη πλατεία που ανοίγει στη θάλασσα. Αν έρχεσαι πρώτη φορά, εδώ θα περάσεις τον περισσότερο χρόνο σου, γιατί σχεδόν τα πάντα γίνονται με τα πόδια.

## Χαρακτήρας & ιστορία
Η σημερινή μορφή του κέντρου σχεδιάστηκε μετά τη **μεγάλη πυρκαγιά του 1917**, από τον Γάλλο πολεοδόμο **Ernest Hébrard**, που έδωσε στην πόλη φαρδιούς άξονες, νεοκλασικά κτίρια και την ανοιχτή προς τον Θερμαϊκό **Πλατεία Αριστοτέλους**. Παράλληλα, μέσα στον αστικό ιστό «κρύβονται» μνημεία 17 αιώνων.

## Τι να δεις
- Τη **Ροτόντα** και την **Αψίδα του Γαλερίου** (Καμάρα), το ρωμαϊκό συγκρότημα του 4ου αιώνα.
- Τον **Άγιο Δημήτριο**, τη μεγαλύτερη εκκλησία της πόλης, και την **Αγία Σοφία**.
- Την **Αρχαία (Ρωμαϊκή) Αγορά** στην πλατεία Δικαστηρίων.
- Τις σκεπαστές αγορές **Μοδιάνο** και **Καπάνι**, την «κοιλιά» της πόλης.

## Φαγητό, καφές & ψώνια
Η **Τσιμισκή** είναι ο κεντρικός εμπορικός δρόμος, ενώ γύρω από τις αγορές θα βρεις μεζεδοπωλεία και ιστορικά καφενεία. Οι πεζόδρομοι γύρω από την Αριστοτέλους γεμίζουν κόσμο από το πρωί ως αργά.

## Πώς κινείσαι
Το κέντρο είναι απόλυτα περπατήσιμο και εξυπηρετείται από το μετρό και πυκνό δίκτυο λεωφορείων. Δεν χρειάζεσαι αυτοκίνητο.

**Ιδανικό για:** πρώτη επίσκεψη, αξιοθέατα, ψώνια και όσους θέλουν να έχουν τα πάντα δίπλα τους.`,
      en: `Thessaloniki's historic centre is where every era of the city meets — from Roman and Byzantine monuments to the grand square that opens onto the sea. If it's your first visit, you'll spend most of your time here, because almost everything is walkable.

## Character & history
The centre's present layout was designed after the **great fire of 1917** by the French planner **Ernest Hébrard**, who gave the city wide avenues, neoclassical buildings and **Aristotelous Square**, opening toward the Thermaic Gulf. Woven into the streets are monuments spanning seventeen centuries.

## What to see
- The **Rotunda** and the **Arch of Galerius** (Kamara), the 4th-century Roman complex.
- **Agios Dimitrios**, the city's largest church, and **Hagia Sophia**.
- The **Roman Forum (Ancient Agora)** on Dikastirion Square.
- The covered **Modiano** and **Kapani** markets — the belly of the city.

## Food, coffee & shopping
**Tsimiski** is the main shopping street, while the lanes around the markets are full of meze houses and historic cafés. The pedestrian streets around Aristotelous fill with people from morning until late.

## Getting around
The centre is completely walkable and served by the metro and a dense bus network. You won't need a car.

**Best for:** a first visit, sightseeing, shopping, and anyone who wants everything on their doorstep.`,
    },
    center: { lat: 40.6329, lng: 22.9418 },
    nearby: ["ladadika", "waterfront", "ano-poli", "valaoritou", "navarinou", "limani"],
    featured: true,
  },
  {
    slug: "ladadika",
    name: { el: "Λαδάδικα", en: "Ladadika" },
    blurb: {
      el: "Ιστορική συνοικία με πλακόστρωτα, ταβέρνες και έντονη νυχτερινή ζωή δίπλα στο λιμάνι.",
      en: "A historic quarter of cobbled streets, tavernas and buzzing nightlife next to the port.",
    },
    long: {
      el: `Λίγα βήματα από την Πλατεία Αριστοτέλους και το λιμάνι, τα **Λαδάδικα** είναι μια από τις πιο ατμοσφαιρικές γειτονιές της Θεσσαλονίκης — και το βράδυ, μια από τις πιο ζωντανές.

## Χαρακτήρας & ιστορία
Το όνομα προέρχεται από τα παλιά εμπορικά και αποθήκες **λαδιού** που στέγαζαν τα χαμηλά κτίρια της περιοχής. Η συνοικία γλίτωσε σε μεγάλο βαθμό από την πυρκαγιά του 1917 και σήμερα είναι διατηρητέα: πλακόστρωτα δρομάκια, χρωματιστές προσόψεις και μια σπάνια αίσθηση παλιάς πόλης.

## Τι να κάνεις
- Περπάτησε τα στενά και θαύμασε τα διατηρητέα κτίρια.
- Βρες τη γωνιά σου για **τσίπουρο και μεζέδες** — η περιοχή είναι γεμάτη ταβέρνες και μεζεδοπωλεία.
- Μείνε για τη **νυχτερινή ζωή**: μπαρ, ζωντανή μουσική και κόσμος μέχρι αργά.

## Πού να μείνεις
Ιδανική επιλογή αν θέλεις να είσαι στο επίκεντρο της εστίασης και της διασκέδασης, με το κέντρο και τη θάλασσα δίπλα σου.

## Πώς κινείσαι
Με τα πόδια από το κέντρο σε λίγα λεπτά· κοντά στο λιμάνι και σε στάσεις μετρό/λεωφορείων.

**Ιδανικό για:** φαγητό, ποτό, νυχτερινή ζωή και ατμόσφαιρα παλιάς πόλης.`,
      en: `A few steps from Aristotelous Square and the port, **Ladadika** is one of Thessaloniki's most atmospheric quarters — and at night, one of its liveliest.

## Character & history
The name comes from the old **olive-oil** trade and warehouses that once filled the area's low buildings. The quarter largely survived the 1917 fire and is now listed: cobbled lanes, colourful façades and a rare old-town feel.

## What to do
- Wander the alleys and admire the listed buildings.
- Find your corner for **tsipouro and meze** — the area is full of tavernas and meze houses.
- Stay out for the **nightlife**: bars, live music and crowds until late.

## Where to stay
A great choice if you want to be at the heart of dining and going out, with the centre and the sea right beside you.

## Getting around
A few minutes on foot from the centre; close to the port and to metro/bus stops.

**Best for:** food, drinks, nightlife and old-town atmosphere.`,
    },
    center: { lat: 40.6365, lng: 22.9375 },
    nearby: ["center", "valaoritou", "waterfront"],
    featured: true,
  },
  {
    slug: "ano-poli",
    name: { el: "Άνω Πόλη", en: "Ano Poli (Upper Town)" },
    blurb: {
      el: "Η παλιά πόλη πάνω από τα τείχη: βυζαντινά μνημεία, στενά δρομάκια και η καλύτερη θέα στον Θερμαϊκό.",
      en: "The old town above the walls: Byzantine monuments, narrow lanes and the best views over the Thermaic Gulf.",
    },
    long: {
      el: `Πάνω από τα τείχη, εκεί που η σύγχρονη πόλη δίνει τη θέση της στα καλντερίμια, η **Άνω Πόλη** είναι η ψυχή της παλιάς Θεσσαλονίκης — και το καλύτερο μπαλκόνι της.

## Χαρακτήρας & ιστορία
Είναι η μόνη περιοχή που **γλίτωσε από τη μεγάλη πυρκαγιά του 1917**, γι' αυτό διατηρεί τον παραδοσιακό της χαρακτήρα: ξύλινα σπίτια με σαχνισιά, μικρές αυλές, βυζαντινές εκκλησίες και τα οθωμανικά ίχνη της πόλης.

## Τι να δεις
- Τα **Βυζαντινά Τείχη** και τον περίπατο κατά μήκος τους.
- Το φρούριο **Επταπύργιο (Γεντί Κουλέ)** στην κορυφή.
- Τη **Μονή Βλατάδων**, το μόνο εν λειτουργία βυζαντινό μοναστήρι της πόλης.
- Τον Πύργο Τριγωνίου, με **πανοραμική θέα** σε όλη τη Θεσσαλονίκη και τον Θερμαϊκό.

## Φαγητό με θέα
Στα σοκάκια θα βρεις παραδοσιακές ταβέρνες και ουζερί με θέα στη θάλασσα — ιδανικά για αργό μεσημέρι ή ηλιοβασίλεμα.

## Πώς κινείσαι
Η ανάβαση είναι ανηφορική· μπορείς να ανέβεις με τα πόδια (όμορφη αλλά κουραστική διαδρομή) ή με αστικό λεωφορείο. Φόρα άνετα παπούτσια.

**Ιδανικό για:** θέα, ιστορία, ρομαντικές βόλτες και ηλιοβασιλέματα.`,
      en: `Above the walls, where the modern city gives way to cobbled lanes, **Ano Poli** is the soul of old Thessaloniki — and its finest balcony.

## Character & history
It is the only area that **survived the great fire of 1917**, so it keeps its traditional character: timber houses with overhanging *sachnisia*, small courtyards, Byzantine churches and the city's Ottoman traces.

## What to see
- The **Byzantine Walls** and the walk along them.
- The **Heptapyrgion (Yedi Kule)** fortress at the top.
- **Vlatades Monastery**, the city's only working Byzantine monastery.
- The Trigoniou Tower, with **panoramic views** over the whole of Thessaloniki and the gulf.

## Food with a view
In the lanes you'll find traditional tavernas and ouzeri with sea views — perfect for a slow lunch or sunset.

## Getting around
The climb is steep; you can walk up (a lovely but tiring route) or take a city bus. Wear comfortable shoes.

**Best for:** views, history, romantic strolls and sunsets.`,
    },
    center: { lat: 40.6418, lng: 22.9545 },
    nearby: ["center"],
    featured: true,
  },
  {
    slug: "kalamaria",
    name: { el: "Καλαμαριά", en: "Kalamaria" },
    blurb: {
      el: "Παραθαλάσσια συνοικία στα ανατολικά, με μαρίνα, καφέ και οικογενειακή ατμόσφαιρα.",
      en: "A seaside district to the east, with a marina, cafés and a relaxed, family-friendly feel.",
    },
    long: {
      el: `Στα ανατολικά της πόλης και πάνω στη θάλασσα, η **Καλαμαριά** είναι ο μεγαλύτερος δήμος του πολεοδομικού συγκροτήματος και μια γειτονιά με δική της, πιο χαλαρή ταυτότητα.

## Χαρακτήρας & ιστορία
Αναπτύχθηκε σε μεγάλο βαθμό από **πρόσφυγες της Μικράς Ασίας** μετά το 1922, κάτι που φαίνεται ακόμη στη γαστρονομία και τον χαρακτήρα της. Σήμερα είναι μια σύγχρονη, παραθαλάσσια περιοχή με οικογενειακό προφίλ.

## Τι να κάνεις
- Βόλτα στη **μαρίνα Αρετσού** και στον παραλιακό πεζόδρομο.
- Καφές ή φαγητό δίπλα στο κύμα.
- Επίσκεψη στην περιοχή του **Καραμπουρνακίου** για θέα και ηλιοβασίλεμα.

## Φαγητό
Η Καλαμαριά φημίζεται για **ψαροταβέρνες** και για τις μικρασιάτικες γεύσεις — φρέσκο ψάρι και μεζέδες με θέα στη θάλασσα.

## Πώς κινείσαι
Συνδέεται εύκολα με το κέντρο με λεωφορείο και με το δίκτυο του μετρό· βολικό και με αυτοκίνητο.

**Ιδανικό για:** οικογένειες, ήσυχη παραθαλάσσια διαμονή και καλό ψάρι.`,
      en: `To the east of the city and right on the sea, **Kalamaria** is the largest municipality of the metropolitan area and a district with its own, more relaxed identity.

## Character & history
It grew largely from **Asia Minor refugees** after 1922, something still felt in its food and character. Today it is a modern seaside area with a family profile.

## What to do
- Stroll the **Aretsou marina** and the coastal promenade.
- Coffee or a meal right by the water.
- Visit the **Karabournaki** area for views and sunset.

## Food
Kalamaria is known for its **fish tavernas** and Asia-Minor flavours — fresh fish and meze with a sea view.

## Getting around
Easily connected to the centre by bus and the metro network; convenient by car too.

**Best for:** families, a quiet seaside stay and good fish.`,
    },
    center: { lat: 40.5772, lng: 22.9525 },
    nearby: ["waterfront"],
  },
  {
    slug: "waterfront",
    name: { el: "Νέα Παραλία", en: "Waterfront" },
    blurb: {
      el: "Ο ανανεωμένος πεζόδρομος της παραλίας, από τον Λευκό Πύργο ως το Μέγαρο — περπάτημα, ποδήλατο και ηλιοβασιλέματα.",
      en: "The redesigned seafront promenade from the White Tower to the Concert Hall — walks, cycling and sunsets.",
    },
    long: {
      el: `Αν η Θεσσαλονίκη έχει ένα σαλόνι, αυτό είναι η **Νέα Παραλία**: ο παραλιακός πεζόδρομος όπου η πόλη περπατά, τρέχει, κάνει ποδήλατο και παρακολουθεί το ηλιοβασίλεμα πάνω από τον Όλυμπο.

## Χαρακτήρας
Ο ανασχεδιασμός του πεζόδρομου (μελέτη Πρόδρομος Νικηφορίδης – Bernard Cuomo) δημιούργησε μια σειρά από **θεματικούς κήπους** και ανοιχτούς χώρους, από τον Λευκό Πύργο ως το Μέγαρο Μουσικής.

## Τι να δεις
- Τον **Λευκό Πύργο**, το σύμβολο της πόλης.
- Το γλυπτό **«Ομπρέλες»** του Γιώργου Ζογγολόπουλου.
- Το άγαλμα του **Μεγάλου Αλεξάνδρου**.
- Το **Αρχαιολογικό Μουσείο** και το **Μουσείο Βυζαντινού Πολιτισμού**, δίπλα στην παραλία.

## Καφές & ποτό
Κατά μήκος της Λεωφόρου Νίκης θα βρεις ιστορικά καφέ, ενώ τα «πλωτά» μπαρ-καραβάκια προσφέρουν μια σύντομη βόλτα στον κόλπο με ποτό στο χέρι.

## Πώς κινείσαι
Ιδανικό για περπάτημα και ποδήλατο (υπάρχει ποδηλατόδρομος). Το ηλιοβασίλεμα εδώ είναι must.

**Ιδανικό για:** βόλτες, ηλιοβασίλεμα, τρέξιμο/ποδήλατο και μουσεία.`,
      en: `If Thessaloniki has a living room, it's the **waterfront**: the seaside promenade where the city walks, runs, cycles and watches the sunset over Mount Olympus.

## Character
The promenade's redesign (by Prodromos Nikiforidis – Bernard Cuomo) created a series of **themed gardens** and open spaces, from the White Tower to the Concert Hall.

## What to see
- The **White Tower**, the city's symbol.
- The **"Umbrellas"** sculpture by George Zongolopoulos.
- The statue of **Alexander the Great**.
- The **Archaeological Museum** and the **Museum of Byzantine Culture**, right by the sea.

## Coffee & drinks
Along Nikis Avenue you'll find historic cafés, while the "floating" boat-bars offer a short cruise around the gulf, drink in hand.

## Getting around
Perfect for walking and cycling (there's a bike path). Sunset here is a must.

**Best for:** strolls, sunsets, running/cycling and museums.`,
    },
    center: { lat: 40.6205, lng: 22.9503 },
    nearby: ["center", "kalamaria"],
    featured: true,
  },
  {
    slug: "valaoritou",
    name: { el: "Βαλαωρίτου", en: "Valaoritou" },
    blurb: {
      el: "Πρώην βιοτεχνική ζώνη που έγινε το επίκεντρο της εναλλακτικής νυχτερινής ζωής και των bar.",
      en: "A former manufacturing zone turned epicentre of the city's alternative bar and nightlife scene.",
    },
    long: {
      el: `Η **Βαλαωρίτου** είναι η ιστορία μιας γειτονιάς που ξαναγεννήθηκε: από βιοτεχνική ζώνη, σε επίκεντρο της πιο εναλλακτικής νυχτερινής ζωής της Θεσσαλονίκης.

## Χαρακτήρας & ιστορία
Παλιά γεμάτη υφασματάδικα, τυπογραφεία και μικρά εργαστήρια, η περιοχή γύρω από την οδό Βαλαωρίτου άδειασε και στη συνέχεια «καταλήφθηκε» από μπαρ και δημιουργικούς χώρους. Τα παλιά βιομηχανικά κτίρια δίνουν στη γειτονιά μια ωμή, αυθεντική αισθητική.

## Τι να κάνεις
- Ξεκίνα τη βραδιά σου με **cocktails** σε κάποιο από τα πολλά μπαρ.
- Ανακάλυψε **street art** στις προσόψεις.
- Χάσου στα στενά — η περιοχή αλλάζει διαρκώς με νέα σημεία.

## Πότε να έρθεις
Η Βαλαωρίτου ζει τη νύχτα. Την ημέρα είναι πιο ήσυχη, ιδανική για να δεις τα κτίρια και τα γκράφιτι.

## Πώς κινείσαι
Μόλις λίγα λεπτά με τα πόδια από την Αριστοτέλους και τα Λαδάδικα.

**Ιδανικό για:** νυχτερινή ζωή, ποτό, νεανικό και εναλλακτικό κοινό.`,
      en: `**Valaoritou** is the story of a neighbourhood reborn: from a manufacturing zone to the epicentre of Thessaloniki's most alternative nightlife.

## Character & history
Once full of textile shops, print houses and small workshops, the area around Valaoritou Street emptied out and was then "taken over" by bars and creative spaces. The old industrial buildings give the quarter a raw, authentic aesthetic.

## What to do
- Start your night with **cocktails** at one of the many bars.
- Spot **street art** on the façades.
- Get lost in the lanes — the area constantly changes with new spots.

## When to come
Valaoritou lives at night. By day it's quieter, ideal for taking in the buildings and the graffiti.

## Getting around
Just a few minutes on foot from Aristotelous and Ladadika.

**Best for:** nightlife, drinks and a young, alternative crowd.`,
    },
    center: { lat: 40.6392, lng: 22.9377 },
    nearby: ["center", "ladadika"],
  },
  {
    slug: "limani",
    name: { el: "Λιμάνι & Φραγκομαχαλάς", en: "Port & Frangomahalas" },
    blurb: {
      el: "Μουσεία μέσα σε αποθήκες του λιμανιού και αναπαλαιωμένα κτίρια που γέμισαν μπαρ — η πιο δημιουργική γωνιά της πόλης.",
      en: "Museums inside port warehouses and restored buildings full of bars — the city's most creative corner.",
    },
    long: {
      el: `Εκεί που το κέντρο συναντά τη θάλασσα, το παλιό λιμάνι έχει μεταμορφωθεί σε πολιτιστικό προορισμό — και δίπλα του ο Φραγκομαχαλάς, η παλιά «φράγκικη» συνοικία, ξαναζωντάνεψε ως ένα από τα πιο ατμοσφαιρικά σημεία εξόδου.

## Χαρακτήρας & ιστορία
Ο **Φραγκομαχαλάς**, γύρω από τις οδούς Κατούνη, Συγγρού και Φράγκων, ήταν ιστορικά η συνοικία των δυτικοευρωπαίων εμπόρων. Τα πέτρινα εμπορικά κτίρια που γλίτωσαν από την πυρκαγιά του 1917 αναπαλαιώθηκαν και σήμερα στεγάζουν μπαρ, εστιατόρια και στούντιο.

## Τι να δεις
- Την **Προβλήτα Α΄** του λιμανιού, όπου στεγάζονται το **Μουσείο Φωτογραφίας Θεσσαλονίκης**, το **Μουσείο Κινηματογράφου** και ο πειραματικός χώρος σύγχρονης τέχνης του MOMus.
- Την **Αποθήκη Γ΄**, βιομηχανικό κέλυφος που φιλοξενεί εκθέσεις και εκδηλώσεις.
- Τη βόλτα στην προβλήτα με θέα τον Θερμαϊκό και τον Όλυμπο τις καθαρές μέρες.

## Έξοδος
Ο Φραγκομαχαλάς λειτουργεί όλη μέρα: καφές το πρωί, μεσογειακή κουζίνα το βράδυ και μπαρ που κρατούν μέχρι αργά — με πιο χαλαρό, δημιουργικό κοινό απ' ό,τι στα Λαδάδικα.

## Πώς κινείσαι
Είναι μόλις 10 λεπτά με τα πόδια από την Αριστοτέλους και συνδέεται άνετα με τα Λαδάδικα και το Βαλαωρίτου.

**Ιδανικό για:** τέχνη, φωτογραφία, ατμοσφαιρικό φαγητό και ποτό δίπλα στο νερό.`,
      en: `Where the centre meets the sea, the old port has been transformed into a cultural destination — and beside it Frangomahalas, the old "Frankish" quarter, has come back to life as one of the city's most atmospheric places to go out.

## Character & history
**Frangomahalas**, around Katouni, Syngrou and Frangon streets, was historically the quarter of Western European merchants. The stone trading houses that survived the 1917 fire have been restored and now hold bars, restaurants and studios.

## What to see
- **Pier 1** of the port, home to the **Thessaloniki Museum of Photography**, the **Cinema Museum** and MOMus' experimental space for contemporary art.
- **Warehouse C**, an industrial shell hosting exhibitions and events.
- The walk along the pier, looking out over the Thermaic Gulf and, on clear days, Mount Olympus.

## Going out
Frangomahalas works all day: coffee in the morning, Mediterranean cooking in the evening and bars that run late — with a more relaxed, creative crowd than Ladadika.

## Getting around
It's a 10-minute walk from Aristotelous and connects easily to Ladadika and Valaoritou.

**Best for:** art, photography, and atmospheric food and drinks by the water.`,
    },
    center: { lat: 40.6357, lng: 22.933 },
    nearby: ["ladadika", "valaoritou", "center", "sfageia"],
    featured: true,
  },
  {
    slug: "navarinou",
    name: { el: "Ναυαρίνου & Ροτόντα", en: "Navarinou & Rotonda" },
    blurb: {
      el: "Η φοιτητική καρδιά της πόλης — ρωμαϊκά ερείπια, πεζόδρομοι με καφέ και κόσμος από το πρωί ως το ξημέρωμα.",
      en: "The city's student heart — Roman ruins, pedestrian streets full of cafés and people from morning until dawn.",
    },
    long: {
      el: `Ανάμεσα στην Καμάρα και τη θάλασσα απλώνεται η πιο νεανική γειτονιά της Θεσσαλονίκης. Εδώ τα ρωμαϊκά ερείπια δεν είναι πίσω από κάγκελα — είναι το σκηνικό όπου οι φοιτητές πίνουν τον καφέ τους.

## Χαρακτήρας & ιστορία
Η **Πλατεία Ναυαρίνου** είναι χτισμένη γύρω από τα ερείπια του **ανακτορικού συγκροτήματος του Γαλερίου** (4ος αι. μ.Χ.), μέρος του ίδιου αυτοκρατορικού σχεδίου με τη Ροτόντα και την Αψίδα. Ο πεζόδρομος της **Δημητρίου Γούναρη** ενώνει τα δύο, κατεβαίνοντας προς την παραλία.

## Τι να δεις
- Τη **Ροτόντα**, το επιβλητικό κυκλικό οικοδόμημα του 4ου αιώνα, μνημείο UNESCO με ψηφιδωτά.
- Την **Αψίδα του Γαλερίου (Καμάρα)**, το κλασικό σημείο συνάντησης της πόλης.
- Τα ανοιχτά ερείπια του **ανακτόρου** μέσα στην πλατεία.

## Καφές, φαγητό & έξοδος
Η περιοχή είναι γεμάτη με φοιτητικά καφέ, οικονομικά στέκια για σουβλάκι και μπαρ. Είναι από τα λίγα σημεία όπου η πόλη είναι εξίσου ζωντανή Τρίτη βράδυ και Σάββατο.

## Πώς κινείσαι
Απόλυτα περπατήσιμη, δίπλα στο κέντρο και σε απόσταση αναπνοής από το Αριστοτέλειο Πανεπιστήμιο.

**Ιδανικό για:** νεανική ατμόσφαιρα, οικονομικό φαγητό, ιστορία μέσα στην καθημερινότητα.`,
      en: `Between Kamara and the sea lies Thessaloniki's most youthful neighbourhood. Here the Roman ruins aren't behind railings — they're the backdrop where students drink their coffee.

## Character & history
**Navarinou Square** is built around the ruins of the **Palace of Galerius** (4th century AD), part of the same imperial plan as the Rotunda and the Arch. The **Dimitriou Gounari** pedestrian street links the two, running down toward the seafront.

## What to see
- The **Rotunda**, the imposing 4th-century circular building, a UNESCO monument with mosaics.
- The **Arch of Galerius (Kamara)**, the city's classic meeting point.
- The open palace ruins set into the square itself.

## Coffee, food & going out
The area is packed with student cafés, cheap souvlaki spots and bars. It's one of the few places where the city feels just as alive on a Tuesday night as on a Saturday.

## Getting around
Completely walkable, right beside the centre and a short stroll from the Aristotle University.

**Best for:** a young atmosphere, affordable food, and history woven into daily life.`,
    },
    center: { lat: 40.6314, lng: 22.9497 },
    nearby: ["center", "waterfront", "ano-poli"],
    featured: true,
  },
  {
    slug: "panorama",
    name: { el: "Πανόραμα", en: "Panorama" },
    blurb: {
      el: "Το προάστιο στον λόφο με την καλύτερη θέα στον Θερμαϊκό — και το γλυκό που πήρε το όνομά του από εδώ.",
      en: "The hillside suburb with the best view over the Thermaic Gulf — and the sweet that took its name from here.",
    },
    long: {
      el: `Ανατολικά του κέντρου, το Πανόραμα κάθεται ψηλά στον λόφο και κοιτάζει ολόκληρη τη Θεσσαλονίκη απλωμένη κάτω από τα πόδια του. Είναι από τα πιο ήσυχα και ακριβά προάστια της πόλης.

## Χαρακτήρας
Καθαρά οικιστικό, με μονοκατοικίες, δεντροφυτεμένους δρόμους και αισθητά δροσερότερο αέρα το καλοκαίρι. Οι Θεσσαλονικείς ανεβαίνουν εδώ για βόλτα, καφέ με θέα και για το γλυκό της περιοχής.

## Τι να δεις & να κάνεις
- Τη **θέα** από την πλατεία και τους περιφερειακούς δρόμους — ιδιαίτερα εντυπωσιακή στο ηλιοβασίλεμα και τη νύχτα.
- Τα **τρίγωνα Πανοράματος**, το τοπικό γλυκό με κρέμα σε τραγανό φύλλο που γεννήθηκε εδώ και έγινε γνωστό σε όλη την Ελλάδα.
- Περπάτημα και ποδήλατο στους ήσυχους δρόμους και προς τον Χορτιάτη.

## Διαμονή & φαγητό
Λιγότερες επιλογές από το κέντρο, αλλά πιο ήρεμες: ταβέρνες με θέα και καφέ που γεμίζουν τα σαββατοκύριακα.

## Πώς κινείσαι
Χρειάζεσαι αυτοκίνητο ή λεωφορείο — περίπου 20–30 λεπτά από το κέντρο ανάλογα με την κίνηση.

**Ιδανικό για:** θέα, ησυχία, οικογενειακή βόλτα και γλυκό.`,
      en: `East of the centre, Panorama sits high on the hill and looks out over the whole of Thessaloniki spread beneath it. It is one of the city's quietest and most expensive suburbs.

## Character
Strictly residential, with detached houses, tree-lined streets and noticeably cooler air in summer. Locals drive up here for a walk, a coffee with a view, and the sweet the area is famous for.

## What to see & do
- The **view** from the square and the surrounding roads — especially striking at sunset and after dark.
- **Trigona Panoramatos**, the local sweet of custard in crisp pastry that was born here and became known across Greece.
- Walking and cycling on the quiet roads and up toward Chortiatis.

## Staying & eating
Fewer options than the centre, but calmer ones: tavernas with a view and cafés that fill up at weekends.

## Getting around
You'll need a car or a bus — roughly 20–30 minutes from the centre depending on traffic.

**Best for:** views, quiet, a family outing and something sweet.`,
    },
    center: { lat: 40.5872, lng: 23.0386 },
    nearby: ["pylaia", "thermi", "kalamaria"],
  },
  {
    slug: "pylaia",
    name: { el: "Πυλαία", en: "Pylaia" },
    blurb: {
      el: "Το ανατολικό προάστιο των εμπορικών κέντρων και των επιχειρηματικών ξενοδοχείων, με γρήγορη πρόσβαση στον περιφερειακό.",
      en: "The eastern suburb of shopping centres and business hotels, with quick access to the ring road.",
    },
    long: {
      el: `Η Πυλαία απλώνεται στην ανατολική πλευρά της πόλης, εκεί όπου η Θεσσαλονίκη συναντά τον περιφερειακό δρόμο και τους δρόμους προς Χαλκιδική και αεροδρόμιο. Είναι η πιο «πρακτική» περιοχή της πόλης.

## Χαρακτήρας
Συνδυάζει παλιούς οικισμούς στην πλαγιά με σύγχρονες πολυκατοικίες, γραφεία και μεγάλα εμπορικά κέντρα. Δεν είναι τουριστικός προορισμός — είναι όμως εξαιρετικά βολική βάση.

## Τι υπάρχει εδώ
- Μεγάλα **εμπορικά κέντρα**, με το Mediterranean Cosmos να είναι το γνωστότερο, με καταστήματα, εστιατόρια και κινηματογράφο.
- **Επιχειρηματικά ξενοδοχεία** και χώρους συνεδρίων.
- Θέα προς την πόλη από τα ψηλότερα σημεία της πλαγιάς.

## Γιατί να μείνεις εδώ
Αν ταξιδεύεις με αυτοκίνητο, έχεις δουλειά στην πόλη ή κατευθύνεσαι προς τη Χαλκιδική, η Πυλαία σού γλιτώνει την κίνηση και το πρόβλημα του παρκαρίσματος στο κέντρο.

## Πώς κινείσαι
Ιδανική με αυτοκίνητο· εξυπηρετείται και από λεωφορεία προς το κέντρο, περίπου 15–20 λεπτά εκτός ωρών αιχμής.

**Ιδανικό για:** ψώνια, επαγγελματικά ταξίδια, οδηγούς και ορμητήριο για Χαλκιδική.`,
      en: `Pylaia spreads across the eastern side of the city, where Thessaloniki meets the ring road and the routes toward Halkidiki and the airport. It is the city's most practical district.

## Character
It mixes older hillside settlements with modern apartment blocks, offices and large shopping centres. It isn't a tourist destination — but it is an extremely convenient base.

## What's here
- Large **shopping centres**, the best known being Mediterranean Cosmos, with shops, restaurants and a cinema.
- **Business hotels** and conference space.
- Views over the city from the higher points of the slope.

## Why stay here
If you're travelling by car, have business in the city, or are heading on to Halkidiki, Pylaia saves you the traffic and the parking problem of the centre.

## Getting around
Best by car; buses also serve the centre, roughly 15–20 minutes outside rush hour.

**Best for:** shopping, business trips, drivers, and a launchpad for Halkidiki.`,
    },
    center: { lat: 40.5972, lng: 22.9989 },
    nearby: ["panorama", "thermi", "kalamaria", "toumba"],
  },
  {
    slug: "thermi",
    name: { el: "Θέρμη", en: "Thermi" },
    blurb: {
      el: "Η περιοχή του αεροδρομίου — βολική βάση για πτήσεις, συνέδρια και εκδρομές προς Χαλκιδική.",
      en: "The airport area — a convenient base for flights, conferences and trips toward Halkidiki.",
    },
    long: {
      el: `Νοτιοανατολικά της πόλης, η Θέρμη είναι το σημείο όπου η Θεσσαλονίκη συνδέεται με τον υπόλοιπο κόσμο. Το αεροδρόμιο «Μακεδονία» βρίσκεται δίπλα, και γύρω του έχει αναπτυχθεί ένας κόμβος από ξενοδοχεία, επιχειρήσεις και τεχνολογικά πάρκα.

## Χαρακτήρας
Ένας παλιός οικισμός που μεγάλωσε γρήγορα σε σύγχρονο προάστιο. Ήσυχη, πράσινη και οργανωμένη γύρω από τον αυτοκινητόδρομο — περισσότερο τόπος διαμονής και εργασίας παρά περιήγησης.

## Τι υπάρχει εδώ
- Ξενοδοχεία κοντά στο **αεροδρόμιο**, χρήσιμα για πρωινές πτήσεις.
- Χώροι **συνεδρίων** και επιχειρηματικά πάρκα.
- Ταβέρνες και καφέ που εξυπηρετούν κυρίως τους κατοίκους — καλή, ανεπιτήδευτη κουζίνα.

## Γιατί να μείνεις εδώ
Είναι η λογικότερη επιλογή αν έχεις πτήση νωρίς το πρωί ή αργά το βράδυ, ή αν συνεχίζεις οδικώς προς τη Χαλκιδική χωρίς να θέλεις να μπεις στην πόλη.

## Πώς κινείσαι
Με αυτοκίνητο ή ταξί· το κέντρο απέχει περίπου 20–25 λεπτά εκτός κίνησης.

**Ιδανικό για:** πτήσεις, συνέδρια, οδικά ταξίδια προς Χαλκιδική.`,
      en: `Southeast of the city, Thermi is where Thessaloniki connects to the rest of the world. "Makedonia" Airport sits alongside it, and around it has grown a cluster of hotels, businesses and technology parks.

## Character
An old settlement that grew quickly into a modern suburb. Quiet, green and organised around the motorway — more a place to stay and work than to sightsee.

## What's here
- Hotels close to the **airport**, useful for early flights.
- **Conference** venues and business parks.
- Tavernas and cafés serving mainly locals — good, unpretentious cooking.

## Why stay here
It's the most sensible choice if you have an early-morning or late-night flight, or if you're continuing by road to Halkidiki without wanting to enter the city.

## Getting around
By car or taxi; the centre is roughly 20–25 minutes away outside traffic.

**Best for:** flights, conferences, road trips toward Halkidiki.`,
    },
    center: { lat: 40.5478, lng: 23.0203 },
    nearby: ["pylaia", "panorama", "peraia"],
  },
  {
    slug: "toumba",
    name: { el: "Τούμπα", en: "Toumba" },
    blurb: {
      el: "Αυθεντική εργατική γειτονιά με τη μεγαλύτερη ποδοσφαιρική ψυχή της πόλης.",
      en: "An authentic working-class neighbourhood with the loudest football soul in the city.",
    },
    long: {
      el: `Ανατολικά του κέντρου, η Τούμπα είναι μια από τις πιο πυκνοκατοικημένες και αυθεντικές γειτονιές της Θεσσαλονίκης — μακριά από τις τουριστικές διαδρομές, αλλά με χαρακτήρα που δύσκολα ξεχνιέται.

## Χαρακτήρας & ιστορία
Η περιοχή χτίστηκε σε μεγάλο βαθμό από πρόσφυγες της Μικράς Ασίας μετά το 1922, και αυτή η καταγωγή φαίνεται ακόμα στην κουζίνα και στον τρόπο που ζει η γειτονιά. Το όνομά της προέρχεται από τον προϊστορικό οικιστικό λόφο (τούμπα) που δεσπόζει στην περιοχή.

## Τι να δεις & να κάνεις
- Το **Στάδιο Τούμπας**, έδρα του ΠΑΟΚ και ένα από τα πιο θορυβώδη γήπεδα της Ελλάδας — μια ντόπια εμπειρία από μόνο του.
- Τον **προϊστορικό λόφο** και τη θέα προς την πόλη.
- Παραδοσιακά ψητοπωλεία και μεζεδοπωλεία με τιμές γειτονιάς.

## Γιατί να έρθεις
Αν θέλεις να δεις πώς ζει πραγματικά η Θεσσαλονίκη — όχι το κέντρο για τους επισκέπτες, αλλά την πόλη των κατοίκων της.

## Πώς κινείσαι
Εξυπηρετείται καλά από λεωφορεία και βρίσκεται περίπου 10–15 λεπτά από το κέντρο.

**Ιδανικό για:** ποδόσφαιρο, αυθεντικό φαγητό, ατμόσφαιρα γειτονιάς.`,
      en: `East of the centre, Toumba is one of Thessaloniki's most densely populated and authentic neighbourhoods — well off the tourist trail, but with a character that's hard to forget.

## Character & history
The area was largely built by refugees from Asia Minor after 1922, and that ancestry still shows in its cooking and in the way the neighbourhood lives. Its name comes from the prehistoric settlement mound (toumba) that rises above it.

## What to see & do
- **Toumba Stadium**, home of PAOK and one of the loudest grounds in Greece — a local experience in its own right.
- The **prehistoric mound** and the view back over the city.
- Traditional grill houses and meze places at neighbourhood prices.

## Why come
If you want to see how Thessaloniki actually lives — not the centre laid on for visitors, but the city of its residents.

## Getting around
Well served by buses and roughly 10–15 minutes from the centre.

**Best for:** football, authentic food, neighbourhood atmosphere.`,
    },
    center: { lat: 40.6144, lng: 22.9722 },
    nearby: ["center", "pylaia", "kalamaria"],
  },
  {
    slug: "aretsou",
    name: { el: "Αρετσού & Νέα Κρήνη", en: "Aretsou & Nea Krini" },
    blurb: {
      el: "Η μαρίνα της Καλαμαριάς — ιστιοπλοϊκά, παραθαλάσσια καφέ και το πιο ήρεμο ηλιοβασίλεμα της πόλης.",
      en: "Kalamaria's marina — sailing boats, seaside cafés and the calmest sunset in the city.",
    },
    long: {
      el: `Στο νότιο άκρο της Καλαμαριάς, η Αρετσού είναι το σημείο όπου η πόλη ξαναβρίσκει τη θάλασσα με πιο ήσυχο τρόπο απ' ό,τι στη Νέα Παραλία.

## Χαρακτήρας & ιστορία
Η Νέα Κρήνη χτίστηκε από πρόσφυγες που ήρθαν από την Κρήνη (Çeşme) της Μικράς Ασίας — εξ ου και το όνομα. Σήμερα η περιοχή έχει έντονο μεσογειακό, σχεδόν νησιώτικο χαρακτήρα γύρω από τη μαρίνα.

## Τι να δεις & να κάνεις
- Τη **μαρίνα Αρετσούς** με τα δεμένα ιστιοπλοϊκά — ιδανική για βραδινή βόλτα.
- Τον **παραλιακό πεζόδρομο**, πιο χαλαρό και οικογενειακό από το κέντρο.
- Καφέ και ταβέρνες με θέα στον Θερμαϊκό και τον Όλυμπο απέναντι.

## Γιατί να έρθεις
Είναι η επιλογή των ντόπιων για ήρεμο καφέ δίπλα στο νερό, μακριά από τη φασαρία του κέντρου, με το ηλιοβασίλεμα να πέφτει πίσω από τον Όλυμπο.

## Πώς κινείσαι
Με λεωφορείο ή αυτοκίνητο από το κέντρο· η Καλαμαριά συνδέεται και με το δίκτυο του μετρό.

**Ιδανικό για:** ηλιοβασίλεμα, θαλασσινό φαγητό, χαλαρή βόλτα δίπλα στο νερό.`,
      en: `At the southern edge of Kalamaria, Aretsou is where the city meets the sea again — in a quieter way than the Nea Paralia.

## Character & history
Nea Krini was built by refugees who came from Krini (Çeşme) in Asia Minor — hence the name. Today the area has a distinctly Mediterranean, almost island-like feel around the marina.

## What to see & do
- **Aretsou Marina** with its moored sailing boats — perfect for an evening stroll.
- The **seaside promenade**, more relaxed and family-oriented than the centre.
- Cafés and tavernas looking across the Thermaic Gulf to Mount Olympus.

## Why come
It's where locals go for a quiet coffee by the water, away from the noise of the centre, with the sun setting behind Olympus.

## Getting around
By bus or car from the centre; Kalamaria is also connected to the metro network.

**Best for:** sunsets, seafood, a relaxed walk by the water.`,
    },
    center: { lat: 40.5741, lng: 22.9469 },
    nearby: ["kalamaria", "waterfront", "panorama"],
  },
  {
    slug: "sfageia",
    name: { el: "Σφαγεία", en: "Sfageia" },
    blurb: {
      el: "Πρώην βιομηχανική ζώνη που έγινε το σπίτι της εναλλακτικής νυχτερινής σκηνής της πόλης.",
      en: "A former industrial zone turned home of the city's alternative nightlife scene.",
    },
    long: {
      el: `Δυτικά του κέντρου, εκεί όπου η πόλη γίνεται βιομηχανική, τα Σφαγεία είναι η απάντηση της Θεσσαλονίκης στις μεταμορφωμένες βιομηχανικές συνοικίες της Ευρώπης.

## Χαρακτήρας & ιστορία
Η περιοχή πήρε το όνομά της από τα παλιά δημοτικά σφαγεία. Καθώς οι δραστηριότητες μετακινήθηκαν, τα μεγάλα κτίρια και οι αποθήκες πέρασαν σε άλλα χέρια — και έγιναν χώροι συναυλιών, κλαμπ και καλλιτεχνικά στούντιο.

## Τι υπάρχει εδώ
- **Χώροι live μουσικής και κλαμπ** σε βιομηχανικά κελύφη, με προγράμματα που τραβούν κόσμο από όλη την πόλη.
- **Καλλιτεχνικοί χώροι** και στούντιο σε επανακατοικημένα κτίρια.
- Μια εικόνα της πόλης εντελώς διαφορετική από τη νεοκλασική Αριστοτέλους.

## Πότε να έρθεις
Είναι περιοχή της νύχτας: τη μέρα παραμένει ήσυχη και εργασιακή, αλλά από αργά το βράδυ και μετά αποκτά τη δική της ζωή, κυρίως τα σαββατοκύριακα.

## Πώς κινείσαι
Με ταξί ή αυτοκίνητο· απέχει λίγα λεπτά από το κέντρο και τα Λαδάδικα.

**Ιδανικό για:** εναλλακτική μουσική, κλαμπ, νεανική νυχτερινή έξοδο.`,
      en: `West of the centre, where the city turns industrial, Sfageia is Thessaloniki's answer to Europe's converted factory districts.

## Character & history
The area takes its name from the old municipal slaughterhouses. As that activity moved away, the large buildings and warehouses passed into other hands — and became concert venues, clubs and artists' studios.

## What's here
- **Live music venues and clubs** in industrial shells, with line-ups that draw people from across the city.
- **Art spaces** and studios in reoccupied buildings.
- A face of the city completely unlike neoclassical Aristotelous.

## When to come
This is a night-time district: by day it stays quiet and workaday, but from late evening onward it comes into its own, especially at weekends.

## Getting around
By taxi or car; it's a few minutes from the centre and Ladadika.

**Best for:** alternative music, clubbing, a young night out.`,
    },
    center: { lat: 40.636, lng: 22.922 },
    nearby: ["limani", "valaoritou", "vardaris"],
  },
  {
    slug: "vardaris",
    name: { el: "Βαρδάρης", en: "Vardaris" },
    blurb: {
      el: "Η δυτική πύλη της πόλης γύρω από τον σιδηροδρομικό σταθμό — τραχιά, πολυπολιτισμική και βαθιά ιστορική.",
      en: "The city's western gateway around the railway station — rough-edged, multicultural and deeply historic.",
    },
    long: {
      el: `Ο Βαρδάρης είναι το σημείο απ' όπου η Θεσσαλονίκη υποδεχόταν πάντα τους ταξιδιώτες: εδώ βρίσκεται ο σιδηροδρομικός σταθμός και οι κεντρικοί σταθμοί λεωφορείων προς τη δυτική Μακεδονία.

## Χαρακτήρας & ιστορία
Η περιοχή γύρω από την **Πλατεία Δημοκρατίας** ήταν από τα σημαντικότερα σημεία εισόδου της οχυρωμένης πόλης· εκεί βρισκόταν η δυτική πύλη των τειχών. Στα νεότερα χρόνια εξελίχθηκε σε εμπορικό και εργατικό κόμβο, με έντονο πολυπολιτισμικό χαρακτήρα.

## Τι να δεις
- Τα σωζόμενα ίχνη των **δυτικών τειχών** της πόλης.
- Το εμπορικό, καθημερινό πρόσωπο μιας γειτονιάς που δεν έχει εξωραϊστεί για τους επισκέπτες.
- Μικρά μαγαζιά και αγορές που εξυπηρετούν κοινότητες από όλο τον κόσμο.

## Τι να ξέρεις
Ο Βαρδάρης δεν είναι τουριστική περιοχή και τη νύχτα μπορεί να είναι πιο ήσυχος και υποβαθμισμένος — άξιζει όμως για την αυθεντικότητά του και για την πρακτική του σημασία αν ταξιδεύεις με τρένο ή λεωφορείο.

## Πώς κινείσαι
Κόμβος τρένων και υπεραστικών λεωφορείων· το κέντρο απέχει λίγα λεπτά με τα πόδια ή μία στάση με το μετρό.

**Ιδανικό για:** μετακινήσεις με τρένο/λεωφορείο, ιστορία των τειχών, αυθεντική εικόνα της πόλης.`,
      en: `Vardaris is where Thessaloniki has always received its travellers: the railway station and the intercity bus terminals for western Macedonia are here.

## Character & history
The area around **Dimokratias Square** was one of the fortified city's most important entrances, the site of the western gate in the walls. In modern times it grew into a commercial and working-class hub with a strongly multicultural character.

## What to see
- The surviving traces of the city's **western walls**.
- The everyday, commercial face of a neighbourhood that hasn't been polished for visitors.
- Small shops and markets serving communities from around the world.

## What to know
Vardaris isn't a tourist district and can feel quieter and rougher at night — but it's worth it for its authenticity and its practical importance if you're travelling by train or bus.

## Getting around
A rail and intercity bus hub; the centre is a few minutes on foot or one metro stop away.

**Best for:** train and bus travel, the history of the walls, an unvarnished view of the city.`,
    },
    center: { lat: 40.6414, lng: 22.9316 },
    nearby: ["center", "valaoritou", "sfageia"],
  },
  {
    slug: "peraia",
    name: { el: "Περαία", en: "Peraia" },
    blurb: {
      el: "Η παραλιακή πόλη απέναντι από τη Θεσσαλονίκη — μπάνιο, ταβέρνες και δίπλα στο αεροδρόμιο.",
      en: "The seaside town across the bay from Thessaloniki — swimming, tavernas and next to the airport.",
    },
    long: {
      el: `Νότια της πόλης, στην απέναντι πλευρά του Θερμαϊκού, η Περαία είναι εκεί όπου οι Θεσσαλονικείς πηγαίνουν για μπάνιο χωρίς να ταξιδέψουν στη Χαλκιδική.

## Χαρακτήρας & ιστορία
Ιδρύθηκε από πρόσφυγες της Μικράς Ασίας και για δεκαετίες ήταν θέρετρο παραθερισμού. Σήμερα κατοικείται όλο τον χρόνο, αλλά το καλοκαίρι διπλασιάζεται και αποκτά καθαρά παραθαλάσσιο ρυθμό.

## Τι να δεις & να κάνεις
- Τη **μεγάλη παραλία** και τον παραλιακό πεζόδρομο με καφέ και beach bars.
- **Ψαροταβέρνες** με θέα προς τη Θεσσαλονίκη απέναντι — ιδιαίτερα το βράδυ, με τα φώτα της πόλης στο νερό.
- Βόλτες προς τους γειτονικούς οικισμούς κατά μήκος της ακτής.

## Γιατί να μείνεις εδώ
Είναι πολύ κοντά στο **αεροδρόμιο** και προσφέρει θάλασσα — συνδυασμός που δεν υπάρχει μέσα στην πόλη. Καλή επιλογή για καλοκαιρινή διαμονή ή για την τελευταία νύχτα πριν την πτήση.

## Πώς κινείσαι
Με αυτοκίνητο ή λεωφορείο· υπάρχει και θαλάσσια σύνδεση προς το κέντρο τους καλοκαιρινούς μήνες.

**Ιδανικό για:** μπάνιο, θαλασσινό φαγητό, διαμονή κοντά στο αεροδρόμιο.`,
      en: `South of the city, on the far side of the Thermaic Gulf, Peraia is where locals go to swim without driving to Halkidiki.

## Character & history
Founded by refugees from Asia Minor, it was a summer resort for decades. Today it's lived in year-round, but in summer it doubles in size and takes on a purely seaside rhythm.

## What to see & do
- The **long beach** and the seafront promenade lined with cafés and beach bars.
- **Fish tavernas** looking back at Thessaloniki across the water — especially at night, with the city lights on the sea.
- Walks along the coast toward the neighbouring settlements.

## Why stay here
It's very close to the **airport** and it has a beach — a combination the city itself can't offer. A good choice for a summer stay or for your last night before a flight.

## Getting around
By car or bus; there's also a seasonal boat connection to the centre in the summer months.

**Best for:** swimming, seafood, staying near the airport.`,
    },
    center: { lat: 40.4989, lng: 22.8861 },
    nearby: ["thermi", "kalamaria", "aretsou"],
  },
];

const areaBySlug = new Map(areas.map((a) => [a.slug, a]));
export function getArea(slug: string): Area | undefined {
  return areaBySlug.get(slug);
}
