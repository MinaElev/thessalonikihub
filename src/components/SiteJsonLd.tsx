import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

/**
 * Site-wide structured data (rendered once in the layout):
 * - Organization (name, logo, what it covers) for knowledge-panel eligibility
 * - WebSite with a SearchAction so Google can show a sitelinks search box
 */
export function SiteJsonLd() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          // A stable identifier, so the Article author and publisher on every
          // guide resolve to this one entity rather than to a loose name.
          "@id": `${site.url}/#organization`,
          name: site.name,
          url: site.url,
          logo: `${site.url}/icon.svg`,
          /*
           * The editorial rule is written out on the About page, and this is
           * the property that says so in a form a machine can follow. It is
           * not decoration: the one claim this site makes about itself is
           * that it publishes only what it can verify, and a reader — or a
           * ranking system — should be able to go and read that claim.
           */
          publishingPrinciples: `${site.url}/info/about`,
          description:
            "Ανεξάρτητος ψηφιακός οδηγός για τη Θεσσαλονίκη: γειτονιές, " +
            "αξιοθέατα, φαγητό, μετρό, διαδρομές και εκδηλώσεις.",
          areaServed: {
            "@type": "City",
            name: "Θεσσαλονίκη",
            alternateName: "Thessaloniki",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Θεσσαλονίκη",
              addressCountry: "GR",
            },
          },
          knowsLanguage: site.locales,
          // `sameAs` belongs here and is left out on purpose: it must name
          // profiles that actually exist, and an unverified handle would be a
          // claim the site cannot back.
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
