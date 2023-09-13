import dbConnect from "../../../../db/connect";
import Plant from "../../../../db/models/User";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const plant = await Plant.findById(id);
      // console.log("plantStorage api user", user);

      const { market } = plant;

      return res.status(200).json(market);
    } catch (error) {
      return res.statis(400).json(error);
    }
  } else if (req.method === "PUT") {
    const { active, amount, id } = req.body;
    try {
      const plant = await Plant.findById(id);
      const entryToAlter = plant.market.find((item: any) => item._id === id);
      entryToAlter.active = active;
      entryToAlter.amount -= amount;
      plant.save();
      return res.status(200).json(plant);
    } catch (e) {
      return res.status(400).json(e);
    }
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
