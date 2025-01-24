import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
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

const SecessionBox = styled(Box)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontWeight: "400",
    fontSize: "1rem",
  },
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
  searchInput,
  setSearchInput,
  handleSearch,
  secession,
  handleSecessionChange,
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

        <CommonTextField
          placeholder={placeholder}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // 엔터 키 입력 시 검색 실행
            }
          }}
        />
        <CommonButton text={buttonText} onClick={handleSearch} />
      </SearchBoxStyle>
      <FlexBox>
        {secession && (
          <SecessionBox>
            <FormControlLabel
              value="secession"
              control={
                <Checkbox
                  color="primary"
                  onChange={handleSecessionChange}
                  sx={{
                    "&.Mui-checked": {
                      color: "#4064e6",
                    },
                  }}
                  disableRipple
                />
              }
              label="탈퇴회원만 보기"
              labelPlacement="end"
            />
          </SecessionBox>
        )}
        {notice && (
          <div style={{ marginLeft: 8 }}>
            <CommonButton text="등록" onClick={handleClickWrite} />
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
