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
      // console.log("plantStorage api user", user);

      const { plantStorage } = user;

      return res.status(200).json(plantStorage);
    } catch (error) {
      return res.status(400).json(error);
    }
  } else if (req.method === "PUT") {
    const date = new Date();
    const today = date.getDate();
    const currentMonth = date.getMonth();

    console.log("TODAYYY!!", today);
    console.log("currentMonth!!", currentMonth);
    const user = await User.findById(id);
    const plantId = req.body;
    console.log("plantId", plantId);

    const newPlant = await Plant.findById(plantId);

    user.plantStorage.push({ plant: newPlant, amount: 1, decayStatus: 99 });
    user.save();
    // const plantToChange = user.plantStorage.find((item:any)=> {
    //   return item._id === plantId

    //   })
    //    const index = user.plantStorage.indexOf(plantToChange)
    //    user.plantStorage[index]
    // const user = await User.findByIdAndUpdate(id, {
    //   $set: { plantStorage: req.body.newAmount },
    // });
    return res.status(200).json("success");
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
