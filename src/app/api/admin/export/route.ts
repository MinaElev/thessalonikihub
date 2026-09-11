import { NextResponse } from "next/server";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

/**
 * CSV export of the two lists an admin may actually need outside the site:
 * newsletter addresses, and registered people.
 *
 * Admin-gated on every request — an export endpoint that only *looks* hidden
 * is how address lists leak.
 */

/** RFC 4180 quoting: wrap in quotes, double any quote inside. */
function cell(value: unknown): string {
  const text =
    value instanceof Date ? value.toISOString() : value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function csv(headers: string[], rows: unknown[][]): string {
  const body = [headers, ...rows].map((r) => r.map(cell).join(",")).join("\r\n");
  // A BOM, so Excel opens Greek names as UTF-8 instead of mojibake.
  return `﻿${body}\r\n`;
}

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!isDbConfigured) {
    return NextResponse.json({ error: "db-not-configured" }, { status: 503 });
  }

  const what = new URL(request.url).searchParams.get("what");

  let filename: string;
  let content: string;

  if (what === "subscribers") {
    const rows = await prisma.subscriber.findMany({ orderBy: { createdAt: "asc" } });
    filename = "subscribers.csv";
    content = csv(
      ["email", "locale", "confirmed", "createdAt", "unsubscribedAt"],
      rows.map((r) => [r.email, r.locale, r.confirmed, r.createdAt, r.unsubscribedAt]),
    );
  } else if (what === "people") {
    const rows = await prisma.profile.findMany({ orderBy: { createdAt: "asc" } });
    filename = "people.csv";
    content = csv(
      ["email", "name", "role", "createdAt"],
      rows.map((r) => [r.email, r.name, r.role, r.createdAt]),
    );
  } else {
    return NextResponse.json({ error: "unknown-export" }, { status: 400 });
  }

  return new NextResponse(content, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${filename}"`,
      // Never let a proxy or the browser keep a copy of an address list.
      "cache-control": "no-store, private",
    },
  });
}
