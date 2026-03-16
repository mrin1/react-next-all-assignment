import React from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  DeleteSweep as ClearAllIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useAppDispatch } from "../hooks/utils/redux";
import {
  close,
  clearAll,
} from "../hooks/redux-toolkit/slice/notificationSlice";
import type { NotificationDrawerProps } from "../typescript/interface/notification.interface";

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  queue,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 350, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Notifications
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {queue.length > 0 && (
          <Button
            startIcon={<ClearAllIcon />}
            fullWidth
            color="error"
            onClick={() => dispatch(clearAll())}
            sx={{ my: 2 }}
          >
            Clear All
          </Button>
        )}

        <List>
          {queue.length === 0 ? (
            <Typography
              sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}
            >
              No new notifications
            </Typography>
          ) : (
            queue.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => dispatch(close(item.id))}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: "#f1f5f9",
                  borderLeft: "5px solid",
                  borderColor: `${item.severity}.main`,
                }}
              >
                <ListItemText
                  primary={item.message}
                  secondary={item.severity}
                  primaryTypographyProps={{ variant: "body2", fontWeight: 600 }}
                />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;
