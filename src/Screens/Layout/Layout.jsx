import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { NavMenuList } from "./MenuList";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, ListItemIcon, Typography } from "@mui/material";
import Swal from "sweetalert2";
import LOGO from "../../Assets/SidebarImage/sidebarlogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import PathList from "../../Common/PathList";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const drawerWidth = 240;
function Layout(props) {
  const { element } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "Logging out will end your session and you will be redirected to the login page.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EBA834",
      cancelButtonColor: "#5b5d5d",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out. Redirecting to login page...",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <Box
      sx={{
        background: "#FBFBFB",
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "#00000010 10px 10px 26px 0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2.5,
          cursor: "pointer",
        }}
        onClick={() => navigate(PathList.Dashboard)}
      >
        <Typography sx={{fontSize:"30px",fontWeight:"900",color:"#EBA834"}}>Lottery-Club</Typography>
      </Box>
      <Box
        sx={{ width: "100%", height: "calc(100vh - 150px)", overflowY: "auto" }}
        className="customSidebarList"
      >
        <List>
          {NavMenuList.map(({ title, path, icon, active }, i) => (
            <ListItem key={i} disablePadding sx={{ m: "0rem 0" }}>
              <Link
                style={{
                  color: "black",
                  textDecoration: "none",
                  width: "100%",
                }}
                to={path}
              >
                <ListItemButton
                  sx={{
                    background: location.pathname.includes(path)
                      ? "transparent"
                      : "transparent",

                    p: 0.5,
                    mx: 0.5,
                    my: 0.2,
                  }}
                >
                  <ArrowRightIcon
                    sx={{
                      fontSize: "32px",
                      color: location.pathname.includes(path)
                        ? "#EBA834"
                        : "#848484",
                    }}
                  />
                  <ListItemText
                    primary={title}
                    sx={{
                      color: location.pathname.includes(path)
                        ? "#EBA834"
                        : "#848484",
                      ".MuiTypography-root": {
                        fontWeight: "600",
                        fontSize: "16px",
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Logout Button */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          width: "100%",
          height: "50px",
          bgcolor: "#FBFBFB",
          boxSizing: "border-box",
        }}
      >
        <Button
          type="button"
          sx={{
            width: "100%",
            background: "transparent",
            padding: "8px 12px",
            fontWeight: "500",
            fontSize: "18px",
            color: "#737373",
            textTransform: "capitalize",
            position: "absolute",
            bottom: "0px",
            left: "0px",
            display: "flex",
            justifyContent: "start",
            gap: "20px",
            borderRadius: "0px",
            "&:hover": {
              background: "transparent",
              color: "#737373",
            },
          }}
          onClick={() => handleLogout()}
        >
          <LogoutIcon />
          <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
            Logout{" "}
          </Typography>
        </Button>
      </Box>

      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          // ml: { sm: `${drawerWidth}px` },
          display: { sm: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box sx={{ display: { sm: "none" } }}>
          <Toolbar />
        </Box>
        <Box>{element}</Box>
      </Box>
    </Box>
  );
}

export default Layout;
