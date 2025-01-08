import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import CommonTextField from "../../common/CommonTextField";
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

const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: 40,
}));

const FlexBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
  "& .MuiFormControl-root": {
    width: "calc(100% - 120px) !important",
  },
}));

const UploadFlexBox = styled(FlexBox)(({ theme }) => ({
  "& .MuiFormControl-root": {
    width: "calc(100% - 120px - 116px) !important",
  },
}));

const Titlestyle = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
}));

const TextStyle = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    width: 120,
    fontSize: "1.125rem",
    fontWeight: 500,
  },
}));

const TextareaStyle = styled("textarea")(({ theme }) => ({
  width: "calc(100% - 120px)",
  borderRadius: 3,
  border: "1px solid rgba(0, 0, 0, 0.23)",
  outline: "none",
  fontSize: "1rem",
  padding: "8px 10px",
  color: "#000",
  resize: "none",
  boxSizing: "border-box",
  "&::placeholder": {
    opacity: 0.7,
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

const UploadButton = styled(Button)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    width: 100,
    height: 39,
    background: "#4064e6",
    color: "#fff",
    borderRadius: 3,
    boxShadow: "none",
    marginLeft: 16,
    "&:hover": {
      background: "#4064e6",
    },
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: 36,
  "& button:first-of-type": {
    marginRight: 16,
  },
}));

const NoticeWrite = () => {
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(-1);
  };
  return (
    <Root>
      <HeaderBox>
        <ButtonStyle onClick={handleClickEdit} disableRipple>
          <ChevronLeftIcon />
          <Typography>목록</Typography>
        </ButtonStyle>
      </HeaderBox>

      <Titlestyle>공지사항 등록</Titlestyle>

      <BoxStyle>
        <FlexBox>
          <TextStyle>제목</TextStyle>
          <CommonTextField placeholder="제목을 입력하세요." />
        </FlexBox>

        <FlexBox style={{ alignItems: "flex-start" }}>
          <TextStyle>내용</TextStyle>
          <TextareaStyle rows={20} placeholder="내용을 입력하세요." />
        </FlexBox>

        <UploadFlexBox>
          <TextStyle>사진 첨부</TextStyle>
          <CommonTextField placeholder="사진을 선택해주세요." />
          <UploadButton
            component="label"
            role={undefined}
            variant="contained"
            disableRipple
          >
            사진 등록
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </UploadButton>
        </UploadFlexBox>
      </BoxStyle>

      <ButtonBox>
        <CommonButton text="등록" />
        <CommonButton bkColor={"red"} text="취소" />
      </ButtonBox>
    </Root>
  );
};

export default NoticeWrite;
