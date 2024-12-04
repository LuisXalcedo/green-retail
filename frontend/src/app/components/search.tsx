"use client";

import * as React from "react";
import {
  Field,
  InputOnChangeData,
  SearchBox,
  SearchBoxChangeEvent,
  useId,
} from "@fluentui/react-components";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { useDebouncedCallback } from "use-debounce";

function useSearch(initialQuery: string) {
  const [value, setValue] = React.useState<string>(initialQuery);
  const [valid, setValid] = React.useState<boolean>(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const searchBoxRef = React.useRef<HTMLInputElement>(null);

  const debouncedOnChange = useDebouncedCallback((newValue: string) => {
    startTransition(() => {
      try {
        const params = new URLSearchParams(searchParams);
        if (newValue) {
          params.set("query", newValue);
        } else {
          params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
      } catch (error) {
        console.error("Error updating search params:", error);
      }
    });
  }, 300);

  const focusSearchBox = React.useCallback(() => {
    if (searchBoxRef.current) {
      searchBoxRef.current.focus();
    }
  }, []);

  const onChange = React.useCallback(
    (e: SearchBoxChangeEvent, data: InputOnChangeData) => {
      const newValue = data.value;
      setValue(newValue);
      setValid(newValue.length <= 20);
      debouncedOnChange(newValue);
      focusSearchBox();
    },
    [debouncedOnChange, focusSearchBox]
  );

  React.useEffect(() => {
    focusSearchBox();
  }, [focusSearchBox, isPending]);

  React.useEffect(() => {
    // Focus the SearchBox when the component mounts
    searchBoxRef.current?.focus();
  }, []);

  return { value, valid, isPending, onChange, searchBoxRef, focusSearchBox };
}

export const Search = React.memo(() => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query")?.toString() || "";
  const { value, valid, isPending, onChange, searchBoxRef, focusSearchBox } =
    useSearch(initialQuery);
  const id = useId("search");

  return (
    <Field
      label="Search"
      validationState={valid ? "none" : "warning"}
      validationMessage={valid ? "" : "Search value is too long"}
    >
      <SearchBox
        id={id}
        value={value}
        onChange={onChange}
        placeholder="Buscar"
        disabled={isPending}
        ref={searchBoxRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onFocus={focusSearchBox}
      />
    </Field>
  );
});

Search.displayName = "Search";
