import React, { useState, useEffect } from "react";
import Forecast from "./components/Forecast";
import Temp from "./components/Temp";
import { UilSearch } from "@iconscout/react-unicons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [location, setLocation] = useState("Berlin");
  const [data, setData] = useState();
  const [units, setUnits] = useState("metric");
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [daily, setDaily] = useState();
  const apiKey = import.meta.env.VITE_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`;
  const urlZip = `https://api.openweathermap.org/data/2.5/weather?zip=${location},in&appid=${apiKey}&units=${units}`;
  const urlDaily = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  const showToast = (message, type = "info", options = {}) => {
    toast[type](message, { autoClose: 800, ...options });
  };

  const fetchData = async () => {
    try {
      if (!isNaN(location) && /^[0-9]+$/.test(location)) {
        const response = await axios.get(urlZip);
        setData(response.data);
        setLat(response.data.coord.lat);
        setLon(response.data.coord.lon);

        setTimeout(async () => {
          const res = await axios.get(urlDaily);
          setDaily(res.data);
        }, 1000);

        showToast("Successfully Fetched Data", "success");
      } else {
        const response = await axios.get(url);
        setData(response.data);
        setLat(response.data.coord.lat);
        setLon(response.data.coord.lon);

        setTimeout(async () => {
          const res = await axios.get(urlDaily);
          setDaily(res.data);
        }, 1000);

        showToast("Successfully Fetched Data", "success");
      }
    } catch (error) {
      console.log("Error:", error);
      showToast(
        "Something went wrong! Enter correct city name or zip!",
        "error",
        { autoClose: 1500 }
      );
    }
  };
  const handleFahrenheit = async () => {
    setUnits("imperial");
    showToast("Fetching Weather for your location");
  };

  const handleCelsius = () => {
    setUnits("metric");
    showToast("Fetching Weather for your location");
  };
  useEffect(() => {
    if (location) fetchData();
  }, [units, lat]);

  return (
    <div className="mx-auto max-w-screen-lg py-5 px-4 sm:px-8 md:px-16 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl">
      <div className="flex flex-col sm:flex-row justify-center my-6">
        <div className="flex flex-row w-full sm:w-3/4 items-center justify-center space-x-4">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Search for city..."
            className="text-xl font-light p-2 w-full shadow-xl focus:outline-none rounded-sm"
          />
          <UilSearch
            onClick={fetchData}
            size={25}
            className="cursor-pointer transition hover:scale-125 text-white"/>
        </div>
        <div className="flex flex-row w-full sm:w-1/4 mt-4 sm:mt-0 items-center justify-center sm:justify-end space-x-2">
          <button
            name="metric"
            onClick={handleCelsius}
            className={`text-xl font-light text-white hover:scale-125 transition ease-out`}>°C</button>
          <p className="text-xl text-white">|</p>
          <button
            name="imperial"
            onClick={handleFahrenheit}
            className={`text-xl font-light text-white hover:scale-125 transition ease-out`}>°F</button>
        </div>
      </div>

      {data ? (
        <>
          <Temp
            name={data?.name}
            country={data?.sys.country}
            condition={data?.weather[0].main}
            temp={data?.main.temp.toFixed()}
            icon={data?.weather[0].icon}
            feels_like={data?.main.feels_like.toFixed()}
            humidity={data?.main.humidity.toFixed()}
            wind={data?.wind.speed.toFixed()}
            high={data?.main.temp_max.toFixed()}
            low={data?.main.temp_min.toFixed()}
            unit={units === "metric" ? "C" : "F"}
            sunrise={data?.sys.sunrise}
            sunset={data?.sys.sunset}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {daily?.list.slice(1, 6).map((dailyItem, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-600 to-gray-800 p-4 rounded-lg shadow-xl">
                <Forecast
                  temp={dailyItem.main.temp.toFixed()}
                  icon={dailyItem.weather[0].icon}
                  unit={units === "metric" ? "C" : "F"}
                  high={dailyItem.main.temp_max.toFixed()}
                  low={dailyItem.main.temp_min.toFixed()}
                  dt={dailyItem.dt_txt}
                />
              </div>
            ))}
          </div>

          <ToastContainer autoClose={2100} theme="colored" newestOnTop={true} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center pt-11">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-blue-500 text-lg">
            Searching for your city and getting your weather...
          </p>
        </div>
      )}
    </div>
  );
};

export default App;