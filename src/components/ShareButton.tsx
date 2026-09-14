"use client";

import { useEffect, useRef, useState } from "react";
import {
  Share2,
  Link2,
  Check,
  Mail,
  Facebook,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import { track } from "@/lib/track";

export interface ShareLabels {
  share: string;
  copy: string;
  copied: string;
  whatsapp: string;
  viber: string;
  facebook: string;
  email: string;
}

/**
 * "Pass this on" — one button, no third-party anything.
 *
 * Every social share widget on the market (AddThis, ShareThis, the Facebook
 * SDK) is a tracking script that loads on every page and follows the reader
 * around. None of them are here: the network share sheets below are plain
 * links to documented URLs, so the visitor's browser contacts Facebook only if
 * they choose Facebook.
 *
 * On a phone the first tap opens the operating system's own share sheet, which
 * already lists the apps that person actually uses — in Greece usually Viber
 * and Messenger, which no hand-built row of buttons would have guessed right.
 * The menu below is the desktop fallback, where no such sheet exists.
 */
export function ShareButton({
  url,
  title,
  kind,
  slug,
  labels,
  className = "",
}: {
  /** Absolute, canonical URL — built on the server so no query string rides along. */
  url: string;
  title: string;
  /** Listing pillar and slug when this is a listing, so the share is counted. */
  kind?: string;
  slug?: string;
  labels: ShareLabels;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  function count() {
    if (kind && slug) track(kind, slug, "share");
  }

  // Closing on an outside click or Escape is what a menu is expected to do;
  // the listeners exist only while it is open.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function onShare() {
    // Checked at click time rather than on mount: the server and the first
    // client render then agree, so there is nothing to hydrate around.
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url });
        count();
        return;
      } catch (e) {
        // Dismissing the sheet is an AbortError and means "no thanks" — not a
        // reason to then push a menu in front of them.
        if (e instanceof DOMException && e.name === "AbortError") return;
      }
    }
    setOpen((v) => !v);
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      count();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused. The field below is selectable, so
      // there is still a way through.
      boxRef.current?.querySelector("input")?.select();
    }
  }

  const text = `${title} ${url}`;

  return (
    <div ref={boxRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={onShare}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
      >
        <Share2 className="h-4 w-4" />
        {labels.share}
      </button>

      {open ? (
        <div
          role="menu"
          // Anchored to the button's left edge: the button sits near the
          // start of its line on most pages, and right-anchoring pushed the
          // menu off the left of the screen there. max-w keeps it inside the
          // viewport when the button is far enough right on a phone.
          className="absolute left-0 z-30 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={onCopy}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {copied ? (
              <Check className="h-4 w-4 text-brand-600" />
            ) : (
              <Link2 className="h-4 w-4 text-slate-400" />
            )}
            {copied ? labels.copied : labels.copy}
          </button>

          <ShareLink
            href={`https://wa.me/?text=${encodeURIComponent(text)}`}
            icon={<MessageCircle className="h-4 w-4 text-slate-400" />}
            label={labels.whatsapp}
            onClick={count}
          />
          <ShareLink
            href={`viber://forward?text=${encodeURIComponent(text)}`}
            icon={<MessageSquare className="h-4 w-4 text-slate-400" />}
            label={labels.viber}
            onClick={count}
          />
          <ShareLink
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            icon={<Facebook className="h-4 w-4 text-slate-400" />}
            label={labels.facebook}
            onClick={count}
          />
          <ShareLink
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text)}`}
            icon={<Mail className="h-4 w-4 text-slate-400" />}
            label={labels.email}
            onClick={count}
          />

          <input
            readOnly
            value={url}
            onFocus={(e) => e.currentTarget.select()}
            aria-label={labels.copy}
            className="mt-1 w-full truncate rounded-xl bg-slate-50 px-3 py-2 text-xs text-muted"
          />
        </div>
      ) : null}
    </div>
  );
}

function ShareLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      role="menuitem"
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
    >
      {icon}
      {label}
    </a>
  );
}
