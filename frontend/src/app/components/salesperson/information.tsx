import * as React from "react";
import {
  Field,
  Input,
  Switch,
  makeStyles,
  useId,
} from "@fluentui/react-components";
import type { FieldProps, SwitchProps } from "@fluentui/react-components";
import { useTranslations } from "next-intl";

interface InformationSalespersonProps {
  name: string;
  onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name2: string;
  onChangeName2: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id_employee: number;
  onChangeIdEmployee: (event: React.ChangeEvent<HTMLInputElement>) => void;
  comission: number;
  onChangeComission: (event: React.ChangeEvent<HTMLInputElement>) => void;
  phone: string;
  onChangePhone: (event: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bloqued: boolean;
  onChangeBloqued: (event: React.ChangeEvent<HTMLInputElement>) => void;
  created_at: string;
  // onChangeCreatedAt: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updated_at: string;
  // onChangeUpdatedAt: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // {...fieldProps}
}

export default function InformationSalesperson(
  props: Partial<InformationSalespersonProps>
  // fieldProps: Partial<FieldProps>,
  // switchProps: Partial<SwitchProps>
) {
  const t = useTranslations("Salesperson-Information");

  const [disabled, setDisabled] = React.useState(false);

  return (
    <div>
      <Field
        label={t("first-name")}
        validationState="success"
        // validationMessage={"This is a success message"}
        // {...fieldProps}
      >
        <Input
          id="name"
          value={props.name || ""}
          onChange={props.onChangeName}
          disabled={disabled}
        />
      </Field>
      <Field
        label={t("last-name")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        // {...fieldProps}
      >
        <Input
          value={props.name2 || ""}
          onChange={props.onChangeName2}
          disabled={disabled}
        />
      </Field>
      <Field
        label={t("id-employee")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        // {...fieldProps}
      >
        <Input
          value={String(props.id_employee) || ""}
          onChange={props.onChangeIdEmployee}
          disabled={disabled}
        />
      </Field>
      <Field
        label={t("commission")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        // {...fieldProps}
      >
        <Input
          // type="number"
          value={String(props.comission) || ""}
          onChange={props.onChangeComission}
          disabled={disabled}
        />
      </Field>
      <Field
        label={t("phone")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        // {...fieldProps}
      >
        <Input
          value={props.phone || ""}
          onChange={props.onChangePhone}
          disabled={disabled}
        />
      </Field>
      <Field
        label={t("email")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        // {...fieldProps}
      >
        <Input
          type="email"
          value={props.email || ""}
          onChange={props.onChangeEmail}
          disabled={disabled}
        />
      </Field>
      <Switch
        label={t("bloqued")}
        labelPosition="above"
        disabled={disabled}
        checked={props.bloqued}
        onChange={props.onChangeBloqued}
        // {...switchProps}
      />
      <Field
        label={t("created-at")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        // {...fieldProps}
      >
        <Input
          disabled
          value={props.created_at || ""}
          onChange={props.onChangeCreatedAt}
        />
      </Field>
      <Field
        label={t("updated-at")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        // {...fieldProps}
      >
        <Input
          disabled
          value={props.updated_at || ""}
          // onChange={props.onChangeUpdatedAt}
        />
      </Field>
    </div>
  );
}
