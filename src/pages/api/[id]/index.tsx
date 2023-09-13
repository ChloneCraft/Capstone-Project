import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import { ObjectId } from "mongoose";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await User.findById(id);

    return res.status(200).json(user);
    // } else {
    //   return res.status(200).json("error");
    // }
  } else if (req.method === "PUT") {
    try {
      const user = await User.findByIdAndUpdate(id, {
        region: req.body,
      });
      return res.status(200).json("success");
    } catch (e) {
      return res.status(400).json("error:", e);
    }
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
