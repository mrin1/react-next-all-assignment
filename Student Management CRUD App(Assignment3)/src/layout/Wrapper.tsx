import { Box, Container} from "@mui/material";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Wrapper = () => {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        padding: 0,
        margin: 0,
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Navbar />
      </Box>

      <Box sx={{ width: "100%", p: 4 }}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Wrapper;
