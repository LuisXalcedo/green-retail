"use client";
import * as React from "react";
// import { Suspense } from "react";
import { makeStyles, Text, tokens } from "@fluentui/react-components";

import GreenRetailLogo from "@/app/components/GreenRetailLogo";
import LoginForm from "@/app/components/login-form";
import { useTranslations } from "next-intl";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "300px",
    margin: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid green",
    boxShadow: "0 32px 64px rgba(0,0,0,0.28)",
    // backgroundColor: "green",
  },
  verticalSpacing: {
    marginTop: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalXXL,
  },
});

export default function Page() {
  const styles = useStyles();
  const t = useTranslations("Login");

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.verticalSpacing}>
          <GreenRetailLogo />
        </div>
        <div>
          <Text size={500} weight="medium">
            {t("greeting")}
          </Text>
        </div>
        <div className={styles.verticalSpacing}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
