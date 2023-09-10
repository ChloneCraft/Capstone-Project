import Image from "next/image";
import { MouseEventHandler } from "react";
import { useState } from "react";
import SelectSeed from "./SelectSeed";
import UnlockPlot from "./UnlockPlot";
import CropInfo from "./CropInfo";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import { sendRequest } from "./SelectSeed";

interface storageItem {
  plant: {
    plantName: String;
    type: String;
    decayTime: Number;
    waterCapacity: Number;
    growthTime: Number;
    sellers: [{ sellerId: any; amount: Number; listDate: Date }];
    history: [{ price: Number; amount: Number; Timestamp: Date }];
  };
  decayStatus: String;
  amount: Number;
}

export default function Crop({
  content,
  index,
  setFarm,
  farm,
  plantId,
}: {
  content: any;
  index: number;
  setFarm: any;
  farm: any;
  plantId: mongoose.Schema.Types.ObjectId;
}) {
  // console.log("crop", farm);
  const [hasMouseOver, setHasMouseOver] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [wantsToSelectSeed, setWantsToSelectSeed] = useState(false);
  const [wantsToUnlockPlot, setWantsToUnlockPlot] = useState(false);
  const session = useSession();

  const id = session?.data?.user?.id;

  function harvestCrop() {
    // killCrop();
    // if (id) {

    const cropId = content.plant._id;
    // if (crop) console.log(crop);
    // else console.log("errorr");

    addItemToInventory(cropId);
    //   } else {
    //     console.log("addItemToinventory error");
    //   }
  }

  function addItemToInventory(plantId: mongoose.Schema.Types.ObjectId) {
    console.log("id!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", plantId);

    sendRequest(`/api/${id}/addToStorage`, { arg: plantId });
  }

  function killCrop() {
    const emptyPlot = {
      plant: "64f98d290a507798d951f7f4",
      growthStatus: 0,
      waterCapacity: 0,
    };
    // sendRequest(`/api/${id}/addToStorage`, emptyPlot);
  }

  const handleMouseEnter: MouseEventHandler<HTMLImageElement> = (e) => {
    e.stopPropagation();
    setHasMouseOver(true);
  };
  const handleMouseLeave: MouseEventHandler<HTMLImageElement> = (e) => {
    setHasMouseOver(false);
  };
  const onMouseEnterEmptyPlot: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setHasMouseOver(false);
  };
  const onMouseLeaveEmptyPlot: MouseEventHandler<HTMLButtonElement> = (e) => {
    setHasMouseOver(false);
  };
  const handleClickPlot: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsClicked(true);
    if (content.growthStatus === 0) {
      harvestCrop();
    }
  };
  const handlePlantingSeed: MouseEventHandler<HTMLButtonElement> = (e) => {
    setWantsToSelectSeed(true);
  };
  const handleUnlockingPlot: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setWantsToUnlockPlot(true);
  };
  // console.log("crop.farm", farm);

  function calcGrowth() {
    if (farm[index].plant.type) {
      return (
        100 - (farm[index].growthStatus * 100) / farm[index].plant.growthTime
      );
    } else {
      return -1;
    }
  }

  let image;
  let image_hover;
  const growth = calcGrowth();
  // index === 5 && console.log("crop growth", growth);
  if (growth !== -1) {
    if (growth <= 50) {
      image = farm[index].plant.image?.stage1;
      image_hover = farm[index].plant.image?.stage1_hover;
    } else if (growth < 100) {
      image = farm[index].plant.image?.stage2;
      image_hover = farm[index].plant.image?.stage2_hover;
    } else {
      image = farm[index].plant.image?.img;
      image_hover = farm[index].plant.image?.hover;
    }
  }

  // index === 5 && console.log("crop image", image);

  // if (farm[index].plant.type) {
  //   console.log("plot plant", farm[index]);
  // }

  if (content.plant.plantID == 0) {
    return (
      <aside
        className="emptyPlot"
        onMouseEnter={onMouseEnterEmptyPlot}
        onMouseLeave={onMouseLeaveEmptyPlot}
        onClick={handleClickPlot}
      >
        {isClicked && (
          <button className="plantSeedButton" onClick={handlePlantingSeed}>
            plant
          </button>
        )}
        {wantsToSelectSeed && (
          <SelectSeed
            setWantsToSelectSeed={setWantsToSelectSeed}
            setIsClicked={setIsClicked}
            index={index}
            setFarm={setFarm}
          />
        )}
      </aside>
    );
  } else if (content.plant.plantID == -1) {
    return (
      <aside
        className="lockedPlot"
        onMouseEnter={onMouseEnterEmptyPlot}
        onMouseLeave={onMouseLeaveEmptyPlot}
        onClick={handleClickPlot}
      >
        {isClicked && (
          <button className="plantSeedButton" onClick={handleUnlockingPlot}>
            plant
          </button>
        )}
        {wantsToUnlockPlot && (
          <UnlockPlot
            setWantsToUnlockPlot={setWantsToUnlockPlot}
            setIsClicked={setIsClicked}
            index={index}
            setFarm={setFarm}
          />
        )}
      </aside>
    );
  } else {
    return (
      <aside
        className="crop"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClickPlot}
      >
        <Image
          src={hasMouseOver ? image_hover : image}
          alt="Plant"
          width={250}
          height={250}
          className="cropImage"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {hasMouseOver && (
          <CropInfo
            className="cropInfo"
            setWantsToUnlockPlot={setWantsToUnlockPlot}
            setIsClicked={setIsClicked}
            index={index}
            setFarm={setFarm}
          />
        )}
        {isClicked && (
          <CropInfo
            className="cropInfo"
            setWantsToUnlockPlot={setWantsToUnlockPlot}
            setIsClicked={setIsClicked}
            isClicked={isClicked}
            index={index}
            setFarm={setFarm}
          />
        )}
      </aside>
    );
  }
}
