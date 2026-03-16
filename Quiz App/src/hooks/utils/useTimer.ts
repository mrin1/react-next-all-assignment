import { useState, useEffect, useCallback } from "react";
import type { UseTimerProps } from "../../typescript/interface/quiz.interface";

export const useTimer = ({
  initialTime,
  onTimeUp,
  keyTrigger,
}: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    resetTimer();
  }, [keyTrigger, resetTimer]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  return { timeLeft, resetTimer };
};
