import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import CommonButton from "./CommonButton";
import CommonTextField from "./CommonTextField";
import CommonSelect from "./CommonSelect";

const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

}));

const SearchBoxStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  "& .MuiTextField-root": {
    margin: "0 8px",
    width: 260,
  },
}));

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const CommonControll = ({
  placeholder,
  buttonText,
  selectList,
  value,
  setValue,
  delBtn,
  notice,
  handleClickDel,
  handleClickWrite,
}) => {
  return (
    <Root>
      <SearchBoxStyle>
        {selectList && (
          <CommonSelect
            selectList={selectList}
            value={value}
            setValue={setValue}
          />
        )}

        <CommonTextField placeholder={placeholder} />
        <CommonButton text={buttonText} />
      </SearchBoxStyle>
      <FlexBox>
        {notice && (
          <div style={{ marginLeft: 8 }}>
            <CommonButton text="글쓰기" onClick={handleClickWrite} />
          </div>
        )}

        {delBtn && (
          <div style={{ marginLeft: 8 }}>
            <CommonButton
              bkColor={"red"}
              text="삭제"
              onClick={handleClickDel}
            />
          </div>
        )}
      </FlexBox>
    </Root>
  );
};

export default CommonControll;
