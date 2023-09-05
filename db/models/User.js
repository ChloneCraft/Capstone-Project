import mongoose, { InferSchemaType } from "mongoose";
import Plant from "./Plant";

const { Schema } = mongoose;

export const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  lastLogin: { type: Date, required: false },
  location: { type: { x: Number, y: Number }, required: true },
  totalMoney: { type: Number, required: true },
  currentMoney: { type: Number, required: true },
  unlockedField: { type: Number, required: true },
  plantsCollected: {
    type: [Schema.Types.ObjectId],
    ref: "Plant",
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
    required: true,
  },
  farm: {
    type: [{ type: Schema.Types.ObjectId }],
    ref: "Plant",
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
