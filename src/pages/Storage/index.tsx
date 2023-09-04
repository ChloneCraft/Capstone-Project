import Navbar from "../../../components/general/Navbar";
import useSWR from "swr";
import Image from "next/image";

export default function Storage() {
  const developerID = "64ee00dc6f0de821d4b93a9a";
  const { data: plantStorage } = useSWR(`/api/${developerID}/plantStorage`);
  if (!plantStorage) {
    return <div>loading...</div>;
  }

  return (
    <>
      <header>
        <Navbar pageTitle={"Storage"}></Navbar>
      </header>
      <main className="storageMain">
        <section className="storageSearchbarSection">
          <form className="storageForm">
            <input type="text" name="storageSearchbar" />
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
            {plantStorage.map((storageItem: any) => {
              return (
                <li key={storageItem._id} className="storageItem">
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
