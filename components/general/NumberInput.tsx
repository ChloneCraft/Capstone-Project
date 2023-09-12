import { FormEvent, useState } from "react";

export default function NumberInput({
  handler,
  handlerArgs,
  isSelling,
  comparer,
  price,
}: any) {
  const [isDisabled, setIsDisabled] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("dataaa", data);
    const amount = data.amountInput as string;

    handler(handlerArgs, parseFloat(amount), price);
  }
  function handleChange(e: any) {
    console.log(e.target.value);

    if (!isSelling) {
      if (comparer - e.target.value * 100 < 0) {
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
          {!isSelling && "insufficiant account balance!"}
          {isSelling && "not enough in storage!"}
        </p>
      )}
    </div>
  );
}

//trigger handle buy function
//reset displaying this component
