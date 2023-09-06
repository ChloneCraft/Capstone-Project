import mongoose, { InferSchemaType } from "mongoose";

const { Schema } = mongoose;

export const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    emailVerified: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
