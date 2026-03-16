
import { Box, Typography, Stack, alpha } from "@mui/material";
import { useLocation } from "react-router-dom";
import { styled, keyframes } from "@mui/material/styles";

const liquidGlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const STEPS_DATA = [
  { id: "01", label: "Identity", path: "/" },
  { id: "02", label: "Relocation", path: "/address" },
  { id: "03", label: "Aesthetics", path: "/preferences" },
  { id: "04", label: "Finalize", path: "/summary" },
];

const GlassDock = styled(Box)(({}) => ({
  position: "fixed",
  top: 40,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1100,
  padding: "8px 12px",
  borderRadius: "40px",
  background: `linear-gradient(135deg, ${alpha("#0A192F", 0.4)} 0%, ${alpha("#000", 0.6)} 100%)`,
  backdropFilter: "blur(30px) saturate(200%)",
  border: `1px solid ${alpha("#FFFFFF", 0.12)}`,
  boxShadow: `0 30px 60px ${alpha("#000", 0.6)}, inset 0 0 20px ${alpha("#3B82F6", 0.15)}`,
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const StepNode = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "completed",
})<{ active?: boolean; completed?: boolean }>(({ active}) => ({
  position: "relative",
  padding: "10px 24px",
  borderRadius: "32px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
  cursor: "pointer",
  background: active 
    ? `linear-gradient(270deg, #2563EB, #60A5FA, #3B82F6)` 
    : "transparent",
  backgroundSize: "200% 200%",
  animation: active ? `${liquidGlow} 4s ease infinite` : "none",
  border: `1px solid ${active ? alpha("#fff", 0.3) : "transparent"}`,
  transform: active ? "scale(1.05)" : "scale(1)",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: -2,
    borderRadius: "34px",
    background: active ? alpha("#3B82F6", 0.4) : "transparent",
    filter: "blur(8px)",
    zIndex: -1,
  }
}));

export default function NeuralProgressTracker() {
  const { pathname } = useLocation();
  const activeIndex = STEPS_DATA.findIndex((s) => s.path === pathname);

  return (
    <GlassDock>
      <Stack direction="row" spacing={1}>
        {STEPS_DATA.map((step, idx) => {
          const isActive = idx === activeIndex;
          const isCompleted = idx < activeIndex;

          return (
            <StepNode 
              key={step.id} 
              active={isActive} 
              completed={isCompleted}
              sx={{
                animation: isActive ? `${float} 3s ease-in-out infinite` : "none"
              }}
            >
              <Box sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: isActive ? "#fff" : isCompleted ? "#3B82F6" : alpha("#fff", 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 900,
                color: isActive ? "#2563EB" : "#fff",
                transition: "all 0.4s ease",
              }}>
                {step.id}
              </Box>
              <Typography
                sx={{
                  color: isActive ? "#fff" : alpha("#fff", 0.4),
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.05rem",
                  textTransform: "uppercase",
                  maxWidth: isActive ? "100px" : "0px",
                  opacity: isActive ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </Typography>
            </StepNode>
          );
        })}
      </Stack>
    </GlassDock>
  );
}