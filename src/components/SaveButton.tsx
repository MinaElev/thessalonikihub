"use client";

import { useActionState } from "react";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { toggleSaved, type SaveState } from "@/app/actions/saved";

const initial: SaveState = { status: "idle" };

export interface SaveLabels {
  save: string;
  saved: string;
  removed: string;
  signIn: string;
  error: string;
}

/**
 * "Save to my trip" toggle.
 *
 * `initiallySaved` is resolved on the server, so the button shows the right
 * state on first paint for a signed-in visitor rather than flashing.
 */
export function SaveButton({
  kind,
  slug,
  path,
  label,
  initiallySaved,
  labels,
  loginHref,
}: {
  kind: "place" | "event" | "route" | "dish" | "festival";
  slug: string;
  path: string;
  label: string;
  initiallySaved: boolean;
  labels: SaveLabels;
  loginHref: string;
}) {
  const [state, formAction, pending] = useActionState(toggleSaved, initial);

  const isSaved =
    state.status === "saved"
      ? true
      : state.status === "removed"
        ? false
        : initiallySaved;

  if (state.status === "unauthenticated") {
    return (
      <a
        href={loginHref}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
      >
        <Bookmark className="h-4 w-4" /> {labels.signIn}
      </a>
    );
  }

  return (
    <form action={formAction} className="inline">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="path" value={path} />
      <input type="hidden" name="label" value={label} />
      <button
        type="submit"
        disabled={pending}
        aria-pressed={isSaved}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${
          isSaved
            ? "border-brand-300 bg-brand-50 text-brand-700"
            : "border-slate-200 text-slate-700 hover:border-brand-300 hover:text-brand-700"
        }`}
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isSaved ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
        {isSaved ? labels.saved : labels.save}
      </button>
      {state.status === "error" ? (
        <span className="ml-2 text-xs text-accent-700">{labels.error}</span>
      ) : null}
    </form>
  );
}
