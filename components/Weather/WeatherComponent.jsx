import { useState, useEffect } from "react";
import { PlantsService } from "@/services/PlantsService";

export default function WeatherComponent() {
  const [weather, setWeather] = useState();
  // async function getWeather() {
  //   const weatherData = await fetch(
  //     "https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&daily=weathercode,rain_sum&current_weather=true&timezone=Europe%2FBerlin&start_date=2023-09-15&end_date=2023-09-18"
  //   );
  //   if (weatherData.ok) {
  //     return await weatherData.json();
  //   }
  // }

  useEffect(() => {
    async function fetchWeather() {
      const data = await PlantsService.getWeather();
      setWeather(data);
    }
    fetchWeather();
  }, []);

  if (!weather) {
    return <div>loading</div>;
  } else {
    console.log("weather", weather);
    return <h1>{weather.daily.weathercode[0]}</h1>;
  }
}
