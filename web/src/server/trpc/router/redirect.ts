import { CreateRedirectSchema } from "@/components/RedirectForm";
import { z } from "zod";

import { router, protectedProcedure, publicProcedure } from "../trpc";

export const redirectRouter = router({
  create: protectedProcedure
    .input(CreateRedirectSchema)
    .mutation(({ input, ctx }) => {
      const prisma = ctx.prisma;

      const user = ctx.session.user;

      return prisma.redirect.create({
        data: {
          ...input,
          creator: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }),
  myRedirects: protectedProcedure.query(({ ctx }) => {
    const prisma = ctx.prisma;

    const user = ctx.session.user;

    return prisma.redirect.findMany({
      where: {
        userId: user.id,
      },
    });
  }),
  findByShortId: publicProcedure
    .input(z.object({ shortId: z.string() }))
    .query(({ input, ctx }) => {
      const prisma = ctx.prisma;

      return prisma.redirect.findUnique({
        where: {
          shortId: input.shortId,
        },
      });
    }),
});
