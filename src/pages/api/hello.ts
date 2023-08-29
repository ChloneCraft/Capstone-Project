import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";
import { ServerResponse, IncomingMessage } from "http";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const developerID = "64edd87cbb6ac3adc5dba86a";

  if (req.method === "GET") {
    const user = await User.findById(developerID);
    const {
      username,
      location,
      totalMoney,
      currentMoney,
      plantsCollected,
      plantStorage,
      farm,
    } = user;
    return res.status(200).json({
      username: username,
      location: location,
      totalMoney: totalMoney,
      currentMoney: currentMoney,
      plantsCollected: plantsCollected,
      plantStorage: plantStorage,
      farm: farm,
    });
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
