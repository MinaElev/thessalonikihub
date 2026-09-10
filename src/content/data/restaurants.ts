import type { Place } from "@/lib/types";

/**
 * Restaurants (EAT pillar).
 *
 * Real listings only, built from verified public information: the business's
 * own site, its public listing details and press coverage. Never invented
 * phone numbers, prices or hours — where a detail is not published, the field
 * is simply left out.
 */
export const restaurants: Place[] = [
  {
    slug: "mavri-thalassa",
    kind: "eat",
    name: { el: "Μαύρη Θάλασσα", en: "Mavri Thalassa" },
    summary: {
      el: "Ψαροφαγείο με θέα τη θάλασσα στη Νέα Κρήνη — μια οικογενειακή ιστορία που ξεκίνησε το 1926 ως καφενείο μικρασιάτη πρόσφυγα.",
      en: "A seafood restaurant overlooking the sea in Nea Krini — a family story that began in 1926 as an Asia Minor refugee's kafeneio.",
    },
    description: {
      el: `Η **Μαύρη Θάλασσα** είναι από τα λίγα εστιατόρια της Θεσσαλονίκης που κάθονται κυριολεκτικά πάνω στο νερό — και σχεδόν σίγουρα το μόνο που μπορεί να μετρήσει την ιστορία του σε γενιές.

## Από το καφενείο στο ψαροφαγείο
Η ιστορία ξεκινά το **1926**, όταν ο **Σάββας Τοκίδης**, πρόσφυγας από τη Μικρά Ασία, άνοιξε στην **Κάτω Τούμπα** ένα μικρό καφενείο και του έδωσε το όνομα **«Μαύρη Θάλασσα»** — το όνομα της θάλασσας που είχε αφήσει πίσω.

Ο «Μπάρμπα-Σάββας» δεν άνοιξε εστιατόριο· άνοιξε καφενείο, όπως δεκάδες πρόσφυγες εκείνα τα χρόνια στις νέες συνοικίες της πόλης. Η μετατροπή ήρθε με τον χρόνο και τις γενιές.

Το **1984** την κουζίνα ανέλαβε πλήρως ο **Αλέξανδρος Τοκίδης**, τρίτη γενιά της οικογένειας. **Από το 2000** και μετά το μαγαζί μετασχηματίστηκε σταδιακά σε εστιατόριο θαλασσινών, περνώντας από τους απλούς μεζέδες σε πιο επεξεργασμένη κουζίνα.

## Η μετακόμιση του 2013
Το **2013**, ύστερα από **87 χρόνια** στην Κάτω Τούμπα, η Μαύρη Θάλασσα μετακόμισε στη **Νέα Κρήνη**, στη σημερινή της θέση πάνω στην παραλιακή της Καλαμαριάς. Ο νέος χώρος απλώνεται σε **δύο ορόφους με πάνω από 70 τραπέζια**, με θέα στον Θερμαϊκό.

Σήμερα στην κουζίνα βρίσκονται ο **Αλέξανδρος Τοκίδης** και η **Σόνια Μαργαρίτου**, με την **τέταρτη γενιά** της οικογένειας —τον γιο τους Γιώργο— να συμμετέχει ολοένα περισσότερο.

## Τι είναι σήμερα
Πολυβραβευμένο εστιατόριο θαλασσινών, με έμφαση στη φρέσκια πρώτη ύλη και σε παρασκευές που δεν την κρύβουν. Διαθέτει **οργανωμένη κάβα** και συγκαταλέγεται σταθερά στις κορυφαίες προτάσεις της πόλης για ψάρι.

## Καλό να ξέρεις
- Είναι εστιατόριο **θαλασσινών**, όχι ποντιακής κουζίνας — το όνομα παραπέμπει στην καταγωγή της οικογένειας, όχι στο μενού.
- Βρίσκεται στην παραλιακή ζώνη της **Καλαμαριάς**, πλέον προσβάσιμη και με μετρό.
- Για ωράριο και κρατήσεις, επικοινώνησε απευθείας με το εστιατόριο.`,
      en: `**Mavri Thalassa** is one of the few restaurants in Thessaloniki that sits literally on the water — and almost certainly the only one that can count its history in generations.

## From kafeneio to seafood restaurant
The story begins in **1926**, when **Savvas Tokidis**, a refugee from Asia Minor, opened a small kafeneio in **Kato Toumba** and named it **"Mavri Thalassa"** — the Black Sea, the sea he had left behind.

"Barba-Savvas" didn't open a restaurant; he opened a coffee house, as dozens of refugees did in those years in the city's new districts. The transformation came with time and with generations.

In **1984** the kitchen passed fully to **Alexandros Tokidis**, the family's third generation. **From 2000** onward the place gradually became a seafood restaurant, moving from simple mezedes toward more considered cooking.

## The move of 2013
In **2013**, after **87 years** in Kato Toumba, Mavri Thalassa moved to **Nea Krini**, its present position on the Kalamaria seafront. The new space spreads over **two floors with more than 70 tables**, looking out across the Thermaic Gulf.

Today the kitchen is run by **Alexandros Tokidis** and **Sonia Margaritou**, with the family's **fourth generation** — their son Giorgos — increasingly involved.

## What it is today
An award-winning seafood restaurant, built on fresh raw materials and preparations that don't hide them. It keeps a substantial **wine cellar** and appears consistently among the city's leading recommendations for fish.

## Good to know
- It is a **seafood** restaurant, not a Pontic one — the name refers to the family's origins, not the menu.
- It sits on the **Kalamaria** seafront, now reachable by metro as well.
- For opening hours and reservations, contact the restaurant directly.`,
    },
    type: "seafood",
    tags: [
      "seafood",
      "fish",
      "sea-view",
      "fine-dining",
      "wine",
      "historic",
      "family-run",
      "special-occasion",
    ],
    geo: {
      lat: 40.5702,
      lng: 22.955,
      area: "aretsou",
      address: {
        el: "Νικολάου Πλαστήρα 3, Νέα Κρήνη, Καλαμαριά 551 32",
        en: "Nikolaou Plastira 3, Nea Krini, Kalamaria 551 32",
      },
    },
    // The restaurant's own photographs are not ours to reuse; the owner can
    // supply licensed images via "Claim your business".
    photos: [],
    contact: {
      phone: "+302310932542",
      email: "info@mavri-thalassa.gr",
      website: "https://mavri-thalassa.gr",
      social: { facebook: "https://www.facebook.com/mavrithalassa/" },
    },
    // The amenity vocabulary is accommodation-oriented (kitchen, washer, crib),
    // so nothing there fits a restaurant. Sea view, the two floors and the wine
    // cellar are covered in the description instead. Opening hours are not
    // published anywhere, so they are absent rather than guessed.
    faqs: [
      {
        question: {
          el: "Τι κουζίνα σερβίρει η Μαύρη Θάλασσα;",
          en: "What kind of food does Mavri Thalassa serve?",
        },
        answer: {
          el: "Θαλασσινά και ψάρι. Παρά το όνομα, δεν είναι ποντιακό εστιατόριο — η ονομασία κρατά από την προσφυγική καταγωγή της οικογένειας Τοκίδη.",
          en: "Seafood and fish. Despite the name, it is not a Pontic restaurant — the name comes from the Tokidis family's refugee origins.",
        },
      },
      {
        question: {
          el: "Πόσο παλιό είναι το εστιατόριο;",
          en: "How old is the restaurant?",
        },
        answer: {
          el: "Η ιστορία του ξεκινά το 1926 στην Κάτω Τούμπα ως καφενείο. Στη σημερινή του θέση στη Νέα Κρήνη μετακόμισε το 2013.",
          en: "Its history begins in 1926 in Kato Toumba as a kafeneio. It moved to its present location in Nea Krini in 2013.",
        },
      },
      {
        question: {
          el: "Πώς πάω με μετρό;",
          en: "How do I get there by metro?",
        },
        answer: {
          el: "Πλησιέστεροι σταθμοί είναι η Νέα Κρήνη και η Αρετσού, στον κλάδο της Καλαμαριάς που άνοιξε τον Αύγουστο του 2026.",
          en: "The nearest stations are Nea Krini and Aretsou, on the Kalamaria branch that opened in August 2026.",
        },
      },
    ],
    featured: true,
    updatedAt: "2026-09-10",
  },
];
