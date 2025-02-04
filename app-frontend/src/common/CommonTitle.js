import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const TitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: 34,
  "& .MuiTypography-root": {
    fontWeight: "bold",
    fontSize: "1.75rem",
    marginLeft: 8,
  },
  "& svg": {
    width: 32,
    height: 32,
  },
}));

const CommonTitle = ({ icon, title }) => {
  return (
    <TitleBox>
      {icon}
      <Typography>{title}</Typography>
    </TitleBox>
  );
};

export default CommonTitle;
