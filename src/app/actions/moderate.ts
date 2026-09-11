"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { sendMail } from "@/lib/email";
import { listingApproved, listingRejected } from "@/lib/email-templates";
import { site } from "@/lib/site";
import { pick } from "@/lib/types";
import type { Localized } from "@/lib/types";

async function isAdmin(): Promise<boolean> {
  const u = await getCurrentUser();
  return u?.role === "ADMIN";
}

/** Approve a submission (admin only). Reads `kind` + `id` from the form. */
export async function approveListing(formData: FormData) {
  if (!isDbConfigured || !(await isAdmin())) return;
  const kind = String(formData.get("kind"));
  const id = String(formData.get("id"));

  // Rebuild the pages the listing has just appeared on, not only the queue.
  // Without this the moderator approves something and it stays invisible
  // until the next ISR window, which reads as the button not having worked.
  let notify: { email: string; name: string; path: string } | null = null;

  if (kind === "event") {
    const row = await prisma.eventItem.update({
      where: { id },
      data: { status: "PUBLISHED" },
      select: { slug: true, name: true, owner: { select: { email: true } } },
    });
    revalidatePath("/events");
    revalidatePath(`/events/${row.slug}`);
    if (row.owner?.email) {
      notify = {
        email: row.owner.email,
        name: pick(row.name as Localized<string>, "el"),
        path: `/events/${row.slug}`,
      };
    }
  } else {
    const row = await prisma.place.update({
      where: { id },
      data: { status: "PUBLISHED" },
      select: { slug: true, kind: true, name: true, owner: { select: { email: true } } },
    });
    const pillar = row.kind.toLowerCase();
    revalidatePath(`/${pillar}`);
    revalidatePath(`/${pillar}/${row.slug}`);
    if (row.owner?.email) {
      notify = {
        email: row.owner.email,
        name: pick(row.name as Localized<string>, "el"),
        path: `/${pillar}/${row.slug}`,
      };
    }
  }

  // Awaited, but sendMail swallows its own failures: a mail server being down
  // must never undo a publication that has already happened.
  if (notify) {
    await sendMail(
      listingApproved(notify.email, notify.name, `${site.url}${notify.path}`),
    );
  }
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
  revalidatePath("/dashboard");
}

/** Reject a submission (admin only). */
export async function rejectListing(formData: FormData) {
  if (!isDbConfigured || !(await isAdmin())) return;
  const kind = String(formData.get("kind"));
  const id = String(formData.get("id"));
  const note = formData.get("note") ? String(formData.get("note")) : null;
  const row =
    kind === "event"
      ? await prisma.eventItem.update({
          where: { id },
          data: { status: "REJECTED", rejectionNote: note },
          select: { name: true, owner: { select: { email: true } } },
        })
      : await prisma.place.update({
          where: { id },
          data: { status: "REJECTED", rejectionNote: note },
          select: { name: true, owner: { select: { email: true } } },
        });

  // A rejection the owner never hears about is the same as silence, and the
  // reason is the whole point of collecting it.
  if (row.owner?.email) {
    await sendMail(
      listingRejected(row.owner.email, pick(row.name as Localized<string>, "el"), note),
    );
  }
  revalidatePath("/admin");
  revalidatePath("/dashboard");
}

/** Sign the current user out. */
export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}
