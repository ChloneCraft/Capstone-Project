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
      profile(profile) {
        // console.log("profile", profile);
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.avatar_url,
          lastLogin: new Date(),
          region: "none",
          totalMoney: 1000,
          currentMoney: 1000,
          unlockedFields: 16,
          plantsCollected: [],
          plantStorage: [
            {
              // potato seed
              plant: "64ef2a7633734c4025ee8e9e",
              amount: 15,
              decayStatus: 0,
            },
            {
              plant: "64f6e73232e5ea1ee8540236",
              amount: 15,
              decayStatus: 0,
            },
            {
              plant: "64f8b24fec1cbef6647a818e",
              amount: 15,
              decayStatus: 0,
            },
            {
              plant: "64f8b201ec1cbef6647a818c",
              amount: 10,
              decayStatus: 0,
            },
            {
              plant: "64f8b2a0ec1cbef6647a818f",
              amount: 10,
              decayStatus: 0,
            },
            {
              //maple tree
              plant: "64f8b2dcec1cbef6647a8190",
              amount: 10,
              decayStatus: 30,
            },
            {
              //blueberry
              plant: "64f8b238ec1cbef6647a818d",
              amount: 10,
              decayStatus: 2,
            },
            {
              //pumpkin
              plant: "64ec84e797da227ff2d81c96",
              amount: 10,
              decayStatus: 3,
            },
            {
              //oak tree
              plant: "64ec850497da227ff2d81c97",
              amount: 10,
              decayStatus: 25,
            },
            {
              // potato
              plant: "64ec81c397da227ff2d81c8d",
              amount: 10,
              decayStatus: 6,
            },
          ],
          farm: [
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f994400a507798d951f7f9",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f994400a507798d951f7f9",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f994400a507798d951f7f9",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f98d290a507798d951f7f4",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f994400a507798d951f7f9",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f994400a507798d951f7f9",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f994400a507798d951f7f9",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f994400a507798d951f7f9",
              growthStatus: 0,
              waterCapacity: 0,
            },
            {
              plant: "64f994400a507798d951f7f9",
              growthStatus: 0,
              waterCapacity: 0,
            },
          ],
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;

        //creating a new player if necessary------------

        //   let userCoords = { x: 0, y: 0 };
        //   const name = session?.user?.name;

        //   // handle success case
        //   function onSuccess(position) {
        //     const { latitude, longitude } = position.coords;
        //     userCoords = { latitude: latitude, longitude: longitude };
        //   }

        //   // handle error case
        //   function onError() {
        //     console.log("cant handle position");
        //   }

        //   // navigator.geolocation.getCurrentPosition(onSuccess, onError);
        //   const find = await Player.find({ username: name });
        //   if (find.length === 0) {
        //     console.log("you created a new profile for: ", session.user.id);
        //     try {
        //       const player = new Player({
        //         username: name,
        //         location: userCoords,
        //         user: session.user.id,
        //       });
        //       await player.save();
        //     } catch (e) {
        //       console.error("error:", e);
        //     }
        //   } else {
        //     console.log("you have a profile");
        //   }
        // }
        //-----------------create player----------
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
