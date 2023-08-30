import Image from "next/image";
import Potato from "../../public/PotatoStage3.png";
import PotatoHover from "../../public/PotatoHover.png";
import { MouseEventHandler } from "react";
import { useState } from "react";

export default function Crop({ content }: { content: String }) {
  const [hasMouseOver, setHasMouseOver] = useState(false);
  const handleMouseEnter: MouseEventHandler<HTMLImageElement> = (e) => {
    setHasMouseOver(true);
  };
  const handleMouseLeave: MouseEventHandler<HTMLImageElement> = (e) => {
    setHasMouseOver(false);
  };
  if (content == "0") {
    return <button className="emptyPlot" />;
  } else {
    return (
      <div className="crop">
        <Image
          src={hasMouseOver ? PotatoHover : Potato}
          alt="potato"
          width={200}
          height={200}
          className="cropImage"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {hasMouseOver && (
          <div
            className="cropInfo"
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          />
        )}
      </div>
    );
  }
}
