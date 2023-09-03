import Crop from "./Crop";
import { uid } from "uid";
import useSWR from "swr";
import { useState } from "react";

export default function Farm({ userData }: any) {
  const farm = useSWR(`/api/64ee00dc6f0de821d4b93a9a/farm`).data;
  if (!farm) {
    return <div>loading...</div>;
  }
  console.log(farm);
  return (
    <section className="farmContainer">
      <div className="farm">
        {farm.map((plot: any, index: number) => {
          return (
            <Crop
              content={plot}
              userData={userData}
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
