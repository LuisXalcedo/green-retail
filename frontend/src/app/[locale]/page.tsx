"use client";

import * as React from "react";
import withAuth from "@/app/components/WrappedComponent";

import { NavLinks } from "@/app/components/nav-links";
import LocaleSwitcher from "../components/user-preferences/locale-switcher";

function Home() {
  return (
    <div>
      <NavLinks />
      <LocaleSwitcher />
    </div>
  );
}

export default withAuth(Home);
