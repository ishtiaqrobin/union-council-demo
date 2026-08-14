import type { Metadata } from "next";
import { Noto_Serif_Bengali, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ডিজিটাল ইউনিয়ন পরিষদ সনদ জেনারেটর",
  description: "Union Parishad Digital Certificate Generator and Printable Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${notoSerifBengali.variable} ${hindSiliguri.variable}`}>
      <body className="min-h-screen bg-slate-100 font-bengali antialiased">
        {children}
      </body>
    </html>
  );
}
