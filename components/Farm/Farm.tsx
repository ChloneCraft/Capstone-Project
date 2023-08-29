import Crop from "./Crop";
import { uid } from "uid";

export default function Farm({ farm }: { farm: String[] }) {
  return (
    <section className="farmContainer">
      <div className="farm">
        {farm.map((plot) => {
          return <Crop content={plot} key={uid()} />;
        })}
      </div>
    </section>
  );
}
