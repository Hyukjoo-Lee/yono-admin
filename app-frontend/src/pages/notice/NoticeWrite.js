import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import CommonTextField from "../../common/CommonTextField";
import CommonButton from "../../common/CommonButton";
import { createNotice } from "../../apis/NoticeApi";
import CloseIcon from "@mui/icons-material/Close";
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

const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: 40,
}));

const FlexBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
}));

const FlexBoxIn = styled(Box)(({ theme }) => ({
  width: "calc(100% - 120px)",
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    fontSize: "0.875rem",
    color: "red",
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

const FileBox = styled(Box)(({ theme }) => ({
  width: "calc(100% - 120px - 116px)",
  height: 39,
  display: "flex",
  alignItems: "center",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  boxSizing: "border-box",
  borderRadius: 3,
  padding: "8px 10px",
  background: "#fff",
  "& .MuiTypography-root": {
    color: "#000",
    opacity: 0.4,
  },
  "& .MuiButtonBase-root": {
    minWidth: 30,
    padding: 0,
    "&:hover": {
      background: "transparent",
    },
    "& svg": {
      width: 20,
      height: 20,
      fill: "#4064e6",
    },
  },
}));

const TextareaStyle = styled("textarea")(({ theme }) => ({
  width: "100%",
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
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState(""); // 제목 상태 추가
  const [content, setContent] = useState(""); // 내용 상태 추가
  const [errors, setErrors] = useState({ title: false, content: false });
  const [delDialog, setDelDialog] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value); // 제목 변경 핸들러
    if (event.target.value.trim() !== "") {
      setErrors((prev) => ({ ...prev, title: false }));
    }
  };
  const handleContentChange = (event) => {
    setContent(event.target.value); // 내용 변경 핸들러
    if (event.target.value.trim() !== "") {
      setErrors((prev) => ({ ...prev, content: false }));
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }

    event.target.value = "";
  };

  const handleSubmit = async () => {
    const newErrors = {
      title: title.trim() === "",
      content: content.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.content) {
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("file", file); // 파일이 있을 때만 추가
    }
    formData.append("title", title);
    formData.append("content", content);

    try {
      const response = await createNotice(formData);
      console.log("Notice created successfully:", response);
      setDelDialog(true);
    } catch (error) {
      console.error("Error creating notice:", error);
    }
  };

  const handleCloseDialog = () => {
    navigate("/noticeManagement"); // 리스트 페이지로 이동
  };

  const handleClickCancel = () => {
    setTitle("");
    setContent("");
    setFile(null);
    setFileName("");
  };

  const handleClickEdit = () => {
    navigate(-1);
  };

  const handleFileDelete = () => {
    setFile(null); // 선택된 파일 초기화
    setFileName("");
  };

  return (
    <Root>
      <HeaderBox>
        <ButtonStyle onClick={handleClickEdit} disableRipple>
          <ChevronLeftIcon />
          <Typography>이전</Typography>
        </ButtonStyle>
      </HeaderBox>

      <Titlestyle>공지사항 등록</Titlestyle>

      <BoxStyle>
        <FlexBox>
          <TextStyle
            style={!errors.title ? { paddingBottom: 0 } : { paddingBottom: 25 }}
          >
            제목
          </TextStyle>
          <FlexBoxIn>
            <CommonTextField
              id={"title"}
              name={"title"}
              placeholder="제목을 입력하세요."
              value={title}
              onChange={handleTitleChange}
            />
            {errors.title && <ErrorText>제목을 입력해주세요.</ErrorText>}
          </FlexBoxIn>
        </FlexBox>

        <FlexBox style={{ alignItems: "flex-start" }}>
          <TextStyle>내용</TextStyle>
          <FlexBoxIn>
            <TextareaStyle
              rows={20}
              placeholder="내용을 입력하세요."
              value={content}
              onChange={handleContentChange} // 내용 입력 핸들러 연결
            />
            {errors.content && <ErrorText>내용을 입력해주세요.</ErrorText>}
          </FlexBoxIn>
        </FlexBox>

        <UploadFlexBox>
          <TextStyle>사진 첨부</TextStyle>
          <FileBox>
            <Box>
              {fileName ? (
                <Typography>{fileName}</Typography>
              ) : (
                <Typography>사진을 선택해주세요.</Typography>
              )}
            </Box>
            {fileName && (
              <Button onClick={handleFileDelete}>
                <CloseIcon />
              </Button>
            )}
          </FileBox>
          <UploadButton
            component="label"
            role={undefined}
            variant="contained"
            disableRipple
          >
            사진 등록
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </UploadButton>
        </UploadFlexBox>
      </BoxStyle>

      <ButtonBox>
        <CommonButton onClick={handleSubmit} text="등록" />
        <CommonButton
          type="Reset"
          bkColor={"red"}
          text="취소"
          onClick={handleClickCancel}
        />
      </ButtonBox>

      {delDialog && (
        <CommonDialog
          open={delDialog}
          title={"공지사항 등록록"}
          onClose={handleCloseDialog}
          onClick={handleCloseDialog}
          children={<p>공지사항이 등록록되었습니다.</p>}
        />
      )}
    </Root>
  );
};

export default NoticeWrite;
