import Image from "next/image";
import Potato from "../../public/PotatoStage3.png";
import PotatoHover from "../../public/PotatoHover.png";
import { MouseEventHandler } from "react";
import { useState } from "react";

export default function Crop({
  content,
  storage,
}: {
  content: String;
  storage: any;
}) {
  const [hasMouseOver, setHasMouseOver] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
    console.log(storage.plantStorage);

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
