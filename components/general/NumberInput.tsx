import { FormEvent, useState } from "react";

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
    buySell = "sell";
  } else {
    buySell = "buy";
  }
  return (
    <div style={{ position: "relative" }}>
      <form className="numberInputSelectAmountForm" onSubmit={handleSubmit}>
        <label>Amount: </label>
        <input
          type="number"
          className="numberInputSelectAmountInput"
          min="1"
          onChange={handleChange}
          name="amountInput"
        ></input>
        {!isDisabled && (
          <input
            type="submit"
            className="numberInputSelectAmountBuyButton"
            value={buySell}
            disabled={isDisabled}
          />
        )}
      </form>
      {isDisabled && (
        <p
          className="red"
          style={{ fontSize: "15px", position: "absolute", top: "25px" }}
        >
          {/* {!isSelling && "insufficiant account balance!"} */}
          {isSelling && "not enough in storage!"}
        </p>
      )}
    </div>
  );
}
