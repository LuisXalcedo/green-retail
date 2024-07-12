import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, pathnames } from "./config";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "en",

  localePrefix,
  pathnames,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(es|en)/:path*"],
};
