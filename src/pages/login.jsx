import { useSession, signIn, signOut, getSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();
  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.email}</p>{" "}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div className="loginContainer">
        <button className="loginContainer__button" onClick={() => signIn()}>
          sign in
        </button>
        <p className="loginContainer__label">Please log in to play</p>
      </div>
    );
  }
};
export default Login;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/welcome",
      },
    };
  }

  return {
    props: { session },
  };
};
