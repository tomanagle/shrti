import { TRPCError } from "@trpc/server";
import { z } from "zod";
import dayjs from "dayjs";
import { groupBy } from "lodash";

import { router, protectedProcedure } from "../trpc";

export const analyticsRouter = router({
  redirect: protectedProcedure
    .input(
      z.object({
        shortId: z.string(),
        groupBy: z.enum(["day", "month"]).default("day"),
      })
    )
    .query(async ({ ctx, input }) => {
      const prisma = ctx.prisma;
      const { shortId } = input;
      const userId = ctx.session.user.id;

      const redirect = await prisma.redirect.findUnique({
        where: {
          shortId,
        },
      });

      if (!redirect) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Not found",
        });
      }

      if (redirect.userId !== userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Unauthorized",
        });
      }

      const clicks = await prisma.click.findMany({
        where: {
          redirectId: redirect.id,
        },
        select: {
          id: true,
          createdAt: true,
          ip: true,
          agent: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      const formattedByDate = clicks.map((item) => {
        return {
          ...item,
          createdAt: dayjs(item.createdAt).format("YYYY-MM-DD"),
        };
      });

      const grouped = formattedByDate.reduce((acc, curr) => {
        if (!acc[curr.createdAt]) {
          acc[curr.createdAt] = 0;
        }

        acc[curr.createdAt] += 1;

        return acc;
      }, {} as Record<string, number>);

      const data = Object.keys(grouped).map((key) => {
        return {
          x: dayjs(key).format(),
          y: grouped[key],
        };
      });

      const unique = Object.keys(
        clicks.reduce((acc, curr) => {
          const key = `${curr.ip}:${curr.agent}`;

          if (!acc[key]) {
            acc[key] = 0;
          }

          acc[key] += 1;

          return acc;
        }, {} as Record<string, number>)
      ).length;

      return {
        total: clicks.length,
        unique,
        series: [
          {
            label: "Clicks",
            data,
          },
        ],
      };
    }),
});
