import type { Place } from "@/lib/types";

/**
 * Local services (SERVICES pillar): transfers, taxis, car rental, cleaning,
 * plumbers, photographers, tour guides, etc.
 *
 * Real services are added only with verified information provided by the
 * owner/partner (name, official link, coverage) — never fabricated.
 */
export const services: Place[] = [
  {
    slug: "fotografisi-xenodocheion-tsamakdas",
    kind: "services",
    name: {
      el: "Φωτογράφιση Ξενοδοχείων & Πολυτελών Καταλυμάτων — Georgos Tsamakdas",
      en: "Hotel & Luxury Accommodation Photography — Georgos Tsamakdas",
    },
    summary: {
      el: "Επαγγελματική φωτογράφιση ξενοδοχείων και πολυτελών καταλυμάτων σε όλη την Ελλάδα — εικόνες υψηλών προδιαγραφών που αναδεικνύουν τον χώρο σας και ενισχύουν το brand σας.",
      en: "Professional photography for hotels and luxury accommodation across Greece — high-end images that showcase your space and strengthen your brand.",
    },
    description: {
      el: "Αναδεικνύουμε τον αρχιτεκτονικό χαρακτήρα και την αισθητική ταυτότητα του χώρου σας. Κάθε ξενοδοχείο, βίλα ή boutique κατάλυμα έχει τη δική του ιστορία — και ο ρόλος μας είναι να την αφηγηθούμε μέσα από την εικόνα, με σεβασμό στο φως, τις αναλογίες και τη λεπτομέρεια.\n\nΔημιουργούμε εικόνες υψηλών προδιαγραφών που μαγνητίζουν το κοινό και ενισχύουν το brand σας. Με κάθε λήψη αποτυπώνουμε την ουσία και τη λεπτομέρεια του χώρου, προκαλώντας τα συναισθήματα που μετατρέπουν τον απλό επισκέπτη σε πελάτη.\n\nΗ επαγγελματική φωτογράφιση μετατρέπει την αισθητική υπεροχή σε ανταγωνιστικό πλεονέκτημα. Προβάλλοντας το κύρος της επιχείρησής σας μέσα από άρτιες εικόνες, οικοδομείτε σχέσεις εμπιστοσύνης, προσελκύετε κοινό υψηλού προφίλ και μεταφράζετε την ποιότητα της προβολής σας σε άμεση αύξηση των εσόδων.\n\n### Τι περιλαμβάνει\n\n- Αρχιτεκτονική & interior φωτογράφιση χώρων: δωμάτια, σουίτες και κοινόχρηστοι χώροι\n- Λήψεις εξωτερικών χώρων, πισίνας και θέας\n- Ατμοσφαιρικές λήψεις για social media, πλατφόρμες κρατήσεων και έντυπο υλικό\n- Επιμελημένη επεξεργασία και παράδοση σε υψηλή ανάλυση\n\n### Περιοχή κάλυψης\n\nΚαλύπτουμε ολόκληρη την Ελλάδα — από τα ξενοδοχεία της Θεσσαλονίκης και της ηπειρωτικής χώρας μέχρι τα νησιωτικά καταλύματα.\n\nΦωτογράφος: **Γιώργος Τσαμάκδας**. Δείτε δείγματα δουλειάς και επικοινωνήστε μέσω της επίσημης ιστοσελίδας: [tsamakdas.com](https://www.tsamakdas.com/el).",
      en: "We bring out the architectural character and the aesthetic identity of your space. Every hotel, villa or boutique property has its own story — and our role is to tell it through the image, with respect for light, proportion and detail.\n\nWe create high-end images that captivate your audience and strengthen your brand. With every shot we capture the essence and the detail of the space, evoking the emotions that turn a casual visitor into a guest.\n\nProfessional photography turns aesthetic excellence into a competitive advantage. By showcasing the prestige of your business through polished images, you build trust, attract a high-profile audience and translate the quality of your presentation into a direct increase in revenue.\n\n### What it includes\n\n- Architectural & interior photography: rooms, suites and common areas\n- Exterior, pool and view shots\n- Atmospheric shots for social media, booking platforms and print material\n- Careful post-processing and delivery in high resolution\n\n### Coverage area\n\nWe cover the whole of Greece — from the hotels of Thessaloniki and the mainland to island accommodation.\n\nPhotographer: **Georgos Tsamakdas**. See sample work and get in touch through the official website: [tsamakdas.com](https://www.tsamakdas.com/el).",
    },
    type: "photographer",
    tags: [
      "photographer",
      "hotels",
      "luxury",
      "hospitality",
      "branding",
      "architecture",
      "interior",
    ],
    service: {
      serviceType: "photographer",
      priceModel: "quote",
      coverageAreas: ["all-greece"],
      languages: ["el", "en"],
    },
    geo: {
      // Anchored in Thessaloniki (the hub's city); coverage is nationwide.
      lat: 40.6401,
      lng: 22.9444,
      area: "center",
    },
    // No licensed photos supplied yet — the partner can add images later.
    photos: [],
    contact: {
      website: "https://www.tsamakdas.com/el",
    },
    faqs: [
      {
        question: {
          el: "Σε ποιες περιοχές δραστηριοποιείστε;",
          en: "Which areas do you cover?",
        },
        answer: {
          el: "Σε όλη την Ελλάδα — από τη Θεσσαλονίκη και την ηπειρωτική χώρα μέχρι τα νησιά.",
          en: "Across all of Greece — from Thessaloniki and the mainland to the islands.",
        },
      },
      {
        question: {
          el: "Τι τύπους καταλυμάτων φωτογραφίζετε;",
          en: "What types of accommodation do you photograph?",
        },
        answer: {
          el: "Ξενοδοχεία, βίλες, boutique και πολυτελή καταλύματα, καθώς και τους εσωτερικούς και εξωτερικούς τους χώρους.",
          en: "Hotels, villas, boutique and luxury accommodation, including their interior and exterior spaces.",
        },
      },
    ],
    verified: true,
    featured: true,
    updatedAt: "2026-09-09",
  },
];
