"use server";

import { revalidatePath } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { previewSources } from "@/lib/events/ingest";
import { toEventData } from "@/lib/events/normalize";
import type { ExternalEvent, SourceConfig } from "@/lib/events/types";

function cfgFromForm(formData: FormData): SourceConfig {
  const kind = String(formData.get("kind") || "ical") as SourceConfig["kind"];
  return {
    kind,
    url: (formData.get("url") as string) || undefined,
    token: (formData.get("token") as string) || undefined,
    label: (formData.get("label") as string) || undefined,
  };
}

async function requireAdmin(): Promise<boolean> {
  const u = await getCurrentUser();
  return u?.role === "ADMIN";
}

export type PreviewResult =
  | { ok: true; events: ExternalEvent[] }
  | { ok: false; error: "auth" | "fetch" };

/** Fetch + parse a source and return the events, without saving. Admin only. */
export async function previewImport(formData: FormData): Promise<PreviewResult> {
  if (!(await requireAdmin())) return { ok: false, error: "auth" };
  try {
    const events = (await previewSources([cfgFromForm(formData)])).slice(0, 100);
    return { ok: true, events };
  } catch {
    return { ok: false, error: "fetch" };
  }
}

export type ImportResult =
  | { ok: true; imported: number }
  | { ok: false; error: "auth" | "db" | "fetch" };

/**
 * Fetch a source and upsert its events into the DB as PENDING (deduped by
 * externalId). Admin only; requires the database.
 */
export async function runImport(formData: FormData): Promise<ImportResult> {
  if (!(await requireAdmin())) return { ok: false, error: "auth" };
  if (!isDbConfigured) return { ok: false, error: "db" };
  try {
    const events = await previewSources([cfgFromForm(formData)]);
    let imported = 0;
    for (const e of events) {
      const data = toEventData(e);
      const existing = await prisma.eventItem.findUnique({
        where: { externalId: data.externalId },
        select: { id: true, textRewritten: true },
      });
      if (!existing) {
        await prisma.eventItem.create({ data: data as never });
      } else if (!existing.textRewritten) {
        // Refresh what the feed owns (a corrected date, a venue added later);
        // once an editor has rewritten the row the importer leaves it alone,
        // so moderation is never overwritten on re-import.
        await prisma.eventItem.update({
          where: { id: existing.id },
          data: {
            sourceUrl: data.sourceUrl,
            startsAt: data.startsAt,
            endsAt: data.endsAt,
            timeKnown: data.timeKnown,
            venue: data.venue as never,
          },
        });
      } else {
        await prisma.eventItem.update({
          where: { id: existing.id },
          data: { sourceUrl: data.sourceUrl },
        });
      }
      imported++;
    }
    revalidatePath("/admin");
    return { ok: true, imported };
  } catch {
    return { ok: false, error: "fetch" };
  }
}
