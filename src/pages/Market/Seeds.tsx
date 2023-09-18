import Navbar from "../../../components/general/Navbar";
import { MoneyService } from "@/services/MoneyService";

import useSWR from "swr";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import mongoose from "mongoose";
// import { UserType } from "../../../db/models/User";
import NumberInput from "../../../components/general/NumberInput";
import { PlantsService } from "@/services/PlantsService";
import Searchbar from "../../../components/general/Searchbar";

export function findSeedStackById(
  array: any,
  id: mongoose.Schema.Types.ObjectId,
  decayStatus: number
) {
  return array.find(
    (item: any) => item.plant._id === id && item.decayStatus === decayStatus
  );
}

export default function Seeds() {
  const [query, setQuery] = useState("");
  const [filteredSeeds, setFilteredSeeds] = useState([]);
  const [buyingButton, setBuyingButton] = useState(0);
  const [displayedMoney, setDisplayedMoney] = useState(-1);
  const { data: plants } = useSWR("/api/plants");

  const session = useSession();
  const id = session?.data?.user?.id;
  const { data: userData } = useSWR(`/api/${id}`);
  const { data: userStorage } = useSWR(`/api/${id}/plantStorage`);
  const { data } = useSWR(`/api/${id}/money`);

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
  if (!data) {
    return <div>loading</div>;
  }
  const { currentMoney, totalMoney } = data;

  if (displayedMoney === -1) {
    setDisplayedMoney(currentMoney);
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
    if (!id) {
      return;
    }
    setBuyingButton(0);
    const newCurrentMoney = await MoneyService.calculateUserBalance(
      amountToAdd,
      "subtract",
      currentMoney,
      totalMoney,
      id,
      100
    );
    setDisplayedMoney(newCurrentMoney);

    addSeedsToInventory(userStorage, seedId, amountToAdd);
  }

  if (!plants) {
    return <div>loading...</div>;
  }

  if (session.data) {
    const listOfSeeds = PlantsService.filterPlantsByRegion(
      plants,
      userData?.region
    );

    if (listOfSeeds && filteredSeeds.length === 0 && !query) {
      setFilteredSeeds(listOfSeeds);
    }

    return (
      <>
        <header>
          <Navbar>
            <Searchbar
              handleSearchInput={handleSearchInput}
              list={listOfSeeds}
            />
          </Navbar>
        </header>
        <main className="storageMain">
          <div className="pageTitle">Seeds</div>
          <section className="storageList">
            <nav className="storageTableNav">
              <h2>Name</h2>
              <h2>Image</h2>
              <h2>Price</h2>
              <h2>Buy</h2>
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
                    <h3>100 $</h3>
                    <div className="buyButtonArea">
                      {buyingButton !== index + 1 && (
                        <button
                          className="sellButton"
                          onClick={() => clickBuy(index + 1)}
                        >
                          Buy
                        </button>
                      )}
                      {buyingButton === index + 1 && (
                        <NumberInput
                          comparer={displayedMoney}
                          handlerArgs={storageItem._id}
                          isSelling={false}
                          handler={handleBuy}
                          price={100}
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
