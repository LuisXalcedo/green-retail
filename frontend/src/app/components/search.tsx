"use client";

import * as React from "react";
import {
  Field,
  InputOnChangeData,
  SearchBox,
} from "@fluentui/react-components";
import type { SearchBoxChangeEvent } from "@fluentui/react-components";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/navigation";

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = React.useState<string>("");
  const [valid, setValid] = React.useState<boolean>(true);

  const onChange: (e: SearchBoxChangeEvent, data: InputOnChangeData) => void = (
    _,
    data
  ) => {
    const params = new URLSearchParams(searchParams);
    if (data.value) {
      params.set("query", data.value);
    } else {
      params.delete("query");
    }
    const newUrl = `${pathname}?${params.toString()}` as unknown as Parameters<
      typeof replace
    >[0];

    replace(newUrl);

    if (data.value.length <= 20) {
      //   setValue(data.value);
      setValid(true);
    } else {
      setValid(false);
    }

    console.log(pathname, params.toString());
  };

  return (
    <Field
      label="Search"
      validationState={valid ? "none" : "warning"}
      validationMessage={valid ? "" : "Search value is too long"}
    >
      <SearchBox
        // value={value}
        onChange={onChange}
        placeholder="Buscar"
        defaultValue={searchParams.get("query")?.toString()}
      />
    </Field>
  );
};
