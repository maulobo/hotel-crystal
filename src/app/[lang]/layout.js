import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/Footer";
import { buildMetadata, hotelJsonLd, normalizeLocale, LOCALES } from "@/app/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export function generateMetadata({ params }) {
  return buildMetadata({ lang: params?.lang, route: "" });
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }) {
  const lang = normalizeLocale(params.lang);
  return (
    <html lang={lang}>
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <Nav lang={lang} />
        {children}
        <Footer lang={lang} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd(lang)) }}
        />
      </body>
    </html>
  );
}
