"use client";

import * as React from "react";
import type { FieldProps, SwitchProps } from "@fluentui/react-components";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  Field,
  Input,
  Switch,
} from "@fluentui/react-components";

export default function CreateSalespersonPage(
  fieldProps: Partial<FieldProps>,
  switchProps: Partial<SwitchProps>
) {
  const [openItems, setOpenItems] = React.useState(["1"]);
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems);
  };
  return (
    <Accordion
      onToggle={handleToggle}
      openItems={openItems}
      multiple
      collapsible
    >
      <AccordionItem value="1">
        <AccordionHeader size="large">Salesperson Information</AccordionHeader>
        <AccordionPanel>
          <div>
            <Field
              label="First Name"
              validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Field
              label="Last Name"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Field
              label="Id Employee"
              validationState="success"
              validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Field
              label="Commision"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Field
              label="Phone"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Field
              label="Email"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Switch label={"Bloqued"} labelPosition="above" {...switchProps} />
            <Field
              label="Created At"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input disabled />
            </Field>
            <Field
              label="Updated At"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input disabled />
            </Field>
          </div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionHeader size="large">Salesperson Address</AccordionHeader>
        <AccordionPanel>
          <div>
            <Field
              label="Address 1"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Field
              label="Address 2"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Field
              label="Country"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Field
              label="City"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Field
              label="State"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
            <Field
              label="Zip Code"
              // validationState="success"
              // validationMessage={"This is a success message"}
              {...fieldProps}
            >
              <Input />
            </Field>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
