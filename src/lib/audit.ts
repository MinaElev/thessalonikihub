import "server-only";
import { prisma, isDbConfigured } from "@/lib/db";
import type { CurrentUser } from "@/lib/auth";

/**
 * Recording what an administrator did.
 *
 * Every moderation action used to leave the database changed and nothing
 * saying who changed it. This writes one row per action, append-only.
 *
 * It never throws. An audit entry that fails must not roll back the approval
 * it was describing — a missing line in a log is a smaller problem than a
 * listing that silently refused to publish.
 */

export type AuditAction =
  | "listing.approve"
  | "listing.reject"
  | "listing.status"
  | "listing.delete"
  | "listing.adopt"
  | "claim.approve"
  | "claim.reject"
  | "role.change"
  | "account.delete"
  | "subscriber.delete"
  | "events.import";

export async function recordAudit(
  actor: Pick<CurrentUser, "id" | "email"> | null,
  action: AuditAction,
  target: string,
  detail?: string | null,
): Promise<void> {
  if (!isDbConfigured || !actor) return;
  try {
    await prisma.auditEntry.create({
      data: {
        actorId: actor.id,
        actorEmail: actor.email,
        action,
        target: target.slice(0, 200),
        detail: detail ? detail.slice(0, 500) : null,
      },
    });
  } catch (e) {
    console.error("recordAudit failed:", e);
  }
}
