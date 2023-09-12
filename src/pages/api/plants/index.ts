import dbConnect from "../../../../db/connect";
import Plant from "../../../../db/models/Plant";

export default async function handler(req: any, res: any) {
  const connection = await dbConnect();

  if (req.method === "GET") {
    const plants = await Plant.find();
    return res.status(200).json(plants);
  } else if (req.method === "PUT") {
    // const { plantId, amount } = req.method;
    // const plants = await Plant.findById(plantId);
    return res.status(200).json("nothing to put here");
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
