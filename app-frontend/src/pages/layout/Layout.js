import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import SideBar from "../sidebar/SideBar";
import Header from "../header/Header";
import { drawerWidth, headerHeight } from "../../App";
import { useNavigate } from "react-router-dom";

const Root = styled("div")(({ theme }) => ({
  "& p, input, div, button, th, td, textarea, label": {
    fontFamily: "Noto Sans KR",
    letterSpacing: "-0.2px",
  },
}));

const RootIn = styled("div")(({ theme }) => ({
  display: "flex",
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
    background: "#F7F7F8",
    marginTop: `${headerHeight}px !important`,
    minHeight: `calc(100vh - ${headerHeight}px)`,
    boxSizing: "border-box",
  })
);

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState(() => {
    // 새로고침 시 localStorage에서 menu 상태 복원
    return localStorage.getItem("selectedMenu") || "";
  });
  const navigate = useNavigate();
  const menuList = [
    { title: "회원 관리", path: "/user" },
    { title: "카드 관리", path: "/card" },
    { title: "커뮤니티 관리", path: "/community" },
    { title: "공지사항 관리", path: "/notice" },
  ];

  useEffect(() => {
    // menu 상태가 변경될 때 localStorage에 저장
    localStorage.setItem("selectedMenu", menu);
  }, [menu]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickMenu = (value, path) => {
    setMenu(value);
    navigate(path);
  };

  return (
    <Root>
      <Header
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        menu={menu}
        setMenu={setMenu}
      />
      <RootIn>
        <SideBar
          handleDrawerClose={handleDrawerClose}
          open={open}
          handleClickMenu={handleClickMenu}
          menuList={menuList}
          menu={menu}
          setMenu={setMenu}
        />
        <Main open={open}>{children}</Main>
      </RootIn>
    </Root>
  );
};

export default Layout;
