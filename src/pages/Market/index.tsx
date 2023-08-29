import Button from "../../../components/general/Button";

export default function Market() {
  return (
    <main>
      <section className="buttonContainer">
        <Button text="Seeds" destination="/Market/Seeds" />
        <Button text="Goods" destination="/Market/Goods" />
      </section>
    </main>
  );
}
