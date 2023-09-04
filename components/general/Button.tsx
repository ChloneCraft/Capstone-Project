import Link from "next/link";
import { Url } from "url";

export default function Button({
  destination,
  text,
}: {
  destination: string;
  text: string;
}) {
  return (
    <Link className="mainButton" href={destination}>
      {text}
    </Link>
  );
}
