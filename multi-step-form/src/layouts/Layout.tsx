import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ProgressIndicator from "../components/Progress";

export default function Layout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",      
        display: "flex",
        flexDirection: "column",
        background: "black"
      }}
    >
      <Box sx={{ mb: 4 }}>
        <ProgressIndicator />
      </Box>
      <Box
        sx={{
          flexGrow: 1,          
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:"black"
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
