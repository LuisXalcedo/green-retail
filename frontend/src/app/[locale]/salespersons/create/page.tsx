"use client";

import * as React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
} from "@fluentui/react-components";
import { useTranslations } from "next-intl";

import Address from "@/app/components/address";
import InformationSalesperson from "@/app/components/salesperson/information";

export default function CreateSalespersonPage() {
  const t = useTranslations("SalespersonCreate");

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
        <AccordionHeader size="large">
          {t("Salesperson-Information")}
        </AccordionHeader>
        <AccordionPanel>
          <InformationSalesperson />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionHeader size="large">
          {t("Salesperson-Address")}
        </AccordionHeader>
        <AccordionPanel>
          <Address />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
