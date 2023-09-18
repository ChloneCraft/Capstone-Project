import Image from "next/image";

export default function InfoPopUp({
  message1,
  message2,
  icon,
  condition,
}: {
  message1: string;
  message2: string;
  icon: string;
  condition: Boolean;
}) {
  console.log("icon", icon);

  return (
    <div className={condition ? "popupSlide popup" : "popup"}>
      <p>{message1}</p>
      <Image src={icon} width={50} height={50} alt="icon" /> <p>{message2}</p>
    </div>
  );
}
