import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const ButtonStyle = styled(Button, {
  shouldForwardProp: (prop) => prop !== "bkColor",
})(({ theme, bkColor }) => ({
  "&.MuiButtonBase-root": {
    height: 39,
    background: bkColor ? bkColor : "#4064e6",
    color: "#fff",
    borderRadius: 3,
    "&:hover": {
      background: bkColor ? bkColor : "#4064e6",
    },
  },
}));

const CommonButton = ({ onClick, text, bkColor, ariaLabel }) => {
  return (
    <ButtonStyle
      bkColor={bkColor}
      onClick={onClick}
      disableRipple
      aria-label={ariaLabel || text}
    >
      {text}
    </ButtonStyle>
  );
};

export default CommonButton;
