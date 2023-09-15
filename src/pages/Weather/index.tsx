import { useState } from "react";
import WeatherComponent from "../../../components/Weather/WeatherComponent";

export default function Weather() {
  const [weather, setWeather] = useState();
  const coords = { x: 52.5244, y: 13.4105 };
  // async function getWeather() {
  //   const weatherData = await fetch(
  //     "https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&daily=weathercode,rain_sum&current_weather=true&timezone=Europe%2FBerlin&start_date=2023-09-15&end_date=2023-09-18"
  //   );
  //   if (weatherData.ok) {
  //     return await weatherData.json();
  //   }
  // }
  // setWeather(getWeather())
  return (
    <div>
      <WeatherComponent />
    </div>
  );
}
