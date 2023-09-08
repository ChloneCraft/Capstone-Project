import Navbar from "../../../components/general/Navbar";
import useSWR from "swr";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import mongoose from "mongoose";
// import { UserType } from "../../../db/models/User";
import NumberInput from "../../../components/general/NumberInput";

export default function Seeds() {
  const [query, setQuery] = useState("");
  const [filteredSeeds, setFilteredSeeds] = useState([]);
  const [buyingButton, setBuyingButton] = useState(0);
  const { data: plants } = useSWR("/api/plants");

  const session = useSession();
  // if (!session.data) {
  //   return <div>loading...</div>;
  // }
  const id = session.data?.user?.id;
  const { data: userStorage } = useSWR(`/api/${id}/plantStorage`);
  const { data } = useSWR(`/api/${id}/money`);

  function findSeedStackById(array: any, id: mongoose.Schema.Types.ObjectId) {
    return array.find((item: any) => item.plant._id === id);
  }

  async function addSeedsToInventory(
    userStorage: any,
    seedId: mongoose.Schema.Types.ObjectId,
    amountToAdd: number
  ) {
    console.log("seedId", seedId);
    console.log("amountToAdd", amountToAdd);
    console.log("userStorage", userStorage);

    const stackInStorage = findSeedStackById(userStorage, seedId);
    console.log("stack in storage:", stackInStorage);

    const { amount: amountInStorage } = stackInStorage;
    console.log("amount in storage:", amountInStorage);

    const amountInStorageNumber = parseFloat(amountInStorage);
    const newAmount = amountInStorageNumber + amountToAdd;
    console.log("newAmount", newAmount);

    const updatedStack = {
      amount: newAmount,
      plant: stackInStorage.plant,
      decayStatus: stackInStorage.decayStatus,
    };
    console.log("updated Stack", updatedStack);

    const updatedStorage = userStorage.map((item: any) => {
      return item.plant._id === seedId ? updatedStack : item;
    });
    console.log("updated storage:", updatedStorage);
    await fetch(`/api/${id}/plantStorage`, {
      method: "PUT",
      body: JSON.stringify(updatedStorage),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  if (!data) {
    return <div>loading</div>;
  }

  const { currentMoney } = data;

  async function calculateUserBalance(
    amount: number,
    operator: String,
    currentMoney: number
  ) {
    let updatedMoney = null;
    if (operator === "add") {
      console.log("adding");
      updatedMoney = currentMoney + amount;
    } else if (operator === "subtract") {
      console.log("subtracting");

      updatedMoney = currentMoney - amount;
    }
    if (updatedMoney) {
      console.log("money updated", updatedMoney);

      try {
        const result = await fetch(`/api/${id}/money`, {
          method: "PUT",
          body: JSON.stringify(updatedMoney),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (result.ok) {
          await result.json();
          return result;
        }
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

  async function handleBuy(
    seedId: mongoose.Schema.Types.ObjectId,
    amountToAdd: number
  ) {
    setBuyingButton(0);
    const newCurrentMoney = await calculateUserBalance(
      amountToAdd * 100,
      "subtract",
      currentMoney
    );

    console.log("newCurrentMoney", newCurrentMoney);

    addSeedsToInventory(userStorage, seedId, amountToAdd);
    console.log("you bought a seed");
  }

  if (!plants) {
    return <div>loading...</div>;
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
            <p>Money: {currentMoney}</p>
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
                      {buyingButton !== index + 1 && (
                        <button onClick={() => clickBuy(index + 1)}>buy</button>
                      )}
                      {buyingButton === index + 1 && (
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
