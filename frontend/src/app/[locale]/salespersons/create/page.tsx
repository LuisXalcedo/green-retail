"use client";

import * as React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  Toolbar,
} from "@fluentui/react-components";
import { useTranslations } from "next-intl";

import Address from "@/app/components/address";
import InformationSalesperson from "@/app/components/salesperson/information";
import { ToolbarForm } from "@/app/components/toolbar-form";
import { Salesperson } from "@/app/lib/definitions";
import { createSalesperson } from "@/app/lib/api";
import withAuth from "@/app/components/WrappedComponent";

const CreateSalespersonPage = () => {
  const t = useTranslations("SalespersonCreate");

  const [openItems, setOpenItems] = React.useState(["1"]);
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems);
  };

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [name2, setName2] = React.useState("");
  const [id_employee, setIdEmployee] = React.useState<number>(0);
  const [comission, setComission] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bloqued, setBloqued] = React.useState(false);
  const [createAt, setCreateAt] = React.useState("");
  const [updateAt, setUpdateAt] = React.useState("");
  const [address, setAddress] = React.useState<{
    address?: string | undefined;
    address2?: string | undefined;
    country?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    zip_code?: string | undefined;
  }>({});

  const handleCreateSalesperson = async () => {
    const salesperson: Salesperson = {
      name,
      name2,
      id_employee,
      comission: parseFloat(comission),
      phone,
      email,
      bloqued,
      address: {
        address: address.address,
        address2: address.address2,
        country: address.country,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
      },
    };
    try {
      const data = await createSalesperson(salesperson);
      console.log("Response from createSalesperson:", data);

      // Actualiza el estado con los datos recibidos
      setId(data.id || "");
      setName(data.name || "");
      setName2(data.name2 || "");
      setIdEmployee(data.id_employee || 0);
      setComission(data.comission ? data.comission.toString() : "");
      setPhone(data.phone || "");
      setEmail(data.email || "");
      setBloqued(data.bloqued || false);
      setCreateAt(data.created_at || "");
      setUpdateAt(data.updated_at || "");
      setAddress({
        address: data.address.address || "",
        address2: data.address.address2 || "",
        country: data.address.country || "",
        city: data.address.city || "",
        state: data.address.state || "",
        zip_code: data.address.zip_code || "",
      });
    } catch (error) {
      console.error("Error al crear el vendedor", error);
    }
  };

  return (
    <div>
      <div>
        <ToolbarForm onNewClick={handleCreateSalesperson} />
      </div>
      {id}
      <div>
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
              <InformationSalesperson
                onChangeName={(e) => setName(e.target.value)}
                name={name}
                onChangeName2={(e) => setName2(e.target.value)}
                name2={name2}
                onChangeIdEmployee={(e) =>
                  setIdEmployee(Number(e.target.value))
                }
                id_employee={id_employee.toString()} // Convert id_employee to a string
                onChangeComission={(e) => setComission(e.target.value)}
                comission={comission}
                onChangePhone={(e) => setPhone(e.target.value)}
                phone={phone}
                onChangeEmail={(e) => setEmail(e.target.value)}
                email={email}
                onChangeBloqued={(e) => setBloqued(!bloqued)}
                onChangeCreatedAt={(e) => setCreateAt(e.target.value)}
                created_at={createAt}
                onChangeUpdatedAt={(e) => setUpdateAt(e.target.value)}
                updated_at={updateAt}
              />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionHeader size="large">
              {t("Salesperson-Address")}
            </AccordionHeader>
            <AccordionPanel>
              <Address
                onChangeAddress={(e) =>
                  setAddress({ ...address, address: e.target.value })
                }
                address={address.address}
                onChangeAddress2={(e) =>
                  setAddress({ ...address, address2: e.target.value })
                }
                address2={address.address2}
                onChangeCountry={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
                country={address.country}
                onChangeCity={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                city={address.city}
                onChangeState={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                state={address.state}
                onChangeZipCode={(e) =>
                  setAddress({ ...address, zip_code: e.target.value })
                }
                zip_code={address.zip_code}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default withAuth(CreateSalespersonPage);
