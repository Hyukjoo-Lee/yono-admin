import React from "react";
import { styled } from "@mui/material/styles";
import { TableRow, TableCell, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const TableRowStyle = styled(TableRow)(({ theme }) => ({
  "&.MuiTableRow-root": {
    "& .MuiTableCell-root": {
      borderBottom: "0",
      borderRadius: "10px !important",
      padding: "60px 16px",
      "& div": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        "& p": {
          fontSize: "1.125rem",
          background: "#fff",
          marginTop: 10,
        },
        "& span": {
          color: "#4064e6 !important",
        },
      },
    },
  },
}));

const CommonLoading = ({ colSpan }) => {
  return (
    <TableRowStyle>
      <TableCell align="center" colSpan={colSpan}>
        <Box>
          <CircularProgress />
          <p>데이터 불러오는 중...</p>
        </Box>
      </TableCell>
    </TableRowStyle>
  );
};

export default CommonLoading;
