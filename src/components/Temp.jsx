import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset } from "@iconscout/react-unicons"
import getTime from "../services/getTime"

const Temp = ({ name, country, condition, temp, icon, feels_like, humidity, wind, high, low, unit, sunrise, sunset }) => {

    const rise = getTime(sunrise)
    const set = getTime(sunset)
  return (
    <div className="text-white text-center py-5">
    <p className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium pt-12'>{name}, {country}</p>
      
    <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-300 py-3'>{condition}</p>

    <div className='flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 py-3'>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}  alt="sun" className='w-20 sm:w-24' />
      <p className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'>{temp}°{unit}</p>
      <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4'>
        <div className='flex font-light text-base sm:text-lg items-center justify-center'>
          <UilTemperature size={18} className="mr-1"/>
          Feels like:
          <span className="font-medium ml-1">{feels_like}°{unit}</span>
        </div>
        <div className='flex font-light text-base sm:text-lg items-center justify-center'>
          <UilTear size={18} className="mr-1"/>
          Humidity:
          <span className="font-medium ml-1">{humidity}%</span>
        </div>
        <div className='flex font-light text-base sm:text-lg items-center justify-center'>
          <UilWind size={18} className="mr-1"/>
          Wind:
          <span className="font-medium ml-1">{wind}MPH</span>
        </div>
      </div>
    </div>

    <div className="flex flex-row justify-center items-center space-x-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl py-5">
      <UilSun />
      <p className="font-light">Rise: <span className="font-medium ml-1">{rise}</span></p>
      <p className="font-light">|</p>
      <UilSunset />
      <p className="font-light">Set: <span className="font-medium ml-1">{set}</span></p>
      <p className="font-light">|</p>
      <UilArrowUp />
      <p className="font-light">High: <span className="font-medium ml-1">{high}°{unit}</span></p>
      <p className="font-light">|</p>
      <UilArrowDown />
      <p className="font-light">Low: <span className="font-medium ml-1">{low}°{unit}</span></p>
    </div>
  </div>
  )
}

export default Temp