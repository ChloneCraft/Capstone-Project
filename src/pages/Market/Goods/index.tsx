import { getSession } from "next-auth/react";
import MarketItemList from "../../../../components/Market/MarketItemList";

export default function Goods() {
  return <MarketItemList />;
}

//redirecting if not logged in

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: { session },
  };
};
