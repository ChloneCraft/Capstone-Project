import Navbar from "../../../components/general/Navbar";
import useSWR from "swr";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import getSeeds from "@/lib/getSeeds";

export default function Seeds() {
  const [query, setQuery] = useState("");
  const [filteredSeeds, setFilteredSeeds] = useState([]);
  const { data: plants } = useSWR("/api/plants");
  if (!plants) {
    return <div>loading...</div>;
  }
  console.log("query", query);

  function handleSearchInput(e: any, fullStorage: any): void {
    if (e.target.value.toLowerCase()) {
      setQuery(e.target.value.toLowerCase());
      setFilteredSeeds(
        fullStorage.filter((item: any) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setFilteredSeeds(fullStorage);
    }
  }

  const listOfSeeds = plants.filter((plant: any) => {
    return plant.type === "seed";
  });

  if (filteredSeeds.length === 0 && !query) {
    setFilteredSeeds(listOfSeeds);
  }

  function handleBuy() {
    console.log("you bought a seed");
  }

  return (
    <>
      <header>
        <Navbar pageTitle={"Storage"}></Navbar>
      </header>
      <main className="storageMain">
        <section className="storageSearchbarSection">
          <form className="storageForm">
            <input
              type="text"
              name="storageSearchbar"
              onChange={(e) => handleSearchInput(e, listOfSeeds)}
            />
          </form>
          <p>Money: 1355$</p>
        </section>
        <section className="storageList">
          <nav className="storageTableNav">
            <h2>Name</h2>
            <h2>Image</h2>
            <h2>Price</h2>
            <h2>buy</h2>
          </nav>
          <ul className="listStorageItems">
            {filteredSeeds.map((storageItem: any) => {
              return (
                <li key={storageItem._id} className="storageItem">
                  <h3>{storageItem.name}</h3>
                  <div className="imageContainer">
                    <Image
                      src={storageItem.image.img}
                      alt="plantImage"
                      width={40}
                      height={60}
                    />
                  </div>
                  <h3>300$</h3>
                  <div>
                    <button onClick={handleBuy}>buy</button>
                  </div>
                </li>
              );
            })}
          </ul>
          {filteredSeeds.length === 0 && (
            <div
              style={{
                textAlign: "center",
                marginTop: "50px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              no results :(
            </div>
          )}
        </section>
      </main>
    </>
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
