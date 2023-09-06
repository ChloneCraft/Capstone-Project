import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;
  console.log("id", id);

  if (req.method === "GET") {
    const player = await User.findById(id).populate("farm");
    console.log("pppplayerrrrrrrrrrrrrrrrrrrr", player);

    const { farm } = player;

    return res.status(200).json(farm);
  } else if (req.method === "PUT") {
    const player = await User.findByIdAndUpdate(
      id,
      {
        $set: { farm: req.body },
      },
      { new: true }
    ).populate("farm");
    return res.status(200).json(player);
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
