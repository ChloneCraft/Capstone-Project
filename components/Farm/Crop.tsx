import Image from "next/image";
import Potato from "../../public/images/Potato.png";
import PotatoHover from "../../public/images/PotatoHover.png";
import { MouseEventHandler } from "react";
import { useState } from "react";
import SelectSeed from "./SelectSeed";

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
  userData,
}: {
  content: String;
  userData: any;
}) {
  const [hasMouseOver, setHasMouseOver] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [wantsToSelectSeed, setWantsToSelectSeed] = useState(false);

  const handleMouseEnter: MouseEventHandler<HTMLImageElement> = (e) => {
    setHasMouseOver(true);
    e.stopPropagation();
  };
  const handleMouseLeave: MouseEventHandler<HTMLImageElement> = (e) => {
    setHasMouseOver(false);
  };
  const onMouseEnterEmptyPlot: MouseEventHandler<HTMLButtonElement> = (e) => {
    setHasMouseOver(false);
    e.stopPropagation();
  };
  const onMouseLeaveEmptyPlot: MouseEventHandler<HTMLButtonElement> = (e) => {
    setHasMouseOver(false);
  };
  const handleClickEmptyPlot: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsClicked(true);
  };
  const handlePlantingSeed: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("storage:", userData.plantStorage);
    console.log(
      userData.plantStorage.filter(
        (storageItem: storageItem) => storageItem.plant.type === "seed"
      )
    );
    setWantsToSelectSeed(true);

    //open list of seeds from userstorage
    //update farm in user in database
    //close plant window
    //deselect plot
    //remove seed from storage
  };

  if (content == "0") {
    return (
      <aside
        className="emptyPlot"
        onMouseEnter={onMouseEnterEmptyPlot}
        onMouseLeave={onMouseLeaveEmptyPlot}
        onClick={handleClickEmptyPlot}
      >
        {isClicked && (
          <button className="plantSeedButton" onClick={handlePlantingSeed}>
            plant
          </button>
        )}
        {wantsToSelectSeed && (
          <SelectSeed
            seedsInStorage={userData.plantStorage.filter(
              (storageItem: any) => storageItem.plant.type === "seed"
            )}
          />
        )}
      </aside>
    );
  } else {
    return (
      <div
        className="crop"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={hasMouseOver ? PotatoHover : Potato}
          alt="potato"
          width={250}
          height={250}
          className="cropImage"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {hasMouseOver && <div className="cropInfo" />}
        {isClicked && <div className="cropClickedInfo" />}
      </div>
    );
  }
}
