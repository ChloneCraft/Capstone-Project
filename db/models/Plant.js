import mongoose from "mongoose";

const { Schema } = mongoose;

const plantSchema = new Schema({
  name: { type: String, default: "empty", required: true },
  type: { type: String, default: "", required: true },
  plantID: { type: Number, default: 0, required: true },
  decayTime: { type: Number, default: 0, required: true },
  waterCapacity: { type: Number, default: 0, required: true },
  growthTime: { type: Number, default: 0, required: true },
  image: {
    img: { type: String, default: "", required: true },
    hover: { type: String, default: "", required: true },
    stage1: { type: String, default: "", required: true },
    stage2: { type: String, default: "", required: true },
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

// const plantSchema = new Schema({
//   plantName: { type: String, default: "empty", required: true },
//   type: { type: String, default: "", required: true },
//   plantID: { type: Number, default: 0, required: true },
//   decayTime: { type: Number, default: 0, required: true },
//   waterCapacity: { type: Number, default: 0, required: true },
//   growthTime: { type: Number, default: 0, required: true },
//   image: {
//     img: { type: String, default: "", required: true },
//     hover: { type: String, default: "", required: true },
//     stage1: { type: String, default: "", required: true },
//     stage2: { type: String, default: "", required: true },
//   },
//   sellers: {
//     type: [{ sellerId: Schema.Types.ObjectId, amount: Number, listDate: Date }],
//     required: true,
//   },
//   history: {
//     type: [{ price: Number, amount: Number, Timestamp: Date }],
//     required: true,
//   },
// });
