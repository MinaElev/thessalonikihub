"use client";

import { useActionState, useRef } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { Upload, Loader2, X, AlertCircle } from "lucide-react";
import {
  uploadListingPhoto,
  deleteListingPhoto,
  type PhotoState,
} from "@/app/actions/photos";
import type { Photo } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";

export interface PhotoLabels {
  title: string;
  hint: string;
  choose: string;
  uploading: string;
  remove: string;
  empty: string;
  errorAuth: string;
  errorType: string;
  errorSize: string;
  errorLimit: string;
  errorStorage: string;
  errorGeneric: string;
}

function UploadButton({ idle, busy }: { idle: string; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white ${
        pending ? "bg-brand-400" : "bg-brand-600 hover:bg-brand-700"
      }`}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
      {pending ? busy : idle}
    </span>
  );
}

/**
 * Uploading photographs of a listing.
 *
 * The file input submits the form as soon as a file is chosen — an owner who
 * has picked a picture has already decided; making them press a second button
 * is a step that only loses people. The button is a label wrapping the hidden
 * input, so it stays keyboard-reachable.
 */
export function PhotoUploader({
  kind,
  slug,
  initial,
  locale,
  labels,
}: {
  kind: string;
  slug: string;
  initial: Photo[];
  locale: Locale;
  labels: PhotoLabels;
}) {
  const [state, upload] = useActionState<PhotoState, FormData>(uploadListingPhoto, {
    status: "idle",
  });
  const [removeState, remove] = useActionState<PhotoState, FormData>(deleteListingPhoto, {
    status: "idle",
  });
  const formRef = useRef<HTMLFormElement>(null);

  // Whichever action ran last is the current truth; before either, the server's.
  const photos = removeState.photos ?? state.photos ?? initial;
  const error = state.error ?? removeState.error;

  const message =
    error === "auth"
      ? labels.errorAuth
      : error === "type"
        ? labels.errorType
        : error === "size"
          ? labels.errorSize
          : error === "limit"
            ? labels.errorLimit
            : error === "storage"
              ? labels.errorStorage
              : error
                ? labels.errorGeneric
                : null;

  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-bold">{labels.title}</legend>
      <p className="text-sm text-muted">{labels.hint}</p>

      {photos.length ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((photo) => (
            <li key={photo.url} className="group relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={photo.url}
                  alt={pick(photo.alt, locale)}
                  fill
                  sizes="(max-width: 640px) 50vw, 200px"
                  className="object-cover"
                />
              </div>
              <form action={remove}>
                <input type="hidden" name="kind" value={kind} />
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="url" value={photo.url} />
                <button
                  className="absolute right-1.5 top-1.5 rounded-full bg-white/90 p-1.5 text-slate-600 shadow-sm transition hover:bg-white hover:text-rose-600"
                  aria-label={labels.remove}
                  title={labels.remove}
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-muted">
          {labels.empty}
        </p>
      )}

      <form action={upload} ref={formRef}>
        <input type="hidden" name="kind" value={kind} />
        <input type="hidden" name="slug" value={slug} />
        <label className="inline-block cursor-pointer">
          <input
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif"
            className="sr-only"
            onChange={(e) => {
              if (e.target.files?.length) formRef.current?.requestSubmit();
            }}
          />
          <UploadButton idle={labels.choose} busy={labels.uploading} />
        </label>
      </form>

      {message ? (
        <p className="flex items-center gap-2 text-sm text-accent-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {message}
        </p>
      ) : null}
    </fieldset>
  );
}
