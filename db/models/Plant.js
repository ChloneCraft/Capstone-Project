import mongoose from "mongoose";

const { Schema } = mongoose;

const plantSchema = new Schema({
  plantName: { type: String, required: true },
  type: { type: String, required: true },
  decayTime: { type: Number, required: true },
  waterCapacity: { type: Number, required: true },
  growthTime: { type: Number, required: true },
  image: {
    img: { type: String, required: true },
    hover: { type: String, required: true },
    stage1: { type: String, required: true },
    stage2: { type: String, required: true },
  },
  sellers: {
    type: [{ sellerId: Schema.Types.ObjectId, amount: Number, listDate: Date }],
    required: true,
  },
  history: {
    type: [{ price: Number, amount: Number, Timestamp: Date }],
    required: true,
  },
});

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;
