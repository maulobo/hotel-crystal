import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const langPathRegex = /^\/(en|es|pt)(\/|$)/;

  if (!langPathRegex.test(pathname)) {
    const acceptLanguage = req.headers.get("accept-language");
    const preferredLang = acceptLanguage?.split(",")[0]?.split("-")[0] || "es";
    return NextResponse.redirect(
      new URL(`/${preferredLang}${pathname}`, req.url)
    );
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images||public).*)"],
// };

export const config = {
  matcher: ["/"],
};
