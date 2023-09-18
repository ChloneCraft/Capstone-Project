import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Welcome() {
  const session = useSession();
  const { push } = useRouter();
  const userId = session?.data?.user?.id;

  function handleRegionSelect(region: String) {
    fetch(`/api/${userId}`, {
      method: "PUT",
      body: JSON.stringify(region),
      headers: {
        "Content-Type": "application/json",
      },
    });
    push("/");
  }
  const { data: user, isLoading } = useSWR(`/api/${userId}`);
  if (isLoading || !user) {
    return <div>loading...</div>;
  }

  if (user.region === "none") {
    return (
      <main className="welcomeMain">
        <p>Select your Region:</p>

        <button
          className="regionButton"
          onClick={() => handleRegionSelect("Katara")}
        >
          Katara
        </button>
        <button
          className="regionButton"
          onClick={() => handleRegionSelect("Bray Island")}
        >
          Bray Island
        </button>
        <button
          className="regionButton"
          onClick={() => handleRegionSelect("Hanimaadhoo")}
        >
          Hanimaadhoo
        </button>
        <button
          className="regionButton"
          onClick={() => handleRegionSelect("Tortuga")}
        >
          Tortuga
        </button>
        <button
          className="regionButton"
          onClick={() => handleRegionSelect("Kontcha")}
        >
          Kontcha
        </button>
        <button
          className="regionButton"
          onClick={() => handleRegionSelect("Torsgard")}
        >
          Torsgard
        </button>
      </main>
    );
  } else {
    push("/");
  }
}
