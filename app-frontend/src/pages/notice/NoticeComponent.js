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
import DescriptionIcon from "@mui/icons-material/Description";
import CommonControll from "../../common/CommonControll";
import CommonTableHead from "../../common/CommonTableHead";
import CommonTitle from "../../common/CommonTitle";
import CommonDialog from "../../common/CommonDialog";
import CommonEmpty from "../../common/CommonEmpty";
import CommonButton from "../../common/CommonButton";
import { useNavigate } from "react-router-dom";
import { fetchSearchNotice, deleteNotice } from "../../apis/NoticeApi";
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

const NoticeComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = React.useState([]);
  const [delDialog, setDelDialog] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // 검색입력
  const [list, setList] = useState([]); // 현재 표시할 리스트
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true); // 데이터 로드 시작 시 로딩 상태 true
      try {
        const data = await fetchSearchNotice("", ""); // API 호출
        const sortedList = data.sort((a, b) => a.noticeNo - b.noticeNo);
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
      const newSelected = list.map((n) => n.noticeNo);
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
      const data = await fetchSearchNotice(searchInput); // 검색 API 호출
      const sortedList = data.sort((a, b) => a.noticeNo - b.noticeNo);
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

  const handleConfirmDel = async () => {
    try {
      // 삭제 API 호출
      await deleteNotice(selected);

      // 삭제 성공 후 리스트 갱신
      const updatedList = list.filter(
        (item) => !selected.includes(item.noticeNo)
      );
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

  const handleClickWrite = () => {
    navigate("/noticeWrite");
  };

  const handleClickView = (noticeId) => {
    navigate(`/noticeView/${noticeId}`); // ID를 포함한 경로로 이동
  };

  const handleClickEdit = (noticeId) => {
    navigate(`/noticeEdit/${noticeId}`);
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
                    const isItemSelected = selected.includes(item.noticeNo);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        key={item.noticeNo}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                      >
                        <TableCell>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) =>
                              handleClick(event, item.noticeNo)
                            }
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
                        <TableCell align="center">{item.noticeNo}</TableCell>
                        <LinkTableCellStyle
                          onClick={() => handleClickView(item.noticeNo)}
                        >
                          {item.title}
                        </LinkTableCellStyle>
                        <TableCell align="center">
                          {new Date(item.createdAt).toISOString().split("T")[0]}
                        </TableCell>
                        <TableCell align="center">
                          {item.updatedAt
                            ? new Date(item.updatedAt)
                                .toISOString()
                                .split("T")[0]
                            : ""}
                        </TableCell>
                        <TableCell align="center">
                          <CommonButton
                            text="수정"
                            onClick={() => handleClickEdit(item.noticeNo)}
                          />
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
          title={"공지사항 삭제"}
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

export default NoticeComponent;
