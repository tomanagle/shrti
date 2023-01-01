import { env } from "@/env/client.mjs";
import { trpc } from "@/utils/trpc";
import type { GetServerSideProps } from "next";
import { Loader } from "@mantine/core";

export default function RedirectPage(props) {
  const { data } = trpc.redirectRouter.findByShortId.useQuery({
    shortId: props.shortId,
  });

  return (
    <div>
      <Loader />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const shortId = context?.params?.redirect;

  const url = `${env.NEXT_PUBLIC_URL}/api/redirects?id=${shortId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      permanent: true,
      destination: data.url,
    },
    props: {
      shortId,
      data,
    },
  };
};
