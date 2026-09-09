// Serves /ads.txt for Google AdSense. Google requires an ads.txt that
// authorises your publisher account. Set NEXT_PUBLIC_ADSENSE_CLIENT
// (e.g. "ca-pub-1234567890123456") and this returns the correct line.
export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
  const pub = client.replace(/^ca-/, ""); // ads.txt uses "pub-…", not "ca-pub-…"
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# ads.txt — set NEXT_PUBLIC_ADSENSE_CLIENT to enable AdSense\n";
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
