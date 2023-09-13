import dbConnect from "../../../../../db/connect";
import Plant from "../../../../../db/models/Plant";

export default async function handler(req: any, res: any) {
  const connection = await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const plant = await Plant.findById(id);
    return res.status(200).json(plant);
  } else if (req.method === "PUT") {
    // const { plantId, amount } = req.method;
    // const plants = await Plant.findById(plantId);
    return res.status(200).json("nothing do put here");
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
