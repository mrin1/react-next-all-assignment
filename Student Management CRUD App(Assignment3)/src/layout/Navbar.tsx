import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
//import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
//import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
//import Avatar from "@mui/material/Avatar";
//import Tooltip from "@mui/material/Tooltip";
//import MenuItem from "@mui/material/MenuItem";
//import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import ReactLogo from "../assets/react.svg";

const pages = ["STUDENTS MANAGEMENT SYSTEM"];

const Navbar = () => {
  const navigate = useNavigate();
  //   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
  //     null
  //   );

  //   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //     setAnchorElUser(event.currentTarget);
  //   };

  //   const handleCloseUserMenu = () => {
  //     setAnchorElUser(null);
  //   };

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Toolbar>
           <Avatar src={ReactLogo} sx={{ width: "50px", height: "50px" }} />
          {/* <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 4,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
            {pages.map((page) => (
              <Typography
                key={page}
                onClick={() => {
                  if (page === "Products") {
                    navigate("/admin/products");
                  } else {
                    navigate(`/${page.toLowerCase()}`);
                  }
                }}
                sx={{ cursor: "pointer", fontSize: 16 }}
              >
                {page}
              </Typography>
            ))}
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default React.memo(Navbar);
