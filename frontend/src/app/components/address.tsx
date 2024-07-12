import * as React from "react";
import { Field, Input } from "@fluentui/react-components";
import type { FieldProps } from "@fluentui/react-components";
import { useTranslations } from "next-intl";

export default function Address(fieldProps: Partial<FieldProps>) {
  const t = useTranslations("Address");
  return (
    <div>
      <Field
        label={t("address")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Field
        label={t("address2")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Field
        label={t("country")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Field
        label={t("city")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Field
        label={t("state")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Field
        label={t("zip_code")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
    </div>
  );
}
