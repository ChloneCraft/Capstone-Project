import dbConnect from "../../../../db/connect";
import Plant from "../../../../db/models/Plant";

export default async function handler(req: any, res: any) {
  const connection = await dbConnect();
  const { id: userId } = req.query;

  if (req.method === "GET") {
    return res.status(201).json("use plants api");
  } else if (req.method === "PUT") {
    const { plantId, amount } = req.body;

    const plant = await Plant.findById(plantId);
    const newEntry = {
      sellerId: userId,
      amount: amount,
      active: true,
      listDate: new Date(),
    };

    plant.market.push(newEntry);
    plant.save();
    return res.status(200).json(newEntry);
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
