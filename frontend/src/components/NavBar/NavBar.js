import { Link } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Drawer,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import useLogout from "../../custom-hooks/useLogout";

const drawerWidth = 240;
const guestMenus = [
  { name: "Login", link: "/login" },
  { name: "Register", link: "/register" },
];
const userMenus = [
  { name: "Hotels", link: "/hotels" },
  { name: "Greetings", link: "/greetings" },
];

const NavBar = ({ user, setUser }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const logout = useLogout(setUser);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navBarStyle = {
    fontFamily: "monospace",
    fontWeight: 700,
    color: "white",
    textDecoration: "none",
  };
  const menuStyle = {
    ...navBarStyle,
    display: "flex",
    alignItems: "center",
    gap: 1,
  };

  const menus = user ? userMenus : guestMenus;

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  /* The burger menu */
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "#1560bd",
        color: "white",
        height: "100vh",
      }}
    >
      <Typography variant="h5" sx={{ margin: "12px 0" }}>
        <Link to="/" style={navBarStyle}>
          HOTELS
        </Link>
      </Typography>

      <Divider sx={{ bgcolor: "white" }} />
      <List>
        {menus.map((menu) => (
          <Link
            to={`${menu.link}`}
            key={menu.name}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ ...menuStyle, gap: 3 }}
                >
                  {menu.name}
                </Typography>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box style={{ display: "flex" }}>
      {/* Only sx can work with display instead of style */}
      <AppBar
        component="nav"
        position="fixed"
        sx={{ backgroundColor: "#0039a6" }}
      >
        <Toolbar>
          {/* The burger button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: "16px", display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          {/* The menu bar */}

          <Typography
            variant="h6"
            align="left"
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <Link to="/" style={navBarStyle}>
              HOTELS
            </Link>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {menus.map((menu, index) => (
              <span key={menu.name}>
                <Link to={`${menu.link}`}>
                  <Button sx={{ color: "#fff" }}>
                    <Typography variant="h6" sx={menuStyle}>
                      {menu.name}
                    </Typography>
                  </Button>
                </Link>
                {(index < menus.length - 1 || user) && (
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ color: "white", mx: 1 }}
                  >
                    |
                  </Typography>
                )}
              </span>
            ))}
          </Box>
          {user && (
            <Button sx={{ color: "#fff", marginLeft: "auto" }} onClick={logout}>
              <Typography variant="h6" sx={menuStyle}>
                Logout
              </Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
      </nav>
    </Box>
  );
};

export default NavBar;
