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
      el: "Το 1988 η UNESCO ενέταξε 15 Παλαιοχριστιανικά και Βυζαντινά Μνημεία της Θεσσαλονίκης στον Κατάλογο Μνημείων Παγκόσμιας Κληρονομιάς. Ναοί, μοναστήρια και τα τείχη της πόλης συνθέτουν μια αδιάσπαστη ιστορία έντεκα αιώνων. Παρακάτω θα βρείτε τα σημαντικότερα από αυτά που μπορείτε να επισκεφθείτε.",
      en: "In 1988 UNESCO inscribed 15 Paleochristian and Byzantine Monuments of Thessaloniki on the World Heritage List. Churches, monasteries and the city walls together tell an unbroken story spanning eleven centuries. Below are the most important ones you can visit.",
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
      el: "Η Θεσσαλονίκη υπήρξε η δεύτερη πόλη της Βυζαντινής Αυτοκρατορίας και διατηρεί μία από τις πλουσιότερες συλλογές βυζαντινών μνημείων στον κόσμο. Ναοί με ψηφιδωτά, μοναστήρια, τείχη και φρούρια αφηγούνται αυτή την ιστορία.",
      en: "Thessaloniki was the second city of the Byzantine Empire and preserves one of the richest collections of Byzantine monuments in the world. Churches with mosaics, monasteries, walls and fortresses tell that story.",
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
      el: "Από την Αψίδα και τη Ροτόντα του Γαλερίου μέχρι την Αρχαία Αγορά, το κέντρο της Θεσσαλονίκης κρύβει ένα ολόκληρο ρωμαϊκό συγκρότημα εξουσίας του 4ου αιώνα, σε απόσταση περιπάτου.",
      en: "From the Arch and Rotunda of Galerius to the Ancient Agora, central Thessaloniki hides an entire 4th-century Roman complex of power, all within walking distance.",
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
      el: "Από την αρχαιότητα ως το Βυζάντιο, τα μουσεία της Θεσσαλονίκης φυλάσσουν την ιστορία της πόλης και της Μακεδονίας. Ιδανικά και για ημέρες με βροχή ή για επισκέψεις με παιδιά.",
      en: "From antiquity to Byzantium, Thessaloniki's museums preserve the history of the city and of Macedonia. Great for rainy days or visits with children, too.",
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
      el: "Η Άνω Πόλη γλίτωσε από τη μεγάλη πυρκαγιά του 1917 και διατηρεί τον παλιό χαρακτήρα της: βυζαντινά τείχη, μοναστήρια, γραφικά σοκάκια και την καλύτερη θέα στην πόλη.",
      en: "Ano Poli survived the great fire of 1917 and keeps its old character: Byzantine walls, monasteries, picturesque lanes and the best view over the city.",
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
      el: "Το ιστορικό κέντρο συγκεντρώνει τα περισσότερα μνημεία της πόλης — ρωμαϊκά και βυζαντινά — μαζί με την Πλατεία Αριστοτέλους και την αγορά, όλα σε απόσταση περιπάτου.",
      en: "The historic centre concentrates most of the city's monuments — Roman and Byzantine — along with Aristotelous Square and the market, all within walking distance.",
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
      el: "Από τα βυζαντινά τείχη της Άνω Πόλης μέχρι τον Λευκό Πύργο και τη Νέα Παραλία, να τα σημεία με την ωραιότερη θέα στην πόλη και τον Θερμαϊκό — ιδανικά για ηλιοβασίλεμα.",
      en: "From the Byzantine walls of Ano Poli to the White Tower and the waterfront, here are the spots with the finest views over the city and the gulf — perfect at sunset.",
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
      el: "Η πόλη προσφέρει πολλά χωρίς εισιτήριο: μνημεία που θαυμάζεις εξωτερικά, τείχη, πλατείες και την παραλία. Να τα καλύτερα δωρεάν σημεία.",
      en: "The city offers plenty with no ticket: monuments to admire from outside, walls, squares and the seafront. Here are the best free spots.",
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
      el: "Μουσεία, ανοιχτοί χώροι και η παραλία κάνουν τη Θεσσαλονίκη φιλική για οικογένειες. Να αξιοθέατα και σημεία ιδανικά για επίσκεψη με παιδιά.",
      en: "Museums, open spaces and the seafront make Thessaloniki family-friendly. Here are attractions and spots ideal to visit with children.",
    },
    metaDescription: {
      el: "Πράγματα να κάνεις στη Θεσσαλονίκη με παιδιά.",
      en: "Things to do in Thessaloniki with kids.",
    },
  },
];
