"use client";

import * as React from "react";
import { useRouter } from "@/navigation";
import type {
  FieldProps,
  ButtonProps,
  InputProps,
} from "@fluentui/react-components";
import {
  Field,
  Input,
  Button,
  makeStyles,
  useId,
} from "@fluentui/react-components";
const axios = require("axios").default;
import { useTranslations } from "next-intl";

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    gap: "2px",
    // Prevent from taking the full width of the page (optional)
    maxWidth: "300px",
  },
  input: {
    width: "300px",
  },
  outerWrapper: {
    marginTop: "15px",
  },
});

export default function LoginForm(props: InputProps) {
  const t = useTranslations("Login");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const usernameId = useId("input-username");
  const passwordId = useId("input-password");
  const styles = useStyles();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/token",
        new URLSearchParams({
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      localStorage.setItem("token", response.data.access_token); // Store token
      router.push("/"); // Redirect to home page
      // alert("Login successful");
    } catch (error) {
      alert("Login failed");
    }
  };

  const onChangeUsername: InputProps["onChange"] = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(e.target.value);
  };

  const onChangePassword: InputProps["onChange"] = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field id={usernameId} label={t("username")} required>
        <Input
          id={usernameId}
          type="text"
          name="username"
          value={username}
          onChange={onChangeUsername}
          className={styles.input}
          autoComplete="off"
        />
      </Field>
      <Field id={passwordId} label={t("password")} required>
        <Input
          id={passwordId}
          type="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          className={styles.input}
        />
      </Field>
      <Button
        type="submit"
        appearance="primary"
        size="large"
        className={styles.outerWrapper}
      >
        {t("submit")}
      </Button>
    </form>
  );
}
