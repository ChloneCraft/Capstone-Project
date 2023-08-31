import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";
import Plant from "../../../db/models/Plant";

export default async function handler(req: any, res: any) {
  await dbConnect();

  const developerID = "64ee00dc6f0de821d4b93a9a";

  if (req.method === "GET") {
    const user = await User.findById(developerID).populate({
      path: "plantStorage.plant",
      model: "Plant",
    });
    console.log("user", user);

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
