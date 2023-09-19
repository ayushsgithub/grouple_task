import React from "react";
import getDay from "../services/getday";

const Forecast = ({ temp, icon, unit, high, low, dt }) => {
  const day = getDay(dt);

  return (
    <div>
      <div className="flex flex-col items-center justify-between text-white">
        <p className="font-light text-lg sm:text-xl md:text-2xl">{day}</p>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="sun"
          className="w-16 sm:w-20 md:w-24 my-1"/>
        <p className="font-medium text-xl sm:text-2xl md:text-3xl">
          {temp}°{unit}
        </p>

        <div className="flex flex-row justify-center space-x-2 sm:space-x-4 md:space-x-6">
          <p className="font-medium text-sm sm:text-base md:text-lg">
            High: {high}°{unit}
          </p>
          <p className="font-medium text-sm sm:text-base md:text-lg">
            Low: {low}°{unit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
