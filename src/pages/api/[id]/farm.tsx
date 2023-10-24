import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User.ts";
import Plant from "../../../../db/models/Plant.ts";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    console.log("id on farm request", id);

    try {
      const player = await User.findById(id).populate({
        path: "farm.plant",
        model: "Plant",
      });

      console.log("player", player);
      const { farm } = player;
      console.log("farm", farm);
      return res.status(200).json(farm);
    } catch (e) {
      console.log("errormessag for farm api", e);
      return res.status(400).json(e);
    }
  } else if (req.method === "PUT") {
    try {
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
