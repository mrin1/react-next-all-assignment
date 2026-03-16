import React from "react";
import {
  Container,
  Fade,
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  EmojiEvents as Medal,
  History as LogIcon,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import type { ResultSummaryProps } from "../../typescript/interface/quiz.interface";

const ResultSummary: React.FC<ResultSummaryProps> = ({
  points,
  total,
  history,
  onRestart,
}) => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 10 }}>
      <Fade in>
        <Box>
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              mb: 5,
            }}
          >
            <Medal sx={{ fontSize: 60, color: "gold", mb: 1 }} />
            <Typography variant="h2" color="primary" fontWeight="900">
              {points}/{total}
            </Typography>
            <Button
              variant="contained"
              onClick={onRestart}
              sx={{ mt: 3, px: 6, borderRadius: 5 }}
            >
              New Quiz
            </Button>
          </Paper>

          <Typography
            variant="h5"
            fontWeight="800"
            sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
          >
            <LogIcon /> Result Log
          </Typography>

          <Paper
            sx={{
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid #e2e8f0",
            }}
          >
            <List disablePadding>
              {history.map((h, i) => (
                <ListItem
                  key={i}
                  divider
                  sx={{
                    bgcolor: h.isRight
                      ? "rgba(76, 175, 80, 0.05)"
                      : "rgba(244, 67, 54, 0.05)",
                  }}
                >
                  <ListItemIcon>
                    {h.isRight ? (
                      <CheckCircle color="success" />
                    ) : (
                      <Cancel color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight="bold">{h.title}</Typography>
                    }
                    secondary={
                      <Typography variant="body2">
                        Pick: {h.userChoice} | Correct: {h.correctChoice}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Fade>
    </Container>
  );
};

export default ResultSummary;
