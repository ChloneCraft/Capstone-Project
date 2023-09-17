import useSWR from "swr";
import Navbar from "../../../components/general/Navbar";
import { useEffect, useState } from "react";
import Searchbar from "../../../components/general/Searchbar";

export default function Rankings() {
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { data: users, isLoading } = useSWR("/api/users");

  const sortedUsers = users?.sort((user1: any, user2: any) => {
    return user2.totalMoney - user1.totalMoney;
  });

  useEffect(() => {
    if (sortedUsers) {
      setFilteredUsers(sortedUsers);
    }
  }, [users, sortedUsers]);

  if (isLoading || !users) {
    return <div>loading</div>;
  }

  function handleSearchInput(e: any, userList: any): void {
    if (e.target.value.toLowerCase()) {
      setQuery(e.target.value.toLowerCase());
      setFilteredUsers(
        userList.filter((user: any) =>
          user.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(userList);
    }
  }

  return (
    <>
      <header>
        <Navbar pageTitle={"Ranks"}>
          <Searchbar handleSearchInput={handleSearchInput} list={sortedUsers} />
        </Navbar>
      </header>
      <main className="storageMain">
        <section className="storageSearchbarSection"></section>
        <section className="storageList">
          <nav className="storageTableNav">
            <h2>Rank</h2>
            <h2>Name</h2>
            <h2>Total money collected</h2>
            {/* <h2>Plants collected</h2> */}
          </nav>
          <ul className="listStorageItems">
            {filteredUsers.map((user: any, index: number) => {
              return (
                <li key={index} className="storageItem">
                  <h3>{index + 1}</h3>
                  <h3>{user.name}</h3>
                  <h3>{user.totalMoney}</h3>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
