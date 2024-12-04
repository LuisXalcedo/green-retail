"use client";

import * as React from "react";
import { makeStyles } from "@fluentui/react-components";

import Image from "next/image";
import { NavLinks } from "./nav-links";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: "16px",
    backgroundColor: "green",
    borderBottom: "1px solid #e0e0e0",
  },
});

export default function Header() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <NavLinks />
    </div>
  );
}
