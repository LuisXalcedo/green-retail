"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { Button } from "@fluentui/react-components";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  const router = useRouter();

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Button onClick={() => router.push("/")}>{t("backHome")}</Button>
    </div>
  );
}
