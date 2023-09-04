import Image from "next/image";
import Potato from "../../public/images/Potato/Potato_Plant.png";
import PotatoHover from "../../public/images/Potato/Potato_Plant_hover2.png";
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
  index,
}: {
  content: any;
  userData: any;
  index: number;
}) {
  const [hasMouseOver, setHasMouseOver] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [wantsToSelectSeed, setWantsToSelectSeed] = useState(false);
  const [renderkey, setRenderkey] = useState(0);

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
    setWantsToSelectSeed(true);

    //open list of seeds from userstorage
    //update farm in user in database
    //close plant window
    //deselect plot
    //remove seed from storage
  };
  const image = userData.farm[index].image.img;
  const image_hover = userData.farm[index].image.hover;

  if (content.plantID == 0) {
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
            userId={userData._id}
            userData={userData}
            index={index}
            setRenderkey={setRenderkey}
            renderkey={renderkey}
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
          src={hasMouseOver ? image_hover : image}
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
