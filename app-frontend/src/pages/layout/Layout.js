import React, { useState, useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import SideBar from "../sidebar/SideBar";
import Header from "../header/Header";
import { drawerWidth, headerHeight } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";

const Root = styled("div")(({ theme }) => ({
  "& p, input, div, button, th, td, textarea, label, span": {
    fontFamily: "Noto Sans KR",
    letterSpacing: "-0.2px",
  },
}));

const RootIn = styled("div")(({ theme }) => ({
  display: "flex",
}));

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "mainStyle",
})(({ theme, mainStyle }) => ({
  flexGrow: 1,
  padding: mainStyle ? 0 : theme.spacing(3),
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
  background: mainStyle ? "#EFF3FD" : "#F7F7F8",
  marginTop: `${headerHeight}px !important`,
  minHeight: `calc(100vh - ${headerHeight}px)`,
  boxSizing: "border-box",
}));

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState("");
  const location = useLocation(); // 현재 URL 경로 가져오기
  const navigate = useNavigate();

  const menuList = useMemo(
    () => [
      { title: "회원 관리", path: "/users" },
      { title: "카드 관리", path: "/cardManagement" },
      { title: "커뮤니티 관리", path: "/communityManagement" },
      { title: "공지사항 관리", path: "/noticeManagement" },
    ],
    [] // 의존성 배열이 빈 배열이므로 최초 렌더링 시 한 번만 생성됨
  );

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setMenu("");
    } else {
      const matchedMenu = menuList.find((item) => item.path === currentPath);
      setMenu(matchedMenu ? matchedMenu.title : "");
    }
  }, [location.pathname, menuList]);

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
        <Main mainStyle={location.pathname === "/"} open={open}>
          {children}
        </Main>
      </RootIn>
    </Root>
  );
};

export default Layout;
