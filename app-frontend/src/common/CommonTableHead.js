import React from "react";
import { styled } from "@mui/material/styles";
import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeadStyle = styled(TableHead)(({ theme }) => ({
  "&.MuiTableHead-root": {
    "& .MuiTableCell-root": {
      fontSize: "0.938rem",
      fontWeight: "bold",
      background: "transparent",
      borderBottom: 0,
    },
  },
}));

const CommonTableHead = ({ columns, text }) => {
  return (
    <TableHeadStyle>
      <TableRow>
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
