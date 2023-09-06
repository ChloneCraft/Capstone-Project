import mongoose, { InferSchemaType } from "mongoose";
import Plant from "./Plant";

const { Schema } = mongoose;

export const playerSchema = new Schema(
  {
    username: { type: String, default: "NewUser", required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    lastLogin: { type: Date, default: new Date() },
    region: {
      type: String,
      default: "none",
      required: true,
    },
    totalMoney: { type: Number, default: 1000, required: true },
    currentMoney: { type: Number, default: 1000, required: true },
    unlockedFields: { type: Number, default: 16, required: true },
    plantsCollected: {
      type: [Schema.Types.ObjectId],
      ref: "Plant",
      default: [],
      required: true,
    },
    plantStorage: {
      type: [
        {
          _id: { type: mongoose.Types.ObjectId },
          plant: { type: Schema.Types.ObjectId, ref: "Plant" },
          amount: Number,
          decayStatus: String,
        },
      ],
      default: [
        {
          _id: "64ef2a7633734c4025ee8e9e",
          plant: "64ec81c397da227ff2d81c8d",
          amount: 5,
          decayStatus: 0,
        },
      ],
      required: true,
    },
    farm: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
        "64f200084b47dbcee3b7fe46",
      ],
      ref: "Plant",
      required: true,
    },
  },
  { timestamps: true }
);

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
