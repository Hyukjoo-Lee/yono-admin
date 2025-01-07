import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { drawerWidth, headerHeight } from "../../App";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  boxSizing: "border-box",
  height: `${headerHeight}px`,
  ...theme.mixins.toolbar,
  "& .MuiIconButton-root": {
    padding: 0,
    marginRight: 16,
    "& svg": {
      width: "30px",
      height: "30px",
    },
    "&:hover": {
      background: "transparent",
    },
  },
}));

const ListStyle = styled(List)(({ theme }) => ({
  "& .MuiButtonBase-root": {
    padding: 16,
    fontSize: "1.125rem",
    borderRadius: 6,
    "&:hover": {
      background: "#EFF3FD",
      color: "#4064e6",
      fontWeight: "bold",
    },
  },
}));

const ListItemStyle = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "isSelect",
})(({ theme, isSelect }) => ({
  "&.MuiListItem-root": {
    "& .MuiButtonBase-root": {
      background: isSelect ? "#EFF3FD" : "#fff",
      color: isSelect ? "#4064e6" : "#000",
      fontWeight: isSelect ? "bold" : 400,
    },
  },
}));

const LogoButton = styled(Button)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    padding: 0,
    "&:hover": {
      background: "transparent",
    },
  },
}));

const SideBar = ({
  handleDrawerClose,
  open,
  handleClickMenu,
  menuList,
  menu,
  setMenu,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClickLogo = () => {
    setMenu("");
    navigate("/");
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
        <LogoButton onClick={handleClickLogo} disableRipple>
          <Logo />
        </LogoButton>
      </DrawerHeader>
      <ListStyle>
        {menuList.map((item, index) => (
          <ListItemStyle key={index} isSelect={menu === item.title}>
            <ListItemButton
              onClick={() => handleClickMenu(item.title, item.path)}
              disableRipple
            >
              {item.title}
            </ListItemButton>
          </ListItemStyle>
        ))}
      </ListStyle>
    </Drawer>
  );
};

export default SideBar;
