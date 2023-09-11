import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Plant from "../../../../db/models/Plant";
import { ObjectId } from "mongodb";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;
  // console.log("id", id);

  if (req.method === "GET") {
    const player = await User.findById(id).populate({
      path: "farm.plant",
      model: "Plant",
    });
    // console.log("pppplayerrrrrrrrrrrrrrrrrrrr", player);

    const { farm } = player;

    return res.status(200).json(farm);
  } else if (req.method === "PUT") {
    // console.log("requestbody", req.body);
    // console.log("we are here");
    // const emptyPlot = {
    //   plant: new ObjectId("64f98d290a507798d951f7f4"),
    //   growthStatus: 0,
    //   waterCapacity: 0,
    // };

    // const plotIndex = req.body;

    // const user = await User.findById(id);
    // console.log("plotIndex", user.farm[plotIndex]);
    // user.farm[plotIndex] = emptyPlot;
    // console.log("plotIndex", user.farm[plotIndex]);
    // user.save();
    // console.log("new player farm", user.farm);

    // return res.status(200).json(user.farm);
    try {
      // console.log("reqbody", req.body);
      const user = await User.findById(id);
      // console.log("user", user);

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
      console.log("pppplayerrrrrrrrrrrrrrrrrrrr", player);
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
