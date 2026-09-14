import { NextResponse } from "next/server";
import { prisma, isDbConfigured } from "@/lib/db";
import { site } from "@/lib/site";

/**
 * The other half of newsletter double opt-in.
 *
 * `confirmed` was never set to true by anything: an address typed into the
 * form was stored and treated as consent, which under GDPR it is not — anyone
 * could have entered someone else's address. The link in the confirmation
 * email lands here.
 *
 * The token is single-use and cleared on success, so a forwarded or archived
 * link cannot re-subscribe an address that has since been removed.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const done = (state: string) =>
    NextResponse.redirect(`${site.url}/?newsletter=${state}`);

  if (!isDbConfigured || !token) return done("invalid");

  const row = await prisma.subscriber.findUnique({ where: { confirmToken: token } });
  if (!row) return done("invalid");

  await prisma.subscriber.update({
    where: { id: row.id },
    data: { confirmed: true, confirmToken: null, unsubscribedAt: null },
  });

  return done("confirmed");
}
