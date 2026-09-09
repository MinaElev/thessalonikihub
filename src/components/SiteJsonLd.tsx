import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

/**
 * Site-wide structured data (rendered once in the layout):
 * - Organization (name, logo) for brand knowledge-panel eligibility
 * - WebSite with a SearchAction so Google can show a sitelinks search box
 */
export function SiteJsonLd() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.url,
          logo: `${site.url}/icon.svg`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${site.url}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
    </>
  );
}
