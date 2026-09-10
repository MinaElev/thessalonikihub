import "server-only";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

/**
 * Whether the signed-in visitor already has this entry in their list.
 *
 * Resolved on the server so the save button renders in the right state on
 * first paint. Returns false for signed-out visitors and when the database
 * is not configured, so callers never need to special-case either.
 */
export async function isSaved(kind: string, slug: string): Promise<boolean> {
  if (!isDbConfigured) return false;
  const user = await getCurrentUser();
  if (!user) return false;
  const row = await prisma.savedItem.findUnique({
    where: { userId_kind_slug: { userId: user.id, kind, slug } },
    select: { id: true },
  });
  return Boolean(row);
}
