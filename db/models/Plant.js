// db/models/Joke.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const plantSchema = new Schema({
  plantName: { type: string, required: true },
  type: { type: string, required: true },
  decayTime: { type: number, required: true },
  waterCapacity: { type: number, required: true },
  growthTime: { type: number, required: true },
  sellers: {
    type: [{ sellerId: Schema.Types.ObjectId, amount: number, listDate: Date }],
    required: true,
  },
  history: {
    type: [{ price: number, amount: number, Timestamp: Date }],
    required: true,
  },
});

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
