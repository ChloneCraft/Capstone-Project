import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../db/mongoDBAdapter";
import useSWR from "swr";

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

        //creating a new player if necessary------------

        // const { data: player, isLoading } = useSWR(`/api/${name}`);
        // while (isLoading) {
        //   // wait(!isLoading);
        // }
        let userCoords = { x: 0, y: 0 };
        const name = session?.user?.name;
        console.log("name from session", name);

        function onSuccess(position) {
          const { latitude, longitude } = position.coords;
          userCoords = { x: latitude, y: longitude };
          console.log("coords:", latitude, longitude);
        }

        // handle error case
        function onError() {
          console.log("cant handle position");
        }
        // navigator.geolocation.getCurrentPosition(onSuccess, onError);
        // if (!player) {
        fetch("http://localhost:3000/api/players", {
          method: "POST",
          body: JSON.stringify({
            name: name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      // }
      //-----------------create player----------
      console.log("session!!!!!!!!!!!!!!!!!!!!!!!", session);
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
