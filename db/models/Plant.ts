import mongoose, { InferSchemaType } from "mongoose";

const { Schema } = mongoose;

export interface MarketType {
  sellerId: mongoose.Schema.Types.ObjectId;
  amount: number;
  active: Boolean;
  listDate: Date;
}
export interface MarketsType extends Array<MarketType> {}

export type PlantType = InferSchemaType<typeof plantSchema>;

const plantSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, default: "empty", required: true },
  type: { type: String, default: "", required: true },
  plantID: { type: Number, default: 0, required: true },
  decayTime: { type: Number, default: 0, required: true },
  waterCapacity: { type: Number, default: 0, required: true },
  growthTime: { type: Number, default: 0, required: true },
  price: { type: Number },
  image: {
    img: { type: String, default: "", required: true },
    hover: { type: String, default: "", required: true },
    stage1: { type: String, default: "", required: true },
    stage2: { type: String, default: "", required: true },
  },
  market: {
    type: [
      {
        sellerId: Schema.Types.ObjectId,
        amount: Number,
        active: Boolean,
        listDate: Date,
      },
    ],
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
