import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LogIn, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Localized, OpeningHours } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { OwnerEditForm } from "@/components/OwnerEditForm";
import { getCurrentUser } from "@/lib/auth";
import { prisma, isDbConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

interface OfferRow {
  title: string;
  description: string;
  expiresAt: string;
}

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Container className="py-16 text-center">
        <LogIn className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-3 text-lg">
          {tt("Συνδέσου για να επεξεργαστείς την καταχώρηση.", "Sign in to edit this listing.")}
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
        >
          {tt("Σύνδεση", "Sign in")}
        </Link>
      </Container>
    );
  }

  if (!isDbConfigured) notFound();
  const place = await prisma.place.findUnique({ where: { slug } });
  if (!place) notFound();

  // Ownership is enforced again in the server action; this is the UI guard.
  if (place.ownerId !== user.id && user.role !== "ADMIN") {
    return (
      <Container className="py-16 text-center">
        <p className="text-muted">
          {tt(
            "Δεν έχεις δικαίωμα επεξεργασίας αυτής της καταχώρησης.",
            "You don't have permission to edit this listing.",
          )}
        </p>
        <Link href="/dashboard" className="mt-4 inline-block font-semibold text-brand-700">
          {tt("Πίσω στον πίνακα", "Back to dashboard")}
        </Link>
      </Container>
    );
  }

  const contact = (place.contact ?? {}) as {
    phone?: string;
    email?: string;
    website?: string;
    bookingUrl?: string;
  };
  const hours = (place.hours ?? {}) as OpeningHours;
  const rawOffers = (place.offers ?? []) as {
    title?: Localized<string>;
    description?: Localized<string>;
    expiresAt?: string;
  }[];
  const isAdmin = user.role === "ADMIN";
  const loc = (v: unknown) => (v ?? {}) as Localized<string>;
  const editorial = isAdmin
    ? {
        nameEl: loc(place.name).el ?? "",
        nameEn: loc(place.name).en ?? "",
        summaryEl: loc(place.summary).el ?? "",
        summaryEn: loc(place.summary).en ?? "",
        descriptionEl: loc(place.description).el ?? "",
        descriptionEn: loc(place.description).en ?? "",
        seoTitleEl: loc(place.seoTitle).el ?? "",
        seoTitleEn: loc(place.seoTitle).en ?? "",
        seoDescriptionEl: loc(place.seoDescription).el ?? "",
        seoDescriptionEn: loc(place.seoDescription).en ?? "",
      }
    : undefined;

  const offers: OfferRow[] = rawOffers.map((o) => ({
    title: o.title ? pick(o.title, locale) : "",
    description: o.description ? pick(o.description, locale) : "",
    expiresAt: o.expiresAt ?? "",
  }));

  return (
    <Container className="py-8">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> {tt("Πίσω στον πίνακα", "Back to dashboard")}
      </Link>

      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold">
          {pick(place.name as Localized<string>, locale)}
        </h1>
        <p className="mt-2 text-muted">
          {tt(
            "Συμπλήρωσε τα στοιχεία που δεν δημοσιεύουμε ποτέ μόνοι μας: ωράριο, επικοινωνία και προσφορές.",
            "Fill in the details we never publish on our own: opening hours, contact and offers.",
          )}
        </p>
      </header>

      <OwnerEditForm
        slug={slug}
        editorial={editorial}
        editorialLabels={
          editorial
            ? {
                title: tt("Συντακτικά (μόνο διαχειριστής)", "Editorial (admin only)"),
                hint: tt(
                  "Ο χρήστης γράφει μόνο ελληνικά. Συμπλήρωσε την αγγλική απόδοση πριν την έγκριση — αν μείνει κενή, η αγγλική σελίδα δείχνει το ελληνικό κείμενο.",
                  "Submitters write Greek only. Add the English version before approving — if it stays empty, the English page shows the Greek text.",
                ),
                greek: tt("Ελληνικά", "Greek"),
                english: tt("Αγγλικά", "English"),
                name: tt("Όνομα", "Name"),
                summary: tt("Σύντομη περιγραφή", "Short summary"),
                description: tt("Περιγραφή", "Description"),
                seoTitle: tt("Τίτλος SEO (προαιρετικό)", "SEO title (optional)"),
                seoDescription: tt("Περιγραφή SEO (προαιρετικό)", "SEO description (optional)"),
                seoHint: tt(
                  "Άφησέ τα κενά και ο τίτλος παράγεται αυτόματα ως «Όνομα — Περιοχή», με τη σύντομη περιγραφή ως meta description.",
                  "Leave blank and the title is generated as \"Name — Area\", with the short summary as the meta description.",
                ),
              }
            : undefined
        }
        hours={hours}
        contact={contact}
        offers={offers}
        labels={{
          hoursTitle: tt("Ωράριο λειτουργίας", "Opening hours"),
          hoursHint: tt(
            "Γράψε το ωράριο ως 09:00-17:00. Άφησε κενό αν είναι κλειστά εκείνη τη μέρα.",
            "Write hours as 09:00-17:00. Leave blank if closed that day.",
          ),
          closed: tt("κενό = κλειστά", "blank = closed"),
          days: {
            mon: tt("Δευτέρα", "Monday"),
            tue: tt("Τρίτη", "Tuesday"),
            wed: tt("Τετάρτη", "Wednesday"),
            thu: tt("Πέμπτη", "Thursday"),
            fri: tt("Παρασκευή", "Friday"),
            sat: tt("Σάββατο", "Saturday"),
            sun: tt("Κυριακή", "Sunday"),
          },
          contactTitle: tt("Επικοινωνία", "Contact"),
          phone: tt("Τηλέφωνο", "Phone"),
          email: "Email",
          website: tt("Ιστοσελίδα", "Website"),
          bookingUrl: tt("Σύνδεσμος κράτησης", "Booking link"),
          offersTitle: tt("Προσφορές", "Offers"),
          offersHint: tt(
            "Προαιρετικό. Εμφανίζονται στη σελίδα σου και αποσύρονται αυτόματα μετά την ημερομηνία λήξης.",
            "Optional. These show on your page and drop off automatically after the expiry date.",
          ),
          offerTitle: tt("Τίτλος προσφοράς", "Offer title"),
          offerDescription: tt("Περιγραφή", "Description"),
          offerExpires: tt("Λήγει", "Expires"),
          addOffer: tt("Προσθήκη προσφοράς", "Add offer"),
          removeOffer: tt("Αφαίρεση", "Remove"),
          save: tt("Αποθήκευση", "Save"),
          saved: tt("Αποθηκεύτηκε", "Saved"),
          forbidden: tt("Δεν έχεις δικαίωμα.", "You don't have permission."),
          invalid: tt("Έλεγξε τη μορφή", "Check the format"),
          error: tt("Κάτι πήγε στραβά.", "Something went wrong."),
        }}
      />
    </Container>
  );
}
