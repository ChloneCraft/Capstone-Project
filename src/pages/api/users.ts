// import dbConnect from "../../../db/connect";
// import User from "../../../db/models/User";

// export default async function handler(req: any, res: any) {
//   await dbConnect();

//   if (req.method === "GET") {
//     const user = await User.find().populate({
//       path: "plantStorage.plant",
//       model: "Plant",
//     });

//     const {
//       username,
//       location,
//       totalMoney,
//       currentMoney,
//       plantsCollected,
//       plantStorage,
//       farm,
//     } = user;
//     return res.status(200).json({
//       username: username,
//       location: location,
//       totalMoney: totalMoney,
//       currentMoney: currentMoney,
//       plantsCollected: plantsCollected,
//       plantStorage: plantStorage,
//       farm: farm,
//     });
//   } else if (req.method === "PUT") {
//     const user = await User.findById(developerID);
//   } else {
//     return res.status(400).json({ error: "something went wrong" });
//   }
// }
