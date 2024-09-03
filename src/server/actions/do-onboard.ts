"use server";

import { redirect } from "next/navigation";
import { api } from "@/trpc/server";
import { z } from "zod";
import { routes } from "@/config/routes";

const onboardingFormSchema = z.object({
  lifeExpectancy: z.coerce.number().max(120).nonnegative(),
  birthday: z.string().date(),
});

export async function doOnboard(data: z.infer<typeof onboardingFormSchema>) {
  const parseResult = onboardingFormSchema.safeParse(data);

  if (!parseResult.success) {
    return { errors: parseResult.error.flatten().fieldErrors };
  }

  const { lifeExpectancy, birthday } = parseResult.data;

  await api.userRouter.setUserInfo({
    birthday: new Date(birthday),
    lifeExpectancy: lifeExpectancy,
  });

  redirect(routes.home);
}
