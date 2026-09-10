import type { ExternalEvent } from "./types";

/**
 * Eventbrite adapter. Uses the official API v3 with a private token to list an
 * organization's upcoming events. `organizationId` is the numeric org id.
 */
export async function fetchEventbrite({
  token,
  organizationId,
}: {
  token: string;
  organizationId?: string;
}): Promise<ExternalEvent[]> {
  if (!token || !organizationId) return [];
  const url = `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/?status=live&time_filter=current_future&expand=venue`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Eventbrite API ${res.status}`);
  const data = (await res.json()) as { events?: EventbriteEvent[] };
  return (data.events ?? [])
    .map((e) => ({
      externalId: String(e.id),
      source: "eventbrite",
      sourceUrl: e.url,
      title: e.name?.text ?? "Event",
      description: e.description?.text ?? undefined,
      startsAt: e.start?.utc ?? "",
      // Eventbrite always publishes a real start time.
      timeKnown: true,
      endsAt: e.end?.utc ?? undefined,
      location: e.venue?.name ?? undefined,
    }))
    .filter((e) => Boolean(e.startsAt));
}

interface EventbriteEvent {
  id: string | number;
  url?: string;
  name?: { text?: string };
  description?: { text?: string };
  start?: { utc?: string };
  end?: { utc?: string };
  venue?: { name?: string };
}
