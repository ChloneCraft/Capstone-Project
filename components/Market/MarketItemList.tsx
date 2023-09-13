import useSWR from "swr";
import Navbar from "../general/Navbar";
import Image from "next/image";
import NumberInput from "../general/NumberInput";
import { Markets, PlantType } from "../../db/models/Plant";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";
import { calculateUserBalance, findSeedStackById } from "@/pages/Market/Seeds";
import { PlantsService } from "@/services/PlantsService";

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
  console.log("plants", plants);

  if (!data) {
    return <div>loading</div>;
  }
  const { currentMoney } = data;

  async function addSeedsToInventory(
    userStorage: any,
    seedId: mongoose.Schema.Types.ObjectId,
    amountToAdd: number
  ) {
    const stackInStorage = findSeedStackById(userStorage, seedId, 0);

    const { amount: amountInStorage } = stackInStorage;

    const amountInStorageNumber = parseFloat(amountInStorage);
    const newAmount = amountInStorageNumber + amountToAdd;

    const updatedStack = {
      amount: newAmount,
      plant: stackInStorage.plant,
      decayStatus: stackInStorage.decayStatus,
    };

    const updatedStorage = userStorage.map((item: any) => {
      return item.plant._id === seedId ? updatedStack : item;
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
    seedId: mongoose.Schema.Types.ObjectId,
    amountToAdd: number
  ) {
    setBuyingButton(0);
    const newCurrentMoney = await calculateUserBalance(
      amountToAdd,
      "subtract",
      currentMoney,
      id,
      100
    );
    setDisplayedMoney(newCurrentMoney);

    addSeedsToInventory(userStorage, seedId, amountToAdd);
  }
  // const listOfPlants = plants.filter((plant: any) => {
  //   return plant.type === "plant";
  // });

  // if (typeof marketPlace === "undefined" || marketPlace.length === 0) {
  //   setMarketPlace(listOfPlants);
  // }

  function getAvailableItems(market: Markets) {
    const result = market
      .filter((item) => item.active)
      .map((item) => item.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return result;
  }

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
                  <h3>???$</h3>
                  {/*calculated price here*/}
                  <h3>{getAvailableItems(marketItem.market)}</h3>

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
