import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../common/CommonButton";
import { useParams } from "react-router-dom";
import { fetchNoticeDetail, deleteNotice } from "../../apis/NoticeApi";
import CommonDialog from "../../common/CommonDialog";

const Root = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 1050,
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& p": {
    marginLeft: 6,
  },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    padding: 0,
    color: "#000",
    "&:hover": {
      background: "transparent",
    },
  },
}));

const DateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 6,
  "& p": {
    color: "#909090",
  },
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  background: "#fff",
  boxSizing: "border-box",
  borderRadius: 8,
}));

const TitleStyle = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
}));

const BoldStyle = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    fontSize: "1.25rem",
    fontWeight: 500,
    padding: "16px",
    boxSizing: "border-box",
    borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
  },
}));

const ContnetsBox = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 380px)",
  overflowY: "auto",
  padding: "16px",
  boxSizing: "border-box",
  "& img": {
    maxWidth: "100%",
    marginBottom: 16,
  },
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#d9d9d9",
    borderRadius: "10px",
    backgroundClip: "padding-box",
    border: "3px solid transparent",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
    marginTop: 5,
  },
}));

const TextStyle = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    fontSize: "1rem",
  },
}));

const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: 16,
  "& button:first-of-type": {
    marginRight: 16,
  },
}));

const NoticeView = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [notice, setNotice] = useState([]); // 공지사항 데이터 상태
  const [delDialog, setDelDialog] = useState(false);
  const navigate = useNavigate();

  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await fetchNoticeDetail(id); // API 호출
        setNotice(data);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    };

    fetchNotice();
  }, [id]);

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleClickEdit = (noticeId) => {
    navigate(`/noticeEdit/${noticeId}`);
  };

  const handleClickDel = () => {
    setDelDialog(true);
  };

  const handleConfirmDel = async () => {
    try {
      // 삭제 API 호출
      await deleteNotice([id]);
      setDelDialog(false);
      navigate(`/noticeManagement`);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  const handleClosekDel = () => {
    setDelDialog(false);
  };

  const createdAt = notice.createdAt;
  // createdAt가 유효한지 확인
  const formattedDate = createdAt ? new Date(createdAt) : null;
  const dateString =
    formattedDate && !isNaN(formattedDate)
      ? formattedDate.toISOString().split("T")[0]
      : "날짜가 잘못됨";

  return (
    <Root>
      <HeaderBox>
        <ButtonStyle onClick={handleClickBack} disableRipple>
          <ChevronLeftIcon />
          <Typography>이전</Typography>
        </ButtonStyle>
      </HeaderBox>

      <TitleStyle>공지사항</TitleStyle>

      <DateBox>
        <Typography>등록일: {dateString}</Typography>
      </DateBox>

      <BoxStyle>
        <BoldStyle>{notice.title}</BoldStyle>
        <ContnetsBox>
          {notice.imgurl !== null ? (
            <img src={`${baseURL}${notice.imgurl}`} alt="공지 이미지" />
          ) : (
            ""
          )}

          <TextStyle>{notice.content}</TextStyle>
        </ContnetsBox>
      </BoxStyle>

      <ButtonBox>
        <CommonButton
          onClick={() => handleClickEdit(notice.noticeNo)}
          text="수정"
        />
        <CommonButton onClick={handleClickDel} bkColor={"red"} text="삭제" />
      </ButtonBox>

      {delDialog && (
        <CommonDialog
          open={delDialog}
          title={"공지사항 삭제"}
          cancelBtn={true}
          onClose={handleClosekDel}
          onClick={handleConfirmDel}
          children={<p>공지사항을 정말 삭제하시겠습니까?</p>}
        />
      )}
    </Root>
  );
};

export default NoticeView;
