import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CommonControll from "../../common/CommonControll";
import CommonTableHead from "../../common/CommonTableHead";
import CommonTitle from "../../common/CommonTitle";
import CommonDialog from "../../common/CommonDialog";
import CommonEmpty from "../../common/CommonEmpty";
import CommonButton from "../../common/CommonButton";
import cardImage from "../../assets/images/hana-kpass1.png";

const Root = styled(Box)(({ theme }) => ({}));

const PaperStyle = styled(Paper)(({ theme }) => ({
  "&.MuiPaper-root": {
    background: "transparent",
    boxShadow: "none",
  },
}));

const TableBodyStyle = styled(TableBody)(({ theme }) => ({
  "&.MuiTableBody-root": {
    "& .MuiTableRow-root": {
      "& .MuiTableCell-root": {
        padding: "6px",
        background: "#fff",
        borderBottom: "6px solid #F7F7F8",
        boxSizing: "border-box",
      },
      "& td:first-of-type": {
        width: 80,
        padding: "6px 16px",
      },
      "& td:last-of-type": {
        borderRadius: "0 10px 10px 0",
      },
    },
  },
}));

const TableCellStyle = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-root": {
    display: "flex",
    alignItems: "center",
    "& img": {
      width: 40,
    },
    "& span": {
      marginLeft: 16,
    },
  },
}));

const columns = [
  { id: "no", label: "번호", minWidth: 50, align: "center" },
  { id: "company", label: "카드사", minWidth: 80, align: "center" },
  { id: "title", label: "카드이름", minWidth: 600 },
  { id: "edit", label: "", minWidth: 80, align: "center" },
];

function createData(no, company, image, title) {
  return { no, company, image, title };
}
const rows = [
  createData(1, "현대", cardImage, "현대카드이름"),
  createData(2, "현대", cardImage, "현대카드이름"),
  createData(3, "현대", cardImage, "현대카드이름"),
];

const CardComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  const [delDialog, setDelDialog] = useState(false);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.no);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickDel = () => {
    setDelDialog(true);
  };
  const handleClosekDel = () => {
    setDelDialog(false);
  };

  return (
    <Root>
      <CommonTitle icon={<CreditCardIcon />} title={"카드 관리"} />

      <CommonControll
        placeholder={"카드사, 카드이름을 입력해주세요."}
        buttonText={"검색"}
        delBtn={true}
        notice={true}
        handleClickDel={handleClickDel}
      />

      <PaperStyle sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <CommonTableHead
              isChecked={true}
              columns={columns}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBodyStyle>
              {rows.length !== 0 ? (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    const isItemSelected = selected.includes(item.no);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        key={item.no}
                        tabIndex={-1}
                        onClick={(event) => handleClick(event, item.no)}
                        role="checkbox"
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            sx={{
                              "&.Mui-checked": {
                                color: "#4064e6",
                              },
                            }}
                            disableRipple
                          />
                        </TableCell>
                        <TableCell align="center">{item.no}</TableCell>
                        <TableCell align="center">{item.company}</TableCell>
                        <TableCellStyle>
                          <img src={item.image} alt={item.title} />
                          <span>{item.title}</span>
                        </TableCellStyle>
                        <TableCell align="center">
                          <CommonButton text="수정" />
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <CommonEmpty colSpan={6} />
              )}
            </TableBodyStyle>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </PaperStyle>
      {delDialog && (
        <CommonDialog
          open={delDialog}
          title={"카드 삭제"}
          cancelBtn={selected.length === 0 ? false : true}
          onClose={handleClosekDel}
          onClick={selected.length === 0 ? handleClosekDel : handleClosekDel}
          children={
            selected.length === 0 ? (
              <p>선택된 목록이 없습니다.</p>
            ) : (
              <p>{selected.length}개의 목록을 정말 삭제하시겠습니까?</p>
            )
          }
        />
      )}
    </Root>
  );
};

export default CardComponent;
