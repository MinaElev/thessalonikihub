import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "greek"], variable: "--font-inter" });

/**
 * Root layout for /auth/*. These routes sit outside the [locale] segment
 * because Supabase redirects to fixed URLs, so they need their own <html>.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="el" className={inter.variable}>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
