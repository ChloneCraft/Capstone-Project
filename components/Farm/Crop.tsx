import Image from "next/image";
import Potato from "../../public/CropStage2.png";

export default function Crop({ content }: any) {
  if (content == "0") {
    return <></>;
  } else {
    return (
      <div className="crop">
        <Image src={Potato} alt="potato" width={100} height={100} />
      </div>
    );
  }
}
