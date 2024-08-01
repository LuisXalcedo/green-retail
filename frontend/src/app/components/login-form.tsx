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
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "400px",
    "> div": { display: "flex", flexDirection: "column", gap: "20px" },
  },
  wrapper: {
    columnGap: "15px",
    display: "flex",
  },
});

export default function LoginForm() {
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
    e: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    setUsername(data.value);
  };

  const onChangePassword: InputProps["onChange"] = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: any
  ) => {
    setPassword(data.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.root}>
      <div>
        <Field label={t("username")} required>
          <Input
            id={usernameId}
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
          />
        </Field>
        <Field label={t("password")} required>
          <Input
            id={passwordId}
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
        </Field>
        <div className={styles.wrapper}>
          <Button type="submit" appearance="primary">
            {t("submit")}
          </Button>
        </div>
      </div>
    </form>
  );
}
