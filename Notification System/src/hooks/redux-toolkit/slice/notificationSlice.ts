import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ToastState } from "../../../typescript/interface/notification.interface";

const initialState: ToastState = {
  queue: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    pushNotification: (
      state,
      action: PayloadAction<{ message: string; severity: any }>,
    ) => {
      const { message, severity } = action.payload;

      const isDuplicate = state.queue.find((item) => item.message === message);

      if (!isDuplicate) {
        state.queue.push({
          id: Date.now().toString(),
          message: message,
          severity: severity,
        });
      }
    },

    close: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter((item) => item.id !== action.payload);
    },

    clearAll: (state) => {
      state.queue = [];
    },
  },
});

export const { pushNotification, close, clearAll } = notificationSlice.actions;
export default notificationSlice.reducer;
