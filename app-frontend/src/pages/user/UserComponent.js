import React, { useState, useEffect } from "react";
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
import CommonEmpty from "../../common/CommonEmpty";
import { handleDeleteUser, fetchSearchResults } from "../../apis/UserApi";
import CommonLoading from "../../common/CommonLoading";

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
        height: 68,
        boxSizing: "border-box",
        padding: "12px 16px",
        background: "#fff",
        borderBottom: "6px solid #F7F7F8",
      },
      "& span": {
        color: "red",
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

const UserComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectValue, setSelectValue] = useState("전체");
  const [searchInput, setSearchInput] = useState("");
  const [delDialog, setDelDialog] = useState(false);
  const [list, setList] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState(""); // 선택된 유저 이름 상태 추가
  const [selectedUserNum, setSelectedUserNum] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [secession, setSecession] = useState(false); // 탈퇴 회원

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true); // 데이터 로드 시작 시 로딩 상태 true
      try {
        const data = await fetchSearchResults("", ""); // API 호출
        const sortedList = data.sort((a, b) => a.userNum - b.userNum).slice();
        setList(sortedList); // 초기에는 전체 데이터를 표시
      } catch (error) {
        console.error("전체 데이터를 불러오지 못했습니다:", error);
      } finally {
        setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 false
      }
    };

    getUsers();
  }, []);

  const selectList = [
    { label: "전체" },
    { label: "아이디" },
    { label: "이름" },
  ];

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSearchResults(searchInput, selectValue); // 검색 API 호출
      const sortedList = data.sort((a, b) => a.userNum - b.userNum).slice();
      setList(sortedList); // 검색된 결과로 리스트 갱신
    } catch (error) {
      console.error("검색 데이터를 불러오지 못했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleConfirmDel = async (userNum) => {
    try {
      await handleDeleteUser(userNum); // API 호출

      // 상태 업데이트: 해당 유저를 탈퇴 처리로 변경
      setList((prevList) =>
        prevList.map((user) =>
          user.userNum === userNum ? { ...user, state: 0 } : user
        )
      );

      // 삭제후 다시 리스트 출력
      handleSearch();
    } catch (error) {
      alert("회원 탈퇴 처리에 실패했습니다.");
    } finally {
      handleClosekDel();
    }
  };

  const handleClickDel = (name, userNum) => {
    setSelectedUserName(name);
    setSelectedUserNum(userNum);
    setDelDialog(true);
  };

  const handleClosekDel = () => {
    setSelectedUserName("");
    setSelectedUserNum("");
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

  // 체크박스 변경 시 탈퇴 회원만 보기 상태 업데이트
  const handleSecessionChange = async (event) => {
    const checked = event.target.checked; // 체크박스의 체크 여부

    // secession 상태 업데이트
    setSecession(checked);

    // 체크박스가 체크되면 탈퇴 회원만 필터링, 아니면 전체 리스트로 복원
    if (checked) {
      const filteredList = list.filter((user) => user.state === 0); // 탈퇴 회원만 표시
      setList(filteredList);
    } else {
      try {
        const data = await fetchSearchResults("", ""); // API 호출
        const sortedList = data.sort((a, b) => a.userNum - b.userNum).slice();
        setList(sortedList); // 초기에는 전체 데이터를 표시
      } catch (error) {
        console.error("전체 데이터를 불러오지 못했습니다:", error);
        console.log("탈퇴 회원 보기 상태:", secession);
      } finally {
        setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 false
      }
    }
  };

  return (
    <Root>
      <CommonTitle icon={<GroupsIcon />} title={"회원 관리"} />

      <CommonControll
        placeholder={getPlaceholder()}
        buttonText={"검색"}
        selectList={selectList}
        value={selectValue}
        setValue={setSelectValue}
        searchInput={searchInput} // 검색어 전달
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        secession={true}
        handleSecessionChange={handleSecessionChange}
      />

      <PaperStyle sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <CommonTableHead columns={columns} />
            <TableBodyStyle>
              {isLoading ? (
                <CommonLoading colSpan={8} />
              ) : list.length !== 0 ? (
                list
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, i) => (
                    <TableRow hover tabIndex={-1} key={item.userNum}>
                      <TableCell align="center">{item.userNum}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell>{item.userId}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.detailAddress}</TableCell>
                      <TableCell align="center">
                        {new Date(item.createdAt).toISOString().split("T")[0]}
                      </TableCell>
                      <TableCell align="center">
                        {item.state === 0 ? (
                          <span>
                            {
                              new Date(item.updatedAt)
                                .toISOString()
                                .split("T")[0]
                            }
                          </span>
                        ) : (
                          <CommonButton
                            bkColor={"red"}
                            text="탈퇴"
                            onClick={() =>
                              handleClickDel(item.name, item.userNum)
                            }
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <CommonEmpty colSpan={8} />
              )}
            </TableBodyStyle>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={list.length}
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
          onClick={() => handleConfirmDel(selectedUserNum)}
          children={
            <p>
              <span style={{ fontWeight: "bold", color: "#4064e6" }}>
                {selectedUserName}
              </span>
              님을 정말 탈퇴하시겠습니까?
            </p>
          }
        />
      )}
    </Root>
  );
};

export default UserComponent;
