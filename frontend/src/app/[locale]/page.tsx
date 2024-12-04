"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import withAuth from "@/app/components/WrappedComponent";

import LocaleSwitcher from "../components/user-preferences/locale-switcher";
// import { NavLinks } from "../components/nav-links";
// import Header from "../components/header";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

function Page() {
  const [isClient, setIsClient] = useState(false);

  const t = useTranslations("Home");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a loading state or nothing on the server
    return null;
  }

  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/dashboard/salespersons">{t("title")}</Link>
      <LocaleSwitcher />
    </div>
  );
}

export default withAuth(Page);
