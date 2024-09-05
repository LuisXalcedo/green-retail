"use client";

import { DrawerProps } from "@fluentui/react-components";
import * as React from "react";
import {
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerProps,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  NavSize,
  NavDivider,
} from "@fluentui/react-nav-preview";
import {
  Label,
  Radio,
  RadioGroup,
  Tooltip,
  makeStyles,
  tokens,
  useId,
} from "@fluentui/react-components";
import {
  PersonMoney20Regular,
  PersonMoney20Filled,
  Power20Regular,
  Power20Filled,
  bundleIcon,
} from "@fluentui/react-icons";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "600px",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});

const Salesperson = bundleIcon(PersonMoney20Regular, PersonMoney20Filled);
const Logout = bundleIcon(Power20Regular, Power20Filled);

type DrawerType = Required<DrawerProps>["type"];

export const NavLinks = (props: Partial<NavDrawerProps>) => {
  const t = useTranslations("NavLinks");

  const styles = useStyles();

  const labelId = useId("type-label");

  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState<DrawerType>("inline");

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="1"
        defaultSelectedCategoryValue="1"
        open={isOpen}
        type={type}
        size="medium"
      >
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>
        <NavDrawerBody>
          <NavSectionHeader>{t("home")}</NavSectionHeader>
          <Link href="/salespersons/create">
            <NavItem icon={<Salesperson />} value={"1"}>
              {t("salesperson")}
            </NavItem>
          </Link>

          <NavDivider />

          <Link href="/logout">
            <NavItem icon={<Logout />} value={"2"}>
              {t("logout")}
            </NavItem>
          </Link>
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        {!isOpen && renderHamburgerWithToolTip()}
      </div>
    </div>
  );
};
