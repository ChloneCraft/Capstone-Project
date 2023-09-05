import mongoose from "mongoose";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { useEffect } from "react";
import { useState } from "react";

export async function sendRequest(url: any, { arg }: any) {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    await response.json();
  } else {
    console.error(`Error: ${response.status}`);
  }
}
const developerID = "64ee00dc6f0de821d4b93a9a";

export default function SelectSeed({ index, setFarm }: any) {
  // const { plantStorage: storage, farm } = userData;
  const [selectedSeed, setSelectedSeed] = useState("");
  const { data: farm } = useSWR(`/api/${developerID}/farm`);
  const { data: storage }: any = useSWR(`/api/${developerID}/plantStorage`);
  const { data: plants }: any = useSWR("/api/plants");

  const { trigger, isMutating } = useSWRMutation(
    `/api/${developerID}`,
    sendRequest
  );
  if (!farm || !storage || !plants) {
    return <div>loading...</div>;
  }
  let seedsInStorage: any;
  if (storage) {
    seedsInStorage = storage.filter(
      (storageItem: any) => storageItem.plant.type === "seed"
    );
  }
  function handleClick(e: any) {
    e.stopPropagation();
  }

  function findPlantFromSeed(seed: mongoose.Types.ObjectId, collection: any) {
    return collection.find(
      (collectionElement: any) =>
        collectionElement.plantID === seed && collectionElement.type !== "seed"
    );
  }

  async function handleSeedSelection(id: mongoose.Types.ObjectId) {
    const { amount, ...rest } = storage.find(
      (storageItem: any) => storageItem._id === id
    );
    const updatedSeedStack = { ...rest, amount: amount - 1 };
    const updatedStorage = storage.map((item: any) => {
      return item._id === id ? updatedSeedStack : item;
    });

    await trigger(updatedStorage);

    //update farm

    const { plant } = rest;
    const correspondingPlant = findPlantFromSeed(plant.plantID, plants);
    const arg = farm.map((farmEntry: any, farmIndex: number) =>
      farmIndex === index ? correspondingPlant : farmEntry
    );
    const response = await fetch(`/api/${developerID}/farm`, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    // if (response.ok) {
    console.log("mutated:", response.farm);
    // farm.mutate();
    setFarm(response.farm);

    // }
  }
  // useEffect(() => {
  //   setFarm(selectedSeed);
  // }, [selectedSeed]);
  if (!farm || !storage || !plants) {
    return <div>loading...</div>;
  }
  return (
    <div className="selectSeed" onClick={handleClick}>
      <nav className="selectSeed__nav">
        <h2>Name</h2>
        <h2>Image</h2>
        <h2>amount</h2>
        <button className="close">❌</button>
      </nav>
      <ul className="selectSeed__list">
        {seedsInStorage.map((storageItem: any) => {
          return (
            <li
              key={storageItem._id}
              className="selectSeed__list__item"
              onClick={() => handleSeedSelection(storageItem._id)}
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
