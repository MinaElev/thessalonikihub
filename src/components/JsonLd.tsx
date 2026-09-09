import { jsonLd } from "@/lib/seo";

/** Injects a JSON-LD structured-data block. Content is app-generated, safe. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}
