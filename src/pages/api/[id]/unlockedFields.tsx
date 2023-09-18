import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const user = await User.findById(id);

      const { unlockedFields } = user;

      return res.status(200).json(unlockedFields);
    } catch (error) {
      return res.status(400).json(error);
    }
  } else if (req.method === "PUT") {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            unlockedFields: req.body,
          },
        },
        { new: true }
      );
      return res.status(200).json(user.unlockedFields);
    } catch (e) {
      return res.status(400).json(e);
    }
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
