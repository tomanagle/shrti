import NextAuth, { type NextAuthOptions } from "next-auth";
import { set } from "lodash";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "database",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 15,
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        set(session.user, "id", user.id);
      }

      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // @ts-ignore
        return profile?.email_verified;
      }

      return false; // Do different verification for other providers that don't have `email_verified`
    },
  },
  secret: env.JWT_SECRET,
};

export default NextAuth(authOptions);
