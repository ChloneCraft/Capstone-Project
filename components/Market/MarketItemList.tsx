import useSWR from "swr";
import Navbar from "../general/Navbar";
import Image from "next/image";
import NumberInput from "../general/NumberInput";
import { MarketType, MarketsType, PlantType } from "../../db/models/Plant";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";
import { findSeedStackById } from "@/pages/Market/Seeds";
import { PlantsService } from "@/services/PlantsService";
import { MoneyService } from "@/services/MoneyService";
import { MarketService } from "@/services/MarketService";

export default function MarketItemList() {
  const [marketPlace, setMarketPlace] = useState([]);
  const [query, setQuery] = useState("");
  const [buyingButton, setBuyingButton] = useState(0);
  const [displayedMoney, setDisplayedMoney] = useState(-1);
  const { data: plants } = useSWR("/api/plants");
  const session = useSession();
  const id = session?.data?.user?.id;
  const { data: userStorage } = useSWR(`/api/${id}/plantStorage`);
  const { data } = useSWR(`/api/${id}/money`);

  // function getListOfPlants(plants: any) {
  //   return plants.filter((plant: any) => {
  //     return plant.type === "plant";
  //   });
  // }

  useEffect(() => {
    if (plants) {
      setMarketPlace(PlantsService.getListOfPlants(plants));
    }
  }, [plants]);

  if (!plants) {
    return <div>loading</div>;
  }

  if (!data) {
    return <div>loading</div>;
  }
  const { currentMoney } = data;

  async function addItemToInventory(
    userStorage: any,
    itemId: any,
    amountToAdd: number
  ) {
    const plant = plants.find((item: PlantType) => item._id === itemId);
    const stackInStorage = findSeedStackById(
      userStorage,
      itemId,
      plant.decayTime
    );

    // if (!stackInStorage) {
    //   //create new stack
    // }

    const { amount: amountInStorage } = stackInStorage;

    const amountInStorageNumber = parseFloat(amountInStorage);
    const newAmount = amountInStorageNumber + amountToAdd;

    const updatedStack = {
      amount: newAmount,
      plant: stackInStorage.plant,
      decayStatus: stackInStorage.decayStatus,
    };

    const updatedStorage = userStorage.map((item: any) => {
      return item.plant._id === itemId ? updatedStack : item;
    });
    await fetch(`/api/${id}/plantStorage`, {
      method: "PUT",
      body: JSON.stringify(updatedStorage),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function handleSearchInput(e: any, fullStorage: any): void {
    if (e.target.value.toLowerCase()) {
      setQuery(e.target.value.toLowerCase());
      setMarketPlace(
        fullStorage.filter((item: any) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setMarketPlace(fullStorage);
    }
  }
  if (displayedMoney === -1) {
    setDisplayedMoney(currentMoney);
  }

  function clickBuy(buttonId: number) {
    setBuyingButton(buttonId);
  }

  async function handleBuy(
    plantId: mongoose.Schema.Types.ObjectId,
    amount: number,
    price: number
  ) {
    setBuyingButton(0);
    const newCurrentMoney = await MoneyService.calculateUserBalance(
      amount,
      "subtract",
      currentMoney,
      id,
      price
    );
    //find sellers

    //find markeet of plant
    const market = PlantsService.getOneMarket(plants, plantId).filter(
      (item: any) => item.active
    );

    // //-------------
    //sort by date - oldest first
    const entriesByOldest = market.sort((entry1: any, entry2: any) => {
      entry1.listDate < entry2.listDate ? 1 : -1;
    });

    let amountLeft = amount;
    for (let i = 0; i < entriesByOldest.length; i++) {
      const fetchReturn = await fetch(
        `/api/${entriesByOldest[i].sellerId}/money`
      );
      const moneyData = await fetchReturn.json();
      const { currentMoney: sellerMoney } = moneyData;

      if (entriesByOldest[i].amount >= amountLeft) {
        //subtract amountLeft from entry and decide if still active
        const buyAmountLeft = entriesByOldest[i].amount - amountLeft;
        const isEntryEmpty = buyAmountLeft === 0 ? true : false;
        MarketService.subtractFromMarketEntry(
          amountLeft,
          entriesByOldest[i]._id,
          !isEntryEmpty,
          plantId
        );
        //add amount that was subtracted times price to user balance

        await MoneyService.calculateUserBalance(
          amountLeft,
          "add",
          sellerMoney,
          entriesByOldest[i].sellerId,
          price
        );
        amountLeft = 0;
        return;
      } else {
        //set entry amount to 0 and active to false
        MarketService.subtractFromMarketEntry(
          entriesByOldest[i].amount,
          entriesByOldest[i]._id,
          false,
          plantId
        );

        await MoneyService.calculateUserBalance(
          entriesByOldest[i].amount,
          "add",
          sellerMoney,
          entriesByOldest[i].sellerId,
          price
        );
        amountLeft -= entriesByOldest[i].amount;
      }
    }
    //find oldest entry and "buy" from there
    //repeat until amount of needed items is met

    // await MoneyService.calculateUserBalance(
    //   amount,
    //   "add",
    //   currentMoney,
    //   i,
    //   price
    // );
    setDisplayedMoney(newCurrentMoney);

    addItemToInventory(userStorage, plantId, amount);
  }

  // function handleBuyFromMarket(
  //   itemId: mongoose.Schema.Types.ObjectId,
  //   amount: number
  // );
  // const listOfPlants = plants.filter((plant: any) => {
  //   return plant.type === "plant";
  // });

  // if (typeof marketPlace === "undefined" || marketPlace.length === 0) {
  //   setMarketPlace(listOfPlants);
  // }

  return (
    <>
      <header>
        <Navbar pageTitle={"Goods"}></Navbar>
      </header>
      <main className="storageMain">
        <section className="storageSearchbarSection">
          <form className="storageForm">
            <input
              type="text"
              name="storageSearchbar"
              onChange={(e) =>
                handleSearchInput(e, PlantsService.getListOfPlants(plants))
              }
            />
          </form>
          <p>Money: {displayedMoney}</p>
        </section>
        <section className="storageList">
          <nav className="storageTableNav">
            <h2>Name</h2>
            <h2>Image</h2>
            <h2>Price</h2>
            <h2>available</h2>
            <h2>buy</h2>
          </nav>
          <ul className="listStorageItems">
            {marketPlace.map((marketItem: any, index: number) => {
              return (
                <li key={marketItem._id} className="storageItem">
                  <h3>{marketItem.name}</h3>
                  <div className="imageContainer">
                    <Image
                      src={marketItem.image.img}
                      alt="plantImage"
                      width={40}
                      height={60}
                    />
                  </div>
                  <h3>
                    {PlantsService.calcMarketPrice(plants, marketItem._id)}$
                  </h3>
                  <h3>
                    {PlantsService.getNumberOfItemsOnOneMarket(
                      marketItem.market
                    )}
                  </h3>

                  <div>
                    {buyingButton !== index + 1 && (
                      <button onClick={() => clickBuy(index + 1)}>buy</button>
                    )}
                    {buyingButton === index + 1 && (
                      <NumberInput
                        comparer={displayedMoney}
                        handlerArgs={marketItem._id}
                        isSelling={false}
                        handler={handleBuy}
                        price={PlantsService.calcMarketPrice(
                          plants,
                          marketItem._id
                        )}
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {marketPlace.length === 0 && (
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
