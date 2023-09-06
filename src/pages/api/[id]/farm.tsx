import dbConnect from "../../../../db/connect";
import Player from "../../../../db/models/Player";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const player = await Player.findById(id).populate("farm");

    const { farm } = player;

    return res.status(200).json(farm);
  } else if (req.method === "PUT") {
    const player = await Player.findByIdAndUpdate(
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
