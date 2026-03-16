import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Stack,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { styled, alpha, keyframes } from "@mui/material/styles";
import { CheckCircle, User, MapPin, Settings } from "lucide-react";
import { toast } from "sonner";

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
  boxShadow: `0 25px 50px -12px ${alpha("#000", 0.8)}`,
}));

const DataSection = styled(Box)(({ theme }) => ({
  background: alpha("#fff", 0.03),
  padding: theme.spacing(2.5),
  borderRadius: "20px",
  border: `1px solid ${alpha("#fff", 0.08)}`,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
}));

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
    <Icon size={18} color="#60A5FA" />
    <Typography
      variant="overline"
      sx={{ color: "#60A5FA", fontWeight: 700, letterSpacing: 1.5 }}
    >
      {title}
    </Typography>
  </Stack>
);

export default function SummaryPage() {
  const { state, resetForm } = useFormContext();
  const navigate = useNavigate();

  function handleSubmit() {
    console.log("Final Form Data:", state);
    //alert("Profile Created Successfully!");
    toast.success("Profile Created Successfully!");
    resetForm();
    navigate("/");
  }

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
        py: 4,
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
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          filter: "blur(140px)",
          opacity: 0.12,
          animation: `${orbit} 30s infinite linear`,
        }}
      />

      <Fade in={true} timeout={1000}>
        <Box sx={{ width: "100%", maxWidth: 550, zIndex: 2, p: 3 }}>
          <CrystalPanel elevation={0}>
            <Stack spacing={1} sx={{ mb: 4 }}>
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
                Final Step / Verification
              </Typography>
              <Typography
                variant="h3"
                sx={{ color: "#fff", fontWeight: 200, letterSpacing: -1 }}
              >
                Review <span style={{ fontWeight: 800 }}>Details</span>
              </Typography>
            </Stack>

            <Stack spacing={2.5}>
              <DataSection>
                <SectionHeader icon={User} title="Identity" />
                <Typography
                  sx={{ color: "#fff", fontSize: "1.1rem", fontWeight: 500 }}
                >
                  {state.personalInfo.firstName} {state.personalInfo.lastName}
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.6) }}>
                  {state.personalInfo.email}
                </Typography>
              </DataSection>

              <DataSection>
                <SectionHeader icon={MapPin} title="Location" />
                <Typography sx={{ color: "#fff" }}>
                  {state.addressInfo.street}
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.6) }}>
                  {state.addressInfo.city}, {state.addressInfo.zipCode}
                </Typography>
              </DataSection>

              <DataSection>
                <SectionHeader icon={Settings} title="Preferences" />
                <Stack direction="row" spacing={2}>
                  {state.preferences.newsletter && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <CheckCircle size={14} color="#60A5FA" />
                      <Typography variant="body2" sx={{ color: "#fff" }}>
                        Newsletter
                      </Typography>
                    </Stack>
                  )}
                  {state.preferences.notifications && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <CheckCircle size={14} color="#60A5FA" />
                      <Typography variant="body2" sx={{ color: "#fff" }}>
                        Alerts
                      </Typography>
                    </Stack>
                  )}
                </Stack>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha("#fff", 0.4),
                    mt: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Active Theme: {state.preferences.theme}
                </Typography>
              </DataSection>

              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  onClick={() => navigate("/preferences")}
                  sx={{
                    borderRadius: "14px",
                    color: "#fff",
                    border: `1px solid ${alpha("#fff", 0.2)}`,
                    py: 1.5,
                    textTransform: "none",
                    "&:hover": {
                      background: alpha("#fff", 0.1),
                      border: `1px solid ${alpha("#fff", 0.5)}`,
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={handleSubmit}
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
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Complete Setup
                </Button>
              </Stack>
            </Stack>
          </CrystalPanel>
        </Box>
      </Fade>
    </Container>
  );
}
