"use server";

import { redirect } from "next/navigation";
import { api } from "@/trpc/server";
import { z } from "zod";

const onboardingFormSchema = z.object({
  lifeExpectancy: z.coerce.number().max(120).nonnegative(),
  birthday: z.string().date(),
});

export async function doOnboard(data: FormData) {
  const parseResult = onboardingFormSchema.safeParse(
    Object.fromEntries(data.entries()),
  );

  if (!parseResult.success) {
    console.log(parseResult.error);
    return { errors: parseResult.error.flatten().fieldErrors };
  }

  const { lifeExpectancy, birthday } = parseResult.data;

  await api.userRouter.setUserInfo({
    birthday: new Date(birthday),
    lifeExpectancy: lifeExpectancy,
  });

  redirect("/home");
}
