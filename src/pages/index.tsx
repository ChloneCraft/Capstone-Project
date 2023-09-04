import Head from "next/head";
import { Inter } from "next/font/google";
import MoneyDisplay from "../../components/general/MoneyDisplay";
import BuyLand from "../../components/Farm/BuyLand";
import Farm from "../../components/Farm/Farm";
import Link from "next/link";
import useSWR from "swr";
import Navbar from "../../components/general/Navbar";
import { useSession, signOut, getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

const developerID = "64f60382abbb5a878d33ba3d";
const developer2ID = "64f1b8324b47dbcee3b7fe44";

export default function Home() {
  // const { data: session, status } = useSession();
  const response = useSWR(`/api/${developerID}`);
  const { data } = response;
  if (!data) {
    return <div>loading...</div>;
  }
  {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <Navbar pageTitle="Farmstock" />
        </header>
        <main className="buttonContainer">
          <MoneyDisplay />
          <br />
          <BuyLand />
          <p>username: {data.username}</p>
          <Farm />
          <Link className="storageLink" href="/Storage">
            Storage
          </Link>
        </main>
      </>
    );
  }
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
//--------
