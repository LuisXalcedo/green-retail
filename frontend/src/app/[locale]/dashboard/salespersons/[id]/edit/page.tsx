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

import {
  getSalespersonById,
  createSalesperson,
  updateSalespersonById,
} from "@/app/lib/api";
import withAuth from "@/app/components/WrappedComponent";
import { ToolbarForm } from "@/app/components/toolbar-form";
import Address from "@/app/components/address";
import InformationSalesperson from "@/app/components/salesperson/information";
import { Salesperson } from "@/app/lib/definitions";
import { useRouter } from "@/navigation";
import useDebouncedFieldUpdate from "@/hooks/useDebouncedFieldUpdate";
import { notFound } from "next/navigation";

function Page({ params }: { params: { id: string } }) {
  const id_salesperson = params.id;
  const t = useTranslations("Salesperson");
  const router = useRouter();

  const [isClient, setIsClient] = React.useState(false);
  const [openItems, setOpenItems] = React.useState(["1"]);
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems as string[]);
  };

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [name2, setName2] = React.useState("");
  const [id_employee, setIdEmployee] = React.useState<number>(0);
  const [commission, setCommission] = React.useState(0);
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

  const debounce = useDebouncedFieldUpdate((field, value) => {
    const [mainField, subField] = field.split(".");
    if (subField) {
      updateSalespersonById(id_salesperson, {
        [mainField]: { ...address, [subField]: value },
      });
    } else {
      updateSalespersonById(id_salesperson, { [field]: value });
    }
  }, 1000);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    debounce("name")(e);
  };

  const handleChangeName2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName2(e.target.value);
    debounce("name2")(e);
  };

  const handleChangeIdEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdEmployee(Number(e.target.value));
    debounce("id_employee")(e);
  };

  const handleChangeCommission = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommission(Number(e.target.value));
    debounce("commission")(e);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    debounce("phone")(e);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    debounce("email")(e);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((address) => ({
      ...address,
      [name]: value,
    }));
    debounce(`address.${name}`)(e);
  };

  const onChangeBloqued = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBloqued(e.currentTarget.checked);
      updateSalespersonById(id_salesperson, {
        bloqued: e.currentTarget.checked,
      });
    },
    [setBloqued, id_salesperson]
  );

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    async function fetchData() {
      // try {
      const data = await getSalespersonById(id_salesperson);

      if (!data) {
        console.log("No se encontró el vendedor");
        notFound();
      }

      console.log(data);

      // Actualiza el estado con los datos recibidos
      setId(data.id || "");
      setName(data.name || "");
      setName2(data.name2 || "");
      setIdEmployee(data.id_employee || "");
      setCommission(data.commission || "");
      setPhone(data.phone || "");
      setEmail(data.email || "");
      setBloqued(Boolean(data.bloqued) || false);
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
      // } catch (error) {
      //   console.error(error);
      // }
    }
    fetchData();
  }, [isClient, id_salesperson]);

  if (!isClient) {
    // Render a loading state or nothing on the server
    return null;
  }

  const handleCreateSalesperson = async () => {
    const salesperson: Salesperson = {
      name,
      name2,
      id_employee,
      commission,
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
    // try {
    const data = await createSalesperson(salesperson);
    console.log("Response from createSalesperson:", data);

    // Redirect to the salesperson page
    router.push({
      pathname: "/dashboard/salespersons/[id]/edit",
      params: { id: data.id },
    });
    // } catch (error) {
    //   console.error("Error al crear el vendedor", error);
    // }
  };

  return (
    <div>
      <div>
        <ToolbarForm onNewClick={handleCreateSalesperson} />
      </div>
      {id}
      <div>
        <Accordion
          openItems={openItems}
          onToggle={handleToggle}
          multiple
          collapsible
        >
          <AccordionItem value="1">
            <AccordionHeader size="large">
              {t("Salesperson-Information")}
            </AccordionHeader>
            <AccordionPanel>
              <InformationSalesperson
                name={name}
                onChangeName={handleChangeName}
                name2={name2}
                onChangeName2={handleChangeName2}
                id_employee={id_employee}
                onChangeIdEmployee={handleChangeIdEmployee}
                commission={commission}
                onChangeCommission={handleChangeCommission}
                phone={phone}
                onChangePhone={handleChangePhone}
                email={email}
                onChangeEmail={handleChangeEmail}
                bloqued={bloqued}
                onChangeBloqued={onChangeBloqued}
                created_at={createAt}
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
                address={address.address}
                onChangeAddress={onChangeAddress}
                address2={address.address2}
                onChangeAddress2={onChangeAddress}
                country={address.country}
                onChangeCountry={onChangeAddress}
                city={address.city}
                onChangeCity={onChangeAddress}
                state={address.state}
                onChangeState={onChangeAddress}
                zip_code={address.zip_code}
                onChangeZipCode={onChangeAddress}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default withAuth(Page);
