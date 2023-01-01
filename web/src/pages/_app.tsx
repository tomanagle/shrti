import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { MantineProvider } from "@mantine/core";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Head from "next/head";
import { Layout } from "../containers/Layout";

function Main({ Component, pageProps }: { Component: any; pageProps: any }) {
  const { data: session } = useSession();
  if (!session) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <SessionProvider session={session}>
          <Main Component={Component} pageProps={pageProps} />
        </SessionProvider>
      </MantineProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
