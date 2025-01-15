import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import CommonTextField from "../../common/CommonTextField";
import CommonButton from "../../common/CommonButton";
import { updateNotice, fetchNoticeDetail } from "../../apis/NoticeApi";
import { useParams } from "react-router-dom";
import CommonDialog from "../../common/CommonDialog";
import CloseIcon from "@mui/icons-material/Close";

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
  "& .MuiFormControl-root": {},
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

const UploadFlexBox = styled(FlexBox)(({ theme }) => ({}));

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

const NoticeEdit = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notice, setNotice] = useState({ imgurl: "" }); // 공지사항 데이터 상태
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({ title: false, content: false });
  const navigate = useNavigate();
  const [delDialog, setDelDialog] = useState(false);
  const [isImageDeleted, setIsImageDeleted] = useState(false); // 이미지 삭제 여부

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await fetchNoticeDetail(id); // API 호출
        setNotice(data); // 공지사항 데이터 설정
        setTitle(data.title || ""); // 제목 초기값 설정
        setContent(data.content || ""); // 내용 초기값 설정
        setFile(data.imgurl || null);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    };

    fetchNotice();
  }, [id]);

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

  const handleFileDelete = () => {
    setFile(null); // 선택된 파일 초기화
    setNotice((prev) => ({ ...prev, imgurl: null })); // UI에서 이미지 제거
    setIsImageDeleted(true); // 이미지 삭제 상태 설정
  };

  const handleUpdate = async () => {
    const newErrors = {
      title: title.trim() === "",
      content: content.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.content) {
      return;
    }

    const formData = new FormData();
    formData.append("id", id); // 수정할 공지사항 ID
    formData.append("title", title);
    formData.append("content", content);

    // 파일 정보 처리
    if (file) {
      // 파일이 있을 때: 기존 이미지 삭제 후 새로운 이미지 추가
      formData.append("file", file); // 새 파일 추가

      // 기존 이미지 삭제 요청 (만약 존재한다면)
      if (notice.imgurl && isImageDeleted) {
        formData.append("imgurl", "deleted"); // 기존 이미지 삭제 요청
      }
    } else if (isImageDeleted) {
      formData.append("imgurl", "deleted"); // 이미지 삭제 요청
    } else {
      formData.append("imgurl", notice.imgurl); // 기존 이미지 유지
    }

    const success = await updateNotice(formData);
    if (success) {
      setDelDialog(true);
    } else {
      alert("공지사항 수정에 실패했습니다.");
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile); // 새 파일 저장
      setNotice((prev) => ({
        ...prev,
        imgurl: selectedFile.name, // UI에 선택한 파일명 표시
      }));
      setIsImageDeleted(true); // 이미지 삭제 상태 해제
    }
    event.target.value = "";
  };

  const handleClickReset = () => {
    setTitle(notice.title); // 제목 초기화
    setContent(notice.content); // 내용 초기화
    setFile(notice.imgurl); // 이미지 초기화
    navigate("/noticeList");
  };

  const handleCloseDialog = () => {
    navigate("/noticeList"); // 리스트 페이지로 이동
  };

  const handleClickEdit = () => {
    navigate(-1);
  };

  return (
    <Root>
      <HeaderBox>
        <ButtonStyle onClick={handleClickEdit} disableRipple>
          <ChevronLeftIcon />
          <Typography>이전</Typography>
        </ButtonStyle>
      </HeaderBox>

      <Titlestyle>공지사항 수정</Titlestyle>

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
              value={title}
              placeholder="제목을 입력하세요."
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
              value={content}
              placeholder="내용을 입력하세요."
              onChange={handleContentChange}
            />
            {errors.content && <ErrorText>내용을 입력해주세요.</ErrorText>}
          </FlexBoxIn>
        </FlexBox>

        <UploadFlexBox>
          <TextStyle>사진 첨부</TextStyle>
          <FileBox>
            <Box>
              <Typography>
                {notice.imgurl
                  ? notice.imgurl.split("/").pop()
                  : "사진을 선택해주세요."}
              </Typography>
            </Box>
            {notice.imgurl && (
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
              id="file-input"
              type="file"
              onChange={handleFileChange}
            />
          </UploadButton>
        </UploadFlexBox>
      </BoxStyle>

      <ButtonBox>
        <CommonButton onClick={handleUpdate} text="수정" />
        <CommonButton onClick={handleClickReset} bkColor={"red"} text="취소" />
      </ButtonBox>

      {delDialog && (
        <CommonDialog
          open={delDialog}
          title={"공지사항 수정"}
          onClose={handleCloseDialog}
          onClick={handleCloseDialog}
          children={<p>공지사항이 수정되었습니다.</p>}
        />
      )}
    </Root>
  );
};

export default NoticeEdit;
