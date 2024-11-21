"use client";

import * as React from "react";
import { Suspense } from "react";
import dynamic from "next/dynamic";

import { DataGridProps, TableRowId } from "@fluentui/react-components";

import withAuth from "@/app/components/WrappedComponent";
const DynamicTable = dynamic(
  () => import("@/app/components/salesperson/table"),
  { ssr: false }
);
import { SkeletonTable } from "@/app/components/skeletons";
const DynamicToolbar = dynamic(
  () => import("@/app/components/toolbar-form").then((mod) => mod.ToolbarForm),
  {
    ssr: false,
  }
);
const DynamicSearch = dynamic(
  () => import("@/app/components/search").then((mod) => mod.Search),
  {
    ssr: false,
  }
);
import { createSalesperson, deleteSalespersonById } from "@/app/lib/api";
import { Salesperson } from "@/app/lib/definitions";
import { useRouter } from "@/i18n/routing";

function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [name2, setName2] = React.useState("");
  const [id_employee, setIdEmployee] = React.useState<number>(0);
  const [commission, setCommission] = React.useState(0);
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bloqued, setBloqued] = React.useState(false);
  const [createAt, setCreateAt] = React.useState("");
  const [updateAt, setUpdateAt] = React.useState("");
  const [address, setAddress] = React.useState<{
    address?: string | undefined;
    address2?: string | undefined;
    country?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    zip_code?: string | undefined;
  }>({});

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

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a loading state or nothing on the server
    return null;
  }

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);

  const redirectToSalespersonPage = (id: string) => {
    router.push({
      pathname: "/dashboard/salespersons/[id]/edit",
      params: { id },
    });
  };

  const handleCreateSalesperson = async () => {
    const salesperson: Salesperson = {
      name,
      name2,
      id_employee,
      commission,
      phone,
      email,
      bloqued,
      address: {
        address: address.address,
        address2: address.address2,
        country: address.country,
        city: address.city,
        state: address.state,
        zip_code: address.zip_code,
      },
    };
    try {
      const data = await createSalesperson(salesperson);
      console.log("Response from createSalesperson:", data);

      // Redirect to the salesperson page
      redirectToSalespersonPage(data.id);
    } catch (error) {
      console.error("Error al crear el vendedor", error);
    }
  };

  const handleEditSalesperson = () => {
    // Redirect to the salesperson page
    const idToEdit = selectedRows.values().next().value;
    if (idToEdit !== undefined) {
      redirectToSalespersonPage(idToEdit as string);
    } else {
      console.error("No salesperson selected to edit");
    }
  };

  const handleDeleteSalesperson = async () => {
    const idToDelete = selectedRows.values().next().value;
    if (idToDelete !== undefined) {
      // try {
      await deleteSalespersonById(idToDelete as string);
      console.log("Salesperson deleted successfully");
      // Optionally, refresh the table or show a success message
      // } catch (error) {
      //   console.error("Error deleting salesperson:", error);
      // }
    } else {
      console.error("No salesperson selected to delete");
    }
  };

  return (
    <div className="dashboard-content">
      <div>
        <DynamicToolbar
          key="toolbar-form"
          onNewClick={handleCreateSalesperson}
          onEditClick={handleEditSalesperson}
          onDeleteClick={handleDeleteSalesperson}
        />
      </div>
      <div>
        <DynamicSearch key="search" />
      </div>
      <div>
        <Suspense key={query + currentPage} fallback={<SkeletonTable />}>
          <DynamicTable
            query={query}
            currentPage={currentPage}
            sortState={sortState}
            onSortChange={onSortChange}
            selectedRows={selectedRows}
            onSelectionChange={onSelectionChange}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default withAuth(Page);
