import Button from "../../../components/general/Button";
import { getSession } from "next-auth/react";

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
