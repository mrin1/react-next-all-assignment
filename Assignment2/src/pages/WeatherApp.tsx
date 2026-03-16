import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import type { weatherInterface } from "../typescript/interface";


const WeatherApp = () => {
  const [weather, setWeather] = useState<weatherInterface>();
  const [city, setCity] = useState("");

  const [showCity, setShowCity] = useState("");

  const [loading, setLoading] = useState(false);

  const apikey = "74751f4bd472e679e32d0a19995edc8f";

  const getWeather = async () => {
    setLoading(true);
    try {
      const Response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
      );
      console.log("response", Response);

      setWeather(Response?.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [showCity]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-sky-500 to-cyan-500 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 text-black border border-black border-[5px]/30">
          <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide flex justify-center items-center gap-2">
            Weather App
          </h1>

          {/* Input Box */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={city}
              placeholder="Enter city..."
              className="flex-1 px-4 py-2 rounded-2xl bg-white/30 placeholder-white/70 outline-none focus:ring-2 focus:ring-white border border-white/40"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value)
              }
            />

            <button
              onClick={() => setShowCity(city)}
              className="bg-white text-black px-4 rounded-2xl font-bold hover:bg-blue-100 transition shadow-md"
            >
              Search
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <p className="text-center text-lg font-semibold animate-pulse">
              Loading...
            </p>
          )}

          {/* Weather Data */}
          {!loading && weather?.name && showCity && (
            <div className="text-center space-y-5 bg-white/20 p-5 rounded-2xl shadow-lg border border-white/40">
              <h2 className="text-4xl font-bold drop-shadow-md">
                {weather?.name}, {weather?.sys?.country}
              </h2>

              <div className="grid grid-cols-2 gap-4 text-left text-lg">
                <p className="font-bold bg-white/20 p-3 rounded-xl">
                   Temp:
                  <span className="ml-1">
                    {weather?.main?.temp?.toFixed(1)}°C
                  </span>
                </p>

                <p className="font-bold bg-white/20 p-3 rounded-xl">
                  Max:
                  <span className="ml-1">
                    {weather?.main?.temp_max?.toFixed(1)}°C
                  </span>
                </p>

                <p className="font-bold bg-white/20 p-3 rounded-xl">
                  Feels like:
                  <span className="ml-1">
                    {weather?.main?.feels_like?.toFixed(1)}°C
                  </span>
                </p>

                <p className="font-bold bg-white/20 p-3 rounded-xl">
                  Humidity:
                  <span className="ml-1">{weather?.main?.humidity}%</span>
                </p>

                <p className="font-bold bg-white/20 p-3 rounded-xl col-span-2 text-center">
                  Pressure: {weather?.main?.pressure} hPa
                </p>
              </div>
            </div>
          )}

          {/* Not Found */}
          {!loading && !weather?.name && showCity && (
            <p className="text-center text-black font-semibold mt-4">
              City Not Found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
