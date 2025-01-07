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
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import CommonControll from "../../common/CommonControll";
import CommonTableHead from "../../common/CommonTableHead";
import CommonTitle from "../../common/CommonTitle";
import CommonButton from "../../common/CommonButton";
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
  { id: "name", label: "이름", minWidth: 100, align: "center" },
  { id: "id", label: "아이디", minWidth: 100 },
  { id: "email", label: "이메일", minWidth: 170 },
  { id: "address", label: "주소", minWidth: 170 },
  { id: "detailAddress", label: "상세주소", minWidth: 170 },
  { id: "date", label: "가입일", minWidth: 100, align: "center" },
  { id: "delete", label: "탈퇴", minWidth: 100, align: "center" },
];

function createData(no, name, id, email, address, detailAddress, date) {
  return { no, name, id, email, address, detailAddress, date };
}

const rows = [
  createData(
    1,
    "홍길동",
    "hong1234",
    "hong@naver.com",
    "서울 종로구 돈화문로 26",
    "단성사 빌딩 404호",
    "2025-01-07"
  ),
  createData(
    2,
    "이순신이순신이순신",
    "lee1234lee1234lee1234",
    "leeleeleeleelee@naver.com",
    "서울 종로구 돈화문로 26서울 종로구 돈화문로 26",
    "단성사 빌딩 404호단성사 빌딩 404호단성사 빌딩 404호",
    "2025-01-07"
  ),
  createData(
    3,
    "이순신",
    "lee1234",
    "lee@naver.com",
    "서울 종로구 돈화문로 26",
    "단성사 빌딩 404호",
    "2025-01-07"
  ),
];

const UserComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectValue, setSelectValue] = useState("전체");
  const [delDialog, setDelDialog] = useState(false);

  const selectList = [
    { label: "전체" },
    { label: "아이디" },
    { label: "이름" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickDel = () => {
    setDelDialog(true);
  };

  const handleClosekDel = () => {
    setDelDialog(false);
  };

  const getPlaceholder = () => {
    const placeholders = {
      전체: "아이디 또는 이름을 입력해주세요.",
      아이디: "아이디를 입력해주세요.",
      이름: "이름을 입력해주세요.",
    };
    return placeholders[selectValue] || "검색어를 입력해주세요.";
  };

  return (
    <Root>
      <CommonTitle icon={<GroupsIcon />} title={"회원관리"} />

      <CommonControll
        length={rows.length}
        placeholder={getPlaceholder()}
        buttonText={"검색"}
        selectList={selectList}
        value={selectValue}
        setValue={setSelectValue}
      />

      <PaperStyle sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <CommonTableHead columns={columns} />
            <TableBodyStyle>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, i) => (
                  <TableRow hover tabIndex={-1} key={item.no}>
                    <TableCell align="center">{item.no}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.detailAddress}</TableCell>
                    <TableCell align="center">{item.date}</TableCell>
                    <TableCell align="center">
                      <CommonButton
                        bkColor={"red"}
                        text="탈퇴"
                        onClick={handleClickDel}
                      />
                    </TableCell>
                  </TableRow>
                ))}
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
          title={"회원탈퇴"}
          cancelBtn={true}
          onClose={handleClosekDel}
          children={<p>"홍길동"님을 정말 삭제하시겠습니까?</p>}
        />
      )}
    </Root>
  );
};

export default UserComponent;
