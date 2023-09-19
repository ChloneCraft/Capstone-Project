import Crop from "./Crop";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { PlantsService } from "@/services/PlantsService";
import { calcGrowthRate } from "./CropInfo";
import { sendRequest } from "./SelectSeed";
import InfoPopUp from "../general/InfoPopUp";

const interval = 5000;

export default function Farm() {
  const [farm, setFarm] = useState([]);
  let [count, setCount] = useState(0);
  const [weather, setWeather] = useState();
  const [popupMessage1, setPopupMessage1] = useState("");
  const [popupMessage2, setPopupMessage2] = useState("");
  const [icon, setIcon] = useState("");
  const [popup, setPopup] = useState(false);

  let weatherStatus = 1;
  let weatherData = null;

  async function test() {
    weatherData = await PlantsService.getWeather();
    setWeather(weatherData);
  }
  useEffect(() => {
    if (!weatherData) {
      test();
    }
  }, []);
  const session = useSession();

  const id = session?.data?.user?.id;
  const { data: farmData, isLoading, error } = useSWR(`/api/${id}/farm`);

  useInterval(() => {
    updateFarm();
    setCount(count + 1);
  }, interval);
  if (isLoading || !farmData || !weather) {
    return <div>loading...</div>;
  }
  if (error) {
    console.error("errorrrrr", error);
  }
  if (farm) {
    if (farm.length === 0 && farmData) {
      setFarm(farmData);
    }
  }

  // weatherStatus = PlantsService.getWeatherStatus(weather);

  //-------------------------custom hook from internet -> https://overreacted.io/making-setinterval-declarative-with-react-hooks/

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  //-------------using custom hook from internet-------------------------------------

  async function updateFarm(newFarm = null) {
    if (!newFarm) {
      newFarm = farm.map((crop) => {
        if (!crop.plant.type) {
          return crop;
        } else {
          const decrease =
            ((interval / 100) * calcGrowthRate(weatherStatus)) / 50;
          let newGrowthStatus = crop.growthStatus - decrease;
          if (newGrowthStatus <= 0) {
            newGrowthStatus = 0;
          }

          return {
            growthStatus: newGrowthStatus,
            plant: crop.plant,
            waterCapacity: crop.waterCapacity,
          };
        }
      });
    }
    const response = await sendRequest(`/api/${id}/farm`, { arg: newFarm });
    setFarm(response);
    return newFarm;
  }
  //---------------------------------------
  function activatePopup(message1, message2, icon) {
    setPopup(true);
    setPopupMessage1(message1);
    setPopupMessage2(message2);
    setIcon(icon);
    setTimeout(() => {
      setPopup(false);
    }, 2000);
  }

  if (farm.length !== 0) {
    return (
      <section className="farmContainer">
        <InfoPopUp
          message1={popupMessage1}
          message2={popupMessage2}
          icon={icon}
          condition={popup}
        />
        <div className="farm">
          {farm.map((plot, index) => {
            return (
              <Crop
                content={plot}
                farm={farm}
                setFarm={setFarm}
                index={index}
                updateFarm={updateFarm}
                key={index}
                weather={weather}
                activatePopup={activatePopup}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

//make close button
