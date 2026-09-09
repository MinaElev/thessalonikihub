import type { Place } from "@/lib/types";

/**
 * REAL attractions, monuments and museums of Thessaloniki (DISCOVER pillar).
 *
 * All entries describe well-known public landmarks with factual, verifiable
 * information. Photos are real images of each monument from Wikimedia Commons
 * (see `photo.credit`); confirm licensing/attribution before commercial launch.
 * Opening hours and ticket prices change and are deliberately NOT hard-coded
 * here — link users to the official source instead.
 *
 * Sources: UNESCO WHC list 456, Wikipedia, the Municipality of Thessaloniki and
 * the Greek Ministry of Culture.
 */

const WIKI = "Wikimedia Commons";

export const attractions: Place[] = [
  {
    slug: "white-tower",
    kind: "discover",
    name: { el: "Λευκός Πύργος", en: "White Tower" },
    summary: {
      el: "Το σύμβολο της Θεσσαλονίκης στην παραλία — πύργος του 15ου αιώνα με μουσείο και θέα.",
      en: "Thessaloniki's symbol on the waterfront — a 15th-century tower with a museum and city views.",
    },
    description: {
      el: "Ο Λευκός Πύργος είναι το πιο αναγνωρίσιμο μνημείο της Θεσσαλονίκης. Χτίστηκε τον 15ο αιώνα στα χρόνια της Οθωμανικής περιόδου στη θέση παλαιότερου βυζαντινού οχυρού και χρησιμοποιήθηκε ως φρούριο και φυλακή. Σήμερα στεγάζει μόνιμη έκθεση για την ιστορία της πόλης, ενώ από την κορυφή του προσφέρει πανοραμική θέα στον Θερμαϊκό κόλπο και τη Νέα Παραλία.",
      en: "The White Tower is Thessaloniki's most recognisable monument. Built in the 15th century during the Ottoman period on the site of an earlier Byzantine fortification, it served as a fortress and prison. Today it houses a permanent exhibition on the city's history, and its top offers a panoramic view over the Thermaic Gulf and the waterfront.",
    },
    type: "landmark",
    tags: ["landmark", "museum", "views", "history", "family"],
    geo: {
      lat: 40.6264,
      lng: 22.9483,
      area: "waterfront",
      address: { el: "Λεωφ. Νίκης, Θεσσαλονίκη", en: "Nikis Avenue, Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/9/9e/WhiteTowerThessaloniki_%283%29.JPG",
        alt: { el: "Ο Λευκός Πύργος της Θεσσαλονίκης", en: "The White Tower of Thessaloniki" },
        credit: WIKI,
      },
    ],
    contact: { website: "https://lpth.gr/" },
    featured: true,
    updatedAt: "2026-09-08",
  },
  {
    slug: "rotunda",
    kind: "discover",
    name: { el: "Ροτόντα (Άγιος Γεώργιος)", en: "Rotunda (St George)" },
    summary: {
      el: "Επιβλητικό ρωμαϊκό κυκλικό οικοδόμημα του 4ου αι., μνημείο UNESCO με ψηφιδωτά.",
      en: "An imposing 4th-century Roman rotunda, a UNESCO monument with early-Christian mosaics.",
    },
    description: {
      el: "Η Ροτόντα κατασκευάστηκε στις αρχές του 4ου αιώνα στα χρόνια του αυτοκράτορα Γαλερίου, πιθανότατα ως μαυσωλείο ή ναός. Μετατράπηκε σε χριστιανικό ναό (Άγιος Γεώργιος) με εξαιρετικά παλαιοχριστιανικά ψηφιδωτά και αργότερα σε τζαμί επί Οθωμανών. Είναι ένα από τα 15 Παλαιοχριστιανικά και Βυζαντινά Μνημεία της Θεσσαλονίκης που εντάχθηκαν στον Κατάλογο Μνημείων Παγκόσμιας Κληρονομιάς της UNESCO το 1988.",
      en: "The Rotunda was built in the early 4th century under Emperor Galerius, most likely as a mausoleum or temple. It was converted into a Christian church (St George) with outstanding early-Christian mosaics and later into a mosque under Ottoman rule. It is one of the 15 Paleochristian and Byzantine Monuments of Thessaloniki inscribed on the UNESCO World Heritage List in 1988.",
    },
    type: "landmark",
    tags: ["landmark", "unesco", "roman", "byzantine", "history", "culture"],
    geo: {
      lat: 40.6333,
      lng: 22.9531,
      area: "center",
      address: { el: "Πλατεία Αγίου Γεωργίου, Θεσσαλονίκη", en: "Agiou Georgiou Sq., Thessaloniki" },
    },
    photos: [],
    contact: {},
    featured: true,
    updatedAt: "2026-09-08",
  },
  {
    slug: "arch-of-galerius",
    kind: "discover",
    name: { el: "Αψίδα του Γαλερίου (Καμάρα)", en: "Arch of Galerius (Kamara)" },
    summary: {
      el: "Ρωμαϊκή θριαμβική αψίδα του 4ου αι., δημοφιλές σημείο συνάντησης στο κέντρο.",
      en: "A 4th-century Roman triumphal arch and the city's classic central meeting point.",
    },
    description: {
      el: "Η Αψίδα του Γαλερίου, γνωστή στους Θεσσαλονικείς ως «Καμάρα», χτίστηκε στις αρχές του 4ου αιώνα για να τιμήσει τις νίκες του αυτοκράτορα Γαλερίου κατά των Περσών. Διατηρεί εντυπωσιακές ανάγλυφες παραστάσεις και αποτελεί ένα από τα πιο κλασικά σημεία συνάντησης στο κέντρο της πόλης, πάνω στην πορεία προς τη Ροτόντα.",
      en: "The Arch of Galerius, known to locals as \"Kamara\", was built in the early 4th century to commemorate Emperor Galerius' victories over the Persians. It preserves striking relief sculptures and is one of the most classic meeting points in the city centre, on the axis leading up to the Rotunda.",
    },
    type: "landmark",
    tags: ["landmark", "roman", "history", "free", "culture"],
    geo: {
      lat: 40.6323,
      lng: 22.9516,
      area: "center",
      address: { el: "Εγνατία, Θεσσαλονίκη", en: "Egnatia St., Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Ac.galerius2.jpg",
        alt: { el: "Η Αψίδα του Γαλερίου (Καμάρα)", en: "The Arch of Galerius (Kamara)" },
        credit: WIKI,
      },
    ],
    contact: {},
    featured: true,
    updatedAt: "2026-09-08",
  },
  {
    slug: "roman-forum",
    kind: "discover",
    name: { el: "Αρχαία Αγορά (Ρωμαϊκή Αγορά)", en: "Roman Forum (Ancient Agora)" },
    summary: {
      el: "Το ρωμαϊκό διοικητικό κέντρο της αρχαίας πόλης, με ωδείο και υπόγειο μουσείο.",
      en: "The Roman administrative heart of the ancient city, with an odeon and an on-site museum.",
    },
    description: {
      el: "Η Αρχαία Αγορά ήταν το διοικητικό και εμπορικό κέντρο της ρωμαϊκής Θεσσαλονίκης, οργανωμένη σε δύο επίπεδα γύρω από μια μεγάλη πλατεία. Σώζονται στοές, το ωδείο (μικρό θέατρο) και κρυπτοστοά, ενώ λειτουργεί και μουσείο που παρουσιάζει την ιστορία του χώρου. Βρίσκεται στην πλατεία Δικαστηρίων, στο κέντρο της πόλης.",
      en: "The Ancient Agora was the administrative and commercial centre of Roman Thessaloniki, laid out on two levels around a large square. Its porticoes, odeon (small theatre) and cryptoporticus survive, and an on-site museum presents the history of the site. It lies on Dikastirion Square in the city centre.",
    },
    type: "archaeological",
    tags: ["archaeological", "roman", "history", "culture"],
    geo: {
      lat: 40.6376,
      lng: 22.9470,
      area: "center",
      address: { el: "Πλατεία Δικαστηρίων, Θεσσαλονίκη", en: "Dikastirion Sq., Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Roman_forum.jpg",
        alt: { el: "Η Αρχαία (Ρωμαϊκή) Αγορά της Θεσσαλονίκης", en: "The Roman Forum of Thessaloniki" },
        credit: WIKI,
      },
    ],
    contact: {},
    updatedAt: "2026-09-08",
  },
  {
    slug: "agios-dimitrios",
    kind: "discover",
    name: { el: "Ναός Αγίου Δημητρίου", en: "Church of Saint Demetrios" },
    summary: {
      el: "Η μεγαλύτερη εκκλησία της πόλης, αφιερωμένη στον πολιούχο — μνημείο UNESCO.",
      en: "The city's largest church, dedicated to its patron saint — a UNESCO monument.",
    },
    description: {
      el: "Ο Ναός του Αγίου Δημητρίου είναι αφιερωμένος στον πολιούχο της Θεσσαλονίκης. Η μεγάλη πεντάκλιτη βασιλική χτίστηκε αρχικά τον 5ο–7ο αιώνα στη θέση παλαιότερου λουτρού όπου, κατά την παράδοση, μαρτύρησε ο άγιος. Ξεχωρίζει για τα σωζόμενα ψηφιδωτά και την υπόγεια κρύπτη. Ανήκει στα Μνημεία Παγκόσμιας Κληρονομιάς της UNESCO.",
      en: "The Church of Saint Demetrios is dedicated to the patron saint of Thessaloniki. This large five-aisled basilica was originally built in the 5th–7th centuries on the site of an earlier Roman bath where, by tradition, the saint was martyred. It is renowned for its surviving mosaics and its underground crypt, and forms part of the UNESCO World Heritage listing.",
    },
    type: "church",
    tags: ["church", "unesco", "byzantine", "history", "culture"],
    geo: {
      lat: 40.6389,
      lng: 22.9476,
      area: "center",
      address: { el: "Αγίου Δημητρίου, Θεσσαλονίκη", en: "Agiou Dimitriou St., Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/%CE%9D%CE%B1%CF%8C%CF%82_%CE%91%CE%B3%CE%AF%CE%BF%CF%85_%CE%94%CE%B7%CE%BC%CE%B7%CF%84%CF%81%CE%AF%CE%BF%CF%85%2C_%CE%98%CE%B5%CF%83%CF%83%CE%B1%CE%BB%CE%BF%CE%BD%CE%AF%CE%BA%CE%B7_3785.jpg/1920px-%CE%9D%CE%B1%CF%8C%CF%82_%CE%91%CE%B3%CE%AF%CE%BF%CF%85_%CE%94%CE%B7%CE%BC%CE%B7%CF%84%CF%81%CE%AF%CE%BF%CF%85%2C_%CE%98%CE%B5%CF%83%CF%83%CE%B1%CE%BB%CE%BF%CE%BD%CE%AF%CE%BA%CE%B7_3785.jpg",
        alt: { el: "Ο Ναός του Αγίου Δημητρίου", en: "The Church of Saint Demetrios" },
        credit: WIKI,
      },
    ],
    contact: {},
    featured: true,
    updatedAt: "2026-09-08",
  },
  {
    slug: "hagia-sophia",
    kind: "discover",
    name: { el: "Αγία Σοφία", en: "Hagia Sophia" },
    summary: {
      el: "Βυζαντινός ναός του 8ου αι. με σπουδαία ψηφιδωτά — μνημείο UNESCO.",
      en: "An 8th-century Byzantine church with important mosaics — a UNESCO monument.",
    },
    description: {
      el: "Η Αγία Σοφία της Θεσσαλονίκης χρονολογείται στον 8ο αιώνα και ανήκει στον αρχιτεκτονικό τύπο του σταυροειδούς εγγεγραμμένου με τρούλο. Διατηρεί σημαντικά ψηφιδωτά, μεταξύ των οποίων η Ανάληψη στον τρούλο. Λειτούργησε ως μητροπολιτικός ναός και ως τζαμί και σήμερα είναι ένα από τα Μνημεία UNESCO της πόλης.",
      en: "The Hagia Sophia of Thessaloniki dates to the 8th century and follows the cross-in-square domed type. It preserves important mosaics, including the Ascension in the dome. It served as a metropolitan church and later a mosque, and is today one of the city's UNESCO monuments.",
    },
    type: "church",
    tags: ["church", "unesco", "byzantine", "history", "culture"],
    geo: {
      lat: 40.6329,
      lng: 22.9498,
      area: "center",
      address: { el: "Πλατεία Αγίας Σοφίας, Θεσσαλονίκη", en: "Agias Sofias Sq., Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/%D0%A5%D1%80%D0%B0%D0%BC_%D0%A1%D0%B2%D1%8F%D1%82%D0%BE%D0%B9_%D0%A1%D0%BE%D1%84%D0%B8%D0%B8_-_panoramio_%281%29.jpg",
        alt: { el: "Ο ναός της Αγίας Σοφίας", en: "The Church of Hagia Sophia" },
        credit: WIKI,
      },
    ],
    contact: {},
    updatedAt: "2026-09-08",
  },
  {
    slug: "panagia-chalkeon",
    kind: "discover",
    name: { el: "Παναγία Χαλκέων", en: "Church of Panagia Chalkeon" },
    summary: {
      el: "Πλίνθινος βυζαντινός ναός του 1028 — μνημείο UNESCO κοντά στην αγορά.",
      en: "A brick-built Byzantine church from 1028 — a UNESCO monument near the market.",
    },
    description: {
      el: "Η Παναγία Χαλκέων χτίστηκε το 1028 και αποτελεί χαρακτηριστικό δείγμα μεσοβυζαντινής αρχιτεκτονικής, ολόκληρη κατασκευασμένη από πλίνθους (τούβλα). Πήρε το όνομά της από τους χαλκιάδες που δούλευαν στην περιοχή. Ανήκει στα Μνημεία UNESCO και βρίσκεται κοντά στην αγορά, στο κέντρο της πόλης.",
      en: "Panagia Chalkeon was built in 1028 and is a characteristic example of middle-Byzantine architecture, constructed entirely of brick. It takes its name from the coppersmiths (chalkeis) who once worked in the area. It is one of the UNESCO monuments and stands near the market in the city centre.",
    },
    type: "church",
    tags: ["church", "unesco", "byzantine", "history", "culture"],
    geo: {
      lat: 40.6360,
      lng: 22.9470,
      area: "center",
      address: { el: "Χαλκέων, Θεσσαλονίκη", en: "Chalkeon St., Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/3/31/THES_Panaghia_Chalkeon_5944.JPG",
        alt: { el: "Ο ναός της Παναγίας Χαλκέων", en: "The Church of Panagia Chalkeon" },
        credit: WIKI,
      },
    ],
    contact: {},
    updatedAt: "2026-09-08",
  },
  {
    slug: "acheiropoietos",
    kind: "discover",
    name: { el: "Αχειροποίητος", en: "Church of the Acheiropoietos" },
    summary: {
      el: "Παλαιοχριστιανική βασιλική του 5ου αι. — από τα παλαιότερα μνημεία UNESCO.",
      en: "A 5th-century early-Christian basilica — among the oldest UNESCO monuments.",
    },
    description: {
      el: "Η Αχειροποίητος είναι μια τρίκλιτη παλαιοχριστιανική βασιλική του 5ου αιώνα, από τα παλαιότερα σωζόμενα χριστιανικά μνημεία της πόλης. Διατηρεί μαρμάρινα κιονόκρανα και ψηφιδωτά στα τόξα των κιονοστοιχιών. Ανήκει στα Μνημεία Παγκόσμιας Κληρονομιάς της UNESCO.",
      en: "The Acheiropoietos is a three-aisled early-Christian basilica of the 5th century, among the oldest surviving Christian monuments in the city. It preserves marble capitals and mosaics on the arches of its colonnades, and forms part of the UNESCO World Heritage listing.",
    },
    type: "church",
    tags: ["church", "unesco", "byzantine", "history", "culture"],
    geo: {
      lat: 40.6349,
      lng: 22.9490,
      area: "center",
      address: { el: "Αγίας Σοφίας, Θεσσαλονίκη", en: "Agias Sofias St., Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Thessaloniki%2C_Panagia_Acheiropoietos_%CE%A0%CE%B1%CE%BD%CE%B1%CE%B3%CE%AF%CE%B1_%CE%91%CF%87%CE%B5%CE%B9%CF%81%CE%BF%CF%80%CE%BF%CE%AF%CE%B7%CF%84%CE%BF%CF%82_%285._Jhdt.%29_%2846896510045%29.jpg",
        alt: { el: "Ο ναός της Αχειροποιήτου", en: "The Church of the Acheiropoietos" },
        credit: WIKI,
      },
    ],
    contact: {},
    updatedAt: "2026-09-08",
  },
  {
    slug: "vlatadon-monastery",
    kind: "discover",
    name: { el: "Μονή Βλατάδων", en: "Vlatades Monastery" },
    summary: {
      el: "Βυζαντινό μοναστήρι του 14ου αι. στην Άνω Πόλη, με θέα στην πόλη — μνημείο UNESCO.",
      en: "A 14th-century Byzantine monastery in the Upper Town with city views — a UNESCO monument.",
    },
    description: {
      el: "Η Μονή Βλατάδων ιδρύθηκε τον 14ο αιώνα και είναι το μοναδικό βυζαντινό μοναστήρι της Θεσσαλονίκης που λειτουργεί αδιάκοπα μέχρι σήμερα. Βρίσκεται στην Άνω Πόλη, με υπέροχη θέα στην πόλη και τον Θερμαϊκό. Ανήκει στα Μνημεία UNESCO και διατηρεί σημαντικές τοιχογραφίες.",
      en: "Vlatades Monastery was founded in the 14th century and is the only Byzantine monastery in Thessaloniki in continuous operation to this day. It sits in the Upper Town with a wonderful view over the city and the gulf, preserves important frescoes, and is part of the UNESCO listing.",
    },
    type: "monastery",
    tags: ["monastery", "unesco", "byzantine", "views", "history"],
    geo: {
      lat: 40.6430,
      lng: 22.9540,
      area: "ano-poli",
      address: { el: "Άνω Πόλη, Θεσσαλονίκη", en: "Ano Poli, Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Monastery_of_the_Vlatades_09.jpg/1920px-Monastery_of_the_Vlatades_09.jpg",
        alt: { el: "Η Μονή Βλατάδων", en: "Vlatades Monastery" },
        credit: WIKI,
      },
    ],
    contact: {},
    updatedAt: "2026-09-08",
  },
  {
    slug: "byzantine-walls",
    kind: "discover",
    name: { el: "Βυζαντινά Τείχη", en: "Byzantine Walls" },
    summary: {
      el: "Τα τείχη της παλιάς πόλης και η καλύτερη θέα στη Θεσσαλονίκη — μνημείο UNESCO.",
      en: "The old town's walls and the finest view over Thessaloniki — a UNESCO monument.",
    },
    description: {
      el: "Τα τείχη της Θεσσαλονίκης, με καταβολές από τον 4ο αιώνα, περιέβαλλαν την πόλη και σώζονται σε μεγάλο μήκος στην Άνω Πόλη. Ο περίπατος κατά μήκος τους προσφέρει μια από τις ωραιότερες θέες στην πόλη και τον Θερμαϊκό. Αποτελούν μέρος των Μνημείων Παγκόσμιας Κληρονομιάς της UNESCO.",
      en: "The walls of Thessaloniki, with origins in the 4th century, once encircled the city and survive for a great length in the Upper Town. Walking along them offers one of the finest views over the city and the gulf. They form part of the UNESCO World Heritage listing.",
    },
    type: "landmark",
    tags: ["landmark", "unesco", "byzantine", "views", "free", "history"],
    geo: {
      lat: 40.6410,
      lng: 22.9560,
      area: "ano-poli",
      address: { el: "Άνω Πόλη, Θεσσαλονίκη", en: "Ano Poli, Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/8/87/Saloniki_City_Walls_2.jpg",
        alt: { el: "Τα βυζαντινά τείχη της Θεσσαλονίκης", en: "The Byzantine walls of Thessaloniki" },
        credit: WIKI,
      },
    ],
    contact: {},
    featured: true,
    updatedAt: "2026-09-08",
  },
  {
    slug: "heptapyrgion",
    kind: "discover",
    name: { el: "Επταπύργιο (Γεντί Κουλέ)", en: "Heptapyrgion (Yedi Kule)" },
    summary: {
      el: "Βυζαντινό-οθωμανικό φρούριο στην κορυφή της Άνω Πόλης.",
      en: "A Byzantine-Ottoman fortress crowning the Upper Town.",
    },
    description: {
      el: "Το Επταπύργιο, γνωστό και ως Γεντί Κουλέ, είναι το φρούριο που στέφει την ακρόπολη της Άνω Πόλης. Βυζαντινής αρχής, ενισχύθηκε στα οθωμανικά χρόνια και χρησιμοποιήθηκε επί δεκαετίες ως φυλακή. Σήμερα είναι επισκέψιμος αρχαιολογικός χώρος με θέα σε όλη την πόλη.",
      en: "The Heptapyrgion, also known as Yedi Kule, is the fortress crowning the acropolis of the Upper Town. Byzantine in origin and reinforced in Ottoman times, it served for decades as a prison. Today it is a visitable archaeological site with views over the whole city.",
    },
    type: "landmark",
    tags: ["landmark", "byzantine", "views", "history"],
    geo: {
      lat: 40.6444,
      lng: 22.9603,
      area: "ano-poli",
      address: { el: "Άνω Πόλη, Θεσσαλονίκη", en: "Ano Poli, Thessaloniki" },
    },
    photos: [],
    contact: {},
    updatedAt: "2026-09-08",
  },
  {
    slug: "aristotelous-square",
    kind: "discover",
    name: { el: "Πλατεία Αριστοτέλους", en: "Aristotelous Square" },
    summary: {
      el: "Η εμβληματική πλατεία της πόλης, ανοιχτή στη θάλασσα.",
      en: "The city's emblematic square, opening onto the sea.",
    },
    description: {
      el: "Η Πλατεία Αριστοτέλους είναι η κεντρική και πιο γνωστή πλατεία της Θεσσαλονίκης, σχεδιασμένη στο πλαίσιο του πολεοδομικού σχεδίου του Ernest Hébrard μετά τη μεγάλη πυρκαγιά του 1917. Πλαισιωμένη από νεοκλασικά κτίρια και ανοιχτή προς τον Θερμαϊκό, φιλοξενεί εκδηλώσεις, συναυλίες και είναι αγαπημένο σημείο συνάντησης.",
      en: "Aristotelous Square is the central and best-known square of Thessaloniki, laid out as part of Ernest Hébrard's urban plan after the great fire of 1917. Framed by neoclassical buildings and open toward the gulf, it hosts events and concerts and is a beloved meeting point.",
    },
    type: "landmark",
    tags: ["landmark", "free", "views", "family"],
    geo: {
      lat: 40.6329,
      lng: 22.9412,
      area: "center",
      address: { el: "Πλατεία Αριστοτέλους, Θεσσαλονίκη", en: "Aristotelous Square, Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Aristotelous_Plateia_2006_%28cropped%29.jpg",
        alt: { el: "Η Πλατεία Αριστοτέλους", en: "Aristotelous Square" },
        credit: WIKI,
      },
    ],
    contact: {},
    featured: true,
    updatedAt: "2026-09-08",
  },
  {
    slug: "nea-paralia",
    kind: "discover",
    name: { el: "Νέα Παραλία & Ομπρέλες", en: "Waterfront & Umbrellas" },
    summary: {
      el: "Ο ανανεωμένος παραλιακός πεζόδρομος με το γλυπτό «Ομπρέλες» του Ζογγολόπουλου.",
      en: "The redesigned seaside promenade with Zongolopoulos' \"Umbrellas\" sculpture.",
    },
    description: {
      el: "Η Νέα Παραλία είναι ο ανανεωμένος παραλιακός πεζόδρομος που εκτείνεται από τον Λευκό Πύργο ως το Μέγαρο Μουσικής, ιδανικός για περπάτημα, ποδήλατο και ηλιοβασίλεμα. Σημείο-ορόσημο είναι το γλυπτό «Ομπρέλες» του Γιώργου Ζογγολόπουλου, ένα από τα πιο φωτογραφημένα της πόλης.",
      en: "The waterfront is the redesigned seaside promenade stretching from the White Tower to the Concert Hall, ideal for walking, cycling and sunsets. A landmark along it is George Zongolopoulos' \"Umbrellas\" sculpture, one of the most photographed spots in the city.",
    },
    type: "landmark",
    tags: ["landmark", "free", "views", "family", "art"],
    geo: {
      lat: 40.6155,
      lng: 22.9520,
      area: "waterfront",
      address: { el: "Νέα Παραλία, Θεσσαλονίκη", en: "Waterfront, Thessaloniki" },
    },
    photos: [],
    contact: {},
    updatedAt: "2026-09-08",
  },
  {
    slug: "archaeological-museum",
    kind: "discover",
    name: { el: "Αρχαιολογικό Μουσείο Θεσσαλονίκης", en: "Archaeological Museum of Thessaloniki" },
    summary: {
      el: "Ευρήματα από τη Θεσσαλονίκη και τη Μακεδονία, από την προϊστορία ως την ύστερη αρχαιότητα.",
      en: "Finds from Thessaloniki and Macedonia, from prehistory to late antiquity.",
    },
    description: {
      el: "Το Αρχαιολογικό Μουσείο Θεσσαλονίκης παρουσιάζει ευρήματα από την πόλη και την ευρύτερη Μακεδονία, με μόνιμες εκθέσεις που καλύπτουν όλες τις όψεις της ιδιωτικής και δημόσιας ζωής στην αρχαιότητα. Βρίσκεται στο κέντρο, κοντά στη Νέα Παραλία και το HELEXPO.",
      en: "The Archaeological Museum of Thessaloniki presents finds from the city and the wider region of Macedonia, with permanent exhibitions covering all aspects of private and public life in antiquity. It is located centrally, near the waterfront and HELEXPO.",
    },
    type: "museum",
    tags: ["museum", "history", "culture", "family"],
    geo: {
      lat: 40.6215,
      lng: 22.9550,
      area: "waterfront",
      address: { el: "Μ. Ανδρόνικου 6, 546 21 Θεσσαλονίκη", en: "6 M. Andronikou St., 546 21 Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Archaeological_Museum%2C_Thessaloniki%2C_Greece_%287457978664%29.jpg/1920px-Archaeological_Museum%2C_Thessaloniki%2C_Greece_%287457978664%29.jpg",
        alt: { el: "Το Αρχαιολογικό Μουσείο Θεσσαλονίκης", en: "The Archaeological Museum of Thessaloniki" },
        credit: WIKI,
      },
    ],
    contact: { phone: "+302313310201", email: "amth@culture.gr", website: "https://www.amth.gr/" },
    featured: true,
    updatedAt: "2026-09-08",
  },
  {
    slug: "museum-of-byzantine-culture",
    kind: "discover",
    name: { el: "Μουσείο Βυζαντινού Πολιτισμού", en: "Museum of Byzantine Culture" },
    summary: {
      el: "Βραβευμένο μουσείο αφιερωμένο στον βυζαντινό και μεταβυζαντινό πολιτισμό.",
      en: "An award-winning museum dedicated to Byzantine and post-Byzantine culture.",
    },
    description: {
      el: "Το Μουσείο Βυζαντινού Πολιτισμού είναι ένα από τα σημαντικότερα μουσεία της Ελλάδας, αφιερωμένο στον βυζαντινό και μεταβυζαντινό πολιτισμό. Οι μόνιμες εκθέσεις του παρουσιάζουν την καθημερινή ζωή, την τέχνη και τη θρησκεία του Βυζαντίου. Βρίσκεται στη λεωφόρο Στρατού, απέναντι από το Πεδίον του Άρεως.",
      en: "The Museum of Byzantine Culture is one of Greece's most important museums, dedicated to Byzantine and post-Byzantine culture. Its permanent exhibitions present daily life, art and religion of Byzantium. It stands on Stratou Avenue, opposite the Pedion tou Areos park.",
    },
    type: "museum",
    tags: ["museum", "byzantine", "history", "culture", "family"],
    geo: {
      lat: 40.6205,
      lng: 22.9565,
      area: "waterfront",
      address: { el: "Λεωφ. Στρατού 2, 540 13 Θεσσαλονίκη", en: "2 Stratou Ave., 540 13 Thessaloniki" },
    },
    photos: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Macedonian_Museums-88-Arx_Byz_Thessaloniknhs-391.jpg",
        alt: { el: "Το Μουσείο Βυζαντινού Πολιτισμού", en: "The Museum of Byzantine Culture" },
        credit: WIKI,
      },
    ],
    contact: { phone: "+302313306400", email: "mbp@culture.gr", website: "https://www.mbp.gr/" },
    updatedAt: "2026-09-08",
  },
];
