import * as React from "react";
import {
  Add24Regular,
  Edit24Regular,
  Delete24Regular,
} from "@fluentui/react-icons";
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Tooltip,
} from "@fluentui/react-components";
import type { ToolbarProps } from "@fluentui/react-components";

import { useTranslations } from "next-intl";

interface ToolbarFormProps {
  onNewClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const ToolbarForm = (props: Partial<ToolbarFormProps>) => {
  const t = useTranslations("Toolbar");

  return (
    <Toolbar aria-label="Default" {...props}>
      <Tooltip content={t("new")} relationship="label" withArrow>
        <ToolbarButton
          aria-label={t("new")}
          icon={<Add24Regular />}
          onClick={props.onNewClick}
        />
      </Tooltip>
      <Tooltip content={t("edit")} relationship="label" withArrow>
        <ToolbarButton
          aria-label={t("edit")}
          icon={<Edit24Regular />}
          onClick={props.onEditClick}
        />
      </Tooltip>
      <Tooltip content={t("delete")} relationship="label" withArrow>
        <ToolbarButton
          aria-label={t("delete")}
          icon={<Delete24Regular />}
          onClick={props.onDeleteClick}
        />
      </Tooltip>
      <ToolbarDivider />
    </Toolbar>
  );
};
