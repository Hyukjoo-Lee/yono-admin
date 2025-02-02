import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Checkbox, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import CommonSelect from "../../common/CommonSelect";
import CommonTextField from "../../common/CommonTextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CommonButton from "../../common/CommonButton";
import CommonDialog from "../../common/CommonDialog";
import { createCard } from "../../apis/CardApi";
import CommonLoading from "../../common/CommonLoading";

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

const Titlestyle = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "left",
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

const BoxStyle = styled(Box)(({ theme }) => ({
  marginTop: 40,
}));

const BoxInStyle = styled(Box)(({ theme }) => ({
  marginBottom: 26,
}));

const CardNameBox = styled(Box)(({ theme }) => ({
  width: 400,
}));

const FlexBox = styled(BoxInStyle)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const BoxList = styled(BoxInStyle)(({ theme }) => ({
  maxHeight: 270,
  overflowY: "auto",
  marginBottom: 26,
  "& > div": {
    marginTop: 10,
    marginBottom: 6,
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

const TextFieldBox = styled(Box)(({ theme }) => ({
  display: "flex",
  "& .MuiFormControl-root": {
    "&:first-of-type": {
      width: 350,
      margin: "0 8px",
    },
    "&:last-of-type": {
      width: 180,
      marginRight: 8,
    },
  },
}));

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    width: 30,
    height: 30,
    padding: 0,
    background: "#4064e6",
    "&:hover": {
      background: "#4064e6",
    },
    "& svg": {
      fill: "#fff",
    },
  },
}));

const MinusIconButtonStyle = styled(IconButtonStyle)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    background: "red",
    marginLeft: 8,
    "&:hover": {
      background: "red",
    },
  },
}));

const CloseIconButtonStyle = styled(IconButtonStyle)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    position: "absolute",
    top: -6,
    right: 22,
    width: 20,
    height: 20,
    background: "red",
    "&:hover": {
      background: "red",
    },
    "& svg": {
      width: 15,
      height: 15,
    },
  },
}));

const UploadButton = styled(Button)(({ theme }) => ({
  "&.MuiButtonBase-root": {
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

const ImageBox = styled(Box)(({ theme }) => ({
  width: "90%",
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: "20px 8px",
}));

const PositionBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& img": {
    width: 80,
  },
  "& .MuiTypography-root": {
    maxWidth: 150,
    textAlign: "center",
    fontSize: "0.875rem",
    wordWrap: "break-word",
    marginTop: 6,
  },
}));

const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: 36,
  "& button:first-of-type": {
    marginRight: 16,
  },
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    fontSize: "0.875rem",
    color: "red",
    marginTop: 6,
  },
}));

const CardComponent = () => {
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState("카드사 선택"); // 카드사
  const [cardName, setCardName] = useState(""); // 카드 이름

  const [delDialog, setDelDialog] = useState(false);
  const [errors, setErrors] = useState({
    cardCompany: false,
    cardName: false,
    cardBenefits: false,
    cardImages: false,
  });

  const [benefits, setBenefits] = useState([
    {
      id: Date.now(),
      checked: false,
      cardType: "가맹점 선택",
      benefit: "",
      description: "",
    },
  ]); // 카드 혜택 목록

  const [imageList, setImageList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const maxCheckboxCount = 4;

  const selectList = [
    {
      label: "카드사 선택",
      disabled: true,
    },
    { label: "국민", organizationCode: "0301", cardProvider: "kb" },
    { label: "현대", organizationCode: "0302", cardProvider: "hyundai" },
    { label: "삼성", organizationCode: "0303", cardProvider: "samsung" },
    { label: "농협", organizationCode: "0304", cardProvider: "nh" },
    { label: "신한", organizationCode: "0306", cardProvider: "shinhan" },
    { label: "하나", organizationCode: "0313", cardProvider: "hana" },
  ];

  const cardTypeList = [
    { label: "가맹점 선택", disabled: true },
    { label: "주유" },
    { label: "여가" },
    { label: "쇼핑" },
    { label: "금융" },
    { label: "교육" },
    { label: "통신" },
    { label: "항공" },
    { label: "외식" },
    { label: "기타" },
    { label: "전 가맹점" },
  ];

  const handleCheckboxChange = (id) => {
    const selectedCount = benefits.filter((item) => item.checked).length;

    setBenefits((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // 체크 해제는 언제나 허용
          if (item.checked) {
            return { ...item, checked: false };
          }

          // 최대 체크 개수를 넘지 않는 경우에만 체크 허용
          if (!item.checked && selectedCount < maxCheckboxCount) {
            return { ...item, checked: true };
          }
        }
        return item;
      })
    );
  };

  const handleClickEdit = () => {
    navigate(-1);
  };

  const handleAddBenefit = () => {
    setBenefits([
      ...benefits,
      {
        id: Date.now(),
        checked: false,
        cardType: "가맹점 선택",
        benefit: "",
        description: "",
      },
    ]);
  };

  const handleRemoveBenefit = (id) => {
    setBenefits(benefits.filter((item) => item.id !== id));
  };

  const validateForm = () => {
    const hasSelectedCompany = selectValue !== "카드사 선택";
    const hasCardName = cardName.trim() !== "";
    const hasValidBenefits = benefits.some(
      (benefit) => benefit.checked && benefit.benefit.trim() !== ""
    );
    const hasCardImages = imageList.length > 0;

    setErrors({
      cardCompany: !hasSelectedCompany,
      cardName: !hasCardName,
      cardBenefits: !hasValidBenefits,
      cardImages: !hasCardImages,
    });

    return (
      hasSelectedCompany && hasCardName && hasValidBenefits && hasCardImages
    );
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    const selectedCard = selectList.find((item) => item.label === selectValue);
    const organizationCode = selectedCard ? selectedCard.organizationCode : "";
    const cardProvider = selectedCard ? selectedCard.cardProvider : "";

    const cardFormData = {
      cardProvider: cardProvider,
      cardTitle: cardName,
      organizationCode: organizationCode,
    };

    const formData = new FormData();

    formData.append("cardInfo", JSON.stringify(cardFormData));

    const imageFiles = imageList.map((image) => image.file).filter(Boolean);

    imageFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await createCard(formData);

      setDelDialog(true);
      console.log("카드 등록 성공:", response);

      resetForm();
    } catch (error) {
      console.error("카드 등록 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    navigate("/cardManagement");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      img: URL.createObjectURL(file),
      text: file.name,
      file: file,
    }));

    setImageList((prev) => [...prev, ...newImages]);
  };

  const resetForm = () => {
    setSelectValue("카드사 선택");
    setCardName("");
    setBenefits([
      {
        id: Date.now(),
        checked: false,
        cardType: "가맹점 선택",
        benefit: "",
        description: "",
      },
    ]);
    setImageList([]);
    setErrors({
      cardCompany: false,
      cardName: false,
      cardBenefits: false,
      cardImages: false,
    });
  };

  const handleCancle = () => {
    navigate(-1);
  };
  return (
    <Root>
      {isLoading ? (
        <CommonLoading colSpan={8} />
      ) : (
        <>
          <HeaderBox>
            <ButtonStyle onClick={handleClickEdit} disableRipple>
              <ChevronLeftIcon />
              <Typography>이전</Typography>
            </ButtonStyle>
          </HeaderBox>
          <Titlestyle>카드 등록</Titlestyle>
          <BoxStyle>
            <FlexBox>
              <TextStyle
                style={
                  !errors.cardCompany
                    ? { paddingBottom: 0 }
                    : { paddingBottom: 25 }
                }
              >
                카드사
              </TextStyle>
              <div>
                <CommonSelect
                  selectList={selectList}
                  value={selectValue}
                  setValue={setSelectValue}
                />
                {errors.cardCompany && (
                  <ErrorText>카드사를 선택해주세요.</ErrorText>
                )}
              </div>
            </FlexBox>

            <FlexBox>
              <TextStyle
                style={
                  !errors.cardName
                    ? { paddingBottom: 0 }
                    : { paddingBottom: 25 }
                }
              >
                카드 이름
              </TextStyle>
              <CardNameBox>
                <CommonTextField
                  placeholder={"카드 이름을 입력해주세요."}
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
                {errors.cardName && (
                  <ErrorText>카드 이름을 입력해주세요.</ErrorText>
                )}
              </CardNameBox>
            </FlexBox>

            <BoxInStyle>
              <TextStyle
                style={
                  !errors.title ? { paddingBottom: 0 } : { paddingBottom: 25 }
                }
              >
                카드 혜택
              </TextStyle>
              <BoxList>
                {benefits.map((benefit, index) => (
                  <FlexBox key={benefit.id}>
                    <Checkbox
                      color="primary"
                      checked={benefit.checked}
                      onChange={() => handleCheckboxChange(benefit.id)}
                      sx={{
                        "&.Mui-checked": {
                          color: "#4064e6",
                        },
                      }}
                      disableRipple
                    />
                    <CommonSelect
                      selectList={cardTypeList}
                      value={benefit.cardType}
                      setValue={(value) =>
                        setBenefits(
                          benefits.map((b) =>
                            b.id === benefit.id ? { ...b, cardType: value } : b
                          )
                        )
                      }
                    />
                    <TextFieldBox>
                      <CommonTextField
                        placeholder={"카드혜택을 입력해주세요."}
                        value={benefit.benefit}
                        onChange={(e) =>
                          setBenefits(
                            benefits.map((b) =>
                              b.id === benefit.id
                                ? { ...b, benefit: e.target.value }
                                : b
                            )
                          )
                        }
                      />
                      <CommonTextField
                        placeholder={"혜택 부가설명"}
                        value={benefit.description}
                        onChange={(e) =>
                          setBenefits(
                            benefits.map((b) =>
                              b.id === benefit.id
                                ? { ...b, description: e.target.value }
                                : b
                            )
                          )
                        }
                      />
                    </TextFieldBox>
                    {index === 0 ? (
                      <IconButtonStyle onClick={handleAddBenefit} disableRipple>
                        <AddIcon />
                      </IconButtonStyle>
                    ) : (
                      <>
                        <IconButtonStyle
                          onClick={handleAddBenefit}
                          disableRipple
                        >
                          <AddIcon />
                        </IconButtonStyle>
                        <MinusIconButtonStyle
                          onClick={() => handleRemoveBenefit(benefit.id)}
                          disableRipple
                        >
                          <RemoveIcon />
                        </MinusIconButtonStyle>
                      </>
                    )}
                  </FlexBox>
                ))}
                {errors.cardBenefits && (
                  <ErrorText>카드 혜택은 한개 이상 입력해주세요.</ErrorText>
                )}
              </BoxList>
            </BoxInStyle>

            <Box>
              <FlexBox>
                <TextStyle>카드 이미지</TextStyle>
                <UploadButton
                  component="label"
                  role={undefined}
                  variant="contained"
                  disableRipple
                >
                  카드이미지 등록
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </UploadButton>
              </FlexBox>

              <ImageBox>
                {imageList.map((item, index) => (
                  <PositionBox key={index}>
                    <CloseIconButtonStyle
                      onClick={() =>
                        setImageList(imageList.filter((_, i) => i !== index))
                      }
                      disableRipple
                    >
                      <CloseIcon />
                    </CloseIconButtonStyle>
                    <img src={item.img} alt={"카드이미지"} />
                    <Typography>{item.text}</Typography>
                  </PositionBox>
                ))}
              </ImageBox>
              {errors.cardImages && (
                <ErrorText>카드 이미지는 한개 이상 등록해주세요.</ErrorText>
              )}
            </Box>
          </BoxStyle>
          <ButtonBox>
            <CommonButton text="등록" onClick={handleSubmit} />
            <CommonButton
              type="Reset"
              bkColor={"red"}
              text="취소"
              onClick={handleCancle}
            />
          </ButtonBox>

          {delDialog && (
            <CommonDialog
              open={delDialog}
              title={"카드 등록"}
              onClose={handleCloseDialog}
              onClick={handleCloseDialog}
              children={<p>카드가 등록되었습니다.</p>}
            />
          )}
        </>
      )}
    </Root>
  );
};

export default CardComponent;
