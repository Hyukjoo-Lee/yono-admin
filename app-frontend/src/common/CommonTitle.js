import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const TitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: 26,
  "& .MuiTypography-root": {
    fontWeight: "bold",
    fontSize: "1.875rem",
    marginLeft: 16,
  },
  "& svg": {
    width: 36,
    height: 36,
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
