import Link from "next/link";

/**
 * 404 inside /auth/*. That segment sits outside [locale] with its own root
 * layout, so it needs its own not-found; a top-level src/app/not-found.tsx
 * cannot work here, because this app deliberately has no single root layout
 * (each segment renders its own <html>).
 */
export default function AuthNotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="text-6xl font-extrabold text-brand-600">404</p>
        <h1 className="mt-4 text-2xl font-bold">Αυτός ο σύνδεσμος δεν ισχύει</h1>
        <p className="mt-3 text-slate-500">
          Ο σύνδεσμος σύνδεσης μπορεί να έχει λήξει ή να χρησιμοποιήθηκε ήδη.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/login"
            className="rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700"
          >
            Σύνδεση
          </Link>
          <Link
            href="/"
            className="rounded-full border border-slate-200 px-5 py-2.5 font-semibold transition hover:border-brand-300 hover:text-brand-700"
          >
            Αρχική
          </Link>
        </div>
      </div>
    </main>
  );
}
