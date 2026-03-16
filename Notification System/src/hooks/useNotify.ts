import { useAppDispatch } from "../hooks/utils/redux";
import { pushNotification } from "./redux-toolkit/slice/notificationSlice";

export const useNotify = () => {
  const dispatch = useAppDispatch();

  return {
    success: (message: string) => {
      dispatch(pushNotification({ message, severity: "success" }));
    },
    error: (message: string) => {
      dispatch(pushNotification({ message, severity: "error" }));
    },
    warn: (message: string) => {
      dispatch(pushNotification({ message, severity: "warning" }));
    },
    info: (message: string) => {
      dispatch(pushNotification({ message, severity: "info" }));
    },
  };
};