import type { Localized } from "@/lib/types";

export interface FaqItem {
  q: Localized<string>;
  a: Localized<string>;
}

/** City-level FAQ ("People Also Ask" long-tail). Kept general & evergreen. */
export const planFaqs: FaqItem[] = [
  {
    q: { el: "Πόσες μέρες χρειάζομαι για τη Θεσσαλονίκη;", en: "How many days do I need in Thessaloniki?" },
    a: {
      el: "Για την πόλη, 2-3 μέρες αρκούν για τα κυριότερα (κέντρο, μνημεία, παραλία, Άνω Πόλη). Πρόσθεσε 1-2 μέρες αν θέλεις εκδρομές (Βεργίνα, Όλυμπος, Χαλκιδική).",
      en: "For the city itself, 2-3 days cover the highlights (centre, monuments, waterfront, Ano Poli). Add 1-2 days for day trips (Vergina, Mount Olympus, Chalkidiki).",
    },
  },
  {
    q: { el: "Ποια είναι η καλύτερη εποχή για να έρθω;", en: "When is the best time to visit?" },
    a: {
      el: "Άνοιξη (Μάιος-Ιούνιος) και φθινόπωρο (Σεπτέμβριος-Οκτώβριος) έχουν ήπιο καιρό, ιδανικό για περπάτημα. Το καλοκαίρι ζεσταίνει, ενώ ο χειμώνας έχει έντονη πολιτιστική και εορταστική ζωή.",
      en: "Spring (May-June) and autumn (September-October) have mild weather, ideal for walking. Summer gets hot, while winter has a rich cultural and festive scene.",
    },
  },
  {
    q: { el: "Είναι ασφαλής η Θεσσαλονίκη;", en: "Is Thessaloniki safe?" },
    a: {
      el: "Ναι, γενικά είναι ασφαλής όπως οι περισσότερες ευρωπαϊκές πόλεις. Ισχύουν οι συνηθισμένες προφυλάξεις για τα προσωπικά σου αντικείμενα σε πολυσύχναστα σημεία.",
      en: "Yes, it is generally safe like most European cities. Usual precautions apply for your belongings in busy areas.",
    },
  },
  {
    q: { el: "Μιλάνε αγγλικά;", en: "Do people speak English?" },
    a: {
      el: "Ναι, τα αγγλικά μιλιούνται ευρέως, ειδικά σε τουριστικούς χώρους και από νεότερους.",
      en: "Yes, English is widely spoken, especially in tourism and among younger people.",
    },
  },
  {
    q: { el: "Χρειάζομαι αυτοκίνητο;", en: "Do I need a car?" },
    a: {
      el: "Όχι για την πόλη — το κέντρο είναι περπατήσιμο και υπάρχουν μετρό και λεωφορεία. Αυτοκίνητο βοηθά μόνο για εκδρομές εκτός πόλης.",
      en: "Not for the city — the centre is walkable and there is a metro and buses. A car only helps for day trips outside the city.",
    },
  },
  {
    q: { el: "Νόμισμα και κάρτες;", en: "Currency and cards?" },
    a: {
      el: "Το νόμισμα είναι το ευρώ (€). Οι κάρτες γίνονται ευρέως δεκτές και υπάρχουν παντού ATM.",
      en: "The currency is the euro (€). Cards are widely accepted and ATMs are everywhere.",
    },
  },
  {
    q: { el: "Τι πρέπει να δοκιμάσω;", en: "What should I try?" },
    a: {
      el: "Η Θεσσαλονίκη είναι γαστρονομική πρωτεύουσα: μπουγάτσα, κουλούρι, μεζέδες, τρίγωνα Πανοράματος και φρέσκο ψάρι.",
      en: "Thessaloniki is a food capital: bougatsa, koulouri, meze, Panorama triangles (trigona) and fresh fish.",
    },
  },
  {
    q: { el: "Πίνεται το νερό της βρύσης;", en: "Is tap water drinkable?" },
    a: {
      el: "Ναι, το νερό της βρύσης είναι πόσιμο.",
      en: "Yes, tap water is drinkable.",
    },
  },
];
