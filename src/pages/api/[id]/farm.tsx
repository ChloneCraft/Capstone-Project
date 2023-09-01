import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await User.findById(id).populate("farm");
    const { farm } = user;
    console.log("populated farm", farm);

    return res.status(200).json(farm);
  } else if (req.method === "PUT") {
    const user = await User.findByIdAndUpdate(id, {
      $set: { farm: req.body },
    });
    console.log("updated farm:", user.farm);
    return res.status(200).json("success");
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
