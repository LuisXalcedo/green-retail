"use client";

import * as React from "react";
import withAuth from "@/app/components/WrappedComponent";

import { NavLinks } from "@/app/components/nav-link";
import LocaleSwitcher from "../components/user-preferences/locale-switcher";

function Home() {
  const token = localStorage.getItem("token");
  return (
    <>
      <NavLinks />
      <LocaleSwitcher />
      {token}
    </>
  );
}

export default withAuth(Home);
