import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Plant from "../../../../db/models/Plant";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const user = await User.findById(id).populate({
        path: "plantStorage.plant",
        model: "Plant",
      });

      const { plantStorage } = user;

      return res.status(200).json(plantStorage);
    } catch (error) {
      return res.status(400).json(error);
    }
  } else if (req.method === "PUT") {
    const user = await User.findById(id);
    const plantId = req.body;
    const newPlant = await Plant.findById(plantId);
    const stackfromToday = user.plantStorage.find((item: any) => {
      return item.plant == plantId && item.decayStatus === newPlant.decayTime;
    });
    console.log("stackfromToday", stackfromToday);

    if (stackfromToday) {
      user.plantStorage[user.plantStorage.indexOf(stackfromToday)].amount++;
      user.save();
    } else {
      user.plantStorage.push({
        plant: newPlant,
        amount: 1,
        decayStatus: newPlant.decayTime,
      });
    }

    user.save();

    return res.status(200).json("success");
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
