import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import MainImg from "../assets/images/main_img.png";

const Root = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const RootIn = styled(Box)(({ theme }) => ({
  width: "90%",
  height: "100%",
  backgroundImage: `url(${MainImg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom right",
  display: "flex",
  flexDirection: "column",
  backgroundSize: "45%",
}));

const BigText = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    fontSize: "3.75rem",
    fontWeight: 800,
    marginBottom: 25,
    marginTop: 120,
  },
}));

const TextStyle = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    fontWeight: 400,
    fontSize: "1.375rem",
    lineHeight: 1.8,
    marginBottom: 10,
  },
}));

const SmallText = styled(Typography)(({ theme }) => ({
  "&.MuiTypography-root": {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#4064e6",
    lineHeight: 1.8,
  },
}));

const MainPage = () => {
  return (
    <Root>
      <RootIn>
        <BigText>YONO 스마트한 관리의 시작!</BigText>
        <TextStyle>
          이곳은 관리자 여러분을 위한 전용 공간입니다.
          <br />
          회원 관리부터 카드 관리, 커뮤니티 관리, 공지사항 관리까지,
          <br />
          효율적이고 체계적인 관리 도구를 통해
          <br /> 더 나은 소비 경험과 서비스를 제공하세요.
        </TextStyle>
        <SmallText>
          YONO와 함께 사용자의 만족도를 높이고, 미래를 준비하는 혁신적인
          서비스를 만들어 나가세요!
        </SmallText>
      </RootIn>
    </Root>
  );
};

export default MainPage;
