export default function CostsUnlocking({
  name,
  amount,
  hasEnough,
}: {
  name: string;
  amount: number;
  hasEnough: boolean;
}) {
  return (
    <aside className="cost_costs">
      <span className={hasEnough ? "green" : "red"}>{name}</span>
      <span className={hasEnough ? "green" : "red"}>{amount}</span>
    </aside>
  );
}
