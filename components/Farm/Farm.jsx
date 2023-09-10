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
  useInterval(() => {
    updateFarm();
    setCount(count + 1);
  }, interval);
  if (isLoading || !farmData) {
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

  async function updateFarm() {
    const newFarm = farm.map((crop) => {
      if (!crop.plant.type) {
        return crop;
      } else {
        let newGrowthStatus = crop.growthStatus - interval / 1000;
        // console.log("newGrowthStatus", newGrowthStatus);
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
    const response = await fetch(`/api/${id}/farm`, {
      method: "PUT",
      body: JSON.stringify(newFarm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const result = await response.json();
      // console.log("result from fetch", result);
    } else {
      console.error(`Error: ${response.status}`);
    }
    // console.log("newFarm", newFarm);
    setFarm(newFarm);
    return newFarm;
  }
  console.log("farm", farm);
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
                // plantId={farm[index].plant._id}
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
