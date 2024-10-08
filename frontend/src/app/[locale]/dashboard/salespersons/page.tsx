"use client";

import * as React from "react";
import { Suspense } from "react";

import { DataGridProps, TableRowId } from "@fluentui/react-components";

import withAuth from "@/app/components/WrappedComponent";
import Table from "@/app/components/salesperson/table";
import { SkeletonTable } from "@/app/components/skeletons";
import { ToolbarForm } from "@/app/components/toolbar-form";
import { Search } from "@/app/components/search";
import { createSalesperson, deleteSalespersonById } from "@/app/lib/api";
import { Salesperson } from "@/app/lib/definitions";
import { useRouter } from "@/navigation";

function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1);

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
      try {
        await deleteSalespersonById(idToDelete as string);
        console.log("Salesperson deleted successfully");
        // Optionally, refresh the table or show a success message
      } catch (error) {
        console.error("Error deleting salesperson:", error);
      }
    } else {
      console.error("No salesperson selected to delete");
    }
  };

  return (
    <div>
      <div>
        <ToolbarForm
          onNewClick={handleCreateSalesperson}
          onEditClick={handleEditSalesperson}
          onDeleteClick={handleDeleteSalesperson}
        />
      </div>
      <div>
        <Search />
      </div>
      <div>
        <Suspense key={query + currentPage} fallback={<SkeletonTable />}>
          <Table
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
