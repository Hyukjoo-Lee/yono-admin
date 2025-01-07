import React from "react";
import styled from "styled-components";
import { Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommonButton from "./CommonButton";

const DialogStyle = styled(Dialog)`
  & .MuiPaper-root {
    max-width: 1000px;
    min-width: 400px;
    & *,
    p {
      font-family: "Noto Sans KR";
    }
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 0px 24px;
  & h2 {
    padding: 0px;
  }
`;

const ContentsBox = styled.div`
  padding: 24px;
  & p {
    font-size: 18px;
    text-align: center;
    margin: 0px;
  }
`;

const IconButtonStyle = styled(IconButton)`
  &.MuiButtonBase-root {
    &:hover {
      background: transparent;
    }
  }
`;

const DialogActionsStyle = styled(DialogActions)`
  &.MuiDialogActions-root {
    justify-content: center;
    padding: 20px 24px 18px;
  }
`;

const CommonDialog = (props) => {
  const {
    open,
    onClose,
    onClick,
    title,
    children,
    submitText,
    cancelBtn = false,
    cancelText,
  } = props;

  return (
    <DialogStyle
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <TitleBox>
        <DialogTitle aria-labelledby="dialog-title">{title}</DialogTitle>
        <IconButtonStyle onClick={onClose} disableRipple>
          <CloseIcon />
        </IconButtonStyle>
      </TitleBox>

      <ContentsBox aria-describedby="dialog-description">
        {children}
      </ContentsBox>

      <DialogActionsStyle>
        <CommonButton text={submitText || "확인"} onClick={onClick} />
        {cancelBtn && (
          <CommonButton
            text={cancelText || "취소"}
            onClick={onClose}
            bkColor={"red"}
          />
        )}
      </DialogActionsStyle>
    </DialogStyle>
  );
};
export default CommonDialog;
