import { useState } from "react";

export default function NumberInput({
  handler,
  handlerArgs,
  isSelling,
  comparer,
  price,
  available,
}: any) {
  const [isDisabled, setIsDisabled] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const amount = data.amountInput as string;

    handler(handlerArgs, parseFloat(amount), price);
  }
  function handleChange(e: any) {
    if (!isSelling) {
      if (
        comparer - e.target.value * price < 0 ||
        available - e.target.value < 0
      ) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    } else {
      if (comparer - e.target.value < 0) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }
  let buySell = "";
  if (isSelling) {
    buySell = "Sell";
  } else {
    buySell = "Buy";
  }
  return (
    <div className="numberInputContainer" style={{ position: "relative" }}>
      <form className="numberInputSelectAmountForm" onSubmit={handleSubmit}>
        {/* <label>Amount: </label> */}
        <input
          type="number"
          className="numberInputSelectAmountInput"
          min="1"
          onChange={handleChange}
          placeholder="amount"
          name="amountInput"
        ></input>
        {!isDisabled ? (
          <input
            type="submit"
            className="sellButton numberInputSelectAmountBuyButton"
            value={buySell}
            disabled={isDisabled}
          />
        ) : (
          <p className="red amountSelectionWarning">
            {!isSelling && "insufficiant account balance!"}
            {isSelling && "not enough in storage!"}
          </p>
        )}
      </form>
    </div>
  );
}
