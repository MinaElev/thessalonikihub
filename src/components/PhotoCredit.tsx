import type { Photo } from "@/lib/types";

/**
 * Attribution line for a photo.
 *
 * CC BY and BY-SA are only satisfied when the author, the licence and the
 * source are all named and reachable — a bare "Wikimedia Commons" is not
 * attribution. Public-domain files carry no such duty, so they get a plain
 * source link instead of a licence claim.
 */
export function PhotoCredit({
  photo,
  className = "",
}: {
  photo: Photo | undefined;
  className?: string;
}) {
  if (!photo) return null;
  const { author, license, licenseUrl, sourceUrl, credit } = photo;
  if (!author && !license && !credit) return null;

  return (
    <p className={`text-xs text-muted ${className}`}>
      {author ? <span>© {author}</span> : credit ? <span>{credit}</span> : null}
      {license ? (
        <>
          {" · "}
          {licenseUrl ? (
            <a
              href={licenseUrl}
              target="_blank"
              rel="noopener noreferrer license"
              className="underline hover:text-brand-700"
            >
              {license}
            </a>
          ) : (
            <span>{license}</span>
          )}
        </>
      ) : null}
      {sourceUrl ? (
        <>
          {" · "}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brand-700"
          >
            Wikimedia Commons
          </a>
        </>
      ) : null}
    </p>
  );
}
