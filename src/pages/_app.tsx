import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url, { next: { revalidate: 2000 } }).then((r) => r.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
