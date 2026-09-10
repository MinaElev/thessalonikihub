"use client";

/**
 * Last-resort boundary: catches failures in the root layout itself, where no
 * other layout is available, so it must render its own <html> and <body> and
 * cannot rely on the app's fonts or CSS having loaded.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="el">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          background: "#ffffff",
          color: "#0f172a",
        }}
      >
        <main style={{ maxWidth: "32rem", padding: "2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Κάτι πήγε στραβά</h1>
          <p style={{ color: "#64748b", marginTop: ".75rem" }}>
            Something went wrong loading ThessalonikiHub.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: ".65rem 1.4rem",
              borderRadius: "999px",
              border: 0,
              background: "#0f766e",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Δοκίμασε ξανά / Try again
          </button>
          {error.digest ? (
            <p style={{ color: "#94a3b8", fontSize: ".75rem", marginTop: "1.5rem" }}>
              {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
