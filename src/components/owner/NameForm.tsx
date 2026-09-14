"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Loader2, Pencil } from "lucide-react";
import { setMyName, type NameState } from "@/app/actions/account";

/**
 * Lets someone put a name to their account.
 *
 * Registration never wrote one — Profile.name came from Supabase user
 * metadata our own flow does not set — so every screen addressed people by
 * email address. Folded away behind the email so it stays out of the way of
 * anyone who does not care.
 */
function Save({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
      {label}
    </button>
  );
}

export function NameForm({
  current,
  labels,
}: {
  current: string | null;
  labels: { edit: string; placeholder: string; save: string; saved: string; hint: string };
}) {
  const [state, action] = useActionState<NameState, FormData>(setMyName, { status: "idle" });

  return (
    <details className="mt-1">
      <summary className="inline-flex cursor-pointer items-center gap-1 text-xs text-muted hover:text-brand-700">
        <Pencil className="h-3 w-3" />
        {current ? current : labels.edit}
      </summary>
      <form action={action} className="mt-2 flex flex-wrap items-center gap-2">
        <input
          name="name"
          defaultValue={current ?? ""}
          maxLength={80}
          placeholder={labels.placeholder}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <Save label={labels.save} />
        {state.status === "saved" ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-700">
            <Check className="h-3.5 w-3.5" /> {labels.saved}
          </span>
        ) : null}
      </form>
      <p className="mt-1 text-xs text-muted">{labels.hint}</p>
    </details>
  );
}
