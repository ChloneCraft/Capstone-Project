export default function UnlockPlot({
  index,
  setFarm,
  setWantsToUnlockPlot,
  setIsClicked,
}: any) {
  function handleClick(e: any) {
    e.stopPropagation();
  }
  function handleClosing(): void {
    setIsClicked(false);
    setWantsToUnlockPlot(false);
  }
  return (
    <div className="unlockPlot" onClick={handleClick}>
      <nav className="selectSeed__nav">
        <h2>Unlock Plot</h2>
        <button className="close" onClick={() => handleClosing()}>
          ❌
        </button>
      </nav>
      <h3>here you can unlock Plots soon!</h3>
    </div>
  );
}
