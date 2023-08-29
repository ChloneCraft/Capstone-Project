import Crop from "./Crop";

export default function Farm({ farm }: { farm: String[] }) {
  return (
    <section className="farmContainer">
      <div className="farm">
        {farm.map((plot) => {
          return <Crop content={plot} />;
        })}
      </div>
    </section>
  );
}
