import mongoose from "mongoose";

export const MoneyService = {
  async calculateUserBalance(
    amount: number,
    operator: String,
    currentMoney: number,
    totalMoney: number,
    id: mongoose.Schema.Types.ObjectId,
    price: number
  ) {
    let updatedMoney = null;
    let updatedTotalMoney = totalMoney;
    if (operator === "add") {
      console.log("i am adding something now", updatedTotalMoney);

      updatedMoney = currentMoney + amount * price;
      updatedTotalMoney = totalMoney + amount * price;
      console.log("totalmoneyupdate", updatedTotalMoney);
    } else if (operator === "subtract") {
      updatedMoney = currentMoney - amount * price;
    }
    if (updatedMoney && updatedTotalMoney) {
      try {
        const result = await fetch(`/api/${id}/money`, {
          method: "PUT",
          body: JSON.stringify({
            currentMoney: updatedMoney,
            totalMoney: updatedTotalMoney,
          }),
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
