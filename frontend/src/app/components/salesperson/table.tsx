import {
  DataGrid,
  DataGridBody,
  DataGridRow,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  TableCell,
  TableRowId,
  DataGridProps,
} from "@fluentui/react-components";
import { useTranslations } from "next-intl";

type NameCell = {
  label: string;
};

type Name2Cell = {
  label: string;
};

type IdEmployeeCell = {
  label: string;
};

type PhoneCell = {
  label: string;
};

type EmailCell = {
  label: string;
};

type Item = {
  id: string;
  name: NameCell;
  name2: Name2Cell;
  idEmployee: IdEmployeeCell;
  phone: PhoneCell;
  email: EmailCell;
  id_employee: string;
};

export default function Table(props: {
  salespersons: Item[];
  sortState: Parameters<NonNullable<DataGridProps["onSortChange"]>>[1];
  onSortChange: DataGridProps["onSortChange"];
  selectedRows: Set<TableRowId>;
  onSelectionChange: DataGridProps["onSelectionChange"];
}) {
  const {
    salespersons,
    sortState,
    onSortChange,
    selectedRows,
    onSelectionChange,
  } = props;
  const t = useTranslations("Salesperson-Information");

  const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
      columnId: "name",
      compare: (a, b) => {
        return a.name.label.localeCompare(b.name.label);
      },
      renderHeaderCell: () => {
        return t("first-name");
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.name.label}</TableCellLayout>;
      },
    }),
    createTableColumn<Item>({
      columnId: "name2",
      compare: (a, b) => {
        return a.name2.label.localeCompare(b.name2.label);
      },
      renderHeaderCell: () => {
        return t("last-name");
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.name2.label}</TableCellLayout>;
      },
    }),
    createTableColumn<Item>({
      columnId: "idEmployee",
      compare: (a, b) => {
        return String(a.idEmployee.label).localeCompare(
          String(b.idEmployee.label)
        );
      },
      renderHeaderCell: () => {
        return t("id-employee");
      },
      renderCell: (item) => {
        return (
          <TableCellLayout>{String(item.idEmployee.label)}</TableCellLayout>
        );
      },
    }),
    createTableColumn<Item>({
      columnId: "phone",
      compare: (a, b) => {
        return a.phone.label.localeCompare(b.phone.label);
      },
      renderHeaderCell: () => {
        return t("phone");
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.phone.label}</TableCellLayout>;
      },
    }),
    createTableColumn<Item>({
      columnId: "email",
      compare: (a, b) => {
        return a.email.label.localeCompare(b.email.label);
      },
      renderHeaderCell: () => {
        return t("email");
      },
      renderCell: (item) => {
        return <TableCellLayout>{item.email.label}</TableCellLayout>;
      },
    }),
  ];

  return (
    <DataGrid
      items={salespersons.map((item) => {
        return {
          id: item.id,
          name: { label: item.name },
          name2: { label: item.name2 },
          idEmployee: { label: item.id_employee },
          phone: { label: item.phone },
          email: { label: item.email },
        };
      })}
      columns={columns}
      sortable
      sortState={props.sortState}
      onSortChange={props.onSortChange}
      selectionMode="multiselect"
      selectedItems={props.selectedRows}
      onSelectionChange={props.onSelectionChange}
      getRowId={(item) => item.id}
      focusMode="composite"
      style={{ minWidth: "550px" }}
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { "aria-label": "Select all rows" },
          }}
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { "aria-label": "Select row" },
            }}
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
}
