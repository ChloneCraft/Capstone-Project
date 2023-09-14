import mongoose from "mongoose";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
// import { ObjectId } from "mongodb";

export async function sendRequest(url: any, { arg }: any) {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return await response.json();
  } else {
    console.error(`Error: ${response.status}`);
    return "error";
  }
}

const developerID = "64ee00dc6f0de821d4b93a9a";

export default function SelectSeed({
  index,
  setFarm,
  setWantsToSelectSeed,
  setIsClicked,
}: any) {
  const session = useSession();
  let userId: any;
  // console.log("session", session);

  if (session.data) {
    userId = session?.data?.user?.id;
  }
  const { data: farm } = useSWR(`/api/${userId}/farm`);
  const { data: storage }: any = useSWR(`/api/${userId}/plantStorage`);
  const { data: plants }: any = useSWR("/api/plants");

  const { trigger, isMutating } = useSWRMutation(
    `/api/${userId}/plantStorage`,
    sendRequest
  );
  if (!farm || !storage || !plants) {
    return <div>loading...</div>;
  }
  let seedsInStorage: any;
  if (storage) {
    // console.log("STORAGE EXISTS", storage);

    seedsInStorage = storage.filter(
      (storageItem: any) => storageItem.plant.type === "seed"
    );
  }
  function handleClick(e: any) {
    e.stopPropagation();
  }

  async function findPlantFromSeed(
    seed: mongoose.Types.ObjectId,
    collection: any
  ) {
    const plant = await collection.find(
      (collectionElement: any) =>
        collectionElement.plantID === seed && collectionElement.type !== "seed"
    );
    // console.log("finding plant", plant);

    return {
      plant: plant,
      growthStatus: plant.growthTime,
      waterCapacity: plant.waterCapacity,
    };
  }

  async function handleSeedSelection(id: mongoose.Types.ObjectId) {
    setIsClicked(false);

    const { amount, ...rest } = storage.find((storageItem: any) => {
      // console.log("storageItem", storageItem);

      return storageItem.plant._id === id;
    });
    if (amount === 0) {
      alert(`you have no ${rest.plant.name} seeds.`);
      return;
    }
    const updatedSeedStack = { ...rest, amount: amount - 1 };
    const updatedStorage = storage.map((item: any) => {
      return item.plant._id === id ? updatedSeedStack : item;
    });
    // console.log("updatedSeedStack:", updatedSeedStack);
    // console.log("updatedStorage:", updatedStorage);

    await trigger(updatedStorage);

    //update farm

    const { plant } = rest;
    // console.log("plant", plant);
    // console.log("plants", plants);

    const correspondingPlant = await findPlantFromSeed(plant.plantID, plants);
    // console.log("correspondingPlant", correspondingPlant);

    const arg = farm.map((farmEntry: any, farmIndex: number) => {
      if (farmIndex === index) {
        farmEntry.plant = correspondingPlant.plant._id;
        farmEntry.growthStatus = correspondingPlant.plant.growthTime;

        return farmEntry;
      } else {
        return farmEntry;
      }
    });
    // console.log("updated farm", arg);

    // console.log("what do you mean undefined?", id);

    const response = await fetch(`/api/${userId}/farm`, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    // console.log("response:", response);
    if (response.farm) {
      setFarm(response.farm);
    }
    // farm.mutate();
  }
  if (!farm || !storage || !plants) {
    return <div>loading...</div>;
  }

  function handleClosing(): void {
    setIsClicked(false);
    setWantsToSelectSeed(false);
  }
  return (
    <div className="selectSeed" onClick={handleClick}>
      <nav className="selectSeed__nav">
        <h2>Name</h2>
        <h2>Image</h2>
        <h2>amount</h2>
        <button className="close" onClick={() => handleClosing()}>
          ❌
        </button>
      </nav>
      <ul className="selectSeed__list">
        {seedsInStorage.map((storageItem: any) => {
          return (
            <li
              key={storageItem.plant._id}
              className="selectSeed__list__item"
              onClick={() => handleSeedSelection(storageItem.plant._id)}
            >
              <aside className="selectSeed__list__item__content">
                <h3>{storageItem.plant.name}</h3>
                <div className="selectSeed__list__item__content__imageContainer">
                  <Image
                    src={storageItem.plant.image.img}
                    alt="Seed_Image"
                    width={60}
                    height={60}
                  />
                </div>
                <h3>{storageItem.amount}</h3>
              </aside>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
