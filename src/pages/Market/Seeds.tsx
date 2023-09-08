import Navbar from "../../../components/general/Navbar";
import useSWR from "swr";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import mongoose from "mongoose";
import { UserType } from "../../../db/models/User";
import NumberInput from "../../../components/general/NumberInput";

export default function Seeds() {
  const [query, setQuery] = useState("");
  const [filteredSeeds, setFilteredSeeds] = useState([]);
  const [buyingButton, setBuyingButton] = useState(0);
  const { data: plants } = useSWR("/api/plants");
  if (!plants) {
    return <div>loading...</div>;
  }
  const session = useSession();
  // if (!session.data) {
  //   return <div>loading...</div>;
  // }
  const id = session.data?.user?.id;
  const { data: userStorage } = useSWR(`/api/${id}/plantStorage`);
  const { data: currentMoney } = useSWR(`/api/${id}/money`);

  function findSeedStackById(array: any, id: mongoose.Schema.Types.ObjectId) {
    return array.find((item: any) => item.plant._id === id);
  }

  async function addSeedsToInventory(
    userStorage: any,
    seedId: mongoose.Schema.Types.ObjectId,
    amountToAdd: Number
  ) {
    const stackInStorage = findSeedStackById(userStorage, seedId);
    const { amount: amountInStorage } = stackInStorage;
    const updatedStorage = {
      amount: amountInStorage + amountToAdd,
      ...stackInStorage,
    };
    await fetch(`/api/${id}/plantStorage`, {
      method: "PUT",
      body: JSON.stringify(updatedStorage),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function calculateUserBalance(
    amount: number,
    operator: String,
    currentMoney: number
  ) {
    let updatedMoney = null;
    if (operator === "add") {
      updatedMoney = currentMoney + amount;
    } else if (operator === "subtract") {
      updatedMoney = currentMoney - amount;
    }
    if (updatedMoney) {
      try {
        const result = await fetch(`/api/${id}/plantStorage`, {
          method: "PUT",
          body: JSON.stringify(updatedMoney),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return result;
      } catch (error) {
        console.error(error);

        return "error";
      }
    } else {
      return "error: updated money does not exist";
    }
  }

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

  function clickBuy(buttonId: number) {
    setBuyingButton(buttonId);
  }

  function handleBuy(
    seedId: mongoose.Schema.Types.ObjectId,
    amountToAdd: number
  ) {
    setBuyingButton(0);
    calculateUserBalance(100, "subtract", currentMoney);
    addSeedsToInventory(userStorage, seedId, amountToAdd);
    console.log("you bought a seed");
  }

  if (session.data) {
    const listOfSeeds = plants.filter((plant: any) => {
      return plant.type === "seed";
    });

    if (filteredSeeds.length === 0 && !query) {
      setFilteredSeeds(listOfSeeds);
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
              {filteredSeeds.map((storageItem: any, index: number) => {
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
                    <h3>100$</h3>
                    <div>
                      {buyingButton !== index && (
                        <button onClick={() => clickBuy(index)}>buy</button>
                      )}
                      {buyingButton === index && (
                        <NumberInput
                          id={storageItem._id}
                          handleBuy={handleBuy}
                        />
                      )}
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
