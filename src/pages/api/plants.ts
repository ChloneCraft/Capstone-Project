import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";
import Plant from "../../../db/models/Plant";

export default async function handler(req: any, res: any) {
  const connection = await dbConnect();

  const developerID = "64ee00dc6f0de821d4b93a9a";

  if (req.method === "GET") {
    const plants = await Plant.find();
    return res.status(200).json(plants);
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
