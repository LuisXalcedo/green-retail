"use client";

import * as React from "react";

import { getSalesperson, fetchFilteredSalesperson } from "@/app/lib/api";

import MemoizedRow from "@/app/components/salesperson/MemoizedRow";
import {
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  TableCellActions,
  TableRowId,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MenuItem,
  useScrollbarWidth,
  useFluent,
  Button,
  Skeleton,
} from "@fluentui/react-components";
import {
  DataGridBody,
  DataGrid,
  DataGridRow,
  DataGridHeader,
  DataGridCell,
  DataGridHeaderCell,
  DataGridProps,
  RowRenderer,
} from "@fluentui-contrib/react-data-grid-react-window";
import { MoreHorizontalRegular } from "@fluentui/react-icons";
import { useTranslations } from "next-intl";
import { Item, itemsSample } from "./types";

const columnSizingOptions = {
  name: {
    minWidth: 120,
    defaultWidth: 180,
  },
  name2: {
    minWidth: 120,
    defaultWidth: 180,
    idealWidth: 180,
  },
  idEmployee: {
    minWidth: 120,
    defaultWidth: 180,
  },
  phone: {
    minWidth: 120,
    defaultWidth: 180,
    idealWidth: 180,
  },
  email: {
    minWidth: 120,
    defaultWidth: 180,
    idealWidth: 180,
  },
};

interface TableProps {
  query: string;
  currentPage: number;
  sortState: Parameters<NonNullable<DataGridProps["onSortChange"]>>[1];
  onSortChange: DataGridProps["onSortChange"];
  selectedRows: Set<TableRowId>;
  onSelectionChange: DataGridProps["onSelectionChange"];
}

export default function Table(props: Partial<TableProps>) {
  const { sortState, onSortChange, selectedRows, onSelectionChange } = props;

  const t = useTranslations("Salesperson-Information");
  const refMap = React.useRef<Record<string, HTMLElement | null>>({});

  const [isClient, setIsClient] = React.useState(false);
  const [salespersons, setSalespersons] = React.useState<Item[]>([]);

  const { targetDocument } = useFluent();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    async function fetchSalespersons() {
      try {
        const response = await fetchFilteredSalesperson(
          props.query || "",
          props.currentPage || 1
        );
        console.log(response);
        setSalespersons(response);
      } catch (error) {
        console.error("Error fetching resource:", error);
      }
    }

    fetchSalespersons();
  }, [isClient, props.currentPage, props.query]);

  if (!isClient) {
    return null;
  }

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
        return <MemoizedRow label={item.name.label} />;
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
        return <MemoizedRow label={item.name2.label} />;
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
        return <MemoizedRow label={item.idEmployee.label} />;
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
        return <MemoizedRow label={item.phone.label} />;
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
        return <MemoizedRow label={item.email.label} />;
      },
    }),
  ];

  const renderRow: RowRenderer<Item> = ({ item, rowId }, style) => (
    <DataGridRow<Item>
      key={rowId}
      style={style}
      selectionCell={{
        checkboxIndicator: { "aria-label": "Select row" },
      }}
    >
      {({ renderCell }) => (
        <DataGridCell focusMode="group">{renderCell(item)}</DataGridCell>
      )}
    </DataGridRow>
  );

  return (
    <div style={{ overflowX: "auto" }}>
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
        // items={itemsSample}
        columns={columns}
        sortable
        sortState={sortState}
        onSortChange={onSortChange}
        selectionMode="multiselect"
        selectedItems={selectedRows}
        onSelectionChange={onSelectionChange}
        getRowId={(item) => item.id}
        focusMode="composite"
        // focusMode="cell"
        style={{ minWidth: "550px" }}
        subtleSelection
        resizableColumns
        columnSizingOptions={columnSizingOptions}
        resizableColumnsOptions={{
          autoFitColumns: true,
        }}
      >
        <DataGridHeader style={{ paddingRight: scrollbarWidth }}>
          <DataGridRow
            selectionCell={{
              checkboxIndicator: { "aria-label": "Select all rows" },
            }}
          >
            {({ renderHeaderCell, columnId }, dataGrid) =>
              dataGrid.resizableColumns ? (
                <Menu openOnContext>
                  <MenuTrigger>
                    <DataGridHeaderCell
                      ref={(el) => {
                        refMap.current[columnId] = el;
                      }}
                    >
                      {renderHeaderCell()}
                    </DataGridHeaderCell>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem
                        onClick={dataGrid.columnSizing_unstable.enableKeyboardMode(
                          columnId
                        )}
                      >
                        Keyboard Column Resizing
                      </MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ) : (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )
            }
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item> itemSize={50} height={400}>
          {renderRow}
        </DataGridBody>
      </DataGrid>
    </div>
  );
}
