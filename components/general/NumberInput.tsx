import { FormEvent } from "react";

export default function NumberInput({ handleBuy, id }: any) {
  function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("dataaa", data);
    const amountToAdd = data.amountInput as string;

    handleBuy(id, parseFloat(amountToAdd));
  }
  return (
    <form className="numberInputSelectAmountForm" onSubmit={handleSubmit}>
      <label>Amount:</label>
      <input
        type="number"
        className="numberInputSelectAmountInput"
        min="1"
        name="amountInput"
      ></input>
      <input
        type="submit"
        className="numberInputSelectAmountBuyButton"
        value="Buy"
      />
    </form>
  );
}

//trigger handle buy function
//reset displaying this component
