export default function CostsUnlocking({
  name,
  amount,
}: {
  name: string;
  amount: number;
}) {
  return (
    <aside>
      <span>{name}</span>
      <span>{amount}</span>
    </aside>
  );
}
