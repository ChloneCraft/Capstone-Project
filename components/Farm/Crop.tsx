import Image from "next/image";
import { MouseEventHandler } from "react";
import { useState } from "react";
import SelectSeed from "./SelectSeed";
import UnlockPlot from "./UnlockPlot";
import CropInfo from "./CropInfo";

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
}: {
  content: any;
  index: number;
  setFarm: any;
  farm: any;
}) {
  const [hasMouseOver, setHasMouseOver] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [wantsToSelectSeed, setWantsToSelectSeed] = useState(false);
  const [wantsToUnlockPlot, setWantsToUnlockPlot] = useState(false);

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
  };
  const handlePlantingSeed: MouseEventHandler<HTMLButtonElement> = (e) => {
    setWantsToSelectSeed(true);
  };
  const handleUnlockingPlot: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setWantsToUnlockPlot(true);
  };
  // console.log("crop.farm", farm);

  const image = farm[index].plant.image?.img;
  const image_hover = farm[index].plant.image?.hover;

  // console.log("plantID", content.plant.plantID);

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
