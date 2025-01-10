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
  Checkbox,
} from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CommonControll from "../../common/CommonControll";
import CommonTableHead from "../../common/CommonTableHead";
import CommonTitle from "../../common/CommonTitle";
import CommonDialog from "../../common/CommonDialog";
import CommonEmpty from "../../common/CommonEmpty";
import {
  fetchSearchCommunity,
  deleteCommunityItems,
} from "../../apis/CommunityApi";
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
        padding: "12px 16px",
        background: "#fff",
        borderBottom: "6px solid #F7F7F8",
        "&:first-of-type": {
          width: 80,
          boxSizing: "border-box",
        },
      },
      "& td:first-of-type": {
        width: 80,
        boxSizing: "border-box",
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
  { id: "title", label: "제목", minWidth: 300 },
  { id: "name", label: "작성자", minWidth: 100, align: "center" },
  { id: "date", label: "등록일", minWidth: 100, align: "center" },
];

const CommunityComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = React.useState([]); // 체크박스
  const [selectValue, setSelectValue] = useState("카테고리"); // 검색
  const [delDialog, setDelDialog] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // 검색입력
  const [list, setList] = useState([]); // 현재 표시할 리스트
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true); // 데이터 로드 시작 시 로딩 상태 true
      try {
        const data = await fetchSearchCommunity("", ""); // API 호출
        const sortedList = data.sort((a, b) => a.no - b.no);
        setList(sortedList); // 초기에는 전체 데이터를 표시
      } catch (error) {
        console.error("전체 데이터를 불러오지 못했습니다:", error);
      } finally {
        setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 false
      }
    };

    fetchAllData();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = list.map((n) => n.no);
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

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSearchCommunity(searchInput, selectValue); // 검색 API 호출
      const sortedList = data.sort((a, b) => a.no - b.no);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const selectList = [
    { label: "카테고리" },
    { label: "작성자" },
    { label: "제목" },
  ];

  const handleConfirmDel = async () => {
    try {
      // 삭제 API 호출
      await deleteCommunityItems(selected); 

      // 삭제 성공 후 리스트 갱신
      const updatedList = list.filter((item) => !selected.includes(item.no));
      setList(updatedList); // 현재 리스트에서 삭제된 항목 제거
      setSelected([]); // 선택 초기화
      setDelDialog(false);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  const handleClickDel = () => {
    setDelDialog(true);
  };

  const handleClosekDel = () => {
    setDelDialog(false);
  };

  const getPlaceholder = () => {
    const placeholders = {
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
        placeholder={getPlaceholder()}
        buttonText={"검색"}
        selectList={selectList}
        value={selectValue}
        setValue={setSelectValue}
        delBtn={true}
        handleClickDel={handleClickDel}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />

      <PaperStyle sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <CommonTableHead
              isChecked={true}
              columns={columns}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={list.length}
            />
            <TableBodyStyle>
              {isLoading ? (
                <CommonLoading colSpan={6} />
              ) : list.length !== 0 ? (
                list
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
                        <TableCell>
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
                        <TableCell align="center">{item.userid}</TableCell>
                        <TableCell align="center">{item.regdate}</TableCell>
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
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </PaperStyle>

      {delDialog && (
        <CommonDialog
          open={isLoading ? false : delDialog}
          title={"커뮤니티 삭제"}
          cancelBtn={selected.length === 0 ? false : true}
          onClose={handleClosekDel}
          onClick={selected.length === 0 ? handleClosekDel : handleConfirmDel}
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

export default CommunityComponent;
