import Link from "next/link";
import { useSession, signOut, getSession } from "next-auth/react";

export default function Navbar({ pageTitle }: { pageTitle: String }) {
  return (
    <nav className="navbar">
      <aside className="navLinks">
        <Link href={"/"}>Farm</Link>
        <Link href={"/Market"}>Market</Link>
        <Link href={"/Weather"}>Weather Forecast</Link>
        <Link href={"/Rankings"}>Rankings</Link>
      </aside>
      <h1 className="pageTitle">Farmstock</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </nav>
  );
}
