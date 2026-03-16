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
import { AddressYupValidation } from "../services/validation/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { FormData } from "../typescript/interface/interface";

const meshMove = keyframes`
  0% { transform: scale(1) translate(0, 0); }
  33% { transform: scale(1.2) translate(10%, -5%); }
  66% { transform: scale(0.9) translate(-5%, 10%); }
  100% { transform: scale(1) translate(0, 0); }
`;

const GlassCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: "48px",
  background: alpha("#ffffff", 0.04),
  backdropFilter: "blur(50px) saturate(200%)",
  WebkitBackdropFilter: "blur(50px) saturate(200%)",
  border: `1px solid ${alpha("#ffffff", 0.15)}`,
  position: "relative",
  overflow: "hidden",
  boxShadow: `
    0 4px 24px -1px rgba(0, 0, 0, 0.3),
    inset 0 0 20px 0 rgba(255, 255, 255, 0.02)
  `,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "48px",
    padding: "1.5px",
    background: `linear-gradient(135deg, ${alpha("#fff", 0.4)}, transparent, ${alpha("#7000FF", 0.3)})`,
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    pointerEvents: "none",
  },
}));

const CyberInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: alpha("#fff", 0.03),
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "& fieldset": {
      borderColor: alpha("#ffffff", 0.08),
    },
    "&:hover fieldset": {
      borderColor: alpha("#7000FF", 0.5),
    },
    "&.Mui-focused": {
      backgroundColor: alpha("#fff", 0.07),
      "& fieldset": {
        borderWidth: "1.5px",
        borderColor: "#7000FF",
        boxShadow: `0 0 25px ${alpha("#7000FF", 0.2)}`,
      },
    },
  },
  "& .MuiInputBase-input": {
    color: "#fff",
    fontSize: "1.05rem",
    padding: "18px 20px",
  },
  "& .MuiInputLabel-root": {
    color: alpha("#fff", 0.5),
    marginLeft: "8px",
    "&.Mui-focused": {
      color: "#BF77FF",
    },
  },
});

export default function AddressPage() {
  const { state, updateAddressInfo } = useFormContext();
  const navigate = useNavigate();

  type AddressValues = FormData["addressInfo"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressValues>({
    resolver: yupResolver(AddressYupValidation),
    defaultValues: {
      street: state.addressInfo.street || "",
      city: state.addressInfo.city || "",
      zipCode: state.addressInfo.zipCode || "",
    },
  });

  const handleNext = async (data: AddressValues) => {
    updateAddressInfo(data);
    navigate("/preferences");
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "#02040A",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "140%",
          height: "140%",
          top: "-20%",
          left: "-20%",
          background: `
          radial-gradient(circle at 20% 30%, ${alpha("#4D00FF", 0.15)} 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, ${alpha("#0070FF", 0.12)} 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, ${alpha("#7000FF", 0.08)} 0%, transparent 50%)
        `,
          animation: `${meshMove} 20s infinite alternate linear`,
          filter: "blur(80px)",
        }}
      />

      <Fade in={true} timeout={1200}>
        <Box sx={{ width: "100%", maxWidth: 520, zIndex: 1, px: 2 }}>
          <GlassCard elevation={0}>
            <Stack spacing={1.5} sx={{ mb: 5 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "#BF77FF",
                  letterSpacing: 4,
                  fontWeight: 800,
                  textShadow: `0 0 20px ${alpha("#7000FF", 0.5)}`,
                }}
              >
                Secure Delivery
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                Address{" "}
                <span style={{ color: alpha("#fff", 0.5) }}>Details</span>
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit(handleNext)}>
              <Stack spacing={3}>
                <CyberInput
                  label="Street Name"
                  {...register("street")} // This links to yup validation
                  placeholder="e.g Kolkata Street"
                  error={!!errors.street}
                  helperText={errors.street?.message}
                  fullWidth
                />
                <CyberInput
                  label="City"
                  {...register("city")}
                  placeholder="e.g. Kolkata"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  fullWidth
                />
                <CyberInput
                  label="ZIP Code"
                  {...register("zipCode")}
                  placeholder="721212"
                  error={!!errors.zipCode}
                  helperText={errors.zipCode?.message}
                  fullWidth
                />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ pt: 3 }}
                >
                  <Button
                    onClick={() => navigate("/")}
                    fullWidth
                    sx={{
                      borderRadius: "18px",
                      color: "#fff",
                      textTransform: "none",
                      fontSize: "1rem",
                      py: 2,
                      border: `1px solid ${alpha("#fff", 0.1)}`,
                      background: alpha("#fff", 0.02),
                      "&:hover": {
                        background: alpha("#fff", 0.08),
                        borderColor: alpha("#fff", 0.4),
                      },
                    }}
                  >
                    Previous
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: "18px",
                      background:
                        "linear-gradient(135deg, #7000FF 0%, #0070FF 100%)",
                      color: "#fff",
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "1rem",
                      py: 2,
                      boxShadow: `0 12px 30px ${alpha("#7000FF", 0.4)}`,
                      "&:hover": {
                        transform: "translateY(-3px) scale(1.02)",
                        boxShadow: `0 20px 40px ${alpha("#7000FF", 0.5)}`,
                        filter: "brightness(1.2)",
                      },
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    Proceed
                  </Button>
                </Stack>
              </Stack>
            </form>
          </GlassCard>
        </Box>
      </Fade>
    </Container>
  );
}
