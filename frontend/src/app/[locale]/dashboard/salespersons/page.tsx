"use client";

import * as React from "react";
import { DataGridProps, TableRowId } from "@fluentui/react-components";

import withAuth from "@/app/components/WrappedComponent";
import Table from "@/app/components/salesperson/table";
import { getSalesperson } from "@/app/lib/api";

function Page() {
  const [isClient, setIsClient] = React.useState(false);

  const [salespersons, setSalespersons] = React.useState([]);

  const [sortState, setSortState] = React.useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "file",
    sortDirection: "ascending",
  });
  const onSortChange: DataGridProps["onSortChange"] = (e, nextSortState) => {
    setSortState(nextSortState);
  };

  const [selectedRows, setSelectedRows] = React.useState(
    new Set<TableRowId>([])
  );
  const onSelectionChange: DataGridProps["onSelectionChange"] = (e, data) => {
    setSelectedRows(data.selectedItems);
    console.log("Selected row IDs:", Array.from(data.selectedItems));
  };

  const refMap = React.useRef<Record<string, HTMLElement | null>>({});

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    async function fetchData() {
      try {
        const response = await getSalesperson();
        console.log(response);
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
  return (
    <Table
      salespersons={salespersons}
      sortState={sortState}
      onSortChange={onSortChange}
      selectedRows={selectedRows}
      onSelectionChange={onSelectionChange}
    />
  );
}

export default withAuth(Page);
