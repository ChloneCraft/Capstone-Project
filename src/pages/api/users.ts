// import { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "../../../db/connect";
// import User from "../../../db/models/User";
// import { userSchema } from "../../../db/models/User";
// import { InferSchemaType } from "mongoose";

// type UserType = InferSchemaType<typeof userSchema>;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await dbConnect();

//   if (req.method === "GET") {
//     const user = await User.find({ username: req.body });
//     console.log("USER from users api:", req.body);

//     // return res.status(200).json({
//     //   username: user.username,
//     //   location: location,
//     //   currentMoney: currentMoney,
//     // });
//   }
//   //    else if (req.method === "PUT") {
//   //     const user = await User.findById(developerID);
//   //   }
//   else {
//     return res.status(400).json({ error: "something went wrong" });
//   }
// }
