import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  useTheme,
  Avatar,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  AutoAwesome as SparkleIcon,
  SportsEsports as GameIcon,
} from "@mui/icons-material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const muiTheme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        backgroundImage: `radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.05) 0, transparent 50%), 
                        radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.05) 0, transparent 50%)`,
      }}
    >
      <CssBaseline />

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.8)",
          borderBottom: "1px solid rgba(226, 232, 240, 0.6)",
          color: muiTheme.palette.text.primary,
          zIndex: muiTheme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 72 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ flexGrow: 1 }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  display: "flex",
                  background: `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`,
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                }}
              >
                <GameIcon sx={{ color: "#fff" }} />
              </Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  background: `linear-gradient(to right, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                QUIZ.IO
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Achievements">
                <IconButton size="small">
                  <SparkleIcon sx={{ color: "secondary.main" }} />
                </IconButton>
              </Tooltip>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.main",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: "2px solid #fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                JD
              </Avatar>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            py: { xs: 4, md: 8 },
            flexGrow: 1,
            position: "relative",
            zIndex: 1,
          }}
        >
          {children}
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 4,
          px: 2,
          mt: "auto",
          backgroundColor: "background.paper",
          borderTop: "1px solid rgba(226, 232, 240, 0.8)",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "text.secondary" }}
            >
              © {new Date().getFullYear()} Quiz Pro
            </Typography>

            <Stack direction="row" spacing={3}>
              <Typography
                variant="caption"
                sx={{
                  cursor: "pointer",
                  fontWeight: 700,
                  "&:hover": { color: "primary.main" },
                }}
              >
                PRIVACY
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  cursor: "pointer",
                  fontWeight: 700,
                  "&:hover": { color: "primary.main" },
                }}
              >
                TERMS
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  cursor: "pointer",
                  fontWeight: 700,
                  "&:hover": { color: "primary.main" },
                }}
              >
                SUPPORT
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
