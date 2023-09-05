import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await User.findById(id).populate("farm");
    console.log("user in farm api###############################", user);

    const { farm } = user;
    console.log("FARMMMMMMMMMMMMMMMMMMMMMMMM", farm);

    return res.status(200).json(farm);
  } else if (req.method === "PUT") {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: { farm: req.body },
      },
      { new: true }
    ).populate("farm");
    return res.status(200).json(user);
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
