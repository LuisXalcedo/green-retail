import { Field, Input, Switch } from "@fluentui/react-components";
import type { FieldProps, SwitchProps } from "@fluentui/react-components";
import { useTranslations } from "next-intl";

export default function InformationSalesperson(
  fieldProps: Partial<FieldProps>,
  switchProps: Partial<SwitchProps>
) {
  const t = useTranslations("Salesperson-Information");

  return (
    <div>
      <Field
        label={t("first-name")}
        validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Field
        label={t("last-name")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Field
        label={t("id-employee")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Field
        label={t("commission")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Field
        label={t("phone")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Field
        label={t("email")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input />
      </Field>
      <Switch label={t("bloqued")} labelPosition="above" {...switchProps} />
      <Field
        label={t("created-at")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input disabled />
      </Field>
      <Field
        label={t("updated-at")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input disabled />
      </Field>
    </div>
  );
}
