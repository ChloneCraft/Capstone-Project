import mongoose from "mongoose";
import Image from "next/image";
import useSWRMutation from "swr/mutation";

export default function SelectSeed({ storage, userId }: any) {
  const developerID = "64ee00dc6f0de821d4b93a9a";

  async function sendRequest(url: any, { arg }: any) {
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
  const { trigger, isMutating } = useSWRMutation(
    `/api/${developerID}`,
    sendRequest
  );
  const seedsInStorage = storage.filter(
    (storageItem: any) => storageItem.plant.type === "seed"
  );
  function handleClick(e: any) {
    e.stopPropagation();
  }

  async function handleSeedSelection(id: mongoose.Types.ObjectId) {
    const { amount, ...rest } = storage.find(
      (storageItem: any) => storageItem._id === id
    );
    const { plant } = rest;
    //update farm
    const updatedSeedStack = { ...rest, amount: amount - 1 };
    const updatedStorage = storage.map((item: any) => {
      return item._id === id ? updatedSeedStack : item;
    });
    console.log(updatedStorage);

    await trigger(updatedStorage);
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
                    src={storageItem.plant.image}
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
