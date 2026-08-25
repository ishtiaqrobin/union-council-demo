import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./Providers";

// SolaimanLipi Font Configuration
const SolaimanLipi = localFont({
  src: [
    {
      path: "../fonts/SolaimanLipi.ttf",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-solaiman",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ডিজিটাল ইউনিয়ন পরিষদ ই-সনদ প্ল্যাটফর্ম",
  description: "ইউনিয়ন পরিষদের সকল সনদের লাইভ প্রিভিউ, এডিটর ও A4 Landscape প্রিন্ট ব্যবস্থা",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@400;600;700;800;900&family=Tiro+Bangla:ital@0;1&family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Lato:wght@300;400;700&family=Poppins:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${SolaimanLipi.variable} bg-slate-950 text-slate-100 min-h-screen antialiased transition-colors duration-200`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
