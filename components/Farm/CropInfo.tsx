import { PlantsService } from "@/services/PlantsService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function calcGrowthRate(weatherStatus: number) {
  switch (weatherStatus) {
    case 0:
      return 80;
    case 1:
      return 100;
    case 2:
      return 120;
    default:
      return 0;
  }
}

export default function CropInfo({
  index,
  setIsClicked,
  isClicked,
  killCrop,
  setHasMouseOver,
  weather,
}: any) {
  const [thisWeather, setThisWeather] = useState();

  // async function test() {
  //   const weatherData = await PlantsService.getWeather();
  //   setWeather(weatherData);
  // }
  // useEffect(() => {
  //   test();
  // }, [weather]);
  useEffect(() => {
    if (weather) {
      setThisWeather(weather);
    }
  }, [weather]);
  console.log(thisWeather);

  const session = useSession();
  function handleClick(e: any) {
    e.stopPropagation();
  }
  function handleClosing(): void {
    setIsClicked(false);
    setHasMouseOver(false);
  }
  function handleKillingPlant(): void {
    setIsClicked(false);
    setHasMouseOver(false);
    killCrop();
  }
  const userId = session?.data?.user?.id;
  const { data: farm } = useSWR(`/api/${userId}/farm`);

  if (!thisWeather) {
    return <div>loading</div>;
  }
  console.log("thisWeather", thisWeather);

  const weatherStatus = PlantsService.getWeatherStatus(thisWeather);

  if (farm) {
    const { growthStatus, waterCapacity, plant } = farm[index];
    console.log("growthStatus", growthStatus);

    const growthStatusMin = Math.floor(growthStatus / 20 / 60);
    const growthStatusSec = Math.round((growthStatus / 20) % 60);
    const { name: plantName } = plant;
    const growthRate = calcGrowthRate(weatherStatus);
    console.log(weatherStatus);

    return (
      <div
        className={growthStatus !== 0 ? "cropInfo" : "cropInfo ready"}
        onClick={handleClick}
      >
        <nav className="selectSeed__nav">
          <h2 className="plantName">{plantName}</h2>
          {isClicked && (
            <button className="close" onClick={() => handleClosing()}>
              ❌
            </button>
          )}
        </nav>
        {growthStatus !== 0 ? (
          <div className="cropInfoMainParameters">
            <div className="cropInfoMain">
              <aside className="cropInfoMain__wrapper">
                <span className="left">Needs water: </span>
                <span className="right">
                  {weather?.daily?.rain_sum[0] ? "No" : "Yes"}
                </span>
              </aside>
              <aside className="cropInfoMain__wrapper">
                <span className="left">Ready in:</span>
                <span className=" right">
                  {growthStatusMin}m {growthStatusSec}s
                </span>
              </aside>
              <aside className="cropInfoMain__wrapper">
                <span className="left">Growth Rate:</span>
                {weatherStatus === 2 && (
                  <span className="right green">
                    {thisWeather ? growthRate : "loading"}%
                  </span>
                )}
                {weatherStatus === 1 && growthRate >= 80 && (
                  <span className="right yellow">
                    {thisWeather ? growthRate : "loading"}%
                  </span>
                )}
                {weatherStatus === 0 && (
                  <span className="right red">
                    {thisWeather ? growthRate : "loading"}%
                  </span>
                )}
              </aside>
              {isClicked && (
                <button
                  className="killPlant"
                  onClick={() => handleKillingPlant()}
                >
                  kill plant
                </button>
              )}
            </div>
            {weather?.daily?.rain_sum[0] ? (
              <p className="cropInfoExtra">
                - Your plants enjoy being watered.
              </p>
            ) : (
              <p className="cropInfoExtra plus">
                - Your plants need water.
                <br /> &nbsp; wait for rain!
              </p>
            )}
            {PlantsService.checkWeatherCode(
              weather?.current_weather.weathercode
            ) ? (
              <p className="cropInfoExtra minus">
                - Your Plants embrace the <br /> &nbsp; sun.
              </p>
            ) : (
              <p className="cropInfoExtra plus">
                - it is too cloudy. <br />
                &nbsp; Your Plants dont get enough sunlight.
              </p>
            )}
          </div>
        ) : (
          <p className="collect">Click to Collect!</p>
        )}
      </div>
    );
    // } else {
    //   return <div>loading...</div>;
    // }
  } else {
    return <div>loading...</div>;
  }
}
