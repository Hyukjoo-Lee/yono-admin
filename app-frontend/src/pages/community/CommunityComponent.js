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
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CommonControll from "../../common/CommonControll";
import CommonTableHead from "../../common/CommonTableHead";
import CommonTitle from "../../common/CommonTitle";
import CommonDialog from "../../common/CommonDialog";

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

const columns = [
  { id: "no", label: "번호", minWidth: 50, align: "center" },
  { id: "category", label: "카테고리", minWidth: 100, align: "center" },
  { id: "title", label: "제목", minWidth: 220 },
  { id: "name", label: "작성자", minWidth: 100, align: "center" },
  { id: "date", label: "등록일", minWidth: 100, align: "center" },
];

function createData(no, category, title, name, date) {
  return { no, category, title, name, date };
}

const rows = [
  createData(1, "정보공유", "정보공유합니다!!!!", "홍길동", "2025-01-07"),
  createData(2, "정보공유", "정보공유합니다!!!!", "홍길동", "2025-01-07"),
];

const CommunityComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = React.useState([]);

  const [selectValue, setSelectValue] = useState("전체");
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

  const selectList = [
    { label: "전체" },
    { label: "카테고리" },
    { label: "작성자" },
    { label: "제목" },
  ];

  const handleClickDel = () => {
    setDelDialog(true);
  };

  const handleClosekDel = () => {
    setDelDialog(false);
  };

  const getPlaceholder = () => {
    const placeholders = {
      전체: "검색할 키워드를 입력해주세요.",
      카테고리: "카테고리를 입력해주세요.",
      작성자: "작성자를 입력해주세요.",
      제목: "제목을 입력해주세요.",
    };
    return placeholders[selectValue] || "검색할 키워드를 입력해주세요";
  };

  return (
    <Root>
      <CommonTitle icon={<Diversity3Icon />} title={"커뮤니티 관리"} />

      <CommonControll
        length={rows.length}
        placeholder={getPlaceholder()}
        buttonText={"검색"}
        selectList={selectList}
        value={selectValue}
        setValue={setSelectValue}
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
              {rows
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
                      <TableCell align="center">{item.category}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.date}</TableCell>
                    </TableRow>
                  );
                })}
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
          title={"커뮤니티 삭제"}
          cancelBtn={true}
          onClose={handleClosekDel}
          children={<p>파일을 정말 삭제하시겠습니까?</p>}
        />
      )}
    </Root>
  );
};

export default CommunityComponent;
