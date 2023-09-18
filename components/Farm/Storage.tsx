import Navbar from "../general/Navbar";
import useSWR from "swr";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import NumberInput from "../general/NumberInput";
import mongoose from "mongoose";
import { MoneyService } from "@/services/MoneyService";
import { findSeedStackById } from "@/pages/Market/Seeds";
import { sendRequest } from "./SelectSeed";
import { useEffect } from "react";
import Searchbar from "../general/Searchbar";

export default function Storage() {
  const [query, setQuery] = useState("");
  const [filteredStorage, setFilteredStorage] = useState([]);
  const [wantsToChooseAmount, setWantsToChooseAmount] = useState(-1);
  const [displayedMoney, setDisplayedMoney] = useState(-1);
  const session = useSession();
  const id = session?.data?.user?.id;
  const { data: moneyData } = useSWR(`/api/${id}/money`);
  const { data: userStorage } = useSWR(`/api/${id}/plantStorage`);

  useEffect(() => {
    if (userStorage) {
      let sortedUserStorage = userStorage.sort((item1: any, item2: any) => {
        return item2.amount - item1.amount;
      });
      sortedUserStorage = sortedUserStorage.sort((item1: any, item2: any) => {
        return item2.plant.type.length - item1.plant.type.length;
      });
      setFilteredStorage(sortedUserStorage);
    }
  }, [userStorage]);

  if (!moneyData || !userStorage) {
    return <div>loading</div>;
  }
  const { currentMoney, totalMoney } = moneyData;

  if (displayedMoney === -1) {
    setDisplayedMoney(currentMoney);
  }

  async function removeFromInventory(
    userStorage: any,
    plantId: mongoose.Schema.Types.ObjectId,
    amountToSubtract: number,
    decayStatus: number
  ) {
    const stackInStorage = findSeedStackById(userStorage, plantId, decayStatus);

    const { amount: amountInStorage } = stackInStorage;

    const amountInStorageNumber = parseFloat(amountInStorage);
    const newAmount = amountInStorageNumber - amountToSubtract;

    const updatedStack = {
      amount: newAmount,
      plant: stackInStorage.plant,
      decayStatus: decayStatus,
    };

    const updatedStorage = userStorage.map((item: any) => {
      return item.plant._id === plantId ? updatedStack : item;
    });
    await fetch(`/api/${id}/plantStorage`, {
      method: "PUT",
      body: JSON.stringify(updatedStorage),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return updatedStorage;
  }

  async function handleSelling(
    args: { plantId: mongoose.Schema.Types.ObjectId; decayStatus: number },
    amount: number,
    price: number
  ) {
    const { plantId, decayStatus } = args;

    if (!id) {
      return;
    }
    const newCurrentMoney = await MoneyService.calculateUserBalance(
      amount,
      "add",
      currentMoney,
      totalMoney,
      id,
      price
    );
    setDisplayedMoney(newCurrentMoney);
    const updatedStorage = await removeFromInventory(
      userStorage,
      plantId,
      amount,
      decayStatus
    );
    setWantsToChooseAmount(-1);
    setFilteredStorage(updatedStorage);
  }

  async function handleListing(
    args: { plantId: mongoose.Schema.Types.ObjectId; decayStatus: number },
    amount: number,
    price: number
  ) {
    const { plantId, decayStatus } = args;
    sendRequest(`/api/${id}/listItemOnMarket`, {
      arg: { plantId: plantId, amount: amount },
    });
    //reduce number in storage
    const updatedStorage = await removeFromInventory(
      userStorage,
      plantId,
      amount,
      decayStatus
    );
    //----------
    setWantsToChooseAmount(-1);
    setFilteredStorage(updatedStorage);
  }

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

  return (
    <>
      <header>
        <Navbar>
          <Searchbar handleSearchInput={handleSearchInput} list={userStorage} />
        </Navbar>
      </header>
      <main className="storageMain">
        <div className="pageTitle">Storage</div>
        <section className="storageList">
          <nav className="storageTableNav">
            <h2>Name</h2>
            <h2>Image</h2>
            <h2>Expires in</h2>
            <h2>Amount</h2>
            <h2>Quick Sell</h2>
            <h2>Sell on Market</h2>
          </nav>
          <ul className="listStorageItems">
            {filteredStorage.map((storageItem: any, index: number) => {
              return (
                <li key={storageItem.plant._id} className="storageItem">
                  <h3>{storageItem.plant.name}</h3>
                  <div className="imageContainer">
                    <Image
                      src={storageItem.plant.image.img}
                      alt="plantImage"
                      quality={100}
                      width={40}
                      height={60}
                    />
                  </div>
                  {storageItem.decayStatus === 0 ? (
                    <h3>-</h3>
                  ) : (
                    <h3>{storageItem.decayStatus}h</h3>
                  )}
                  <h3>{storageItem.amount}</h3>
                  <div>
                    {storageItem.plant.type !== "seed" &&
                      wantsToChooseAmount === -1 && (
                        <button
                          className="sellButton"
                          onClick={() => setWantsToChooseAmount(index)}
                          disabled={storageItem.amount > 0 ? false : true}
                        >
                          quick sell for{" "}
                          {storageItem.plant.name === "Potato" && "200$"}
                          {storageItem.plant.name === "Pumpkin" && "180$"}
                          {storageItem.plant.name === "Blueberry" && "210$"}
                          {storageItem.plant.name === "Oak Tree" && "300$"}
                          {storageItem.plant.name === "Teak Tree" && "300$"}
                        </button>
                      )}
                    {wantsToChooseAmount === index && (
                      <div
                        style={{
                          transform: "translateX(90px)",
                          position: "absolute",
                        }}
                      >
                        <NumberInput
                          handler={handleSelling}
                          price={storageItem.plant.price}
                          isSelling={true}
                          handlerArgs={{
                            plantId: storageItem.plant._id,
                            decayStatus: storageItem.decayStatus,
                          }}
                          comparer={storageItem.amount}
                        />
                        <button
                          className="sellButton cancel"
                          onClick={() => setWantsToChooseAmount(-1)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {storageItem.plant.type === "seed" && (
                      <button className="sellButton" disabled>
                        {"can not sell seeds"}
                      </button>
                    )}
                  </div>
                  <div>
                    {storageItem.plant.type !== "seed" &&
                      wantsToChooseAmount === -1 && (
                        <button
                          className="sellButton"
                          onClick={() => setWantsToChooseAmount(index + 10)}
                          disabled={storageItem.amount > 0 ? false : true}
                        >
                          list on market
                        </button>
                      )}
                    {wantsToChooseAmount === index + 10 && (
                      <div
                        style={{
                          transform: "translateX(-80px)",
                          position: "absolute",
                        }}
                      >
                        <NumberInput
                          handler={handleListing}
                          price={storageItem.plant.price}
                          isSelling={true}
                          handlerArgs={{
                            plantId: storageItem.plant._id,
                            decayStatus: storageItem.decayStatus,
                          }}
                          comparer={storageItem.amount}
                        />
                        <button
                          className="sellButton cancel"
                          onClick={() => setWantsToChooseAmount(-1)}
                        >
                          cancel
                        </button>
                      </div>
                    )}
                    {storageItem.plant.type === "seed" && (
                      <button className="sellButton" disabled>
                        {"can not sell seeds"}
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
