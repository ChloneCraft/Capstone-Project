import Crop from "./Crop";
import { uid } from "uid";
import useSWR from "swr";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Farm() {
  const [farm, setFarm]: [[any] | [], any] = useState([]);
  const session = useSession();
  // console.log("session", session);

  if (session.data) {
    const id = session.data?.user?.id;

    const { data: farmData, isLoading, error } = useSWR(`/api/${id}/farm`);
    // console.log("farmData", farmData);

    if (isLoading || !farmData) {
      return <div>loading...</div>;
    }
    if (error) {
      console.error("errorrrrrrrrrrrr", error);
    }
    if (farm.length === 0) {
      // console.log("farm is empty", farmData);
      setFarm(farmData);
    }
    // console.log("farm", farm);

    if (farm.length !== 0) {
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
                  key={plot._id}
                />
              );
            })}
          </div>
        </section>
      );
    }
  }
}

//make close button
