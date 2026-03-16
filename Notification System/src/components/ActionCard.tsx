import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import type { ActionCardProps } from "../typescript/interface/notification.interface";

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  desc,
  color,
  icon: Icon,
  onClick,
}) => (
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid #e2e8f0",
        borderRadius: 4,
        "&:hover": {
          boxShadow: `0 10px 20px -10px ${color}60`,
          transform: "translateY(-4px)",
        },
        transition: "0.3s",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Box sx={{ color: color, mb: 1 }}>
          <Icon sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {desc}
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          onClick={onClick}
          sx={{ borderColor: color, color: color }}
        >
          Try it
        </Button>
      </CardContent>
    </Card>
  </Grid>
);

export default ActionCard;
