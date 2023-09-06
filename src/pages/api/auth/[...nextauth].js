import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../db/mongoDBAdapter";
import Player from "../../../../db/models/Player";

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

        let userCoords = { x: 0, y: 0 };
        const name = session?.user?.name;

        // handle success case
        function onSuccess(position) {
          const { latitude, longitude } = position.coords;
          userCoords = { latitude: latitude, longitude: longitude };
        }

        // handle error case
        function onError() {
          console.log("cant handle position");
        }

        // navigator.geolocation.getCurrentPosition(onSuccess, onError);
        const find = await Player.find({ username: name });
        if (find.length === 0) {
          console.log("you created a new profile for: ", session.user.id);
          try {
            const player = new Player({
              username: name,
              location: userCoords,
              user: session.user.id,
            });
            await player.save();
          } catch (e) {
            console.error("error:", e);
          }
        } else {
          console.log("you have a profile");
        }
      }
      // }
      //-----------------create player----------
      return session;
    },
  },
};
export default NextAuth(authOptions);
