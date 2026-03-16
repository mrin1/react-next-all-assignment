// src/pages/Cart.tsx
import React, { useContext } from "react";
import { CartContext } from "../hooks/context/CreateContext";
import CartProduct from "../components/CartProduct";
import Grid from "@mui/material/Grid";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Divider,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(CartContext);

  if (!context) return null;

  const { cart, cartTotal, cartCount } = context;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            {cart.length === 0 ? (
              <Paper
                sx={{ p: 5, textAlign: "center", border: "1px dashed grey" }}
              >
                <Typography variant="h6" color="text.secondary">
                  Your cart is empty.
                </Typography>
                <Button variant="text" color="primary" sx={{ mt: 2 }}>
                  <span onClick={() => navigate("/")}> Return to Shop</span>
                </Button>
              </Paper>
            ) : (
              cart.map((p) => <CartProduct key={p.id} product={p} />)
            )}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Order Summary
            </Typography>

            <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.3)" }} />

            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Total Items:</Typography>
                <Typography sx={{ fontWeight: "bold" }}>{cartCount}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Subtotal:</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Rs{cartTotal.toFixed(2)}
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              color="warning"
              fullWidth
              size="large"
              sx={{
                mt: 4,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1.1rem",
              }}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
