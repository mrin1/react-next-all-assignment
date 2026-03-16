import { useEffect, useCallback, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  LinearProgress,
} from "@mui/material";
import { DoubleArrow, FlashOn } from "@mui/icons-material";

import CategorySelection from "../components/quiz/CategorySelection";
import ResultSummary from "../components/quiz/ResultSummary";

import { useAppDispatch, useAppSelector } from "../hooks/utils/redux";
import { useTimer } from "../hooks/utils/useTimer";
import {
  fetchQuizData,
  fetchAllCats,
  processAnswer,
  resetQuiz,
} from "../hooks/reduxToolkit/slice/quizSlice";

const QuizPage = () => {
  const dispatch = useAppDispatch();
  const [picked, setPicked] = useState<string | null>(null);

  const { questions, categories, step, points, history, isOver, status } =
    useAppSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchAllCats());
  }, [dispatch]);

  const handleNext = useCallback(() => {
    dispatch(processAnswer({ choice: picked || "" }));
    setPicked(null);
  }, [dispatch, picked]);

  const { timeLeft } = useTimer({
    initialTime: 20,
    onTimeUp: handleNext,
    keyTrigger: step,
  });

  const catList = useMemo(
    () =>
      Object.entries(categories).map(([name, slugs]) => ({
        name,
        slug: (slugs as string[])[0],
      })),
    [categories],
  );

  const options = useMemo(() => {
    const q = questions?.[step];
    if (!q) return [];
    return [...q.incorrectAnswers, q.correctAnswer].sort(
      () => Math.random() - 0.5,
    );
  }, [questions, step]);

  const total = questions.length;
  const progress = total > 0 ? ((step + 1) / total) * 100 : 0;

  if (status === "loading" && questions.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (questions.length === 0 && !isOver) {
    return (
      <CategorySelection
        categories={catList}
        onSelect={(slug) => dispatch(fetchQuizData(slug))}
      />
    );
  }

  if (isOver) {
    return (
      <ResultSummary
        points={points}
        total={total}
        history={history}
        onRestart={() => dispatch(resetQuiz())}
      />
    );
  }

  const activeQ = questions?.[step];
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        mb={2}
        alignItems="center"
      >
        <Typography variant="caption" fontWeight="900">
          ROUND {step + 1}/{total}
        </Typography>
        <Typography
          variant="h5"
          fontWeight="900"
          color={timeLeft <= 5 ? "error" : "primary"}
        >
          {timeLeft}s
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ mb: 5, height: 8, borderRadius: 4 }}
      />

      <Paper sx={{ p: 4, borderRadius: 8, border: "1px solid #f1f5f9" }}>
        <Stack direction="row" spacing={2} mb={4}>
          <FlashOn color="secondary" />
          <Typography variant="h5" fontWeight="700">
            {activeQ?.question.text}
          </Typography>
        </Stack>
        <Stack spacing={2}>
          {options.map((o, i) => (
            <Button
              key={i}
              fullWidth
              variant={picked === o ? "contained" : "outlined"}
              onClick={() => setPicked(o)}
              sx={{ py: 2, borderRadius: 5, textTransform: "none" }}
            >
              {o}
            </Button>
          ))}
        </Stack>
        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={!picked}
          onClick={handleNext}
          endIcon={<DoubleArrow />}
          sx={{ mt: 5, py: 2, borderRadius: 5 }}
        >
          Confirm
        </Button>
      </Paper>
    </Container>
  );
};

export default QuizPage;
