import "@/styles/globals.css";
// import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (url) =>
            fetch(url, { next: { revalidate: 2000 } }).then((r) => r.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}
