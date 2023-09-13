import mongoose from "mongoose";
import { sendRequest } from "../../components/Farm/SelectSeed";
import { PlantType } from "../../db/models/Plant";
import { PlantsService } from "./PlantsService";

export const MarketService = {
  async subtractFromMarketEntry(
    amountBought: number,
    entryId: mongoose.Schema.Types.ObjectId,
    stillActive: boolean,
    plantId: mongoose.Schema.Types.ObjectId
  ) {
    const res = await sendRequest(`/api/${plantId}/market`, {
      arg: {
        active: stillActive,
        amount: amountBought,
        entryId: entryId,
      },
    });
  },

  //   findUserByEntryId(
  //     entryId: mongoose.Schema.Types.ObjectId,
  //     plants: PlantType[],
  //     plantID: mongoose.Schema.Types.ObjectId
  //   ) {
  //     const market = PlantsService.getOneMarket(plants, plantID);
  //     const entry = market.find((entry: any) => entry._id === entryId);
  //     return entry.sellerId;
  //   },
};
