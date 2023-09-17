import Link from "next/link";
import { signOut } from "next-auth/react";
import MoneyDisplay from "./MoneyDisplay";

export default function Navbar({
  pageTitle,
  children,
}: {
  pageTitle: String;
  children: any;
}) {
  return (
    <nav className="navbar">
      <section className="section1">
        <Link className="navbarLink" href={"/"}>
          Farm
        </Link>
        <Link className="navbarLink" href={"/Storage"}>
          Storage
        </Link>
        <Link className="navbarLink" href={"/Market"}>
          Market
        </Link>
        {/* <Link href={"/Weather"}>Weather Forecast</Link> */}
        <Link className="navbarLink" href={"/Rankings"}>
          Rankings
        </Link>
      </section>
      <section className="section2">
        <h1 className="pageTitle">Farmstock</h1>
        <MoneyDisplay />
      </section>
      <section className="section3">
        {children}
        <button className="Navbar__signout" onClick={() => signOut()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </button>
      </section>
    </nav>
  );
}
