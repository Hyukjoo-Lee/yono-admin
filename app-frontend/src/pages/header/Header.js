import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { drawerWidth, headerHeight } from "../../App";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        "& > div > .MuiButtonBase-root": {
          display: "none",
        },
      },
    },
  ],
  "&.MuiPaper-root": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    padding: "0 30px",
    minHeight: `${headerHeight}px`,
    height: `${headerHeight}px`,
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
  },
  "& .MuiIconButton-root": {
    padding: 0,
    margin: "0 24px 0 0",
    "& svg": {
      width: 30,
      height: 30,
    },
    "&:hover": {
      background: "transparent",
    },
  },
  "& .MuiTypography-root": {
    fontWeight: "bold",
    fontSize: "1.375rem",
    color: "#000",
  },
}));

const LogoButton = styled(Button)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    padding: 0,
    marginRight: 24,
    "&:hover": {
      background: "transparent",
    },
  },
}));

const Header = ({ handleDrawerOpen, open }) => {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <AppBar position="fixed" open={open}>
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              mr: 2,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon style={{ color: "#000" }} />
        </IconButton>
        <LogoButton onClick={handleClickLogo} disableRipple>
          <Logo />
        </LogoButton>
        <Typography>Backoffice</Typography>
      </div>
      <IconButton style={{ margin: 0 }}>
        <LogoutIcon />
      </IconButton>
    </AppBar>
  );
};

export default Header;
