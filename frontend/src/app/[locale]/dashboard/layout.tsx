"use client";

import * as React from "react";

import Header from "@/app/components/header";
import { ToolbarForm } from "@/app/components/toolbar-form";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {/* <ToolbarForm /> */}
      {children}
    </div>
  );
}
