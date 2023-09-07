import Navbar from "../../../components/general/Navbar";
import useSWR from "swr";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";

export default function Storage() {
  const [query, setQuery] = useState("");
  const [filteredStorage, setFilteredStorage] = useState([]);
  console.log("query", query);

  function handleSearchInput(e: any, fullStorage: any): void {
    if (e.target.value.toLowerCase()) {
      setQuery(e.target.value.toLowerCase());
      setFilteredStorage(
        fullStorage.filter((item: any) =>
          item.plant.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setFilteredStorage(fullStorage);
    }
  }

  const session = useSession();
  if (session.data) {
    const id = session.data?.user?.id;

    const { data: plantStorage } = useSWR(`/api/${id}/plantStorage`);
    if (!plantStorage) {
      return <div>loading...</div>;
    }
    if (filteredStorage.length === 0 && !query) {
      console.log("its happening");

      setFilteredStorage(plantStorage);
    }
    console.log("filtered storage", filteredStorage);

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
                onChange={(e) => handleSearchInput(e, plantStorage)}
              />
            </form>
            <p>Money: 1355$</p>
          </section>
          <section className="storageList">
            <nav className="storageTableNav">
              <h2>Name</h2>
              <h2>Image</h2>
              <h2>expires in</h2>
              <h2>amount</h2>
              <h2>sell</h2>
            </nav>
            <ul className="listStorageItems">
              {filteredStorage.map((storageItem: any) => {
                return (
                  <li key={storageItem.plant._id} className="storageItem">
                    <h3>{storageItem.plant.name}</h3>
                    <div className="imageContainer">
                      <Image
                        src={storageItem.plant.image.img}
                        alt="plantImage"
                        width={40}
                        height={60}
                      />
                    </div>
                    <h3>{storageItem.decayStatus}</h3>
                    <h3>{storageItem.amount}</h3>
                    <div>
                      {storageItem.plant.type !== "seed" && (
                        <button className="sellButton">
                          sell for {/*get marketprice here*/}
                        </button>
                      )}
                      {storageItem.plant.type === "seed" && (
                        <button className="sellButton" disabled>
                          sell for {/*get marketprice here*/}
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
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
