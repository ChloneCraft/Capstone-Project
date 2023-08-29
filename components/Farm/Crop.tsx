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
        />
        <Image
          src={PotatoHover}
          alt="potato"
          width={200}
          height={200}
          className="cropImageHover"
        />
      </div>
    );
  }
}
