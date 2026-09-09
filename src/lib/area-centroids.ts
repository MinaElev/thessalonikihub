// Representative coordinates per Thessaloniki area. Used as the default map
// center in the submission location picker and as a fallback when a submitter
// doesn't drop an exact pin. Client- and server-safe (no imports).
export const areaCentroid: Record<string, { lat: number; lng: number }> = {
  center: { lat: 40.6329, lng: 22.9412 },
  ladadika: { lat: 40.6365, lng: 22.9375 },
  "ano-poli": { lat: 40.6412, lng: 22.9538 },
  kalamaria: { lat: 40.5772, lng: 22.9525 },
  waterfront: { lat: 40.6205, lng: 22.9503 },
  valaoritou: { lat: 40.6392, lng: 22.9377 },
};

/** Thessaloniki city centre — the ultimate fallback. */
export const CITY = { lat: 40.6401, lng: 22.9444 };

export function centroidFor(area?: string): { lat: number; lng: number } {
  return (area && areaCentroid[area]) || CITY;
}
