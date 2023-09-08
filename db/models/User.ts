import mongoose, { InferSchemaType } from "mongoose";
import Plant from "./Plant";

const { Schema } = mongoose;

export type UserType = InferSchemaType<typeof userSchema>;

export const userSchema = new Schema(
  {
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
          decayStatus: Number,
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
      type: [
        {
          plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
          growthStatus: { type: Number },
          waterCapacity: { type: Number },
        },
      ],
      default: [
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f98d290a507798d951f7f4",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f994400a507798d951f7f9",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f994400a507798d951f7f9",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f994400a507798d951f7f9",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f994400a507798d951f7f9",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f994400a507798d951f7f9",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f994400a507798d951f7f9",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f994400a507798d951f7f9",
          growthStatus: 0,
          waterCapacity: 0,
        },
        {
          plant: "64f994400a507798d951f7f9",
          growthStatus: 0,
          waterCapacity: 0,
        },
      ],
      ref: "Plant",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
