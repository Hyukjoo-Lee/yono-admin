import React from "react";
import { styled } from "@mui/material/styles";
import { TableRow, TableCell } from "@mui/material";

const TableRowStyle = styled(TableRow)(({ theme }) => ({
  "&.MuiTableRow-root": {
    "& .MuiTableCell-root": {
      fontSize: "1.125rem",
      background: "#fff",
      borderBottom: "0",
      borderRadius: "10px !important",
      padding: "24px 16px",
    },
  },
}));

const CommonEmpty = ({ colSpan }) => {
  return (
    <TableRowStyle>
      <TableCell align="center" colSpan={colSpan}>
        데이터가 없습니다.
      </TableCell>
    </TableRowStyle>
  );
};

export default CommonEmpty;
