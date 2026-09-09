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
    nearby: ["ladadika", "waterfront", "ano-poli", "valaoritou"],
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
];

const areaBySlug = new Map(areas.map((a) => [a.slug, a]));
export function getArea(slug: string): Area | undefined {
  return areaBySlug.get(slug);
}
