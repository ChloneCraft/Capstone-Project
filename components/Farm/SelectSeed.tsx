import Image from "next/image";

export default function SelectSeed({ seedsInStorage }: any) {
  console.log("storage for seeds", seedsInStorage);
  function handleClick(e: any) {
    e.stopPropagation();
  }
  function handleSeedSelection(index: number) {
    console.log("index:", index);
  }
  return (
    // <section className="popupWindowBackground" >
    <div className="selectSeed" onClick={handleClick}>
      <nav className="selectSeed__nav">
        <h2>Name</h2>
        <h2>Image</h2>
        <h2>amount</h2>
      </nav>
      <ul className="selectSeed__list">
        {seedsInStorage.map((storageItem: any, index: number) => {
          return (
            <li
              className="selectSeed__list__item"
              onClick={() => handleSeedSelection((index = index))}
            >
              <aside className="selectSeed__list__item__content">
                <h3>{storageItem.plant.name}</h3>
                <div className="selectSeed__list__item__content__imageContainer">
                  <Image
                    src={storageItem.plant.image}
                    alt="Seed_Image"
                    width={60}
                    height={60}
                  />
                </div>
                <h3>{storageItem.amount}</h3>
              </aside>
            </li>
          );
        })}
      </ul>
    </div>
    // </section>
  );
}
