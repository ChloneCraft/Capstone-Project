import Link from "next/link";

export default function Navbar({ pageTitle }: { pageTitle: String }) {
  return (
    <nav>
      <Link href={"/"}>Farm</Link>
      <Link href={"/Market"}>Market</Link>
      <Link href={"/Weather"}>Weather Forecast</Link>
      <Link href={"/Rankings"}>Rankings</Link>
      <h1 className="pageTitle">{pageTitle}</h1>
    </nav>
  );
}
