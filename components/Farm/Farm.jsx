import Crop from "./Crop";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const interval = 3000;

export default function Farm() {
  const [farm, setFarm] = useState([]);
  const [growthId, setGrowthId] = useState();
  let [count, setCount] = useState(0);
  const session = useSession();

  const id = session?.data?.user?.id;
  const { data: farmData, isLoading, error } = useSWR(`/api/${id}/farm`);
  // if (farm.length !== 0 && !growthId) {
  // setGrowthId("intervalId");
  useInterval(() => {
    updateFarm();
    setCount(count + 1);
  }, interval);
  // repeatTimeout();
  // }
  if (isLoading || !farmData) {
    // useRef();
    // useEffect(() => {}, []);
    return <div>loading...</div>;
  }
  if (error) {
    console.error("errorrrrr", error);
  }
  if (farm.length === 0 && farmData) {
    setFarm(farmData);
  }

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

  //----------------------------------------------------------------------------------------------------

  //-------------using custom hook from internet-------------------------------------

  //----------------------------------------------------------------------------

  // function repeatTimeout() {
  //   setTimeout(() => {
  //     updateFarm();
  //     repeatTimeout();
  //   }, interval);
  // }

  // clearInterval(intervalId);

  function updateFarm() {
    // const farmState = farmToGrow();
    const newFarm = farm.map((crop) => {
      if (!crop.plant.type) {
        return crop;
      } else {
        let newGrowthStatus = crop.growthStatus - interval / 1000;
        console.log("newGrowthStatus", newGrowthStatus);
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
    console.log("newFarm", newFarm);
    setFarm(newFarm);
    return newFarm;
  }

  // console.log("farm", farm);

  if (farm.length !== 0) {
    return (
      <section className="farmContainer">
        <div className="farm">
          {farm.map((plot, index) => {
            return (
              <Crop
                content={plot}
                farm={farm}
                setFarm={setFarm}
                index={index}
                key={plot._id}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

//make close button
