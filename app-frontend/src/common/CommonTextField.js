import React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const TextFieldStyle = styled(TextField)(({ theme }) => ({
  "&.MuiFormControl-root": {
    width: "100%",
    "& .MuiInputBase-root": {
      borderRadius: 3,
      "&.Mui-disabled": {
        background: "#fff",
        color: "#000",
        "& .MuiInputBase-input::placeholder": {
          opacity: 1,
        },
      },
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

const CommonTextField = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  disabled,
}) => {
  return (
    <TextFieldStyle
      hiddenLabel
      id={id}
      name={name}
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
    />
  );
};

export default CommonTextField;
