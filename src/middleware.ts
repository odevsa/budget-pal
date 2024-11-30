import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { auth } from "./auth";

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export const config = {
  matcher: [
    "/",
    "/:path",
    "/(en|pt|es|it|fr|nl|de|ru)/:path*",
    "/((?!api|_next/static|_next/image|images/|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

const matchPath = (patterns: string[], pathname: string) =>
  patterns.some((pattern) => new RegExp(pattern).test(pathname));

export const withI18n: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    return createMiddleware(routing)(request);
  };
};

export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    if (
      matchPath(
        ["^(?!/(?:[a-z]{2}/)?(?:login|register)(/|$)).*"],
        request.nextUrl.pathname
      ) &&
      !(await auth())
    ) {
      return Response.redirect(
        new URL(
          request.nextUrl.pathname == "/"
            ? "/login"
            : `/login?callback=${encodeURIComponent(request.nextUrl.pathname)}`,
          request.nextUrl.origin
        )
      );
    }

    if (
      matchPath(
        ["^(/(?:[a-z]{2}/)?(?:login|register)(/|$)).*"],
        request.nextUrl.pathname
      ) &&
      (await auth())
    ) {
      return Response.redirect(new URL("/", request.nextUrl.origin));
    }
    return next(request, _next);
  };
};

export function stackMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0
): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}

const middlewares = [withI18n];
export default stackMiddlewares(middlewares);
