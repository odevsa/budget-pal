import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/:path", "/(en|pt|es|it|fr|nl|de|ru)/:path*"],
};
