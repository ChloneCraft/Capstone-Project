import dbConnect from "../../../../db/connect";
import Player from "../../../../db/models/Player";
import { ObjectId } from "mongoose";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id: nameOfPlayer } = req.query;

  if (req.method === "GET") {
    const player = await Player.findOne({ username: nameOfPlayer });

    if (player) {
      return res.status(200).json(player);
    } else {
      return res.status(200).json("error");
    }
  } else if (req.method === "PUT") {
    try {
      const player = await Player.updateOne(
        { username: nameOfPlayer },
        { $set: req.body }
      );
      return res.status(200).json("success");
    } catch (e) {
      return res.status(400).json("error:", e);
    }
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
