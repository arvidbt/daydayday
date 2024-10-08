import { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "@/server/db/schema";
import { env } from "@/env";
import { db } from "@/server/db";
import { routes } from "./routes";

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    newUser: routes.onboarding,
    signIn: routes.home,
    signOut: routes.landing,
  },
} satisfies NextAuthConfig;
