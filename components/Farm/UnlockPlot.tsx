import { PlantsService } from "@/services/PlantsService";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import CostsUnlocking from "./CostsUnlocking";
import { PlantType } from "../../db/models/Plant";
import { sendRequest } from "./SelectSeed";

export default function UnlockPlot({
  index,
  setFarm,
  setWantsToUnlockPlot,
  setIsClicked,
  setHasMouseOver,
  updateFarm,
}: any) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const {
    data: unlockedFieldsData,
    isLoading: isLoadingUnFi,
    error: errorUnFi,
  } = useSWR(`/api/${userId}/unlockedFields`);
  const { data: plants } = useSWR(`/api/plants`);
  const { data: moneyData } = useSWR(`/api/${userId}/money`);
  const { data: plantStorage } = useSWR(`/api/${userId}/plantStorage`);
  const { data: farm } = useSWR(`/api/${userId}/farm`);
  const { currentMoney, totalMoney } = moneyData;
  //----------------
  if (!plantStorage || !plants || !moneyData) {
    return <div> loading </div>;
  }
  //------------
  function handleClick(e: any) {
    e.stopPropagation();
  }
  function handleClosing(): void {
    setIsClicked(false);
    setWantsToUnlockPlot(false);
  }
  function hasEnoughItems(plant: any, plantStorage: any) {
    if (!plant.id) {
      return true;
    } else {
      const itemStack = plantStorage.find(
        (item: any) => item.plant._id == price.plant1.id
      );
      return plant.amount <= itemStack.amount;
    }
  }
  function doesHaveEnoughMats(price: any) {
    const firstCheck = hasEnoughItems(price.plant1, plantStorage);
    const secondCheck = hasEnoughItems(price.plant2, plantStorage);
    const thirdCheck = hasEnoughItems(price.plant3, plantStorage);
    const fourthCheck = currentMoney >= price.money;

    return firstCheck && secondCheck && thirdCheck && fourthCheck;
  }
  async function handleUnlocking(price: any) {
    //subtract money from account
    const arg = {
      currentMoney: currentMoney - price.money,
      totalMoney: totalMoney,
    };
    await sendRequest(`/api/${userId}/money`, { arg: arg });
    //remove items from storage
    const storageArg = plantStorage.map((item: any) => {
      return item.plant._id != price.plant1.id
        ? item
        : {
            plant: item.plant,
            decayStatus: item.decayStatus,
            amount: item.amount - price.plant1.amount,
          };
    });

    await sendRequest(`/api/${userId}/plantStorage`, {
      arg: storageArg,
    });

    const emptyPlot = {
      plant: "64f98d290a507798d951f7f4",
      growthStatus: 0,
      waterCapacity: 0,
    };
    const newFarm = farm.map((item: any, thisIndex: number) =>
      thisIndex === index ? emptyPlot : item
    );
    const farmResponse = await sendRequest(`/api/${userId}/farm`, {
      arg: newFarm,
    });
    setFarm(farmResponse);
    updateFarm(farmResponse);
    setHasMouseOver(false);
    setIsClicked(false);
    const response = await sendRequest(`/api/${userId}/unlockedFields`, {
      arg: unlockedFieldsData + 1,
    });
    console.log("response", response);
  }
  //--------------------
  let price: any = null;
  if (unlockedFieldsData) {
    price = PlantsService.getPlotPrice(unlockedFieldsData);
  }
  if (price) {
    const plant = PlantsService.getPlantById(plants, price.plant1.id);
    const plant2 = PlantsService.getPlantById(plants, price.plant2.id);
    const plant3 = PlantsService.getPlantById(plants, price.plant3.id);

    return (
      <div className="unlockPlot" onClick={handleClick}>
        <nav className="selectSeed__nav">
          <h2>Unlock Plot</h2>
          <button className="close" onClick={() => handleClosing()}>
            ❌
          </button>
        </nav>
        <h3>Costs:</h3>
        <h4>{price.money}$</h4>
        <CostsUnlocking name={plant.name} amount={price.plant1.amount} />
        {!!price.plant2.id && (
          <CostsUnlocking name={plant2.name} amount={price.plant2.amount} />
        )}
        {!!price.plant3.id && (
          <CostsUnlocking name={plant3.name} amount={price.plant3.amount} />
        )}
        {doesHaveEnoughMats(price) ? (
          <button
            className="unlockButton"
            onClick={() => handleUnlocking(price)}
          >
            unlock
          </button>
        ) : (
          <button className="unlockButton" disabled={true}>
            unlock
          </button>
        )}
      </div>
    );
  }
}
