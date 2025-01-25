import React from "react";
import { styled } from "@mui/material/styles";
import { FormControl, Select, MenuItem } from "@mui/material";

const FormControlStyle = styled(FormControl)(({ theme }) => ({
  "&.MuiFormControl-root": {
    minWidth: 120,
    "& .MuiInputBase-root": {
      borderRadius: 3,
      "& .MuiInputBase-input": {
        padding: "8px 34px 8px 8px",
        background: "#fff",
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

const CommonSelect = ({ selectList, value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControlStyle>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        {selectList.map((item, index) => (
          <MenuItem key={index} value={item.label} disabled={item.disabled}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControlStyle>
  );
};

export default CommonSelect;
