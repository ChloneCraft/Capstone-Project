import Crop from "./Crop";
import { uid } from "uid";
import useSWR from "swr";
import { useState } from "react";

export default function Farm() {
  const playerId = useSWR("/api/ChloneCraft").data;

  const [farm, setFarm]: [[any] | [], any] = useState([]);
  console.log("playeridddddddddddddddddddddddddddd", playerId);

  const { data: farmData, isLoading } = useSWR(`/api/${playerId}/farm`);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (farm.length === 0) {
    console.log("farm is empty", farmData);
    setFarm(farmData);
  }
  console.log("farm state:", farm);

  return (
    <section className="farmContainer">
      <div className="farm">
        {farm.map((plot: any, index: number) => {
          return (
            <Crop
              content={plot}
              farm={farm}
              setFarm={setFarm}
              index={index}
              key={uid()}
            />
          );
        })}
      </div>
    </section>
  );
}

//make close button
