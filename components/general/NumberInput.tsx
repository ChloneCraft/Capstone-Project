import { FormEvent, useState } from "react";

export default function NumberInput({ handleBuy, id, userBalance }: any) {
  const [isDisabled, setIsDisabled] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("dataaa", data);
    const amountToAdd = data.amountInput as string;

    handleBuy(id, parseFloat(amountToAdd));
  }
  function handleChange(e: any) {
    console.log(e.target.value);

    if (userBalance - e.target.value * 100 < 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
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
            value="Buy"
            disabled={isDisabled}
          />
        )}
      </form>
      {isDisabled && (
        <p
          className="red"
          style={{ fontSize: "15px", position: "absolute", top: "25px" }}
        >
          insufficiant account balance!
        </p>
      )}
    </div>
  );
}

//trigger handle buy function
//reset displaying this component
