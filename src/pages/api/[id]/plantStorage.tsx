import dbConnect from "../../../../db/connect";
import Player from "../../../../db/models/Player";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const player = await Player.findById(id).populate({
      path: "plantStorage.plant",
      model: "Plant",
    });

    const { plantStorage } = player;

    return res.status(200).json(plantStorage);
  } else if (req.method === "PUT") {
    const player = await Player.findByIdAndUpdate(id, {
      $set: { plantStorage: req.body },
    });
    return res.status(200).json("success");
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
