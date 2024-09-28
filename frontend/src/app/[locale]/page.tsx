"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import withAuth from "@/app/components/WrappedComponent";

import LocaleSwitcher from "../components/user-preferences/locale-switcher";
import { NavLinks } from "../components/nav-links";
import Header from "../components/header";

function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a loading state or nothing on the server
    return null;
  }

  return <div>Point of Sale!!!</div>;
}

export default withAuth(Page);
