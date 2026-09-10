"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { RotateCcw, Home } from "lucide-react";

/**
 * Route-level error boundary.
 *
 * Client components in this project take their copy as props or pick it with a
 * locale helper — `useTranslations` is not used here — so the language comes
 * from the path, which is all that is available inside an error boundary.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const el = !pathname.startsWith("/en");
  const T = (gr: string, en: string) => (el ? gr : en);

  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">
        {T("Κάτι πήγε στραβά", "Something went wrong")}
      </h1>
      <p className="mt-3 text-slate-500">
        {T(
          "Παρουσιάστηκε πρόβλημα στη φόρτωση της σελίδας. Δοκίμασε ξανά — αν συνεχίσει, γύρνα στην αρχική.",
          "The page failed to load. Try again — if it keeps happening, head back to the homepage.",
        )}
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700"
        >
          <RotateCcw className="h-4 w-4" /> {T("Δοκίμασε ξανά", "Try again")}
        </button>
        <a
          href={el ? "/" : "/en"}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 font-semibold transition hover:border-brand-300 hover:text-brand-700"
        >
          <Home className="h-4 w-4" /> {T("Αρχική", "Home")}
        </a>
      </div>
    </div>
  );
}
