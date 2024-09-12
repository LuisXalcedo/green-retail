"use client";

import * as React from "react";

import withAuth from "@/app/components/WrappedComponent";
import Table from "@/app/components/salesperson/table";
import { getSalesperson } from "@/app/lib/api";

function Page() {
  const [isClient, setIsClient] = React.useState(false);
  const [salespersons, setSalespersons] = React.useState([]);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    async function fetchData() {
      try {
        const response = await getSalesperson();
        // console.log(response);
        setSalespersons(response);
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    }

    fetchData();
  }, [isClient]);

  if (!isClient) {
    return null;
  }
  return <Table salespersons={salespersons} />;
}

export default withAuth(Page);
