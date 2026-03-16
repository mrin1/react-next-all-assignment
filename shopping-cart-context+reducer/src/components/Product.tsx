// src/components/Product.tsx
import React, { useContext } from "react";
import { CartContext } from "../hooks/context/CreateContext";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
import type { ProductProps } from "../typescript/interface/interface";

const Product: React.FC<ProductProps> = ({ product }) => {
  const context = useContext(CartContext);
  
  if (!context) return null; 

  return (
    <Box sx={{ width: 250, m: 1 }}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia component="img" height="200" image={product.thumbnail} alt={product.title} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="subtitle1">Rs{product.price}</Typography>
        </CardContent>
        <CardActions>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={() => context.addItem(product)}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Product;