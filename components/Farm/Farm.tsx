import Crop from "./Crop";
import { uid } from "uid";

export default function Farm({ userData }: { userData: any }) {
  return (
    <section className="farmContainer">
      <div className="farm">
        {userData.farm.map((plot: any) => {
          return <Crop content={plot} userData={userData} key={uid()} />;
        })}
      </div>
    </section>
  );
}

//make close button
