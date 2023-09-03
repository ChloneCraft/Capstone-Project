import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await User.findById(id)
      .populate({
        path: "plantStorage.plant",
        model: "Plant",
      })
      .populate("farm");

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
  } else if (req.method === "PUT") {
    const user = await User.findByIdAndUpdate(id, {
      $set: { plantStorage: req.body },
    });
    return res.status(200).json("success");
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
