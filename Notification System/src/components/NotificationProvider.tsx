import React, { useEffect } from "react";
import { Box, Typography, IconButton, Paper, Stack } from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircle,
  Error,
  Info,
  Warning,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../hooks/utils/redux";
import { close } from "../hooks/redux-toolkit/slice/notificationSlice";

const icons = {
  success: <CheckCircle sx={{ color: "#2e7d32" }} />,
  error: <Error sx={{ color: "#d32f2f" }} />,
  warning: <Warning sx={{ color: "#ed6c02" }} />,
  info: <Info sx={{ color: "#0288d1" }} />,
};
const ToastItem = ({
  item,
  onClose,
}: {
  item: any;
  onClose: (id: string) => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(item.id);
    }, 7000);

    return () => clearTimeout(timer);
  }, [item.id, onClose]);

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      layout
    >
      <Paper
        elevation={4}
        sx={{
          p: 2,
          display: "flex",
          alignItems: "start",
          gap: 2,
          borderLeft: `6px solid`,
          borderColor: `${item.severity}.main`,
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        {icons[item.severity as keyof typeof icons]}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, textTransform: "capitalize" }}
          >
            {item.severity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.message}
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => onClose(item.id)}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Paper>
    </motion.div>
  );
};

const NotificationProvider: React.FC = () => {
  const { queue } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{ position: "fixed", top: 24, right: 24, zIndex: 9999, width: 340 }}
    >
      <Stack spacing={2}>
        <AnimatePresence>
          {queue.map((item) => (
            <ToastItem
              key={item.id}
              item={item}
              onClose={(id) => dispatch(close(id))}
            />
          ))}
        </AnimatePresence>
      </Stack>
    </Box>
  );
};

export default NotificationProvider;
