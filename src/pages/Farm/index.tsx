import MoneyDisplay from "../../../components/general/MoneyDisplay";
import BuyLand from "../../../components/Farm/BuyLand";
import Farm from "../../../components/Farm/Farm";
import Link from "next/link";
import useSWR from "swr";

// const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PlayerFarmPage() {
  const { data } = useSWR("/api/hello");
  if (!data) {
    return <></>;
  }
  console.log("data from fetching user:", data);

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
