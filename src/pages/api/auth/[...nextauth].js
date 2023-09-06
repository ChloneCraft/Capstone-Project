import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../db/mongoDBAdapter";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    // async signIn(user, account, profile) {
    // Check if the user exists in your MongoDB database
    // const existingUser = await User.findOne({ email: user.email });
    // if (!existingUser) {
    //   // If the user doesn't exist, create a new user
    //   const newUser = new User({
    //     email: user.email,
    //     // Add other user properties as needed
    //   });
    //       await newUser.save();
    //       // Return the new user
    //       return Promise.resolve(newUser);
    //     }
    //     return Promise.resolve(true);
    //   },
    // },
  },
};
export default NextAuth(authOptions);
