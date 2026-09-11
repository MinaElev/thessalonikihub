"use client";

import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { centroidFor } from "@/lib/area-centroids";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import {
  listingSchema,
  type ListingInput,
  type SubmitCategory,
  getCategory,
} from "@/lib/submit-schema";
import { submitListing } from "@/app/actions/submit";
import { areas } from "@/content/data/areas";
import { amenityGroups, serviceTypeLabel } from "@/content/data/amenities";

const T = (locale: Locale, el: string, en: string) => (locale === "el" ? el : en);

function Field({
  label,
  error,
  children,
  required,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label} {required ? <span className="text-accent-600">*</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs text-accent-600">{error}</span> : null}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

// Leaflet needs the browser — load the picker with SSR disabled.
const LocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-64 rounded-xl border border-slate-200 bg-slate-50" />
  ),
});

export function ListingForm({
  category,
  locale,
}: {
  category: SubmitCategory;
  locale: Locale;
}) {
  const config = getCategory(category)!;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ListingInput>({
    resolver: zodResolver(listingSchema),
    defaultValues: { category, currency: "EUR" },
  });
  const watchedArea = watch("area");
  const lat = watch("lat");
  const lng = watch("lng");
  const center = centroidFor(watchedArea || undefined);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<null | { ok: boolean; error?: string }>(null);
  const [missing, setMissing] = useState(0);

  const onSubmit = (data: ListingInput) => {
    setMissing(0);
    startTransition(async () => {
      const res = await submitListing(data);
      setResult(res.ok ? { ok: true } : { ok: false, error: res.error });
      // A long form scrolled well past the top by now; the outcome is up there.
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  /**
   * The form runs to forty fields for an apartment, so a missing required one
   * is usually off-screen when Submit is pressed. Left to itself the page did
   * nothing visible and the button looked broken — say how many, and go to the
   * first one.
   */
  const onInvalid = (formErrors: Record<string, unknown>) => {
    const names = Object.keys(formErrors);
    setMissing(names.length);
    const field = document.querySelector<HTMLElement>(`[name="${names[0]}"]`);
    if (!field) return;
    field.scrollIntoView({ behavior: "smooth", block: "center" });
    // Focusing would scroll again and fight the smooth scroll above.
    window.setTimeout(() => field.focus({ preventScroll: true }), 400);
  };

  if (result?.ok) {
    return (
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-600" />
        <h2 className="mt-3 text-xl font-bold">
          {T(locale, "Η καταχώρηση υποβλήθηκε!", "Your listing was submitted!")}
        </h2>
        <p className="mt-2 text-muted">
          {T(
            locale,
            "Θα ελεγχθεί από την ομάδα μας και θα δημοσιευθεί μόλις εγκριθεί.",
            "It will be reviewed by our team and published once approved.",
          )}
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          {T(
            locale,
            "Στον πίνακά σου βλέπεις την πορεία της και μπορείς να συμπληρώσεις ωράριο, επικοινωνία και προσφορές όποτε θέλεις.",
            "Your dashboard shows its progress, and lets you add opening hours, contact details and offers whenever you like.",
          )}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-block rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
          >
            {T(locale, "Οι καταχωρήσεις μου", "My listings")}
          </Link>
          <Link
            href="/submit"
            className="inline-block rounded-full border border-slate-200 bg-white px-5 py-2.5 font-semibold hover:border-brand-300 hover:text-brand-700"
          >
            {T(locale, "Νέα καταχώρηση", "Add another")}
          </Link>
        </div>
      </div>
    );
  }

  const sec = config.sections;

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-8" noValidate>
      {missing > 0 ? (
        <p className="flex items-center gap-2 rounded-xl border border-accent-200 bg-accent-50 p-4 text-sm font-medium text-accent-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {missing === 1
            ? T(locale, "Λείπει ένα υποχρεωτικό πεδίο.", "One required field is missing.")
            : T(
                locale,
                `Λείπουν ${missing} υποχρεωτικά πεδία.`,
                `${missing} required fields are missing.`,
              )}
        </p>
      ) : null}

      {result && !result.ok ? (
        <div className="rounded-xl border border-accent-200 bg-accent-50 p-4 text-sm text-accent-800">
          {result.error === "db"
            ? T(
                locale,
                "Η βάση δεδομένων δεν έχει συνδεθεί ακόμη (Supabase). Η υποβολή θα ενεργοποιηθεί μόλις συνδεθεί.",
                "The database isn't connected yet (Supabase). Submissions activate once connected.",
              )
            : result.error === "auth"
              ? T(locale, "Πρέπει να συνδεθείτε.", "You need to sign in.")
              : T(locale, "Κάτι πήγε στραβά. Δοκιμάστε ξανά.", "Something went wrong. Please try again.")}
        </div>
      ) : null}

      {/* Basics */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-bold">{T(locale, "Βασικά στοιχεία", "Basics")}</legend>
        {/* Greek only. The English version is written by an editor before the
            listing is approved, so submitters aren't asked to translate. */}
        <Field label={T(locale, "Όνομα", "Name")} required error={errors.nameEl?.message}>
          <input className={inputCls} {...register("nameEl")} />
        </Field>
        <Field label={T(locale, "Σύντομη περιγραφή", "Short summary")} required error={errors.summaryEl?.message}>
          <input className={inputCls} {...register("summaryEl")} />
        </Field>
        <Field label={T(locale, "Περιγραφή", "Description")} required error={errors.descriptionEl?.message}>
          <textarea rows={5} className={inputCls} {...register("descriptionEl")} />
        </Field>
        <p className="rounded-xl bg-slate-50 p-3 text-xs text-muted">
          {T(
            locale,
            "Γράψε στα ελληνικά. Την αγγλική απόδοση τη συμπληρώνει η ομάδα μας πριν τη δημοσίευση.",
            "Write in Greek. Our team adds the English version before publishing.",
          )}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={T(locale, "Κατηγορία/είδος", "Type")} error={errors.type?.message}>
            <input className={inputCls} placeholder={T(locale, "π.χ. διαμέρισμα, brunch", "e.g. apartment, brunch")} {...register("type")} />
          </Field>
          <Field label={T(locale, "Περιοχή", "Area")} error={errors.area?.message}>
            <select className={inputCls} {...register("area")}>
              <option value="">—</option>
              {areas.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {pick(a.name, locale)}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label={T(locale, "Διεύθυνση", "Address")} error={errors.address?.message}>
          <input className={inputCls} {...register("address")} />
        </Field>
        <Field label={T(locale, "Ετικέτες (χωρισμένες με κόμμα)", "Tags (comma-separated)")} error={errors.tagsCsv?.message}>
          <input className={inputCls} placeholder="couples, sea-view, central" {...register("tagsCsv")} />
        </Field>
      </fieldset>

      {/* Location on map */}
      <fieldset className="space-y-3">
        <legend className="text-lg font-bold">{T(locale, "Τοποθεσία στον χάρτη", "Map location")}</legend>
        <p className="text-sm text-muted">
          {T(
            locale,
            "Πάτησε στον χάρτη ή σύρε την πινέζα στο ακριβές σημείο.",
            "Click on the map or drag the pin to the exact spot.",
          )}
        </p>
        <LocationPicker
          center={[center.lat, center.lng]}
          value={typeof lat === "number" && typeof lng === "number" ? { lat, lng } : null}
          onChange={(la, ln) => {
            setValue("lat", la, { shouldValidate: false });
            setValue("lng", ln, { shouldValidate: false });
          }}
        />
        {typeof lat === "number" && typeof lng === "number" ? (
          <p className="text-xs text-muted">📍 {lat.toFixed(5)}, {lng.toFixed(5)}</p>
        ) : null}
      </fieldset>

      {/* Contact */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-bold">{T(locale, "Επικοινωνία", "Contact")}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={T(locale, "Τηλέφωνο", "Phone")} error={errors.phone?.message}>
            <input className={inputCls} {...register("phone")} />
          </Field>
          <Field label="WhatsApp" error={errors.whatsapp?.message}>
            <input className={inputCls} {...register("whatsapp")} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input className={inputCls} type="email" {...register("email")} />
          </Field>
          <Field label="Website" error={errors.website?.message}>
            <input className={inputCls} placeholder="https://" {...register("website")} />
          </Field>
          <Field label={T(locale, "Σύνδεσμος κράτησης", "Booking link")} error={errors.bookingUrl?.message}>
            <input className={inputCls} placeholder="https://" {...register("bookingUrl")} />
          </Field>
        </div>
      </fieldset>

      {/* Photos */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-bold">{T(locale, "Φωτογραφίες", "Photos")}</legend>
        <Field
          label={T(locale, "Σύνδεσμοι φωτογραφιών (ένας ανά γραμμή)", "Photo URLs (one per line)")}
          error={errors.photoUrls?.message}
        >
          <textarea rows={3} className={inputCls} placeholder="https://…" {...register("photoUrls")} />
        </Field>
        <p className="text-xs text-muted">
          {T(
            locale,
            "Το απευθείας ανέβασμα αρχείων θα ενεργοποιηθεί με τη σύνδεση του Supabase Storage.",
            "Direct file upload activates once Supabase Storage is connected.",
          )}
        </p>
      </fieldset>

      {/* Price range (eat/drink/experiences) */}
      {sec.priceRange ? (
        <Field label={T(locale, "Επίπεδο τιμής", "Price level")} error={errors.priceRange?.message}>
          <select className={inputCls} {...register("priceRange")}>
            <option value="">—</option>
            <option value="1">€</option>
            <option value="2">€€</option>
            <option value="3">€€€</option>
            <option value="4">€€€€</option>
          </select>
        </Field>
      ) : null}

      {/* Amenities */}
      {sec.amenities ? (
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold">{T(locale, "Παροχές", "Amenities")}</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            {amenityGroups.map((g) => (
              <div key={g.key}>
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-400">
                  {pick(g.label, locale)}
                </p>
                <div className="space-y-1.5">
                  {g.amenities.map((a) => (
                    <label key={a.key} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" value={a.key} {...register("amenities")} />
                      {pick(a.label, locale)}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      ) : null}

      {/* Stay */}
      {sec.stay ? (
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold">{T(locale, "Στοιχεία καταλύματος", "Accommodation details")}</legend>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={T(locale, "Τύπος", "Property type")} required error={errors.propertyType?.message}>
              <select className={inputCls} {...register("propertyType")}>
                <option value="">—</option>
                {["apartment", "studio", "villa", "maisonette", "house", "loft", "guesthouse"].map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </Field>
            <Field label={T(locale, "Άτομα", "Max guests")}><input type="number" className={inputCls} {...register("maxGuests")} /></Field>
            <Field label={T(locale, "Υπνοδωμάτια", "Bedrooms")}><input type="number" className={inputCls} {...register("bedrooms")} /></Field>
            <Field label={T(locale, "Κρεβάτια", "Beds")}><input type="number" className={inputCls} {...register("beds")} /></Field>
            <Field label={T(locale, "Μπάνια", "Bathrooms")}><input type="number" className={inputCls} {...register("bathrooms")} /></Field>
            <Field label={T(locale, "Τετραγωνικά (m²)", "Size (m²)")}><input type="number" className={inputCls} {...register("sizeSqm")} /></Field>
            <Field label={T(locale, "Τιμή από (€/βράδυ)", "Price from (€/night)")}><input type="number" className={inputCls} {...register("stayPriceFrom")} /></Field>
            <Field label={T(locale, "Ελάχιστες διαν/σεις", "Min nights")}><input type="number" className={inputCls} {...register("minNights")} /></Field>
            <Field label="Check-in"><input className={inputCls} placeholder="15:00" {...register("checkIn")} /></Field>
            <Field label="Check-out"><input className={inputCls} placeholder="11:00" {...register("checkOut")} /></Field>
            <Field label={T(locale, "Ακύρωση", "Cancellation")}>
              <select className={inputCls} {...register("cancellation")}>
                <option value="">—</option>
                <option value="flexible">{T(locale, "Ευέλικτη", "Flexible")}</option>
                <option value="moderate">{T(locale, "Μέτρια", "Moderate")}</option>
                <option value="strict">{T(locale, "Αυστηρή", "Strict")}</option>
              </select>
            </Field>
            <Field label={T(locale, "Πάρκινγκ", "Parking")}>
              <select className={inputCls} {...register("parking")}>
                <option value="">—</option>
                <option value="none">{T(locale, "Όχι", "None")}</option>
                <option value="free-onsite">{T(locale, "Δωρεάν", "Free on site")}</option>
                <option value="paid-onsite">{T(locale, "Επί πληρωμή", "Paid on site")}</option>
                <option value="street">{T(locale, "Στον δρόμο", "Street")}</option>
                <option value="nearby">{T(locale, "Πλησίον", "Nearby")}</option>
              </select>
            </Field>
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("petsAllowed")} /> {T(locale, "Δεκτά κατοικίδια", "Pets allowed")}</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("smokingAllowed")} /> {T(locale, "Επιτρέπεται κάπνισμα", "Smoking allowed")}</label>
          </div>
          <Field label={T(locale, "Γλώσσες (κόμμα)", "Languages (comma)")}><input className={inputCls} placeholder="el, en" {...register("languagesCsv")} /></Field>
        </fieldset>
      ) : null}

      {/* Service */}
      {sec.service ? (
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold">{T(locale, "Στοιχεία υπηρεσίας", "Service details")}</legend>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={T(locale, "Τύπος υπηρεσίας", "Service type")} required error={errors.serviceType?.message}>
              <select className={inputCls} {...register("serviceType")}>
                <option value="">—</option>
                {["transfer", "taxi", "car-rental", "cleaning", "plumber", "electrician", "photographer", "tour-guide", "babysitting", "laundry", "beauty", "other"].map((k) => (
                  <option key={k} value={k}>{pick(serviceTypeLabel(k), locale)}</option>
                ))}
              </select>
            </Field>
            <Field label={T(locale, "Μοντέλο τιμής", "Price model")}>
              <select className={inputCls} {...register("priceModel")}>
                <option value="">—</option>
                <option value="fixed">{T(locale, "Σταθερή", "Fixed")}</option>
                <option value="per-trip">{T(locale, "Ανά διαδρομή", "Per trip")}</option>
                <option value="per-hour">{T(locale, "Ανά ώρα", "Per hour")}</option>
                <option value="per-day">{T(locale, "Ανά ημέρα", "Per day")}</option>
                <option value="per-person">{T(locale, "Ανά άτομο", "Per person")}</option>
                <option value="quote">{T(locale, "Κατόπιν προσφοράς", "On request")}</option>
              </select>
            </Field>
            <Field label={T(locale, "Τιμή από (€)", "Price from (€)")}><input type="number" className={inputCls} {...register("servicePriceFrom")} /></Field>
            <Field label={T(locale, "Χωρητικότητα (επιβάτες)", "Capacity (passengers)")}><input type="number" className={inputCls} {...register("capacityPassengers")} /></Field>
            <Field label={T(locale, "Διαθεσιμότητα", "Availability")}><input className={inputCls} placeholder="24/7" {...register("availabilityEl")} /></Field>
            <Field label={T(locale, "Γλώσσες (κόμμα)", "Languages (comma)")}><input className={inputCls} placeholder="el, en" {...register("languagesCsv")} /></Field>
          </div>
          <Field label={T(locale, "Περιοχές κάλυψης (κόμμα)", "Coverage areas (comma)")}><input className={inputCls} placeholder="airport, center" {...register("coverageCsv")} /></Field>
        </fieldset>
      ) : null}

      {/* Event */}
      {sec.event ? (
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold">{T(locale, "Στοιχεία event", "Event details")}</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={T(locale, "Έναρξη", "Starts at")} required error={errors.startsAt?.message}>
              <input type="datetime-local" className={inputCls} {...register("startsAt")} />
            </Field>
            <Field label={T(locale, "Λήξη", "Ends at")}>
              <input type="datetime-local" className={inputCls} {...register("endsAt")} />
            </Field>
            <Field label={T(locale, "Χώρος", "Venue")} required error={errors.venueEl?.message}>
              <input className={inputCls} {...register("venueEl")} />
            </Field>
            <Field label={T(locale, "Τιμή/εισιτήριο", "Price info")}>
              <input className={inputCls} {...register("priceInfoEl")} />
            </Field>
          </div>
        </fieldset>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 font-semibold text-white transition hover:bg-accent-700 disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        {T(locale, "Υποβολή για έγκριση", "Submit for review")}
      </button>
    </form>
  );
}
