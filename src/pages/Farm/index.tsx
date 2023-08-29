import MoneyDisplay from "../../../components/general/MoneyDisplay";
import BuyLand from "../../../components/Farm/BuyLand";
import Farm from "../../../components/Farm/Farm";
import Link from "next/link";
import useSWR from "swr";

export default function PlayerFarmPage() {
  const { data } = useSWR();
  return (
    <main>
      <MoneyDisplay />
      <BuyLand />
      <Farm />
      <Link className="storageLink" href="/Farm/Storage">
        Storage
      </Link>
    </main>
  );
}
//display money, buy more land option, farmplots, storagelink
