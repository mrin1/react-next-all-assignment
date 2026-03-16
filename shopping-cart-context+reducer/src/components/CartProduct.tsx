// src/components/CartProduct.tsx
import React, { useContext } from "react";
import { CartContext } from "../hooks/context/CreateContext";
import { Card, CardContent, CardMedia, Typography, IconButton, Stack, Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import type { CartProductProps } from "../typescript/interface/interface";

const CartProduct: React.FC<CartProductProps> = ({ product }) => {
  const context = useContext(CartContext);

  if (!context) return null;

  return (
    <Card sx={{ display: "flex", mb: 2, p: 1, alignItems: "center" }}>
      <CardMedia component="img" sx={{ width: 100, height: 100 }} image={product.thumbnail} />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle1">{product.title}</Typography>
        <Stack direction="row" spacing={1} alignItems="center" >
          <IconButton 
            onClick={() => context.decreaseQty(product.id)} 
            disabled={product.quantity <= 1}
          >
            <RemoveIcon sx={{color:"blue"}} />
          </IconButton>
          <Typography>{product.quantity}</Typography>
          <IconButton 
            onClick={() => context.increaseQty(product.id)}
            disabled={product.quantity >= 10}
          >
            <AddIcon sx={{color:"blue"}}/>
          </IconButton>
        </Stack>
        <Button color="error" onClick={() => context.removeItem(product.id)}>
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartProduct;