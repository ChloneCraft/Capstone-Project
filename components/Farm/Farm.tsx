import Crop from "./Crop";
import { uid } from "uid";
import useSWR from "swr";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Farm() {
  const [farm, setFarm]: [[any] | [], any] = useState([]);
  const session = useSession();
  let name;
  console.log("session", session);

  if (session.data) {
    const id = session?.data?.user?.id;

    // try {
    const { data: farmData, isLoading, error } = useSWR(`/api/${id}/farm`);
    if (isLoading) {
      return <div>loading...</div>;
    }
    if (error) {
      console.error("errorrrrrrrrrrrr", error);
    }
    if (farm.length === 0) {
      console.log("farm is empty", farmData);
      setFarm(farmData);
    }
    // } catch (e) {
    //   console.error("error:", e);
    // }
    console.log("farm", farm);

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
}

//make close button
