"use server";

import { revalidatePath } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const ROLES = new Set(["USER", "OWNER", "ADMIN"]);

/**
 * Change someone's role.
 *
 * Until now this needed `scripts/set-role.mjs` and a terminal with the database
 * password in it, which is a poor way to run a site.
 */
export async function setUserRole(formData: FormData) {
  if (!isDbConfigured) return;
  const me = await getCurrentUser();
  if (!me || me.role !== "ADMIN") return;

  const id = String(formData.get("id") ?? "");
  const role = String(formData.get("role") ?? "");
  if (!id || !ROLES.has(role)) return;

  // Demoting yourself would leave nobody able to reach /admin if you are the
  // only admin, and there is no way back in from the UI.
  if (id === me.id && role !== "ADMIN") return;

  await prisma.profile.update({ where: { id }, data: { role: role as never } });
  revalidatePath("/admin/people");
}

/**
 * Remove a newsletter address.
 *
 * A hard delete, not an unsubscribe flag: this is the button to press when
 * someone exercises their right to erasure, and a tombstone row would not
 * honour that.
 */
export async function deleteSubscriber(formData: FormData) {
  if (!isDbConfigured) return;
  const me = await getCurrentUser();
  if (!me || me.role !== "ADMIN") return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.subscriber.delete({ where: { id } }).catch(() => {});
  revalidatePath("/admin/people");
}

export interface TestMailState {
  status: "idle" | "sent" | "unconfigured" | "failed";
  detail?: string;
}

/**
 * Send a test message to the signed-in admin's own address.
 *
 * Deliberately only to themselves: a test that could be pointed at an
 * arbitrary address is a way to send mail from this domain to strangers.
 */
export async function sendTestEmail(
  _prev: TestMailState,
  _formData: FormData,
): Promise<TestMailState> {
  const me = await getCurrentUser();
  if (!me || me.role !== "ADMIN") return { status: "failed", detail: "forbidden" };

  const { sendMailResult, isMailConfigured } = await import("@/lib/email");
  if (!isMailConfigured) return { status: "unconfigured" };

  const result = await sendMailResult({
    to: me.email,
    subject: "ThessalonikiHub — δοκιμή αποστολής",
    text: `Αν διαβάζεις αυτό, το SMTP του ThessalonikiHub δουλεύει.

Από εδώ και πέρα φεύγουν αυτόματα:
  · ειδοποίηση στον ιδιοκτήτη όταν εγκρίνεται η καταχώρησή του
  · ειδοποίηση με τον λόγο όταν απορρίπτεται
  · ειδοποίηση σε σένα όταν έρχεται νέα καταχώρηση

Στάλθηκε από το κουμπί δοκιμής στο /admin/people.
`,
  });

  if (result.ok) return { status: "sent" };
  return { status: "failed", detail: result.error };
}
