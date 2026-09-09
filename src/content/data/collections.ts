import type { Collection } from "@/lib/types";

/**
 * Curated collection pages for the DISCOVER pillar — the SEO backbone.
 *
 * Each targets a real search intent and carries a UNIQUE editorial intro.
 * All of them have real members from `attractions.ts`, so none is a thin page.
 * Collections for STAY / EAT / DRINK will be added once those pillars have
 * verified listings.
 */
export const collections: Collection[] = [
  {
    slug: "unesco-monuments",
    pillar: "discover",
    facet: "intent",
    match: "unesco",
    title: { el: "Τα Μνημεία UNESCO της Θεσσαλονίκης", en: "UNESCO Monuments of Thessaloniki" },
    heading: { el: "Μνημεία UNESCO", en: "UNESCO Monuments" },
    intro: {
      el: "Το 1988 η UNESCO ενέταξε **15 Παλαιοχριστιανικά και Βυζαντινά Μνημεία** της Θεσσαλονίκης στον Κατάλογο Μνημείων Παγκόσμιας Κληρονομιάς. Ναοί με ψηφιδωτά, ένα μοναστήρι, ένα λουτρό και τα τείχη της πόλης συνθέτουν μια αδιάσπαστη ιστορία **έντεκα αιώνων**, από τον 4ο ως τον 15ο.\n\nΤο μοναδικό αυτό σύνολο κάνει τη Θεσσαλονίκη υπαίθριο μουσείο βυζαντινής τέχνης. Παρακάτω θα βρεις τα σημαντικότερα μνημεία που μπορείς να επισκεφθείς — τα περισσότερα με ελεύθερη είσοδο και σε απόσταση περιπάτου.",
      en: "In 1988 UNESCO inscribed **15 Paleochristian and Byzantine Monuments** of Thessaloniki on the World Heritage List. Churches with mosaics, a monastery, a bath and the city walls together tell an unbroken story of **eleven centuries**, from the 4th to the 15th.\n\nThis unique ensemble makes Thessaloniki an open-air museum of Byzantine art. Below are the most important monuments you can visit — most with free entry and within walking distance.",
    },
    metaDescription: {
      el: "Οδηγός στα Παλαιοχριστιανικά και Βυζαντινά Μνημεία UNESCO της Θεσσαλονίκης.",
      en: "A guide to the Paleochristian and Byzantine UNESCO monuments of Thessaloniki.",
    },
    featured: true,
  },
  {
    slug: "byzantine",
    pillar: "discover",
    facet: "intent",
    match: "byzantine",
    title: { el: "Βυζαντινή Θεσσαλονίκη", en: "Byzantine Thessaloniki" },
    heading: { el: "Βυζαντινή Θεσσαλονίκη", en: "Byzantine Thessaloniki" },
    intro: {
      el: "Η Θεσσαλονίκη υπήρξε η **δεύτερη πόλη της Βυζαντινής Αυτοκρατορίας**, «συμβασιλεύουσα» μετά την Κωνσταντινούπολη, και διατηρεί μία από τις πλουσιότερες συλλογές βυζαντινών μνημείων στον κόσμο.\n\nΝαοί με χρυσά ψηφιδωτά, μοναστήρια, τείχη και φρούρια — αλλά και το βραβευμένο Μουσείο Βυζαντινού Πολιτισμού — αφηγούνται αυτή την ιστορία. Παρακάτω, τα σημεία που δεν πρέπει να χάσεις.",
      en: "Thessaloniki was the **second city of the Byzantine Empire**, the \"co-reigning\" city after Constantinople, and preserves one of the richest collections of Byzantine monuments in the world.\n\nChurches with golden mosaics, monasteries, walls and fortresses — plus the award-winning Museum of Byzantine Culture — tell that story. Below, the spots you shouldn't miss.",
    },
    metaDescription: {
      el: "Τα βυζαντινά μνημεία, μουσεία και εκκλησίες της Θεσσαλονίκης.",
      en: "The Byzantine monuments, museums and churches of Thessaloniki.",
    },
    featured: true,
  },
  {
    slug: "roman",
    pillar: "discover",
    facet: "intent",
    match: "roman",
    title: { el: "Ρωμαϊκή Θεσσαλονίκη", en: "Roman Thessaloniki" },
    heading: { el: "Ρωμαϊκή Θεσσαλονίκη", en: "Roman Thessaloniki" },
    intro: {
      el: "Στις αρχές του **4ου αιώνα** ο αυτοκράτορας Γαλέριος έκανε τη Θεσσαλονίκη έδρα του και έχτισε ένα ολόκληρο ανακτορικό συγκρότημα εξουσίας.\n\nΑπό την **Αψίδα** και τη **Ροτόντα** μέχρι τα **Ανάκτορα** και την **Αρχαία Αγορά**, όλα σώζονται στο κέντρο, σε απόσταση περιπάτου — ένας μικρός «ρωμαϊκός» περίπατος 1,5 χλμ.",
      en: "In the early **4th century** Emperor Galerius made Thessaloniki his seat and built an entire palace complex of power.\n\nFrom the **Arch** and the **Rotunda** to the **Palace** and the **Ancient Agora**, it all survives in the centre, within walking distance — a compact 1.5 km \"Roman\" walk.",
    },
    metaDescription: {
      el: "Τα ρωμαϊκά μνημεία της Θεσσαλονίκης: Αψίδα Γαλερίου, Ροτόντα, Αρχαία Αγορά.",
      en: "The Roman monuments of Thessaloniki: Arch of Galerius, Rotunda, Ancient Agora.",
    },
  },
  {
    slug: "museums",
    pillar: "discover",
    facet: "type",
    match: "museum",
    title: { el: "Τα Μουσεία της Θεσσαλονίκης", en: "Museums of Thessaloniki" },
    heading: { el: "Μουσεία", en: "Museums" },
    intro: {
      el: "Τα μουσεία της Θεσσαλονίκης είναι από τα σημαντικότερα της Ελλάδας και το ιδανικό «κλειδί» για να καταλάβεις την ιστορία της πόλης και της Μακεδονίας — από την προϊστορία και τους μακεδονικούς βασιλείς ως το Βυζάντιο.\n\nΤο **Αρχαιολογικό Μουσείο** και το βραβευμένο **Μουσείο Βυζαντινού Πολιτισμού** βρίσκονται δίπλα-δίπλα στη Νέα Παραλία — ιδανικά και για ημέρες με βροχή ή για επισκέψεις με παιδιά.",
      en: "Thessaloniki's museums are among the most important in Greece and the perfect \"key\" to understanding the history of the city and of Macedonia — from prehistory and the Macedonian kings to Byzantium.\n\nThe **Archaeological Museum** and the award-winning **Museum of Byzantine Culture** stand side by side on the waterfront — great for rainy days or visits with children, too.",
    },
    metaDescription: {
      el: "Τα σημαντικότερα μουσεία της Θεσσαλονίκης και τι θα δείτε σε αυτά.",
      en: "The most important museums of Thessaloniki and what to see in them.",
    },
    featured: true,
  },
  {
    slug: "ano-poli",
    pillar: "discover",
    facet: "area",
    match: "ano-poli",
    title: { el: "Αξιοθέατα στην Άνω Πόλη", en: "Things to See in Ano Poli" },
    heading: { el: "Άνω Πόλη", en: "Ano Poli (Upper Town)" },
    intro: {
      el: "Η **Άνω Πόλη** γλίτωσε από τη μεγάλη πυρκαγιά του 1917 και είναι η μόνη γειτονιά που κρατά τον παλιό χαρακτήρα της Θεσσαλονίκης: ξύλινα σπίτια, καλντερίμια και βυζαντινά μνημεία.\n\nΕδώ θα βρεις τα **βυζαντινά τείχη**, τη **Μονή Βλατάδων**, το **Επταπύργιο** και την καλύτερη θέα στην πόλη — ιδανικά για ένα απόγευμα με ηλιοβασίλεμα.",
      en: "**Ano Poli** survived the great fire of 1917 and is the only quarter that keeps old Thessaloniki's character: timber houses, cobbled lanes and Byzantine monuments.\n\nHere you'll find the **Byzantine walls**, **Vlatades Monastery**, the **Heptapyrgion** and the best view over the city — perfect for a late afternoon with sunset.",
    },
    metaDescription: {
      el: "Τι να δείτε στην Άνω Πόλη της Θεσσαλονίκης: τείχη, μοναστήρια, θέα.",
      en: "What to see in Ano Poli, Thessaloniki: walls, monasteries and views.",
    },
  },
  {
    slug: "center",
    pillar: "discover",
    facet: "area",
    match: "center",
    title: { el: "Αξιοθέατα στο Κέντρο", en: "Things to See in the City Center" },
    heading: { el: "Κέντρο", en: "City Center" },
    intro: {
      el: "Το ιστορικό **κέντρο** είναι η καλύτερη αφετηρία: εδώ συγκεντρώνονται τα περισσότερα μνημεία της πόλης — ρωμαϊκά και βυζαντινά.\n\nΗ **Ροτόντα**, η **Αψίδα**, ο **Άγιος Δημήτριος**, η **Αγία Σοφία** και η **Αρχαία Αγορά** συνδυάζονται με την **Πλατεία Αριστοτέλους** και τις αγορές Μοδιάνο/Καπάνι — όλα με τα πόδια, σε έναν περίπατο.",
      en: "The historic **centre** is the best starting point: it concentrates most of the city's monuments — Roman and Byzantine.\n\nThe **Rotunda**, the **Arch**, **Agios Dimitrios**, **Hagia Sophia** and the **Ancient Agora** combine with **Aristotelous Square** and the Modiano/Kapani markets — all on foot, in a single walk.",
    },
    metaDescription: {
      el: "Τα αξιοθέατα στο κέντρο της Θεσσαλονίκης σε έναν περίπατο.",
      en: "The sights in central Thessaloniki on a single walk.",
    },
  },
  {
    slug: "best-views",
    pillar: "discover",
    facet: "intent",
    match: "views",
    title: { el: "Η Καλύτερη Θέα στη Θεσσαλονίκη", en: "The Best Views in Thessaloniki" },
    heading: { el: "Θέα & ηλιοβασίλεμα", en: "Views & Sunsets" },
    intro: {
      el: "Η Θεσσαλονίκη είναι πόλη με θέα: απλώνεται αμφιθεατρικά πάνω από τον Θερμαϊκό, με τον Όλυμπο στο βάθος.\n\nΑπό τα **βυζαντινά τείχη** και τον **Πύργο Τριγωνίου** της Άνω Πόλης μέχρι τον **Λευκό Πύργο** και τη **Νέα Παραλία**, να τα σημεία με την ωραιότερη θέα — ιδανικά για **ηλιοβασίλεμα**.",
      en: "Thessaloniki is a city with a view: it spreads amphitheatrically above the Thermaic Gulf, with Mount Olympus on the horizon.\n\nFrom the **Byzantine walls** and the **Trigoniou Tower** of Ano Poli to the **White Tower** and the **waterfront**, here are the spots with the finest views — perfect at **sunset**.",
    },
    metaDescription: {
      el: "Τα καλύτερα σημεία με θέα στη Θεσσαλονίκη για ηλιοβασίλεμα.",
      en: "The best viewpoints in Thessaloniki for sunset.",
    },
    featured: true,
  },
  {
    slug: "free",
    pillar: "discover",
    facet: "intent",
    match: "free",
    title: { el: "Δωρεάν Πράγματα στη Θεσσαλονίκη", en: "Free Things in Thessaloniki" },
    heading: { el: "Δωρεάν αξιοθέατα", en: "Free Sights" },
    intro: {
      el: "Δεν χρειάζεται μεγάλο μπάτζετ για να απολαύσεις τη Θεσσαλονίκη — πολλά από τα ωραιότερά της είναι **εντελώς δωρεάν**.\n\nΤα **βυζαντινά τείχη**, οι **πλατείες**, η **παραλία** με τις Ομπρέλες και οι περισσότεροι **βυζαντινοί ναοί** (με ελεύθερη είσοδο) είναι εδώ. Να τα καλύτερα δωρεάν σημεία της πόλης.",
      en: "You don't need a big budget to enjoy Thessaloniki — many of its best experiences are **completely free**.\n\nThe **Byzantine walls**, the **squares**, the **seafront** with the Umbrellas and most **Byzantine churches** (free to enter) are all here. These are the city's best free spots.",
    },
    metaDescription: {
      el: "Δωρεάν αξιοθέατα και πράγματα να δεις στη Θεσσαλονίκη.",
      en: "Free attractions and things to see in Thessaloniki.",
    },
  },
  {
    slug: "family",
    pillar: "discover",
    facet: "intent",
    match: "family",
    title: { el: "Θεσσαλονίκη με Παιδιά", en: "Thessaloniki with Kids" },
    heading: { el: "Για οικογένειες", en: "For Families" },
    intro: {
      el: "Η Θεσσαλονίκη είναι φιλική για οικογένειες: ανοιχτοί χώροι, η παραλία για βόλτα με ποδήλατο και μουσεία που κρατούν το ενδιαφέρον των μικρών.\n\nΟ **Λευκός Πύργος** με τη θέα, η **Νέα Παραλία** με τις Ομπρέλες και το **Αρχαιολογικό Μουσείο** είναι ιδανικά σημεία για επίσκεψη με παιδιά. Παρακάτω οι καλύτερες προτάσεις.",
      en: "Thessaloniki is family-friendly: open spaces, the seafront for a bike ride and museums that keep little ones engaged.\n\nThe **White Tower** with its view, the **waterfront** with the Umbrellas and the **Archaeological Museum** are ideal spots for a visit with kids. Below, the best picks.",
    },
    metaDescription: {
      el: "Πράγματα να κάνεις στη Θεσσαλονίκη με παιδιά.",
      en: "Things to do in Thessaloniki with kids.",
    },
  },
];
