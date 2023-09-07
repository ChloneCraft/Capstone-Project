import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Plant from "../../../../db/models/Plant";

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
      // console.log("pppplayerrrrrrrrrrrrrrrrrrrr", player);
      return res.status(200).json(player);
    } catch (error) {
      console.error("ERRRROR", error);
      return res.status(400).json("error");
    }
  } else {
    console.error("else error");
    return res.status(400).json({ error: "something went wrong" });
  }
}
