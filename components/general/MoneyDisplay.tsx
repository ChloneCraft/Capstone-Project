import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useEffect, useState } from "react";

export default function MoneyDisplay() {
  const [money, setMoney] = useState(0);
  const session = useSession();
  const id = session?.data?.user?.id;
  const { data } = useSWR(`/api/${id}/money`);
  useEffect(() => {
    if (data) {
      setMoney(data.currentMoney);
    }
  });
  return <span className="moneyDisplay">{money} $</span>;
}
