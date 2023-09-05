import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";
import { userSchema } from "../../../db/models/User";
import { InferSchemaType } from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const users = await User.find();

    return res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, email } = await req.body;
    console.log("checking mongodbconnection", name, email);
    return res.status(200).json("here would be a post reqeuuest");
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
