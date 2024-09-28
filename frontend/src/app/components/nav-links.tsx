"use client";

import { DrawerProps } from "@fluentui/react-components";
import * as React from "react";
import Image from "next/image";

import {
  AppItem,
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
    // height: "600px",
  },
});

const Salesperson = bundleIcon(PersonMoney20Regular, PersonMoney20Filled);
const Logout = bundleIcon(Power20Regular, Power20Filled);

type DrawerType = Required<DrawerProps>["type"];

export const NavLinks = (props: Partial<NavDrawerProps>) => {
  const t = useTranslations("NavLinks");

  const styles = useStyles();

  const typeLableId = useId("type-label");
  const linkLabelId = useId("link-label");

  const [isOpen, setIsOpen] = useState(false);
  const [enabledLinks, setEnabledLinks] = useState(true);
  // const [type, setType] = useState<DrawerType>("overlay");

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };

  return (
    <div className={styles.root}>
      <NavDrawer open={isOpen} type={"overlay"} size="medium">
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>

        <NavDrawerBody onClick={() => setIsOpen(!isOpen)}>
          <Link href="/">
            <AppItem
              icon={
                <Image
                  src="/logo.png"
                  alt="Green Retail Logo"
                  width={32}
                  height={32}
                  priority={true}
                />
              }
              // as="a"
            >
              Green Retail
            </AppItem>
          </Link>
          {/* <NavSectionHeader>{t("home")}</NavSectionHeader> */}
          <Link href="/dashboard/salespersons">
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
      {/* <div className={styles.content}> */}
      {!isOpen && renderHamburgerWithToolTip()}
      {/* </div> */}
    </div>
  );
};
