import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";
import { userInfo } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import {} from "date-fns";

export const userRouter = createTRPCRouter({
  getUserInfo: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session.user.id) {
      return null;
    }
    return await db.query.userInfo.findFirst({
      where: eq(userInfo.createdById, ctx.session.user.id),
    });
  }),

  setUserInfo: protectedProcedure
    .input(z.object({ lifeExpectancy: z.number(), birthday: z.date() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user.id) {
        return null;
      }

      await db
        .insert(userInfo)
        .values({
          birthday: input.birthday.toDateString(),
          lifeExpectancy: input.lifeExpectancy,
          createdById: ctx.session.user.id,
        })
        .onConflictDoNothing();
    }),
});
