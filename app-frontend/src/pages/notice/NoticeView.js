import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../common/CommonButton";

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
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(-1);
  };
  return (
    <Root>
      <HeaderBox>
        <ButtonStyle onClick={handleClickEdit} disableRipple>
          <ChevronLeftIcon />
          <Typography>공지사항 관리</Typography>
        </ButtonStyle>
      </HeaderBox>

      <TitleStyle>공지사항</TitleStyle>

      <DateBox>
        <Typography>등록일: 2025.01.01</Typography>
      </DateBox>

      <BoxStyle>
        <BoldStyle>제목이지롱</BoldStyle>
        <ContnetsBox>
          <TextStyle>내용이지롱</TextStyle>
        </ContnetsBox>
      </BoxStyle>

      <ButtonBox>
        <CommonButton text="수정" />
        <CommonButton bkColor={"red"} text="삭제" />
      </ButtonBox>
    </Root>
  );
};

export default NoticeView;
