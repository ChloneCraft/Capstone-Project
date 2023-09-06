import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Welcome() {
  const session = useSession();
  const { push } = useRouter();
  const name = session?.data?.user?.name;

  function handleRegionSelect(region: String) {
    user.region = region;
    fetch(`/api/${name}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    push("/");
  }
  const { data: user, isLoading } = useSWR(`/api/${name}`);
  console.log(session.data);

  if (session.data) {
    if (isLoading) {
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
}
