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
    const user = await User.findByIdAndUpdate(id, {
      $set: { plantStorage: req.body },
    });
    return res.status(200).json("success");
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
