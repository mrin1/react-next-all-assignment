import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Stack,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { styled, alpha, keyframes } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalInfoYupValidation } from "../services/validation/validation";
import type { FormData } from "../typescript/interface/interface";

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
  // Lighter, more translucent blue glass
  background: `linear-gradient(135deg, ${alpha("#FFFFFF", 0.1)} 0%, ${alpha("#60A5FA", 0.05)} 100%)`,
  backdropFilter: "blur(25px) saturate(180%)",
  border: `1px solid ${alpha("#FFFFFF", 0.2)}`,
  position: "relative",
  overflow: "hidden",
  boxShadow: `0 25px 50px -12px ${alpha("#000", 0.5)}, inset 0 0 20px ${alpha("#60A5FA", 0.1)}`,
}));

const ArtisanInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: alpha("#fff", 0.03),
    transition: "all 0.3s ease",
    border: `1px solid ${alpha("#60A5FA", 0.2)}`,
    "& fieldset": { border: "none" },
    "&.Mui-focused": {
      backgroundColor: alpha("#fff", 0.07),
      boxShadow: `0 0 0 2px ${alpha("#60A5FA", 0.6)}`,
      border: `1px solid ${alpha("#fff", 0.3)}`,
    },
  },
  "& .MuiInputBase-input": {
    color: "#FFFFFF",
    padding: "18px",
  },
  "& .MuiInputLabel-root": {
    color: alpha("#fff", 0.5),
    "&.Mui-focused": { color: "#60A5FA" },
  },
});

export default function PersonalInfoPage() {
  const { state, updatePersonalInfo } = useFormContext();
  const navigate = useNavigate();

  type PersonalInfoValues = FormData["personalInfo"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoValues>({
    resolver: yupResolver(PersonalInfoYupValidation),
    defaultValues: {
      firstName: state.personalInfo.firstName || "",
      lastName: state.personalInfo.lastName || "",
      email: state.personalInfo.email || "",
    },
  });

  const handleNext = (data: PersonalInfoValues) => {
    updatePersonalInfo(data);
    navigate("/address");
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
        // Deep Midnight Blue Background
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
                Phase 01 / Identity
              </Typography>
              <Typography
                variant="h3"
                sx={{ color: "#fff", fontWeight: 200, letterSpacing: -1 }}
              >
                Create your <span style={{ fontWeight: 800 }}>Profile</span>
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit(handleNext)}>
              <Stack spacing={3}>
                <ArtisanInput
                  label="First Name"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  fullWidth
                />
                <ArtisanInput
                  label="Last Name"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  fullWidth
                />
                <ArtisanInput
                  type="email"
                  label="Email Address"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    borderRadius: "14px",
                    background:
                      "linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                    py: 2,
                    boxShadow: `0 8px 20px ${alpha("#3B82F6", 0.3)}`,
                    "&:hover": {
                      background: "#fff",
                      color: "#2563EB",
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 30px ${alpha("#3B82F6", 0.5)}`,
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Continue to Address
                </Button>
              </Stack>
            </form>
          </CrystalPanel>
        </Box>
      </Fade>
    </Container>
  );
}
