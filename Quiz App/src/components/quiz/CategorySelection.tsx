import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Category as CatIcon } from '@mui/icons-material';
import type { CategorySelectionProps } from '../../typescript/interface/quiz.interface';


const CategorySelection: React.FC<CategorySelectionProps> = ({ categories, onSelect }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h3" fontWeight="900" textAlign="center" gutterBottom color="primary">
        Topic Selection
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {categories.map((c) => (
          <Grid  size={{ xs:12, sm:6, md:4}} key={c.slug}>
            <Paper 
              component={Button} 
              fullWidth 
              onClick={() => onSelect(c.slug)}
              sx={{ p: 4, height: 120, borderRadius: 6, display: 'flex', flexDirection: 'column', textTransform: 'none' }}
            >
              <CatIcon color="primary" sx={{ mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">{c.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategorySelection;