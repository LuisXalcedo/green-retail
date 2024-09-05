"use client";

import * as React from "react";
import { useEffect, useState } from "react";
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
import { ToolbarForm } from "@/app/components/toolbar-form";
import { Salesperson } from "@/app/lib/definitions";
import { createSalesperson } from "@/app/lib/api";
import withAuth from "@/app/components/WrappedComponent";
import { useRouter } from "@/navigation";

const Page = () => {
  const t = useTranslations("Salesperson");
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  const [openItems, setOpenItems] = useState(["1"]);
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems as string[]);
  };

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [id_employee, setIdEmployee] = useState<number>(0);
  const [comission, setComission] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bloqued, setBloqued] = useState(false);
  const [createAt, setCreateAt] = useState("");
  const [updateAt, setUpdateAt] = useState("");
  const [address, setAddress] = useState<{
    address?: string | undefined;
    address2?: string | undefined;
    country?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    zip_code?: string | undefined;
  }>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a loading state or nothing on the server
    return null;
  }

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

      // Redirect to the salesperson page

      router.push({
        pathname: "/salespersons/[id]/edit",
        params: { id: data.id },
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

export default withAuth(Page);
