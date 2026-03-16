import React, { useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);
  const [intervalid, setIntervalId] = useState<number | null>(null);

  const handleStart = () => {
    if (!run) {
      setRun(true);
      const id = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const handlePause = () => {
    setRun(false);
    if (intervalid) {
      clearInterval(intervalid);
      setIntervalId(null);
    }
  };

  const handleReset = () => {
    handlePause();
    setTime(0);
  };

  const Time = () => {
    const mins = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 pt-40 min-h-screen bg-gray-100 text-black">
      <h2 className="text-xl font-bold">Stopwatch</h2>

      <div className="text-4xl font-mono bg-white rounded shadow px-6 py-3">
        {Time()}
      </div>

      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-green-800 text-white rounded"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-yellow-800 text-white rounded"
          onClick={handlePause}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 bg-red-700 text-white rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
