import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import CommonButton from "./CommonButton";
import CommonTextField from "./CommonTextField";
import CommonSelect from "./CommonSelect";

const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 8,
}));

const TextStyle = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  "& span": {
    fontWeight: "bold",
  },
}));

const SearchBoxStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& .MuiTextField-root": {
    margin: "0 8px",
  },
}));

const CommonControll = ({
  length,
  placeholder,
  buttonText,
  selectList,
  value,
  setValue,
}) => {
  return (
    <Root>
      <TextStyle>
        총 게시물 <span>{length}</span>개
      </TextStyle>

      <SearchBoxStyle>
        <CommonSelect
          selectList={selectList}
          value={value}
          setValue={setValue}
        />
        <CommonTextField placeholder={placeholder} />
        <CommonButton text={buttonText} />
      </SearchBoxStyle>
    </Root>
  );
};

export default CommonControll;
