import Script from "next/script";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * Loads the Google AdSense loader script (only when a publisher ID is set via
 * NEXT_PUBLIC_ADSENSE_CLIENT, e.g. "ca-pub-XXXXXXXXXXXXXXXX"). With the script
 * present you can enable Auto ads from the AdSense dashboard; manual units use
 * <AdSlot>. Renders nothing until configured, so the site is unaffected.
 */
export function AdSenseScript() {
  if (!client) return null;
  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
    />
  );
}
