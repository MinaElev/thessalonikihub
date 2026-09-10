import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - /auth/* — the Supabase redirect target. It is a route handler outside
  //   the [locale] segment, so letting the i18n middleware rewrite it sent
  //   every sign-in to a 404.
  // - Next.js internals (_next)
  // - static files (with a dot, e.g. favicon.ico, robots.txt, images)
  matcher: ["/((?!api|auth|_next|_vercel|.*\\..*).*)"],
};
