// db/models/Joke.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: string, required: true },
    password: { type: string, required: true },
    location: { type: { x: number, y: number }, required: true },
    totalMoney: { type: number, required: true },
    currentMoney: { type: number, required: true },
    unlockedField: { type: number, required: true },
    plantsCollected: {
      type: [Schema.Types.ObjectId],
      ref: "Plant",
      required: true,
    },
    plantStorage: {
      type: [Schema.Types.ObjectId],
      ref: "Plant",
      required: true,
    },
    farm: {
      type: [{ content: string }],
      ref: "Plant",
      required: true,
    },
  },
  { timestamp: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
