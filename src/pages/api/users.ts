import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const players = await User.find();

    return res.status(200).json(players);
  } else if (req.method === "POST") {
    // Player.create();
    return res.status(200).json("here is a post reqeuest");
  } else {
    console.log("player api else upsi");

    return res.status(400).json({ error: "something went wrong" });
  }
}
