import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import { ObjectId } from "mongoose";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const { id: nameOfUser } = req.query;

  if (req.method === "GET") {
    console.log("nameOfUser", nameOfUser);
    // const result = await User.findById("64f1b8324b47dbcee3b7fe44");
    // console.log("User is db", result.username);

    const user = await User.findOne({ username: nameOfUser });
    console.log("USERRRRRRRRRRRRRRRRRRRR", user);

    // .populate({
    //   path: "plantStorage.plant",
    //   model: "Plant",
    // })
    // .populate("farm");

    // const {
    //   username,
    //   location,
    //   totalMoney,
    //   currentMoney,
    //   plantsCollected,
    //   plantStorage,
    //   farm,
    // } = user;
    // return res.status(200).json({
    //   username: username,
    //   location: location,
    //   totalMoney: totalMoney,
    //   currentMoney: currentMoney,
    //   plantsCollected: plantsCollected,
    //   plantStorage: plantStorage,
    //   farm: farm,
    // });
    return res.status(200).json(user._id);
  } else if (req.method === "PUT") {
    try {
      console.log("req.body", req.body);

      const user = await User.updateOne(
        { username: nameOfUser },
        { $set: { lastLogin: req.body } }
      );
      return res.status(200).json("success");
    } catch (e) {
      return res.status(400).json("error:", e);
    }
  } else {
    return res.status(400).json({ error: "something went wrong" });
  }
}
