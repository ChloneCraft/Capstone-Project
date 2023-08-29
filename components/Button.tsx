export default function Button({
  destination,
  push,
  text,
}: {
  destination: String;
  push: any;
  text: String;
}) {
  return (
    <button className="mainButton" onClick={() => push(`/${destination}`)}>
      {text}
    </button>
  );
}
