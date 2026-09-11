import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LogIn, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { EventEditForm } from "@/components/owner/EventEditForm";
import { toAthensLocalInput } from "@/lib/athens-time";
import { getCurrentUser } from "@/lib/auth";
import { prisma, isDbConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
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
          {tt("Συνδέσου για να επεξεργαστείς την εκδήλωση.", "Sign in to edit this event.")}
        </p>
        <Link
          href={`/login?next=${encodeURIComponent(`/dashboard/edit/event/${slug}`)}`}
          className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
        >
          {tt("Σύνδεση", "Sign in")}
        </Link>
      </Container>
    );
  }

  if (!isDbConfigured) notFound();
  const event = await prisma.eventItem.findUnique({ where: { slug } });
  if (!event) notFound();

  const isAdmin = user.role === "ADMIN";
  // Enforced again in the server action; this is the UI guard.
  if (event.ownerId !== user.id && !isAdmin) {
    return (
      <Container className="py-16 text-center">
        <p className="text-muted">
          {tt(
            "Δεν έχεις δικαίωμα επεξεργασίας αυτής της εκδήλωσης.",
            "You don't have permission to edit this event.",
          )}
        </p>
        <Link href="/dashboard" className="mt-4 inline-block font-semibold text-brand-700">
          {tt("Πίσω στον πίνακα", "Back to dashboard")}
        </Link>
      </Container>
    );
  }

  const loc = (v: unknown) => (v ?? {}) as Localized<string>;
  const contact = (event.contact ?? {}) as {
    phone?: string;
    email?: string;
    website?: string;
    bookingUrl?: string;
  };

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
          {pick(event.name as Localized<string>, locale)}
        </h1>
        {event.sourceUrl ? (
          <p className="mt-2 text-sm text-muted">
            {tt("Πηγή:", "Source:")}{" "}
            {/* nofollow: the source is a third party we do not vouch for. */}
            <a
              href={event.sourceUrl}
              target="_blank"
              rel="noopener nofollow"
              className="inline-flex items-center gap-1 font-semibold text-brand-700 underline"
            >
              {event.source ?? tt("σύνδεσμος", "link")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </p>
        ) : null}
      </header>

      <EventEditForm
        isAdmin={isAdmin}
        values={{
          slug,
          nameEl: loc(event.name).el ?? "",
          nameEn: loc(event.name).en ?? "",
          summaryEl: loc(event.summary).el ?? "",
          summaryEn: loc(event.summary).en ?? "",
          descriptionEl: loc(event.description).el ?? "",
          descriptionEn: loc(event.description).en ?? "",
          venueEl: loc(event.venue).el ?? "",
          venueEn: loc(event.venue).en ?? "",
          startsAt: toAthensLocalInput(event.startsAt),
          endsAt: toAthensLocalInput(event.endsAt),
          priceInfoEl: loc(event.priceInfo).el ?? "",
          priceInfoEn: loc(event.priceInfo).en ?? "",
          phone: contact.phone ?? "",
          email: contact.email ?? "",
          website: contact.website ?? "",
          bookingUrl: contact.bookingUrl ?? "",
          textRewritten: event.textRewritten,
        }}
        labels={{
          basics: tt("Κείμενο", "Text"),
          greek: tt("Ελληνικά", "Greek"),
          english: tt("Αγγλικά", "English"),
          englishHint: tt(
            "Αν η αγγλική στήλη μείνει κενή, η αγγλική σελίδα δείχνει το ελληνικό κείμενο.",
            "If the English column is left empty, the English page shows the Greek text.",
          ),
          name: tt("Τίτλος", "Title"),
          summary: tt("Σύντομη περιγραφή", "Short summary"),
          description: tt("Περιγραφή", "Description"),
          when: tt("Πότε και πού", "When and where"),
          starts: tt("Έναρξη", "Starts"),
          ends: tt("Λήξη", "Ends"),
          endsHint: tt(
            "Προαιρετικό. Ώρα Ελλάδας.",
            "Optional. Greek local time.",
          ),
          venue: tt("Χώρος", "Venue"),
          price: tt("Εισιτήριο", "Ticket"),
          priceHint: tt(
            "Γράψε μόνο ό,τι ισχύει σίγουρα — π.χ. «Είσοδος ελεύθερη» ή «12€». Άφησέ το κενό αν δεν το ξέρεις.",
            "Write only what you know for certain — e.g. \"Free entry\" or \"€12\". Leave blank if unsure.",
          ),
          contact: tt("Επικοινωνία", "Contact"),
          phone: tt("Τηλέφωνο", "Phone"),
          email: "Email",
          website: tt("Ιστοσελίδα", "Website"),
          bookingUrl: tt("Σύνδεσμος εισιτηρίων", "Ticket link"),
          indexTitle: tt("Ευρετηρίαση (μόνο διαχειριστής)", "Indexing (admin only)"),
          indexLabel: tt(
            "Το κείμενο είναι δικό μας, όχι της πηγής",
            "The text is ours, not the source's",
          ),
          indexHint: tt(
            "Όσο μένει ξεμαρκάριστο, η εκδήλωση φαίνεται κανονικά στους επισκέπτες αλλά μένει εκτός sitemap και με noindex — για να μη δημοσιεύουμε αντιγραμμένο κείμενο.",
            "While unchecked the event shows to visitors but stays out of the sitemap and noindex — so we never publish copied text.",
          ),
          save: tt("Αποθήκευση", "Save"),
          saved: tt("Αποθηκεύτηκε.", "Saved."),
          forbidden: tt("Δεν έχεις δικαίωμα.", "You don't have permission."),
          invalid: tt(
            "Ο τίτλος, η σύντομη περιγραφή, ο χώρος και η ώρα έναρξης είναι υποχρεωτικά.",
            "Title, summary, venue and start time are required.",
          ),
          invalidEnd: tt(
            "Η λήξη πρέπει να είναι μετά την έναρξη.",
            "The end time must be after the start time.",
          ),
          error: tt("Κάτι πήγε στραβά.", "Something went wrong."),
        }}
      />
    </Container>
  );
}
