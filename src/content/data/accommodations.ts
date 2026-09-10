import type { Place } from "@/lib/types";

/**
 * Accommodations (STAY pillar).
 *
 * Real listings are added only with verified PUBLIC information (name, area,
 * category, official/booking link and publicly listed facilities), never
 * invented phone numbers, prices or hours. Photos appear only once the owner
 * supplies them; third-party booking-site images are not free to reuse, and
 * owners can add their own via "Claim your business".
 */
export const accommodations: Place[] = [
  {
    slug: "agias-sofias-luxury-apartments",
    kind: "stay",
    name: {
      el: "Agias Sofias Luxury Apartments",
      en: "Agias Sofias Luxury Apartments",
    },
    summary: {
      el: "Πολυτελές διαμέρισμα στην καρδιά της Θεσσαλονίκης, κοντά στην Αριστοτέλους και τη Νέα Παραλία.",
      en: "A luxury apartment in the heart of Thessaloniki, near Aristotelous Square and the waterfront.",
    },
    description: {
      el: "Το Agias Sofias Luxury Apartments βρίσκεται στο κέντρο της Θεσσαλονίκης, σε απόσταση περιπάτου από την Πλατεία Αριστοτέλους, την εμπορική οδό Τσιμισκή και τον Λευκό Πύργο (περίπου 0,8 χλμ). Ο σταθμός του μετρό είναι μόλις 2 λεπτά μακριά και η παραλία σε 5 λεπτά με τα πόδια. Το διαμέρισμα διαθέτει πλήρως εξοπλισμένη κουζίνα και μπαλκόνι, ιδανικό για ζευγάρια αλλά και για διαμονές μεγαλύτερης διάρκειας. Για διαθεσιμότητα και τιμές δείτε τη σελίδα κράτησης.",
      en: "Agias Sofias Luxury Apartments is located in central Thessaloniki, within walking distance of Aristotelous Square, the Tsimiski shopping street and the White Tower (about 0.8 km). The metro station is just 2 minutes away and the seafront a 5-minute walk. The apartment has a fully equipped kitchen and a balcony, ideal for couples and for longer stays. See the booking page for availability and prices.",
    },
    type: "apartment",
    tags: ["central", "kitchen", "couples", "families", "long-stays"],
    // Only the verified property type is set; the owner completes the rest
    // (capacity, price, check-in, policies…) via "Claim your business".
    stay: {
      propertyType: "apartment",
    },
    geo: {
      lat: 40.6338,
      lng: 22.9475,
      area: "center",
      address: { el: "Οδός Αγίας Σοφίας, Κέντρο, Θεσσαλονίκη", en: "Agias Sofias St., City Center, Thessaloniki" },
    },
    // Supplied by the owner. Third-party booking-site photos are still not
    // free to reuse, so anything not provided directly stays out.
    photos: [
      {
        url: "/photos/agias-sofias-luxury-apartments-1.webp",
        alt: {
          el: "Το σαλόνι του διαμερίσματος με τον καναπέ, την τραπεζαρία και την μπαλκονόπορτα",
          en: "The apartment's living room with sofa, dining table and balcony door",
        },
      },
      {
        url: "/photos/agias-sofias-luxury-apartments-2.webp",
        alt: {
          el: "Καθιστικό με σκούρο καναπέ και μπαλκόνι με θέα στο κέντρο της Θεσσαλονίκης",
          en: "Seating area with a dark sofa and a balcony looking over central Thessaloniki",
        },
      },
      {
        url: "/photos/agias-sofias-luxury-apartments-3.webp",
        alt: {
          el: "Ο ενιαίος χώρος καθιστικού με μαρμάρινο δάπεδο και κρυφό φωτισμό",
          en: "The open-plan living space with marble floors and recessed lighting",
        },
      },
    ],
    contact: {
      bookingUrl: "https://www.booking.com/hotel/gr/agias-sofias-luxury-apartments.el.html",
    },
    // Publicly listed facilities only.
    amenities: ["kitchen", "air-conditioning", "washer", "tv", "balcony"],
    featured: true,
    updatedAt: "2026-09-08",
  },
];
