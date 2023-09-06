import mongoose, { InferSchemaType } from "mongoose";
import Plant from "./Plant";

const { Schema } = mongoose;

export const playerSchema = new Schema(
  {
    username: { type: String, default: "NewUser", required: true },
    lastLogin: { type: Date, default: new Date() },
    location: {
      type: { x: Number, y: Number },
      default: { x: 0, y: 0 },
      required: true,
    },
    totalMoney: { type: Number, default: 1000, required: true },
    currentMoney: { type: Number, default: 1000, required: true },
    unlockedField: { type: Number, default: 16, required: true },
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
      default: [],
      required: true,
    },
    farm: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
      ref: "Plant",
      required: true,
    },
  },
  { timestamps: true }
);

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
