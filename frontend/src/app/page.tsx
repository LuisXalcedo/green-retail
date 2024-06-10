// "use client";

import * as React from "react";
import { Button, Checkbox } from "@fluentui/react-components";
import type { CheckboxProps } from "@fluentui/react-components";

export default function Home(props: CheckboxProps) {
  return (
    <>
      <Button>Hola Luis</Button>
      <Checkbox {...props} />
    </>
  );
}
