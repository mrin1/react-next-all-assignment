import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Container,
  Paper,
  Stack,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { styled, alpha, keyframes } from "@mui/material/styles";

const orbit = keyframes`
  from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
`;

const grain = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-1%, -2%); }
  50% { transform: translate(2%, 1%); }
`;

const CrystalPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: "32px",
  background: `linear-gradient(135deg, ${alpha("#FFFFFF", 0.1)} 0%, ${alpha("#60A5FA", 0.05)} 100%)`,
  backdropFilter: "blur(25px) saturate(180%)",
  border: `1px solid ${alpha("#FFFFFF", 0.2)}`,
  position: "relative",
  overflow: "hidden",
  boxShadow: `0 25px 50px -12px ${alpha("#000", 0.5)}`,
}));

const GlassControl = {
  color: alpha("#60A5FA", 0.4),
  "&.Mui-checked": {
    color: "#60A5FA",
    filter: `drop-shadow(0 0 8px ${alpha("#60A5FA", 0.8)})`,
  },
};

export default function PreferencesPage() {
  const { state, updatePreferences } = useFormContext();
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/summary");
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at center, #0B192E 0%, #020617 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: `${grain} 8s steps(10) infinite`,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          filter: "blur(140px)",
          opacity: 0.15,
          animation: `${orbit} 25s infinite linear`,
        }}
      />

      <Fade in={true} timeout={1000}>
        <Box sx={{ width: "100%", maxWidth: 500, zIndex: 2, p: 3 }}>
          <CrystalPanel elevation={0}>
            <Stack spacing={1} sx={{ mb: 6 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#60A5FA",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  letterSpacing: 4,
                }}
              >
                Phase 03 / Customization
              </Typography>
              <Typography
                variant="h3"
                sx={{ color: "#fff", fontWeight: 200, letterSpacing: -1 }}
              >
                Set <span style={{ fontWeight: 800 }}>Preferences</span>
              </Typography>
            </Stack>

            <form onSubmit={handleNext}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    background: alpha("#fff", 0.03),
                    p: 2,
                    borderRadius: "16px",
                    border: `1px solid ${alpha("#fff", 0.05)}`,
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ color: alpha("#fff", 0.5), ml: 1 }}
                  >
                    Subscriptions
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.preferences.newsletter}
                        onChange={(e) =>
                          updatePreferences({ newsletter: e.target.checked })
                        }
                        sx={GlassControl}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#E0E0E0" }}>
                        Newsletter Subscription
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.preferences.notifications}
                        onChange={(e) =>
                          updatePreferences({ notifications: e.target.checked })
                        }
                        sx={GlassControl}
                      />
                    }
                    label={
                      <Typography sx={{ color: "#E0E0E0" }}>
                        Push Notifications
                      </Typography>
                    }
                  />
                </Box>

                <Box
                  sx={{
                    background: alpha("#fff", 0.03),
                    p: 2,
                    borderRadius: "16px",
                    border: `1px solid ${alpha("#fff", 0.05)}`,
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ color: alpha("#fff", 0.5), ml: 1 }}
                  >
                    Interface Theme
                  </Typography>
                  <RadioGroup
                    value={state.preferences.theme}
                    onChange={(e) =>
                      updatePreferences({
                        theme: e.target.value as "light" | "dark",
                      })
                    }
                  >
                    <FormControlLabel
                      value="light"
                      control={<Radio sx={GlassControl} />}
                      label={
                        <Typography sx={{ color: "#E0E0E0" }}>
                          Light Mode
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="dark"
                      control={<Radio sx={GlassControl} />}
                      label={
                        <Typography sx={{ color: "#E0E0E0" }}>
                          Dark Mode
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </Box>

                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    fullWidth
                    onClick={() => navigate("/address")}
                    sx={{
                      borderRadius: "14px",
                      color: "#fff",
                      border: `1px solid ${alpha("#fff", 0.2)}`,
                      py: 1.5,
                      textTransform: "none",
                      "&:hover": { background: alpha("#fff", 0.1) },
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: "14px",
                      background:
                        "linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)",
                      color: "#fff",
                      fontWeight: 700,
                      textTransform: "none",
                      py: 1.5,
                      boxShadow: `0 8px 20px ${alpha("#3B82F6", 0.3)}`,
                      "&:hover": {
                        background: "#fff",
                        color: "#2563EB",
                        boxShadow: `0 12px 30px ${alpha("#3B82F6", 0.5)}`,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Review Summary
                  </Button>
                </Stack>
              </Stack>
            </form>
          </CrystalPanel>
        </Box>
      </Fade>
    </Container>
  );
}
