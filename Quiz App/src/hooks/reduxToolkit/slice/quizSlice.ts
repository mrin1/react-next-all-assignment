import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../lib/axios.instance';
import type { QuizState } from '../../../typescript/interface/quiz.interface';



const initialState: QuizState = {
  questions: [],
  categories: {},
  step: 0,
  points: 0,
  history: [],
  isOver: false,
  status: 'idle',
};

export const fetchAllCats = createAsyncThunk('quiz/fetchCats', async () => {
  const res = await axiosInstance.get('/categories');
  return res.data;
});

export const fetchQuizData = createAsyncThunk('quiz/fetchData', async (slug: string) => {
  const res = await axiosInstance.get(`/questions?categories=${slug}&difficulty=medium&limit=10`);
  return res.data;
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    processAnswer: (state, action: PayloadAction<{ choice: string }>) => {
      const currentQ = state.questions[state.step];
      if (currentQ) {
        const match = action.payload.choice === currentQ.correctAnswer;
        state.history.push({
          title: currentQ.question.text,
          userChoice: action.payload.choice || "Time Out",
          correctChoice: currentQ.correctAnswer,
          isRight: match,
        });
        if (match) state.points += 1;
      }
      if (state.step + 1 < state.questions.length) {
        state.step += 1;
      } else {
        state.isOver = true;
      }
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.step = 0;
      state.points = 0;
      state.history = [];
      state.isOver = false;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCats.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchQuizData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.questions = action.payload;
      })
      .addCase(fetchQuizData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { processAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;