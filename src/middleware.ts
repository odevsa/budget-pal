import { auth as middleware } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n";

export const config = {
  matcher: ["/", "/login", "/register", "/(en|pt|es|it|fr|nl|de|ru)/:path*"],
};

export default middleware((request: NextRequest | any) => {
  // Auth
  const regex = /^\/api(?!\/auth)/;

  if (!request.auth && regex.test(request.nextUrl.pathname))
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  // I18N
  const defaultLocale = request.headers.get("x-your-custom-locale") || "en";
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
  });
  const response = handleI18nRouting(request);
  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
});
