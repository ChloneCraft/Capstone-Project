import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/connect";
import Player from "../../../db/models/Player";
import { playerSchema } from "../../../db/models/Player";
import { InferSchemaType } from "mongoose";
import { useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const players = await Player.find();

    return res.status(200).json(players);
  } else if (req.method === "POST") {
    const { name: nameInSession } = req.body;
    const find = await Player.find({ username: nameInSession });
    if (find.length === 0) {
      console.log("you created a new profile");
      const player = new Player({ username: nameInSession });
      await player.save();
    } else {
      console.log("you have a profile");
    }
    // console.log("PLAYERS APIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII  POst", req.body);

    // Player.create();
    return res.status(200).json("here is a post reqeuest");
  } else {
    console.log("player api else upsi");

    return res.status(400).json({ error: "something went wrong" });
  }
}
