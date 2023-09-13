import mongoose from "mongoose";
import { sendRequest } from "../../components/Farm/SelectSeed";
import { PlantType } from "../../db/models/Plant";
import { PlantsService } from "./PlantsService";

export const MarketService = {
  subtractFromMarketEntry(
    amountBought: number,
    entryId: mongoose.Schema.Types.ObjectId,
    stillActive: boolean,
    money: number,
    plantId: mongoose.Schema.Types.ObjectId
  ) {
    sendRequest(`/api/${plantId}/market`, {
      active: stillActive,
      amount: amountBought,
      id: entryId,
    });
  },

  findUserByEntryId(
    entryId: mongoose.Schema.Types.ObjectId,
    plants: PlantType[],
    plantID: mongoose.Schema.Types.ObjectId
  ) {
    const markets = PlantsService.getOneMarket(plants, plantID);
  },
};
