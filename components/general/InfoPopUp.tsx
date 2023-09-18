export default function InfoPopUp({
  message,
  condition,
}: {
  message: string;
  condition: Boolean;
}) {
  return (
    <div className={condition ? "popupSlide popup" : "popup"}>{message}</div>
  );
}
