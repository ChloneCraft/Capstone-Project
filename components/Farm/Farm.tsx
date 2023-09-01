import Crop from "./Crop";
import { uid } from "uid";
import useSWR from "swr";

export default function Farm({ userData, mutate }: any) {
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
              mutate={mutate}
              key={uid()}
            />
          );
        })}
      </div>
    </section>
  );
}

//make close button
