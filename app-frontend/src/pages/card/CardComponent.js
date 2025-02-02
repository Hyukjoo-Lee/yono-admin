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
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CommonControll from "../../common/CommonControll";
import CommonTableHead from "../../common/CommonTableHead";
import CommonTitle from "../../common/CommonTitle";
import CommonDialog from "../../common/CommonDialog";
import CommonEmpty from "../../common/CommonEmpty";
import CommonButton from "../../common/CommonButton";
import { useNavigate } from "react-router-dom";
import { deleteCardItems, fetchSearchCard } from "../../apis/CardApi";
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
        minHeight: 81,
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

const cardProviderMap = {
  nh: "농협",
  hana: "하나",
  kb: "국민",
  samsung: "삼성",
  hyundai: "현대",
  shinhan: "신한",
  // 필요한 카드사 추가 가능
};

const CardComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // 검색입력
  const [list, setList] = useState([]); // 현재 표시할 리스트
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [delDialog, setDelDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true); // 데이터 로드 시작 시 로딩 상태 true
      try {
        const data = await fetchSearchCard("", ""); // API 호출
        const sortedList = data.sort((a, b) => b.cardId - a.cardId);
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
      const newSelected = list.map((n) => n.cardId);
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
      const data = await fetchSearchCard(searchInput); // 검색 API 호출
      const sortedList = data.sort((a, b) => b.cardId - a.cardId);
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

  const handleClickWrite = () => {
    navigate("/cardWrite");
  };

  const handleClickDel = async () => {
    setDelDialog(true);
  };

  const handleConfirmDel = async () => {
    setIsLoading(true);
    try {
      await deleteCardItems(selected);

      const updatedList = list.filter((item) => !selected.includes(item.no));
      setList(updatedList); // 현재 리스트에서 삭제된 항목 제거
      setSelected([]); // 선택 초기화

      setTimeout(() => {
        window.location.reload();
      }, 1000);

      setDelDialog(false);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
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
        handleClickWrite={handleClickWrite}
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
                    const isItemSelected = selected.includes(item.cardId);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        key={item.cardId}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, item.cardId)}
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
                        <TableCell align="center">{item.cardId}</TableCell>
                        <TableCell align="center">
                          {cardProviderMap[item.cardProvider] ||
                            item.cardProvider}
                        </TableCell>
                        <TableCellStyle>
                          <img
                            src={`http://localhost:8069${item.cardImgUrl}`}
                            alt={item.cardTitle}
                          />
                          <span>{item.cardTitle}</span>
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
          title={"카드 삭제"}
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

export default CardComponent;
