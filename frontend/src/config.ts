import { Pathnames, LocalePrefix } from "next-intl/routing";

// A list of all locales that are supported
export const locales = ["en", "es"] as const;

export const localePrefix = "always" satisfies LocalePrefix;

// The `pathnames` object holds pairs of internal and
// external paths. Based on the locale, the external
// paths are rewritten to the shared, internal ones.
export const pathnames = {
  "/": {
    en: "/",
    es: "/",
  },
  "/salespersons": {
    en: "/salespersons",
    es: "/vendedores",
  },
  "/salespersons/create": {
    en: "/salespersons/create",
    es: "/vendedores/crear",
  },
  "/salespersons/[id]": {
    en: "/salespersons/[id]",
    es: "/vendedores/[id]",
  },
  "/salespersons/[id]/edit": {
    en: "/salespersons/[id]/edit",
    es: "/vendedores/[id]/editar",
  },
  "/salespersons/[id]/delete": {
    en: "/salespersons/[id]/delete",
    es: "/vendedores/[id]/borrar",
  },
  "/salespersons/[id]/details": {
    en: "/salespersons/[id]/details",
    es: "/vendedores/[id]/detalles",
  },
  "/login": {
    en: "/login",
    es: "/iniciar-sesion",
  },
  "/logout": {
    en: "/logout",
    es: "/cerrar-sesion",
  },
} satisfies Pathnames<typeof locales>;
