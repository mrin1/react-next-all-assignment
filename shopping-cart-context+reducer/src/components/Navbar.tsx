// src/components/Navbar.tsx
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { CartContext } from "../hooks/context/CreateContext";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

const Navbar: React.FC = () => {
  const context = useContext(CartContext);

  if (!context) return null;

  const { cartCount } = context;

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          My Store
        </Typography>
        <Box>
          <IconButton
            component={RouterLink}
            to="/cart"
            size="large"
            color="inherit"
            aria-label="view shopping cart"
          >
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;