import Crop from "./Crop";
import { uid } from "uid";
import useSWR from "swr";
import { useState } from "react";

export default function Farm() {
  const [farm, setFarm]: [[any] | [], any] = useState([]);
  // const { data: playerId, isLoading: loading } = useSWR("/api/ChloneCraft");
  // if (loading) {
  //   return <div>loading</div>;
  // }
  // console.log("playeridddddddddddddddddddddddddddd", playerId);

  const { data: farmData, isLoading } = useSWR(
    `/api/64f1b8324b47dbcee3b7fe44/farm`
  );
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
