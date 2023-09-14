import { getSession } from "next-auth/react";
import MarketItemList from "../../../../components/Market/MarketItemList";

export default function Goods() {
  // const { data: userStorage } = useSWR(`/api/${id}/plantStorage`);

  return <MarketItemList />;

  // handleSearchInput,
  // listOfPlants,
  // displayedMoney,
  // marketPlace,
  // getAvailableItems,
  // buyingButton,
  // clickBuy,
  // handleBuy

  // <>
  //   <header>
  //     <Navbar pageTitle={"Goods"}></Navbar>
  //   </header>
  //   <main className="storageMain">
  //     <section className="storageSearchbarSection">
  //       <form className="storageForm">
  //         <input
  //           type="text"
  //           name="storageSearchbar"
  //           onChange={(e) => handleSearchInput(e, listOfPlants)}
  //         />
  //       </form>
  //       <p>Money: {displayedMoney}</p>
  //     </section>
  //     <section className="storageList">
  //       <nav className="storageTableNav">
  //         <h2>Name</h2>
  //         <h2>Image</h2>
  //         <h2>Price</h2>
  //         <h2>available</h2>
  //         <h2>buy</h2>
  //       </nav>
  //       <ul className="listStorageItems">
  //         {marketPlace.map((marketItem: any, index: number) => {
  //           console.log(getAvailableItems(marketItem.market));
  //           return (
  //             <li key={marketItem._id} className="storageItem">
  //               <h3>{marketItem.name}</h3>
  //               <div className="imageContainer">
  //                 <Image
  //                   src={marketItem.image.img}
  //                   alt="plantImage"
  //                   width={40}
  //                   height={60}
  //                 />
  //               </div>
  //               <h3>???$</h3>
  //               {/*calculated price here*/}

  //               <div>
  //                 {buyingButton !== index + 1 && (
  //                   <button onClick={() => clickBuy(index + 1)}>buy</button>
  //                 )}
  //                 {buyingButton === index + 1 && (
  //                   <NumberInput
  //                     comparer={displayedMoney}
  //                     handlerArgs={marketItem._id}
  //                     isSelling={false}
  //                     handler={handleBuy}
  //                   />
  //                 )}
  //               </div>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //       {marketPlace.length === 0 && (
  //         <div
  //           style={{
  //             textAlign: "center",
  //             marginTop: "50px",
  //             fontSize: "30px",
  //             fontWeight: "bold",
  //           }}
  //         >
  //           no results :(
  //         </div>
  //       )}
  //     </section>
  //   </main>
  // </>
  // );
}

//redirecting if not logged in

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: { session },
  };
};
