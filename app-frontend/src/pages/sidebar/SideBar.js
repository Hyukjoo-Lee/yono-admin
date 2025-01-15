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
import { useNavigate, useLocation, matchPath } from "react-router-dom";
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
  "& .MuiListItem-root": {
    padding: "2px 16px",
  },
}));

const ListItemStyle = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "isSelect",
})(({ theme, isSelect }) => ({
  "&.MuiListItem-root": {
    "& .MuiButtonBase-root": {
      padding: 16,
      fontSize: "1.125rem",
      borderRadius: 6,
      background: isSelect ? "#EFF3FD" : "#fff",
      color: isSelect ? "#4064e6" : "#000",
      fontWeight: isSelect ? "bold" : 400,
      "&:hover": {
        background: "#EFF3FD",
        color: "#4064e6",
        fontWeight: "bold",
      },
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
  const location = useLocation();

  const handleClickLogo = () => {
    setMenu("");
    navigate("/");
  };

  // 현재 경로가 항목 경로와 일치하는지 확인
  const isPathSelected = (itemPath) => {
    if (itemPath.includes("/notice")) {
      if (location.pathname.startsWith("/notice")) {
        return true;
      }
    }

    const match = matchPath(itemPath, location.pathname);
    return match !== null;
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
          <ListItemStyle key={index} isSelect={isPathSelected(item.path)}>
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
