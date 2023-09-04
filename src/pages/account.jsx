// import { useSession, signOut, getSession } from "next-auth/react";

// const account = () => {
//   const { data: session, status } = useSession({ required: true });
//   if (status === "authenticated") {
//     return (
//       <div>
//         <p>Welcome {session.user.name}</p>
//         <button onClick={() => signOut()}>sign out</button>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <p> you are not signed in</p>
//       </div>
//     );
//   }
// };
// export default account;

// // export const getServerSideProps = async (context) => {
// //   const session = await getSession(context);
// //   if (!session) {
// //     return {
// //       redirect: {
// //         destination: "/login",
// //       },
// //     };
// //   }

// //   return {
// //     props: { session },
// //   };
// // };
