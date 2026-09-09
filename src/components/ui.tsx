import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  action,
}: {
  kicker?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {kicker ? (
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-brand-600">
            {kicker}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "accent" | "neutral";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tone === "brand" && "bg-brand-50 text-brand-700",
        tone === "accent" && "bg-accent-100 text-accent-700",
        tone === "neutral" && "bg-slate-100 text-slate-600",
      )}
    >
      {children}
    </span>
  );
}
