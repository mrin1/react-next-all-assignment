// src/components/Footer.tsx
import React from "react";
import { Box, Typography, Container, Link, Stack, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: "primary.main",
        color: "common.white",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1 }}>
              SHOP
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © {currentYear} Mrinmoy Ghosh. All rights reserved.
            </Typography>
          </Box>

          <Stack direction="row" spacing={3}>
            <Link 
              href="https://github.com" 
              target="_blank" 
              color="inherit" 
              sx={{ '&:hover': { transform: 'scale(1.2)', transition: '0.3s' } }}
            >
              <GitHubIcon fontSize="small" />
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              color="inherit"
              sx={{ '&:hover': { transform: 'scale(1.2)', transition: '0.3s' } }}
            >
              <LinkedInIcon fontSize="small" />
            </Link>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

        <Typography variant="caption" display="block" textAlign="center" sx={{ opacity: 0.6 }}>
          Designed by MRINMOY
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;