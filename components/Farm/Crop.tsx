import Image from "next/image";
import Potato from "../../public/PotatoStage3.png";
import PotatoHover from "../../public/PotatoHover.png";

export default function Crop({ content }: { content: String }) {
  if (content == "0") {
    return <button className="emptyPlot" />;
  } else {
    return (
      <div className="crop">
        <Image
          src={Potato}
          alt="potato"
          width={200}
          height={200}
          className="cropImage"
          onMouseOver={(e) => {
            console.log(e.currentTarget);
            e.currentTarget.src = "../../public/PotatoHover.png";
          }}
        />
      </div>
    );
  }
}
