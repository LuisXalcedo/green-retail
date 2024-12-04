import * as React from "react";
import { TableCellLayout } from "@fluentui/react-components";

interface RowProps {
  // index: number;
  label: string;
}

// eslint-disable-next-line react/display-name
const MemoizedRow: React.FC<RowProps> = React.memo(
  ({ label }) => {
    return (
      <TableCellLayout>
        {/* <strong>[{index}] </strong> */}
        {label}
      </TableCellLayout>
    );
  },
  (prevProps, nextProps) => prevProps.label === nextProps.label
);

export default MemoizedRow;
