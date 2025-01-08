import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import CommonTitle from "../../common/CommonTitle";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Root = styled(Box)(({ theme }) => ({}));

const CardComponent = () => {
  return (
    <Root>
      <CommonTitle icon={<CreditCardIcon />} title={"카드 관리"} />
    </Root>
  );
};

export default CardComponent;
