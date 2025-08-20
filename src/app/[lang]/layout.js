import localFont from "next/font/local";
import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
  const url = `https://your-domain.com/${lang}`;
  const image = `https://your-domain.com/og-image.jpg`;

  return {
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-fuente-2-opacity)] text-[var(--color-fuente)]`}
      >
        <Nav lang={lang} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
