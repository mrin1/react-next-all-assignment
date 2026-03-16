import axios from "axios";
import React, { useEffect, useState } from "react";

const JokeGenerator: React.FC = () => {
  const [joke, setJoke] = useState<{ setup?: string; punchline?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
      );
      setJoke(response.data);
    } catch (err) {
      setError("Failed to fetch joke. Try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 ">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center border-[2px] border-black">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 underline">
          Random Joke
        </h2>

        {loading ? (
          <p className="text-gray-700 font-semibold animate-pulse">
            Loading...
          </p>
        ) : error ? (
          <p className="text-red-600 font-semibold">{error}</p>
        ) : (
          <>
            <p className="text-lg font-semibold text-gray-800 mb-3">
              {joke.setup}
            </p>
            <p className="text-md text-gray-700 italic mb-4">
              {joke.punchline}
            </p>
          </>
        )}

        <button
          onClick={fetchData}
          className="  bg-green-600 py-2.5 rounded-xl 
            font-semibold text-sm shadow-md 
            hover:bg-blue-700 hover:scale-105 transition-all text-white px-4  "
        >
          New Joke
        </button>
      </div>
    </div>
  );
};

export default JokeGenerator;
