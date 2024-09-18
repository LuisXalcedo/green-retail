import * as React from "react";
import { TableCellLayout } from "@fluentui/react-components";

interface RowProps {
  // index: number;
  label: string;
}

// eslint-disable-next-line react/display-name
const MemoizedRow: React.FC<RowProps> = React.memo(({ label }) => {
  return (
    <TableCellLayout>
      {/* <strong>[{index}] </strong> */}
      {label}
    </TableCellLayout>
  );
});

export default MemoizedRow;
