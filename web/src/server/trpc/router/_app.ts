import { router } from "../trpc";
import { authRouter } from "./auth";
import { redirectRouter } from "./redirect";
import { analyticsRouter } from "./analytics";

export const appRouter = router({
  redirect: redirectRouter,
  analytics: analyticsRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
