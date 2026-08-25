import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/Footer";

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

export async function generateMetadata({ params }) {
  const lang = params?.lang ?? "es";
  let dictionary = {};
  try {
    dictionary = await import(`../dictionaries/${lang}.json`).then(
      (m) => m.default
    );
  } catch (e) {
    dictionary = { nav: { home: "Home" } };
  }

  const title = `Hotel Crystal — ${dictionary?.siteTitle ?? "Hotel Crystal"}`;
  const description = dictionary?.description ?? "Hotel Crystal - Descripción";
  const url = `https://www.hotelcrystalneuquen.com/${lang}`;
  const image = `https://www.hotelcrystalneuquen.com/og-image.jpg`;

  return {
    metadataBase: new URL("https://www.hotelcrystalneuquen.com"),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Hotel Crystal",
      images: [image],
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
      languages: {
        [lang]: url,
      },
    },
  };
}

export default async function RootLayout({ children, params }) {
  const lang = params.lang;
  return (
    <html lang="es">
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <Nav lang={lang} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
