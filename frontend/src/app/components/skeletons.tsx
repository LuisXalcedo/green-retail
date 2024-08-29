"use client";

import * as React from "react";
import {
  Skeleton,
  SkeletonItem,
  Field,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type { SkeletonProps } from "@fluentui/react-components";
import { styleText } from "util";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "600px",
    padding: "40px",
    alignItems: "center",
    margin: "auto", // Centrar el componente
    position: "relative", // Necesario para centrar con margin: auto
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Altura completa de la pantalla
  },
  input: {
    width: "400px", // Ajustar el ancho del input
    height: "42px", // Ajustar la altura del input
    marginBottom: "20px", // Add margin between skeleton items
  },
  wrapper: {
    columnGap: "15px",
    display: "flex",
    padding: "20px",
  },
  circle: {
    width: "100px",
    height: "100px",
  },
});

export const LoginSkeleton = (props: Partial<SkeletonProps>) => {
  const styles = useStyles();

  return (
    <div>
      <Skeleton {...props} aria-label="Loading Content">
        <SkeletonItem shape="rectangle" className={styles.input} />
        <SkeletonItem shape="rectangle" className={styles.input} />
        <SkeletonItem shape="rectangle" className={styles.wrapper} />
      </Skeleton>
    </div>
  );
};

export const GreenRetailLogoSkeleton = () => {
  const styles = useStyles();
  return (
    <Skeleton>
      <SkeletonItem shape="circle" className={styles.circle} />
    </Skeleton>
  );
};
