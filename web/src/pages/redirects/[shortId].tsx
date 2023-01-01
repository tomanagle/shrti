import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { Text, createStyles, Box, Divider } from "@mantine/core";
import { getQRCodeDataURL } from "@/utils/qrcode";
import Image from "next/image";
import { env } from "@/env/client.mjs";
import { AiOutlineArrowRight } from "react-icons/ai";

export const AreaChart = dynamic(() => import("../../components/charts/Area"), {
  ssr: false,
});

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: `linear-gradient(-60deg, ${
      theme?.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    padding: theme.spacing.xl * 1.5,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: 5,
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));

export default function RedirectPage() {
  const router = useRouter();
  const shortId = router.query.shortId as string;

  const { data } = trpc.redirect.findByShortId.useQuery(
    {
      shortId,
    },
    {
      enabled: Boolean(shortId),
    }
  );

  const { data: analyticsData } = trpc.analytics.redirect.useQuery(
    {
      shortId,
    },
    {
      enabled: Boolean(shortId),
    }
  );

  const { classes } = useStyles();

  const url = `${env.NEXT_PUBLIC_URL}/${shortId}`;

  return (
    <div>
      <Box
        component="header"
        pb="xl"
        sx={() => ({
          display: "flex",
        })}
      >
        <Box
          sx={() => ({
            flex: 1,
          })}
        >
          <Box
            sx={() => ({
              display: "flex",
              alignItems: "center",
            })}
          >
            <Text weight={700}>{url}</Text>

            <Text pt="5px" ml="xs" mr="xs">
              <AiOutlineArrowRight />
            </Text>

            <Text weight={700}>{data?.url}</Text>
          </Box>
        </Box>

        <Image
          src={getQRCodeDataURL(url)}
          alt="qr code"
          width="150"
          height="150"
        />
      </Box>

      <Divider mb="xl" w="90%" mx="auto" />

      <div className={classes.root}>
        <div className={classes.stat}>
          <Text className={classes.count}>{analyticsData?.total}</Text>
          <Text className={classes.title}>Clicks</Text>
          <Text className={classes.description}>Total clicks</Text>
        </div>

        <div className={classes.stat}>
          <Text className={classes.count}>{analyticsData?.unique}</Text>
          <Text className={classes.title}>Unique</Text>
          <Text className={classes.description}>Total clicks</Text>
        </div>
      </div>

      <AreaChart series={analyticsData?.series || []} />
    </div>
  );
}
