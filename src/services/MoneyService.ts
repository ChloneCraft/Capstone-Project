import mongoose from "mongoose";

export const MoneyService = {
  async calculateUserBalance(
    amount: number,
    operator: String,
    currentMoney: number,
    id: mongoose.Schema.Types.ObjectId,
    price: number
  ) {
    let updatedMoney = null;
    if (operator === "add") {
      updatedMoney = currentMoney + amount * price;
    } else if (operator === "subtract") {
      updatedMoney = currentMoney - amount * price;
    }
    if (updatedMoney) {
      try {
        const result = await fetch(`/api/${id}/money`, {
          method: "PUT",
          body: JSON.stringify(updatedMoney),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (result.ok) {
          const returnValue = await result.json();

          return returnValue;
        }
      } catch (error) {
        console.error(error);

        return "error";
      }
    } else {
      return "error: updated money does not exist";
    }
  },
};
