import * as React from "react";
import { Field, Input } from "@fluentui/react-components";
import { InputProps } from "@fluentui/react-components";
import type { FieldProps } from "@fluentui/react-components";
import { useTranslations } from "next-intl";

interface AddressProps {
  address: string;
  onChangeAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
  address2: string;
  onChangeAddress2: (event: React.ChangeEvent<HTMLInputElement>) => void;
  country: string;
  onChangeCountry: (event: React.ChangeEvent<HTMLInputElement>) => void;
  city: string;
  onChangeCity: (event: React.ChangeEvent<HTMLInputElement>) => void;
  state: string;
  onChangeState: (event: React.ChangeEvent<HTMLInputElement>) => void;
  zip_code: string;
  onChangeZipCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Address(
  props: Partial<AddressProps>,
  fieldProps: Partial<FieldProps>
) {
  const t = useTranslations("Address");

  return (
    <div>
      <Field
        label={t("address")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input
          name="address"
          value={props.address || ""}
          onChange={props.onChangeAddress}
        />
      </Field>
      <Field
        label={t("address2")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input
          name="address2"
          value={props.address2 || ""}
          onChange={props.onChangeAddress2}
        />
      </Field>
      <Field
        label={t("country")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input
          name="country"
          value={props.country || ""}
          onChange={props.onChangeCountry}
        />
      </Field>
      <Field
        label={t("city")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input
          name="city"
          value={props.city || ""}
          onChange={props.onChangeCity}
        />
      </Field>
      <Field
        label={t("state")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input
          name="state"
          value={props.state || ""}
          onChange={props.onChangeState}
        />
      </Field>
      <Field
        label={t("zip_code")}
        // validationState="success"
        // validationMessage={"This is a success message"}
        {...fieldProps}
      >
        <Input
          name="zip_code"
          value={props.zip_code || ""}
          onChange={props.onChangeZipCode}
        />
      </Field>
    </div>
  );
}
