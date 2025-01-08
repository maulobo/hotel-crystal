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

export const metadata = {
  title: "Hotel Crystal",
  description: "Descripcion ",
};

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
