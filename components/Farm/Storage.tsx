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
      setFilteredStorage(userStorage);
    }
  }, [userStorage]);

  if (!moneyData || !userStorage) {
    return <div>loading</div>;
  }
  const { currentMoney } = moneyData;

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

  // if (
  //   typeof filteredStorage === "undefined" ||
  //   (filteredStorage.length === 0 && !query)
  // ) {
  //   console.log("its happening");

  //   setFilteredStorage(userStorage);
  // }
  // console.log("filtered storage", filteredStorage);

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
              onChange={(e) => handleSearchInput(e, userStorage)}
            />
          </form>
          <p>Money: {displayedMoney}</p>
        </section>
        <section className="storageList">
          <nav className="storageTableNav">
            <h2>Name</h2>
            <h2>Image</h2>
            <h2>expires in</h2>
            <h2>amount</h2>
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
                    )}
                    {storageItem.plant.type === "seed" && (
                      <button className="sellButton" disabled>
                        {"can&apos;t sell seeds"}
                      </button>
                    )}
                  </div>
                  <div>
                    {storageItem.plant.type !== "seed" &&
                      wantsToChooseAmount === -1 && (
                        <button
                          className="sellButton"
                          onClick={() => setWantsToChooseAmount(index)}
                        >
                          list on market
                        </button>
                      )}
                    {wantsToChooseAmount === index && (
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
                    )}
                    {storageItem.plant.type === "seed" && (
                      <button className="sellButton" disabled>
                        {"can&apos;t sell seeds"}
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
