import React from "react";
import { styled } from "@mui/material/styles";
import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";

const TableHeadStyle = styled(TableHead)(({ theme }) => ({
  "&.MuiTableHead-root": {
    "& .MuiTableCell-root": {
      fontSize: "0.938rem",
      fontWeight: 500,
      background: "transparent",
      borderBottom: 0,
    },
  },
}));

const CommonTableHead = (props) => {
  const { columns, isChecked, onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHeadStyle>
      <TableRow>
        {isChecked && (
          <TableCell>
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
              sx={{
                "&.Mui-checked": {
                  color: "#4064e6",
                },
              }}
              disableRipple
            />
          </TableCell>
        )}

        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHeadStyle>
  );
};

export default CommonTableHead;
