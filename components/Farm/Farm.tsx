import Crop from "./Crop";
import { uid } from "uid";
import useSWR from "swr";

export default function Farm({ farm }: { farm: String[] }) {
  const { data } = useSWR("/api/users");
  return (
    <section className="farmContainer">
      <div className="farm">
        {farm.map((plot) => {
          return <Crop content={plot} storage={data} key={uid()} />;
        })}
      </div>
    </section>
  );
}
