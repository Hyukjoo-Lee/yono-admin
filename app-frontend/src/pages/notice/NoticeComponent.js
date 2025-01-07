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
import DescriptionIcon from "@mui/icons-material/Description";
import CommonControll from "../../common/CommonControll";
import CommonTableHead from "../../common/CommonTableHead";
import CommonTitle from "../../common/CommonTitle";
import CommonDialog from "../../common/CommonDialog";
import CommonEmpty from "../../common/CommonEmpty";
import CommonButton from "../../common/CommonButton";
import { useNavigate } from "react-router-dom";

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
        background: "#fff",
        borderBottom: "6px solid #F7F7F8",
      },
      "& td:first-of-type": {
        borderRadius: "10px 0 0 10px",
      },
      "& td:last-of-type": {
        borderRadius: "0 10px 10px 0",
      },
    },
  },
}));

const LinkTableCellStyle = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-root": {
    textDecoration: "underline",
    color: "#4064e6",
    cursor: "pointer",
  },
}));

const columns = [
  { id: "no", label: "번호", minWidth: 50, align: "center" },
  { id: "title", label: "제목", minWidth: 400 },
  { id: "date", label: "등록일", minWidth: 100, align: "center" },
  { id: "update", label: "수정일", minWidth: 100, align: "center" },
];

function createData(no, title, date, update) {
  return { no, title, date, update };
}

const rows = [
  createData(1, "공지글이지롱~", "2025-01-07", "2025-01-08"),
  createData(2, "공지글이지롱~", "2025-01-07", ""),
  createData(3, "공지글이지롱~", "2025-01-07", ""),
];

const NoticeComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = React.useState([]);

  const [delDialog, setDelDialog] = useState(false);
  const navigate = useNavigate();

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

  const handleClickWrite = () => {
    navigate("/notice/write");
  };

  const handleClickView = () => {
    navigate("/notice/view");
  };

  const handleClickEdit = () => {
    navigate("/notice/edit");
  };

  return (
    <Root>
      <CommonTitle icon={<DescriptionIcon />} title={"공지사항 관리"} />

      <CommonControll
        placeholder={"제목을 입력하세요"}
        buttonText={"검색"}
        delBtn={true}
        notice={true}
        handleClickDel={handleClickDel}
        handleClickWrite={handleClickWrite}
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
                        role="checkbox"
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, item.no)}
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
                        <LinkTableCellStyle onClick={handleClickView}>
                          {item.title}
                        </LinkTableCellStyle>
                        <TableCell align="center">{item.date}</TableCell>
                        <TableCell align="center">{item.update}</TableCell>
                        <TableCell align="center">
                          <CommonButton text="수정" onClick={handleClickEdit} />
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
          title={"공지사항 삭제"}
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

export default NoticeComponent;
