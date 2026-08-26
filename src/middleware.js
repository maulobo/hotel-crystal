import { NextResponse } from "next/server";

const LOCALES = ["es", "en", "pt"];
const DEFAULT_LOCALE = "es";
const LANG_PATH = /^\/(en|es|pt)(\/|$)/;

/** Primer idioma del Accept-Language que realmente tengamos traducido. */
function pickLocale(acceptLanguage) {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const requested = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().split("-")[0].toLowerCase());

  return requested.find((code) => LOCALES.includes(code)) ?? DEFAULT_LOCALE;
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (LANG_PATH.test(pathname)) return NextResponse.next();

  const locale = pickLocale(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Todo salvo assets internos y archivos con extensión
  // (robots.txt, sitemap.xml, icon.png, manifest.webmanifest, /crys/*.jpg…).
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
