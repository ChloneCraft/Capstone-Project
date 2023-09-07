import { useSession } from "next-auth/react";
import useSWR from "swr";

const growthRate = 100;

export default function CropInfo({
  index,
  setFarm,
  setWantsToUnlockPlot,
  setIsClicked,
  isClicked,
}: any) {
  const session = useSession();
  function handleClick(e: any) {
    e.stopPropagation();
  }
  function handleClosing(): void {
    setIsClicked(false);
  }
  function handleKillingPlant(): void {
    setIsClicked(false);
  }
  if (session.data) {
    const userId = session.data?.user?.id;
    const { data: farm } = useSWR(`/api/${userId}/farm`);
    if (farm) {
      console.log("data", farm);
      const { growthStatus, waterCapacity, plant } = farm[index];
      const { name: plantName } = plant;

      return (
        <div className="cropInfo " onClick={handleClick}>
          <nav className="selectSeed__nav">
            <h2>{plantName}</h2>
            {isClicked && (
              <button className="close" onClick={() => handleClosing()}>
                ❌
              </button>
            )}
          </nav>
          <div className="cropInfoMain">
            <aside className="cropInfoMain__wrapper">
              <span className="left">Water Level: </span>
              <span className="right">{waterCapacity}%</span>
            </aside>
            <aside className="cropInfoMain__wrapper">
              <span className="left">ready in:</span>
              <span className="right">{growthStatus} hours</span>
            </aside>
            <aside className="cropInfoMain__wrapper">
              <span className="left">Growth Rate:</span>
              {growthRate === 100 && (
                <span className="right green">{growthRate}%</span>
              )}
              {growthRate < 100 && growthRate >= 80 && (
                <span className="right yellow">{growthRate}%</span>
              )}
              {growthRate < 80 && (
                <span className="right red">{growthRate}%</span>
              )}
            </aside>

            {isClicked && (
              <button
                className="killPlant"
                onClick={() => handleKillingPlant()}
              >
                kill plant
              </button>
            )}
          </div>
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  } else {
    return <div>loading...</div>;
  }
}
