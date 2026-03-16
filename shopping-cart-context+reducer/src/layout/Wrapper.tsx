import { Box, Container, Stack } from "@mui/material";
// import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Wrapper = () => {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        padding: 0,
        margin: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ height: "25%", bgcolor: "#c5e0b4" }}>
        <Navbar />
      </Box>

      <Stack sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "100%", bgcolor: "", p: 5 }}>
          <Outlet />
        </Box>
      </Stack>
      <Box>
        <Footer />
      </Box>
    </Container>
  );
};

export default Wrapper;
