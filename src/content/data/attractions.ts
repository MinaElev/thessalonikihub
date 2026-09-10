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
      el: `Ο **Λευκός Πύργος** είναι το σήμα κατατεθέν της Θεσσαλονίκης — το κτίριο που ταυτίζεται με την πόλη σε κάθε καρτ ποστάλ. Στέκει στην αρχή της Νέας Παραλίας και είναι το ιδανικό σημείο για να ξεκινήσεις τη γνωριμία σου με την πόλη.

## Ιστορία
Χτίστηκε τον **15ο αιώνα**, στα πρώτα χρόνια της Οθωμανικής περιόδου, στη θέση παλαιότερου βυζαντινού οχυρού, ως μέρος της οχύρωσης του λιμανιού. Χρησιμοποιήθηκε ως φρουρά και φυλακή· η φήμη του ως τόπου εκτελέσεων του χάρισε παλιότερα το προσωνύμιο «Πύργος του Αίματος», ώσπου ασβεστώθηκε και έμεινε ως «Λευκός».

## Τι θα δεις
Στο εσωτερικό, μια **μόνιμη έκθεση** για την ιστορία της Θεσσαλονίκης ξεδιπλώνεται σε έξι ορόφους, γύρω από την κυκλική εσωτερική σκάλα. Στην κορυφή σε περιμένει **πανοραμική θέα** στον Θερμαϊκό, τη Νέα Παραλία και την πόλη.

## Καλό να ξέρεις
Βρίσκεται δίπλα στο **Αρχαιολογικό Μουσείο**, το **Μουσείο Βυζαντινού Πολιτισμού** και τις «Ομπρέλες» — μπορείς να τα συνδυάσεις σε έναν περίπατο στη Νέα Παραλία.`,
      en: `The **White Tower** is Thessaloniki's signature landmark — the building that stands for the city on every postcard. It rises at the start of the waterfront and is the perfect place to begin exploring.

## History
It was built in the **15th century**, in the early Ottoman period, on the site of an earlier Byzantine fortification, as part of the harbour's defences. It served as a garrison and prison; its grim reputation once earned it the name "Tower of Blood", until it was whitewashed and became the "White" Tower.

## What you'll see
Inside, a **permanent exhibition** on the history of Thessaloniki unfolds across six floors around the circular internal staircase. At the top awaits a **panoramic view** of the gulf, the waterfront and the city.

## Good to know
It sits next to the **Archaeological Museum**, the **Museum of Byzantine Culture** and the "Umbrellas" — you can combine them into one waterfront walk.`,
    },
    type: "landmark",
    tags: ["landmark", "museum", "views", "history", "family"],
    faqs: [
      {
        question: { el: "Τι είναι σήμερα ο Λευκός Πύργος;", en: "What is the White Tower today?" },
        answer: {
          el: "Λειτουργεί ως μουσείο με μόνιμη έκθεση για την ιστορία της Θεσσαλονίκης, ενώ από την κορυφή του έχει πανοραμική θέα.",
          en: "It is a museum with a permanent exhibition on the history of Thessaloniki, and its top offers a panoramic view.",
        },
      },
      {
        question: { el: "Πού βρίσκεται;", en: "Where is it?" },
        answer: {
          el: "Στην αρχή της Νέας Παραλίας, στη Λεωφόρο Νίκης, σε απόσταση περιπάτου από την Πλατεία Αριστοτέλους.",
          en: "At the start of the waterfront on Nikis Avenue, within walking distance of Aristotelous Square.",
        },
      },
      {
        question: { el: "Αξίζει να ανέβω στην κορυφή;", en: "Is it worth going to the top?" },
        answer: {
          el: "Ναι — η θέα στον Θερμαϊκό και την πόλη είναι από τις καλύτερες και η ανάβαση σύντομη.",
          en: "Yes — the view over the gulf and the city is among the best, and the climb is short.",
        },
      },
    ],
    geo: {
      lat: 40.6264,
      lng: 22.9483,
      area: "waterfront",
      address: { el: "Λεωφ. Νίκης, Θεσσαλονίκη", en: "Nikis Avenue, Thessaloniki" },
    },
    photos: [
      {
        url: "/photos/7250c0b344.webp",
        alt: { el: "Ο Λευκός Πύργος της Θεσσαλονίκης", en: "The White Tower of Thessaloniki" },
        author: "CeeGee",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:WhiteTowerThessaloniki_(3).JPG",
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
      el: `Η **Ροτόντα** είναι ένα από τα πιο επιβλητικά μνημεία της Θεσσαλονίκης: ένα τεράστιο κυκλικό οικοδόμημα που στέκει σχεδόν αναλλοίωτο εδώ και **17 αιώνες**, μάρτυρας κάθε εποχής της πόλης.

## Ιστορία
Κατασκευάστηκε στις **αρχές του 4ου αιώνα**, στα χρόνια του αυτοκράτορα **Γαλερίου**, πιθανότατα ως μαυσωλείο ή ναός, ως μέρος του ανακτορικού του συγκροτήματος μαζί με την Αψίδα. Μετατράπηκε σε χριστιανικό ναό (**Άγιος Γεώργιος**) και αργότερα σε τζαμί επί Οθωμανών — ο μιναρές του σώζεται ακόμη δίπλα.

## Τι θα δεις
Ξεχωρίζουν τα σπάνια **παλαιοχριστιανικά ψηφιδωτά** στον τρούλο, με χρυσό βάθος και παραστάσεις αγίων και αρχιτεκτονημάτων — από τα σημαντικότερα του είδους τους παγκοσμίως.

## UNESCO
Ανήκει στα **15 Παλαιοχριστιανικά και Βυζαντινά Μνημεία** της Θεσσαλονίκης, ενταγμένα στον Κατάλογο Παγκόσμιας Κληρονομιάς της UNESCO από το 1988. Βρίσκεται μόλις λίγα μέτρα πάνω από την Αψίδα του Γαλερίου.`,
      en: `The **Rotunda** is one of Thessaloniki's most imposing monuments: a vast circular building that has stood almost unchanged for **17 centuries**, a witness to every era of the city.

## History
It was built in the **early 4th century** under Emperor **Galerius**, most likely as a mausoleum or temple, as part of his palace complex together with the Arch. It became a Christian church (**St George**) and later a mosque under the Ottomans — its minaret still survives beside it.

## What you'll see
The highlight is the rare **early-Christian mosaics** in the dome, with a gold ground and figures of saints and architecture — among the most important of their kind in the world.

## UNESCO
It is one of the **15 Paleochristian and Byzantine Monuments** of Thessaloniki on the UNESCO World Heritage List since 1988. It stands just metres above the Arch of Galerius.`,
    },
    type: "landmark",
    tags: ["landmark", "unesco", "roman", "byzantine", "history", "culture"],
    faqs: [
      {
        question: { el: "Γιατί είναι σημαντική η Ροτόντα;", en: "Why is the Rotunda important?" },
        answer: {
          el: "Είναι ρωμαϊκό μνημείο του 4ου αιώνα με σπάνια παλαιοχριστιανικά ψηφιδωτά και ανήκει στα Μνημεία UNESCO της πόλης.",
          en: "It is a 4th-century Roman monument with rare early-Christian mosaics and is one of the city's UNESCO monuments.",
        },
      },
      {
        question: { el: "Τι υπάρχει κοντά;", en: "What is nearby?" },
        answer: {
          el: "Βρίσκεται ακριβώς πάνω από την Αψίδα του Γαλερίου (Καμάρα), σε απόσταση περιπάτου από τη Ροτόντα προς το κέντρο.",
          en: "It sits right above the Arch of Galerius (Kamara), a short walk from the centre.",
        },
      },
    ],
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
      el: `Η **Αψίδα του Γαλερίου** — η θρυλική **«Καμάρα»** — είναι το πιο κλασικό ραντεβού της Θεσσαλονίκης. «Θα σε δω στην Καμάρα» λένε οι ντόπιοι εδώ και γενιές.

## Ιστορία
Χτίστηκε στις **αρχές του 4ου αιώνα** για να τιμήσει τις νίκες του αυτοκράτορα **Γαλερίου** κατά των Περσών. Ήταν μέρος του μεγάλου ανακτορικού συγκροτήματος που περιλάμβανε τη Ροτόντα και τα Ανάκτορα.

## Τι θα δεις
Οι σωζόμενοι πεσσοί διατηρούν εντυπωσιακές **ανάγλυφες παραστάσεις** των πολεμικών εκστρατειών — σκηνές μαχών, θριάμβου και τελετών, από τα σημαντικότερα δείγματα ρωμαϊκής γλυπτικής στην πόλη.

## Καλό να ξέρεις
Βρίσκεται πάνω στην Εγνατία, ελεύθερη επίσκεψη 24/7, στον άξονα που ανηφορίζει προς τη **Ροτόντα** — δες τα μαζί.`,
      en: `The **Arch of Galerius** — the legendary **"Kamara"** — is Thessaloniki's most classic meeting point. "See you at Kamara" locals have said for generations.

## History
It was built in the **early 4th century** to commemorate Emperor **Galerius'** victories over the Persians. It was part of the great palace complex that included the Rotunda and the Palace.

## What you'll see
The surviving pillars preserve striking **relief sculptures** of the military campaigns — scenes of battle, triumph and ceremony, among the finest examples of Roman sculpture in the city.

## Good to know
It stands on Egnatia Street, free to visit 24/7, on the axis climbing up to the **Rotunda** — see them together.`,
    },
    type: "landmark",
    tags: ["landmark", "roman", "history", "free", "culture"],
    faqs: [
      {
        question: { el: "Τι είναι η «Καμάρα»;", en: "What is \"Kamara\"?" },
        answer: {
          el: "Είναι το λαϊκό όνομα της Αψίδας του Γαλερίου και ένα από τα πιο γνωστά σημεία συνάντησης της πόλης.",
          en: "It's the popular name for the Arch of Galerius and one of the city's best-known meeting points.",
        },
      },
    ],
    geo: {
      lat: 40.6323,
      lng: 22.9516,
      area: "center",
      address: { el: "Εγνατία, Θεσσαλονίκη", en: "Egnatia St., Thessaloniki" },
    },
    photos: [
      {
        url: "/photos/6d192c2d38.webp",
        alt: { el: "Η Αψίδα του Γαλερίου (Καμάρα)", en: "The Arch of Galerius (Kamara)" },
        author: "Adam Carr",
        license: "CC BY-SA 3.0",
        licenseUrl: "http://creativecommons.org/licenses/by-sa/3.0/",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Ac.galerius2.jpg",
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
      el: `Η **Αρχαία Αγορά** ήταν η «πλατεία» της ρωμαϊκής Θεσσαλονίκης — το διοικητικό, εμπορικό και κοινωνικό κέντρο της πόλης για αιώνες.

## Τι θα δεις
Ο χώρος ήταν οργανωμένος σε **δύο επίπεδα** γύρω από μια μεγάλη πλατεία. Σώζονται στοές, το **ωδείο** (μικρό θέατρο για μουσικές και θεατρικές εκδηλώσεις) και η **κρυπτοστοά** — μια υπόγεια στοά που σήμερα στεγάζει μουσείο για την ιστορία του χώρου.

## Καλό να ξέρεις
Βρίσκεται στην **πλατεία Δικαστηρίων**, στο κέντρο, σε απόσταση περιπάτου από τον Άγιο Δημήτριο και την αγορά. Ελεύθερα ορατή από την πλατεία· για ώρες και μουσείο δες την επίσημη πηγή.`,
      en: `The **Ancient Agora** was the "town square" of Roman Thessaloniki — the city's administrative, commercial and social heart for centuries.

## What you'll see
The site was laid out on **two levels** around a large square. Its porticoes, the **odeon** (a small theatre for music and performances) and the **cryptoporticus** — an underground gallery now housing a museum on the site's history — survive.

## Good to know
It lies on **Dikastirion Square** in the centre, a short walk from Agios Dimitrios and the market. Visible from the square; check the official source for hours and the museum.`,
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
        url: "/photos/8a33cd10a5.webp",
        alt: { el: "Η Αρχαία (Ρωμαϊκή) Αγορά της Θεσσαλονίκης", en: "The Roman Forum of Thessaloniki" },
        author: "Leandro Neumann Ciuffo from Rio de Janeiro, Brazil",
        license: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Roman_forum.jpg",
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
      el: `Ο **Ναός του Αγίου Δημητρίου** είναι το σημαντικότερο θρησκευτικό μνημείο της Θεσσαλονίκης, αφιερωμένο στον **πολιούχο** της πόλης. Η μεγαλύτερη εκκλησία της Θεσσαλονίκης, με βαθιά ιστορία και ζωντανή λατρευτική παρουσία.

## Ιστορία
Η μεγάλη **πεντάκλιτη βασιλική** χτίστηκε αρχικά τον 5ο–7ο αιώνα, στη θέση παλαιότερου ρωμαϊκού λουτρού όπου, κατά την παράδοση, φυλακίστηκε και μαρτύρησε ο άγιος. Καταστράφηκε από την πυρκαγιά του 1917 και αναστηλώθηκε με σεβασμό στην αρχική μορφή.

## Τι θα δεις
- Τα σωζόμενα **ψηφιδωτά** του 7ου αιώνα, γύρω από το ιερό.
- Την υπόγεια **κρύπτη**, στον χώρο του μαρτυρίου, με εκθέματα και το αγίασμα.

## UNESCO & πρακτικά
Ανήκει στα **Μνημεία UNESCO** της πόλης. Είναι ενεργός ναός — η μεγάλη γιορτή του αγίου (26 Οκτωβρίου) συμπίπτει με τα «Δημήτρια» και την απελευθέρωση της πόλης.`,
      en: `The **Church of Saint Demetrios** is Thessaloniki's most important religious monument, dedicated to the city's **patron saint**. It is the largest church in Thessaloniki, with a deep history and a living devotional life.

## History
This large **five-aisled basilica** was originally built in the 5th–7th centuries on the site of an earlier Roman bath where, by tradition, the saint was imprisoned and martyred. It was damaged in the 1917 fire and carefully restored to its original form.

## What you'll see
- The surviving 7th-century **mosaics** around the sanctuary.
- The underground **crypt** on the site of the martyrdom, with exhibits and a holy spring.

## UNESCO & practical
It is one of the city's **UNESCO monuments**. It is an active church — the saint's feast (26 October) coincides with the "Dimitria" festival and the city's liberation day.`,
    },
    type: "church",
    tags: ["church", "unesco", "byzantine", "history", "culture"],
    faqs: [
      {
        question: { el: "Ποιος είναι ο Άγιος Δημήτριος;", en: "Who is Saint Demetrios?" },
        answer: {
          el: "Είναι ο πολιούχος άγιος της Θεσσαλονίκης· ο ναός είναι χτισμένος στον τόπο του μαρτυρίου του.",
          en: "He is the patron saint of Thessaloniki; the church is built on the site of his martyrdom.",
        },
      },
      {
        question: { el: "Μπορώ να επισκεφθώ την κρύπτη;", en: "Can I visit the crypt?" },
        answer: {
          el: "Ναι, η υπόγεια κρύπτη είναι επισκέψιμη και φιλοξενεί εκθέματα από την ιστορία του ναού.",
          en: "Yes, the underground crypt is open to visitors and houses exhibits on the church's history.",
        },
      },
    ],
    geo: {
      lat: 40.6389,
      lng: 22.9476,
      area: "center",
      address: { el: "Αγίου Δημητρίου, Θεσσαλονίκη", en: "Agiou Dimitriou St., Thessaloniki" },
    },
    photos: [
      {
        url: "/photos/944690fb79.webp",
        alt: { el: "Ο Ναός του Αγίου Δημητρίου", en: "The Church of Saint Demetrios" },
        author: "C messier",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:%CE%9D%CE%B1%CF%8C%CF%82_%CE%91%CE%B3%CE%AF%CE%BF%CF%85_%CE%94%CE%B7%CE%BC%CE%B7%CF%84%CF%81%CE%AF%CE%BF%CF%85,_%CE%98%CE%B5%CF%83%CF%83%CE%B1%CE%BB%CE%BF%CE%BD%CE%AF%CE%BA%CE%B7_3785.jpg",
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
      el: `Η **Αγία Σοφία** είναι μια από τις παλαιότερες εκκλησίες της Θεσσαλονίκης που βρίσκονται ακόμη σε λειτουργία — ένα ζωντανό κομμάτι της βυζαντινής κληρονομιάς μέσα στο κέντρο.

## Ιστορία & αρχιτεκτονική
Χρονολογείται στον **8ο αιώνα** και ακολουθεί τον τύπο του **σταυροειδούς εγγεγραμμένου με τρούλο** — πρότυπο που επηρέασε τη μεταγενέστερη βυζαντινή αρχιτεκτονική. Λειτούργησε ως μητροπολιτικός ναός της πόλης και, επί Οθωμανών, ως τζαμί.

## Τι θα δεις
Ξεχωρίζουν τα σωζόμενα **ψηφιδωτά**, με κορυφαίο τη σκηνή της **Ανάληψης** στον τρούλο, σε χρυσό βάθος.

## UNESCO
Ένα από τα **15 Μνημεία UNESCO** της Θεσσαλονίκης, στην ομώνυμη πλατεία στο κέντρο.`,
      en: `**Hagia Sophia** is one of the oldest churches in Thessaloniki still in use — a living piece of Byzantine heritage in the city centre.

## History & architecture
It dates to the **8th century** and follows the **cross-in-square domed** type — a model that influenced later Byzantine architecture. It served as the city's metropolitan church and, under the Ottomans, as a mosque.

## What you'll see
The highlight is the surviving **mosaics**, above all the scene of the **Ascension** in the dome, on a gold ground.

## UNESCO
One of the **15 UNESCO monuments** of Thessaloniki, on the square of the same name in the centre.`,
    },
    type: "church",
    tags: ["church", "unesco", "byzantine", "history", "culture"],
    faqs: [
      {
        question: { el: "Πότε χτίστηκε η Αγία Σοφία;", en: "When was Hagia Sophia built?" },
        answer: {
          el: "Χρονολογείται στον 8ο αιώνα και είναι από τις παλαιότερες εν λειτουργία εκκλησίες της πόλης.",
          en: "It dates to the 8th century and is one of the city's oldest churches still in use.",
        },
      },
    ],
    geo: {
      lat: 40.6329,
      lng: 22.9498,
      area: "center",
      address: { el: "Πλατεία Αγίας Σοφίας, Θεσσαλονίκη", en: "Agias Sofias Sq., Thessaloniki" },
    },
    photos: [
      {
        url: "/photos/b77e380eff.webp",
        alt: { el: "Ο ναός της Αγίας Σοφίας", en: "The Church of Hagia Sophia" },
        author: "Andrew Zorin",
        license: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:%D0%A5%D1%80%D0%B0%D0%BC_%D0%A1%D0%B2%D1%8F%D1%82%D0%BE%D0%B9_%D0%A1%D0%BE%D1%84%D0%B8%D0%B8_-_panoramio_(1).jpg",
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
      el: `Η **Παναγία Χαλκέων** είναι ένα κομψό «κόσμημα» της μεσοβυζαντινής αρχιτεκτονικής, κρυμμένο δίπλα στην αγορά — εύκολο να το προσπεράσεις, κρίμα να το χάσεις.

## Ιστορία & αρχιτεκτονική
Χτίστηκε το **1028** και ξεχωρίζει γιατί είναι ολόκληρη κατασκευασμένη από **πλίνθους (τούβλα)**, με χαρακτηριστικούς τρούλους — τυπικό δείγμα της «σχολής της Κωνσταντινούπολης». Πήρε το όνομά της από τους **χαλκιάδες** που δούλευαν στην περιοχή (γι' αυτό λέγεται και «Κόκκινη Εκκλησία»).

## Καλό να ξέρεις
Βρίσκεται στην οδό Χαλκέων, δίπλα στην αγορά Καπάνι, στο κέντρο. Ανήκει στα **Μνημεία UNESCO**.`,
      en: `**Panagia Chalkeon** is an elegant "jewel" of middle-Byzantine architecture, tucked away next to the market — easy to walk past, a shame to miss.

## History & architecture
Built in **1028**, it stands out for being constructed entirely of **brick**, with characteristic domes — a typical example of the "Constantinople school". It takes its name from the **coppersmiths** (*chalkeis*) who worked in the area (hence its nickname, the "Red Church").

## Good to know
It stands on Chalkeon Street, next to the Kapani market in the centre. It is one of the **UNESCO monuments**.`,
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
        url: "/photos/ac884436c2.webp",
        alt: { el: "Ο ναός της Παναγίας Χαλκέων", en: "The Church of Panagia Chalkeon" },
        author: "Konstantinos Stampoulis ( el:User:Geraki )",
        license: "CC BY-SA 2.5",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:THES_Panaghia_Chalkeon_5944.JPG",
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
      el: `Η **Αχειροποίητος** είναι μια από τις **παλαιότερες εκκλησίες** της Θεσσαλονίκης — ένα ζωντανό ταξίδι στις απαρχές του χριστιανικού ναού.

## Ιστορία & αρχιτεκτονική
Πρόκειται για **τρίκλιτη παλαιοχριστιανική βασιλική** του **5ου αιώνα**, χτισμένη σχεδόν πάνω σε ρωμαϊκά λουτρά. Είναι από τα παλαιότερα σωζόμενα χριστιανικά μνημεία της πόλης, σε καλή κατάσταση.

## Τι θα δεις
Επιβλητικές κιονοστοιχίες με μαρμάρινα **κιονόκρανα** και σωζόμενα **ψηφιδωτά** στα τόξα, με φυτικά και γεωμετρικά μοτίβα.

## UNESCO
Ένα από τα **Μνημεία Παγκόσμιας Κληρονομιάς UNESCO**, στο κέντρο, κοντά στην Αγία Σοφία.`,
      en: `The **Acheiropoietos** is one of the **oldest churches** in Thessaloniki — a living journey to the origins of the Christian church building.

## History & architecture
It is a **three-aisled early-Christian basilica** of the **5th century**, built almost on top of Roman baths. It is among the oldest surviving Christian monuments in the city, in good condition.

## What you'll see
Imposing colonnades with marble **capitals** and surviving **mosaics** on the arches, with plant and geometric motifs.

## UNESCO
One of the **UNESCO World Heritage monuments**, in the centre near Hagia Sophia.`,
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
        url: "/photos/b52ea7c914.webp",
        alt: { el: "Ο ναός της Αχειροποιήτου", en: "The Church of the Acheiropoietos" },
        author: "Herbert Frank from Wien (Vienna), AT",
        license: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Thessaloniki,_Panagia_Acheiropoietos_%CE%A0%CE%B1%CE%BD%CE%B1%CE%B3%CE%AF%CE%B1_%CE%91%CF%87%CE%B5%CE%B9%CF%81%CE%BF%CF%80%CE%BF%CE%AF%CE%B7%CF%84%CE%BF%CF%82_(5._Jhdt.)_(46896510045).jpg",
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
      el: `Η **Μονή Βλατάδων** είναι ένα ήσυχο, πράσινο καταφύγιο στην κορυφή της Άνω Πόλης — ιστορία, γαλήνη και μία από τις ωραιότερες θέες της πόλης, όλα μαζί.

## Ιστορία
Ιδρύθηκε τον **14ο αιώνα** και είναι το **μοναδικό βυζαντινό μοναστήρι** της Θεσσαλονίκης που λειτουργεί αδιάκοπα μέχρι σήμερα. Κατά την παράδοση, στον χώρο κήρυξε ο Απόστολος Παύλος.

## Τι θα δεις
Το καθολικό διατηρεί σημαντικές **τοιχογραφίες**, ενώ ο περιβάλλων χώρος με τα δέντρα και τα παγόνια προσφέρει πανοραμική **θέα** στην πόλη και τον Θερμαϊκό.

## UNESCO & πρακτικά
Ανήκει στα **Μνημεία UNESCO**. Είναι ενεργό μοναστήρι — φρόντισε για ευπρεπή ενδυμασία στην επίσκεψη. Συνδύασέ το με τα βυζαντινά τείχη.`,
      en: `**Vlatades Monastery** is a quiet, green refuge at the top of the Upper Town — history, calm and one of the city's finest views, all in one.

## History
Founded in the **14th century**, it is the **only Byzantine monastery** in Thessaloniki in continuous operation to this day. By tradition, the Apostle Paul preached on the site.

## What you'll see
The main church preserves important **frescoes**, while the leafy grounds — complete with peacocks — offer a panoramic **view** over the city and the gulf.

## UNESCO & practical
It is one of the **UNESCO monuments**. It is an active monastery, so dress modestly when visiting. Combine it with the Byzantine walls.`,
    },
    type: "monastery",
    tags: ["monastery", "unesco", "byzantine", "views", "history"],
    faqs: [
      {
        question: { el: "Είναι ενεργό μοναστήρι;", en: "Is it a working monastery?" },
        answer: {
          el: "Ναι — είναι το μοναδικό βυζαντινό μοναστήρι της πόλης που λειτουργεί συνεχώς· φόρα ευπρεπή ενδυμασία.",
          en: "Yes — it's the city's only Byzantine monastery in continuous operation; please dress modestly.",
        },
      },
    ],
    geo: {
      lat: 40.6430,
      lng: 22.9540,
      area: "ano-poli",
      address: { el: "Άνω Πόλη, Θεσσαλονίκη", en: "Ano Poli, Thessaloniki" },
    },
    photos: [
      {
        url: "/photos/656327a394.webp",
        alt: { el: "Η Μονή Βλατάδων", en: "Vlatades Monastery" },
        author: "Stolbovsky",
        license: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Monastery_of_the_Vlatades_09.jpg",
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
      el: `Τα **Βυζαντινά Τείχη** είναι ο περίπατος-σύμβολο της Άνω Πόλης και ένα από τα καλύτερα «σημεία θέας» της Θεσσαλονίκης — δωρεάν και ανοιχτό όλο το εικοσιτετράωρο.

## Ιστορία
Με καταβολές από τον **4ο αιώνα** και ενισχύσεις στη βυζαντινή περίοδο, τα τείχη περιέβαλλαν ολόκληρη την πόλη, από τη θάλασσα ως την ακρόπολη. Σώζονται σε μεγάλο μήκος στην Άνω Πόλη, μαζί με πύργους και πύλες.

## Γιατί αξίζει
Ο περίπατος κατά μήκος τους —ιδίως γύρω από τον **Πύργο Τριγωνίου**— χαρίζει πανοραμική θέα σε όλη την πόλη και τον Θερμαϊκό. Είναι το αγαπημένο σημείο των ντόπιων για **ηλιοβασίλεμα**.

## Καλό να ξέρεις
Μέρος των **Μνημείων UNESCO**. Συνδύασέ τα με τη Μονή Βλατάδων και το Επταπύργιο σε μια βόλτα στην Άνω Πόλη· φόρα άνετα παπούτσια για τα καλντερίμια.`,
      en: `The **Byzantine Walls** are the signature walk of the Upper Town and one of Thessaloniki's finest viewpoints — free and open around the clock.

## History
With origins in the **4th century** and reinforcements in the Byzantine period, the walls once encircled the entire city, from the sea to the acropolis. They survive for a great length in the Upper Town, along with towers and gates.

## Why it's worth it
Walking along them — especially around the **Trigoniou Tower** — gives a panoramic view over the whole city and the gulf. It is the locals' favourite spot for **sunset**.

## Good to know
Part of the **UNESCO monuments**. Combine them with Vlatades Monastery and the Heptapyrgion on an Ano Poli walk; wear comfortable shoes for the cobbles.`,
    },
    type: "landmark",
    tags: ["landmark", "unesco", "byzantine", "views", "free", "history"],
    faqs: [
      {
        question: { el: "Χρειάζεται εισιτήριο;", en: "Is there an entrance fee?" },
        answer: {
          el: "Όχι· ο περίπατος στα τείχη της Άνω Πόλης είναι ελεύθερος και ανοιχτός συνεχώς.",
          en: "No; the walk along the Upper Town walls is free and open at all times.",
        },
      },
      {
        question: { el: "Ποιο είναι το καλύτερο σημείο για θέα;", en: "Where's the best viewpoint?" },
        answer: {
          el: "Ο Πύργος Τριγωνίου προσφέρει την πιο πανοραμική θέα στην πόλη και τον Θερμαϊκό, ιδανική στο ηλιοβασίλεμα.",
          en: "The Trigoniou Tower offers the most panoramic view over the city and the gulf, ideal at sunset.",
        },
      },
    ],
    geo: {
      lat: 40.6410,
      lng: 22.9560,
      area: "ano-poli",
      address: { el: "Άνω Πόλη, Θεσσαλονίκη", en: "Ano Poli, Thessaloniki" },
    },
    photos: [
      {
        url: "/photos/601b3f32d6.webp",
        alt: { el: "Τα βυζαντινά τείχη της Θεσσαλονίκης", en: "The Byzantine walls of Thessaloniki" },
        author: "Julian Nyča",
        license: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Saloniki_City_Walls_2.jpg",
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
      el: `Το **Επταπύργιο**, γνωστό και ως **Γεντί Κουλέ** (τουρκικά: «επτά πύργοι»), είναι το φρούριο που στέφει την ακρόπολη της Άνω Πόλης — το ψηλότερο σημείο των τειχών.

## Ιστορία
Βυζαντινής αρχής, ενισχύθηκε στα **οθωμανικά χρόνια** και για μεγάλο μέρος του 20ού αιώνα λειτούργησε ως **φυλακή** — κάτι που άφησε το όνομά του και σε γνωστά ρεμπέτικα τραγούδια. Σήμερα είναι επισκέψιμος αρχαιολογικός χώρος.

## Γιατί αξίζει
Πέρα από την ιστορία, προσφέρει **θέα σε όλη την πόλη** και τον κόλπο. Είναι το φυσικό «τέρμα» μιας διαδρομής στα τείχη της Άνω Πόλης.

## Καλό να ξέρεις
Στην κορυφή της Άνω Πόλης· συνδύασέ το με τα βυζαντινά τείχη και τη Μονή Βλατάδων.`,
      en: `The **Heptapyrgion**, also known as **Yedi Kule** (Turkish for "seven towers"), is the fortress crowning the acropolis of the Upper Town — the highest point of the walls.

## History
Byzantine in origin, it was reinforced in **Ottoman times** and for much of the 20th century served as a **prison** — a past that even entered famous rebetiko songs. Today it is a visitable archaeological site.

## Why it's worth it
Beyond the history, it offers a **view over the whole city** and the gulf. It is the natural finish to a walk along the Upper Town walls.

## Good to know
At the top of Ano Poli; combine it with the Byzantine walls and Vlatades Monastery.`,
    },
    type: "landmark",
    tags: ["landmark", "byzantine", "views", "history"],
    faqs: [
      {
        question: { el: "Γιατί λέγεται Γεντί Κουλέ;", en: "Why is it called Yedi Kule?" },
        answer: {
          el: "Είναι το τουρκικό όνομα («επτά πύργοι»)· χρησιμοποιήθηκε επί δεκαετίες ως φυλακή, γι' αυτό και το θυμούνται πολλοί έτσι.",
          en: "It's the Turkish name (\"seven towers\"); it served for decades as a prison, which is how many still remember it.",
        },
      },
    ],
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
      el: `Η **Πλατεία Αριστοτέλους** είναι η καρδιά της Θεσσαλονίκης — η μεγάλη πλατεία που ανοίγει σαν αγκαλιά προς τον Θερμαϊκό και σε καλωσορίζει στην πόλη.

## Ιστορία & αρχιτεκτονική
Σχεδιάστηκε από τον Γάλλο πολεοδόμο **Ernest Hébrard**, στο πλαίσιο της ανασυγκρότησης μετά τη **μεγάλη πυρκαγιά του 1917**. Τα επιβλητικά νεοκλασικά κτίρια που την πλαισιώνουν (όπως το ξενοδοχείο Electra Palace) της δίνουν τη μνημειακή της αίσθηση.

## Τι να κάνεις
Καφές στα ιστορικά καφέ, βόλτα προς την παραλία και τον Λευκό Πύργο, ψώνια στην Τσιμισκή. Είναι ο τόπος κάθε μεγάλης **εκδήλωσης, συναυλίας και γιορτής** της πόλης.

## Καλό να ξέρεις
Ελεύθερη πρόσβαση, ιδανικό σημείο εκκίνησης για την πρώτη σου βόλτα στο κέντρο.`,
      en: `**Aristotelous Square** is the heart of Thessaloniki — the grand square that opens like an embrace toward the gulf and welcomes you into the city.

## History & architecture
It was designed by the French planner **Ernest Hébrard** as part of the reconstruction after the **great fire of 1917**. The imposing neoclassical buildings framing it (such as the Electra Palace hotel) give it its monumental feel.

## What to do
Coffee at the historic cafés, a walk down to the seafront and the White Tower, shopping on Tsimiski. It is the stage for every major **event, concert and celebration** in the city.

## Good to know
Free to access and the ideal starting point for your first walk through the centre.`,
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
        url: "/photos/a7606f4d25.webp",
        alt: { el: "Η Πλατεία Αριστοτέλους", en: "Aristotelous Square" },
        author: "User:JFKennedy",
        license: "Public domain",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Aristotelous_Plateia_2006_(cropped).jpg",
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
      el: `Η **Νέα Παραλία** είναι ο αγαπημένος περίπατος των Θεσσαλονικέων — ο ανανεωμένος παραλιακός πεζόδρομος όπου χτυπά η καθημερινή καρδιά της πόλης, δίπλα στη θάλασσα.

## Η διαδρομή
Εκτείνεται από τον **Λευκό Πύργο** ως το **Μέγαρο Μουσικής** και είναι οργανωμένη σε μια σειρά από **θεματικούς κήπους** (Κήπος του Νερού, της Μουσικής, της Μνήμης κ.ά.), με ποδηλατόδρομο σε όλο το μήκος.

## Τι θα δεις
- Το εμβληματικό γλυπτό **«Ομπρέλες»** του Γιώργου Ζογγολόπουλου — από τα πιο φωτογραφημένα σημεία της πόλης.
- Το άγαλμα του **Μεγάλου Αλεξάνδρου**.
- Τα «πλωτά» καφέ-καραβάκια που κάνουν βόλτες στον κόλπο.

## Καλό να ξέρεις
Δωρεάν, ανοιχτό πάντα, ιδανικό για **ηλιοβασίλεμα**, τρέξιμο και ποδήλατο. Δίπλα βρίσκονται το Αρχαιολογικό Μουσείο και το Μουσείο Βυζαντινού Πολιτισμού.`,
      en: `The **waterfront (Nea Paralia)** is the locals' favourite walk — the redesigned seaside promenade where the city's daily heartbeat plays out, right by the sea.

## The route
It stretches from the **White Tower** to the **Concert Hall** and is organised as a series of **themed gardens** (the Garden of Water, of Music, of Memory and more), with a cycle path along its whole length.

## What you'll see
- The iconic **"Umbrellas"** sculpture by George Zongolopoulos — one of the most photographed spots in the city.
- The statue of **Alexander the Great**.
- The "floating" café-boats that cruise the gulf.

## Good to know
Free, always open, and ideal for **sunset**, running and cycling. The Archaeological Museum and the Museum of Byzantine Culture are right beside it.`,
    },
    type: "landmark",
    tags: ["landmark", "free", "views", "family", "art"],
    faqs: [
      {
        question: { el: "Πού είναι οι «Ομπρέλες»;", en: "Where are the \"Umbrellas\"?" },
        answer: {
          el: "Πάνω στη Νέα Παραλία, στο ύψος περίπου του Ποσειδωνίου — από τα πιο δημοφιλή σημεία για φωτογραφία, ειδικά στο ηλιοβασίλεμα.",
          en: "On the waterfront, roughly by the Posidonio — one of the most popular photo spots, especially at sunset.",
        },
      },
    ],
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
      el: `Το **Αρχαιολογικό Μουσείο Θεσσαλονίκης** είναι το κορυφαίο μουσείο για την αρχαία Μακεδονία και ιδανικό «πρώτο βήμα» για να καταλάβεις την ιστορία της πόλης και της περιοχής.

## Τι θα δεις
Μόνιμες εκθέσεις που καλύπτουν όλες τις όψεις της ζωής στην αρχαιότητα — από την **προϊστορία** ως την ύστερη αρχαιότητα. Ξεχωρίζουν τα **χρυσά ευρήματα** και τα κτερίσματα από μακεδονικούς τάφους, καθώς και η ενότητα για τη ρωμαϊκή Θεσσαλονίκη.

## Καλό να ξέρεις
Βρίσκεται στην αρχή της Νέας Παραλίας, δίπλα στο **Μουσείο Βυζαντινού Πολιτισμού** και κοντά στον Λευκό Πύργο — μπορείς να δεις και τα δύο μουσεία την ίδια μέρα. Για ώρες και εισιτήρια δες τον επίσημο ιστότοπο.`,
      en: `The **Archaeological Museum of Thessaloniki** is the leading museum for ancient Macedonia and an ideal "first step" to understand the history of the city and the region.

## What you'll see
Permanent exhibitions covering every aspect of life in antiquity — from **prehistory** to late antiquity. Highlights include the **gold finds** and grave goods from Macedonian tombs, and the section on Roman Thessaloniki.

## Good to know
It stands at the start of the waterfront, next to the **Museum of Byzantine Culture** and near the White Tower — you can see both museums in one day. Check the official site for hours and tickets.`,
    },
    type: "museum",
    tags: ["museum", "history", "culture", "family"],
    faqs: [
      {
        question: { el: "Τι θα δω στο μουσείο;", en: "What will I see in the museum?" },
        answer: {
          el: "Ευρήματα από τη Θεσσαλονίκη και τη Μακεδονία, με έμφαση στα χρυσά κτερίσματα και τη ρωμαϊκή περίοδο.",
          en: "Finds from Thessaloniki and Macedonia, with an emphasis on gold grave goods and the Roman period.",
        },
      },
      {
        question: { el: "Συνδυάζεται με άλλο μουσείο;", en: "Can I combine it with another museum?" },
        answer: {
          el: "Ναι — το Μουσείο Βυζαντινού Πολιτισμού είναι δίπλα, ιδανικό για την ίδια επίσκεψη.",
          en: "Yes — the Museum of Byzantine Culture is right next door, ideal for the same visit.",
        },
      },
    ],
    geo: {
      lat: 40.6215,
      lng: 22.9550,
      area: "waterfront",
      address: { el: "Μ. Ανδρόνικου 6, 546 21 Θεσσαλονίκη", en: "6 M. Andronikou St., 546 21 Thessaloniki" },
    },
    photos: [
      {
        url: "/photos/a4e8af2702.webp",
        alt: { el: "Το Αρχαιολογικό Μουσείο Θεσσαλονίκης", en: "The Archaeological Museum of Thessaloniki" },
        author: "Carole Raddato from FRANKFURT, Germany",
        license: "CC BY-SA 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Archaeological_Museum,_Thessaloniki,_Greece_(7457978664).jpg",
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
      el: `Το **Μουσείο Βυζαντινού Πολιτισμού** είναι ένα από τα σημαντικότερα μουσεία της Ελλάδας — βραβευμένο (Βραβείο Μουσείου του Συμβουλίου της Ευρώπης) και ιδανικό συμπλήρωμα των βυζαντινών μνημείων της πόλης.

## Τι θα δεις
Οι μόνιμες εκθέσεις ξεδιπλώνουν την **καθημερινή ζωή, την τέχνη και τη θρησκεία** του Βυζαντίου: ψηφιδωτά, τοιχογραφίες, εικόνες, νομίσματα και αντικείμενα καθημερινής χρήσης, με σαφή, σύγχρονη μουσειογραφία.

## Καλό να ξέρεις
Στη Λεωφόρο Στρατού, δίπλα στο **Αρχαιολογικό Μουσείο** και κοντά στη Νέα Παραλία. Ιδανικό για να «διαβάσεις» τα μνημεία UNESCO της πόλης πριν ή μετά την επίσκεψή τους.`,
      en: `The **Museum of Byzantine Culture** is one of Greece's most important museums — award-winning (Council of Europe Museum Prize) and the perfect complement to the city's Byzantine monuments.

## What you'll see
Permanent exhibitions unfold the **daily life, art and religion** of Byzantium: mosaics, frescoes, icons, coins and everyday objects, with clear, modern curation.

## Good to know
On Stratou Avenue, next to the **Archaeological Museum** and near the waterfront. Ideal for "reading" the city's UNESCO monuments before or after visiting them.`,
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
        url: "/photos/4635086d73.webp",
        alt: { el: "Το Μουσείο Βυζαντινού Πολιτισμού", en: "The Museum of Byzantine Culture" },
        author: "Prof. Vlasis Vlasidis",
        license: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Macedonian_Museums-88-Arx_Byz_Thessaloniknhs-391.jpg",
      },
    ],
    contact: { phone: "+302313306400", email: "mbp@culture.gr", website: "https://www.mbp.gr/" },
    updatedAt: "2026-09-08",
  },
];
