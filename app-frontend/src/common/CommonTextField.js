import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  "&.MuiFormControl-root": {
    width: "100%",
    "& .MuiInputBase-root": {
      borderRadius: 3,

      "& .MuiInputBase-input": {
        padding: "8px 10px",
        background: "#fff",
        color: "#000",
        "&::placeholder": {
          opacity: 0.4,
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {},
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.23)",
        },
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.23)",
        },
      },
    },
  },
}));

const CommonTextField = ({ placeholder }) => {
  return (
    <TextFieldStyle
      hiddenLabel
      id="filled-hidden-label-small"
      defaultValue=""
      variant="outlined"
      placeholder={placeholder}
    />
  );
};

export default CommonTextField;
