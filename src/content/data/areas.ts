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
      el: "Το κέντρο της Θεσσαλονίκης είναι εκεί όπου συναντιούνται τα πάντα: η **Πλατεία Αριστοτέλους** ανοιχτή στη θάλασσα, η εμπορική **Τσιμισκή**, οι ιστορικές αγορές **Μοδιάνο** και **Καπάνι**, και τα περισσότερα μνημεία της πόλης — από τη Ροτόντα και την Αψίδα του Γαλερίου μέχρι τον Άγιο Δημήτριο. Ιδανικό για πρώτη επίσκεψη, αφού τα πάντα γίνονται με τα πόδια.",
      en: "The city center is where everything meets: **Aristotelous Square** opening to the sea, the **Tsimiski** shopping street, the historic **Modiano** and **Kapani** markets, and most of the city's monuments — from the Rotunda and the Arch of Galerius to Agios Dimitrios. Ideal for a first visit, since everything is walkable.",
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
      el: "Τα **Λαδάδικα** είναι μια από τις πιο γραφικές γειτονιές της πόλης: χαμηλά διατηρητέα κτίρια, πλακόστρωτα δρομάκια και μια από τις πιο ζωντανές σκηνές εστίασης και διασκέδασης, δίπλα στο λιμάνι. Πήραν το όνομά τους από τα παλιά εμπορικά λαδιού. Το βράδυ γεμίζουν κόσμο, μουσική και τσίπουρο.",
      en: "**Ladadika** is one of the city's most picturesque quarters: low listed buildings, cobbled lanes and one of the liveliest dining and nightlife scenes, right by the port. It takes its name from the old olive-oil trade. At night it fills with people, music and tsipouro.",
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
      el: "Η **Άνω Πόλη** γλίτωσε από τη μεγάλη πυρκαγιά του 1917 και διατηρεί τον παλιό χαρακτήρα της: βυζαντινά τείχη, το **Επταπύργιο**, τη **Μονή Βλατάδων**, μικρές εκκλησίες και στενά καλντερίμια με χρωματιστά σπίτια. Από ψηλά απλώνεται η καλύτερη θέα στην πόλη και τον Θερμαϊκό — ιδανική για ηλιοβασίλεμα.",
      en: "**Ano Poli** survived the great fire of 1917 and keeps its old character: Byzantine walls, the **Heptapyrgion** fortress, **Vlatades Monastery**, small churches and narrow cobbled lanes with colourful houses. From up here unfolds the best view over the city and the gulf — perfect at sunset.",
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
      el: "Η **Καλαμαριά** είναι ο μεγαλύτερος δήμος του πολεοδομικού συγκροτήματος, στα ανατολικά και δίπλα στη θάλασσα. Με τη μαρίνα της **Αρετσούς**, παραλιακούς περιπάτους, καφέ και ψαροταβέρνες, έχει πιο χαλαρή, οικογενειακή ατμόσφαιρα, ενώ συνδέεται εύκολα με το κέντρο.",
      en: "**Kalamaria** is the largest municipality of the metropolitan area, to the east and right by the sea. With the **Aretsou** marina, seaside walks, cafés and fish tavernas, it has a more relaxed, family feel, while still being well connected to the centre.",
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
      el: "Η **Νέα Παραλία** είναι ο βραβευμένος παραλιακός πεζόδρομος που εκτείνεται από τον **Λευκό Πύργο** ως το Μέγαρο Μουσικής, με θεματικούς κήπους, τις **Ομπρέλες** του Ζογγολόπουλου, ποδηλατόδρομο και τα μεγάλα μουσεία (Αρχαιολογικό, Βυζαντινού Πολιτισμού) δίπλα. Το αγαπημένο σημείο των Θεσσαλονικέων για βόλτα και ηλιοβασίλεμα.",
      en: "The **waterfront** is the award-winning seaside promenade stretching from the **White Tower** to the Concert Hall, with themed gardens, Zongolopoulos' **Umbrellas**, a cycle path and the major museums (Archaeological, Byzantine Culture) nearby. The locals' favourite spot for a stroll and sunset.",
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
      el: "Η **Βαλαωρίτου** ήταν παλιά βιοτεχνική ζώνη με υφασματάδικα και εργαστήρια· τα τελευταία χρόνια μεταμορφώθηκε στο επίκεντρο της εναλλακτικής νυχτερινής ζωής. Παλιά κτίρια στεγάζουν πλέον bar, cocktail spots και χώρους με μουσική — το σημείο για όσους θέλουν πιο underground ατμόσφαιρα, λίγα βήματα από το κέντρο.",
      en: "**Valaoritou** was once a manufacturing zone of textile shops and workshops; in recent years it has become the epicentre of the city's alternative nightlife. Old buildings now house bars, cocktail spots and music venues — the place for a more underground atmosphere, steps from the centre.",
    },
    center: { lat: 40.6392, lng: 22.9377 },
    nearby: ["center", "ladadika"],
  },
];

const areaBySlug = new Map(areas.map((a) => [a.slug, a]));
export function getArea(slug: string): Area | undefined {
  return areaBySlug.get(slug);
}
