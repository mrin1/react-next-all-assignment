// src/pages/Products.tsx
import React, { useState } from "react";
import Data from "../data/data.json";
import Product from "../components/Product";
import Grid from "@mui/material/Grid"; 
import { Box, Typography } from "@mui/material";
import type { ProductType } from "../typescript/interface/interface";

const Products: React.FC = () => {
  const [products] = useState<ProductType[]>(Data.products);
  if (!products || products.length === 0) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h5" color="text.secondary">
          Our catalog is currently empty.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Featured Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((p) => (
          <Grid 
            key={p.id} 
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          >
            <Product product={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;