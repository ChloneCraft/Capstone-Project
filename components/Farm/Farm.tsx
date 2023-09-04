import Crop from "./Crop";
import { uid } from "uid";
import useSWR from "swr";
import { useState } from "react";

export default function Farm() {
  console.log("farm rerender");

  const [farm, setFarm]: [[any] | [], any] = useState([]);
  const { data: farmData, isLoading } = useSWR(
    `/api/64ee00dc6f0de821d4b93a9a/farm`
  );
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (farm.length === 0) {
    console.log("farm is empty");
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
