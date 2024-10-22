import { NextResponse } from "next/server";

export function middleware(req) {
  // Obtener la URL actual
  const { pathname } = req.nextUrl;

  const langPathRegex = /^\/(en|es|pt)(\/|$)/;

  if (!langPathRegex.test(pathname)) {
    // Obtener el idioma del navegador
    const acceptLanguage = req.headers.get("accept-language");
    console.log(acceptLanguage);
    const preferredLang = acceptLanguage?.split(",")[0]?.split("-")[0] || "es";

    // Redirigir al idioma correspondiente si no está en la URL
    return NextResponse.redirect(
      new URL(`/${preferredLang}${pathname}`, req.url)
    );
  }

  // Continuar si la URL ya tiene el idioma
  return NextResponse.next();
}

// Configurar las rutas que activan el middleware
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // Aplica a todas las rutas excepto las estáticas
};
