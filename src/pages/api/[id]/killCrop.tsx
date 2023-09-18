import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Plant from "../../../../db/models/Plant";
import { ObjectId } from "mongodb";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const player = await User.findById(id).populate({
      path: "farm.plant",
      model: "Plant",
    });

    const { farm } = player;

    return res.status(200).json(farm);
  } else if (req.method === "PUT") {
    try {
      const user = await User.findById(id);

      const player = await User.findByIdAndUpdate(
        id,
        {
          $set: { farm: req.body },
        },
        { new: true }
      ).populate({
        path: "farm.plant",
        model: "Plant",
      });
      return res.status(200).json(player.farm);
    } catch (error) {
      console.error("ERRRROR", error);
      return res.status(400).json("error");
    }
  } else {
    console.error("else error");
    return res.status(400).json({ error: "something went wrong" });
  }
}
