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
  bundleIcon,
} from "@fluentui/react-icons";
// import Link from "next/link";
import { Link } from "@/navigation";

import { useTranslations } from "next-intl";

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

type DrawerType = Required<DrawerProps>["type"];

export const NavLinks = (props: Partial<NavDrawerProps>) => {
  const t = useTranslations("NavLinks");

  const styles = useStyles();

  const labelId = useId("type-label");

  const [isOpen, setIsOpen] = React.useState(true);
  const [type, setType] = React.useState<DrawerType>("inline");

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
        </NavDrawerBody>
      </NavDrawer>
      <div className={styles.content}>
        {!isOpen && renderHamburgerWithToolTip()}
      </div>
    </div>
  );
};
