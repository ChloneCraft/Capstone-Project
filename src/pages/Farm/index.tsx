import MoneyDisplay from "../../../components/general/MoneyDisplay";
import BuyLand from "../../../components/Farm/BuyLand";
import Farm from "../../../components/Farm/Farm";
import Link from "next/link";
import useSWR from "swr";

export default function PlayerFarmPage() {
  const { data } = useSWR("/api/users");
  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <main>
      <MoneyDisplay />
      <br />
      <BuyLand />
      <p>username: {data.username}</p>
      <Farm farm={data.farm} />
      <Link className="storageLink" href="/Farm/Storage">
        Storage
      </Link>
    </main>
  );
}
//display money, buy more land option, farmplots, storagelink
