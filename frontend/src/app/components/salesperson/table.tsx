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
} from "@fluentui/react-components";

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
  name: NameCell;
  name2: Name2Cell;
  idEmployee: IdEmployeeCell;
  phone: PhoneCell;
  email: EmailCell;
  id_employee: IdEmployeeCell;
};

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "name",
    compare: (a, b) => {
      return a.name.label.localeCompare(b.name.label);
    },
    renderHeaderCell: () => {
      return "Name";
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
      return "Name 2";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.name2.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: "idEmployee",
    compare: (a, b) => {
      return a.idEmployee.label.localeCompare(b.idEmployee.label);
    },
    renderHeaderCell: () => {
      return "Id Employee";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.idEmployee.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: "phone",
    compare: (a, b) => {
      return a.phone.label.localeCompare(b.phone.label);
    },
    renderHeaderCell: () => {
      return "Phone";
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
      return "Email";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.email.label}</TableCellLayout>;
    },
  }),
];

export default function Table(props: { salespersons: Item[] }) {
  const { salespersons } = props;

  return (
    <DataGrid
      items={salespersons.map((item) => {
        return {
          name: { label: item.name },
          name2: { label: item.name2 },
          idEmployee: { label: item.id_employee },
          phone: { label: item.phone },
          email: { label: item.email },
        };
      })}
      columns={columns}
      sortable
      selectionMode="multiselect"
      getRowId={(item) => item.name.label}
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
