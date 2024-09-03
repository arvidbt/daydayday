import { auth } from "@/auth";
import { site } from "@/config/site";
import { HydrateClient, api } from "@/trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { type Metadata } from "next";
import { OnboardingForm } from "@/forms/user-onboarding-form";

export const metadata: Metadata = {
  title: "Onboarding | daydayday",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Onboarding() {
  const user = await auth();
  const userInfo = await api.userRouter.getUserInfo();
  const userAlreadyOnboarded = userInfo?.birthday !== undefined;

  if (userAlreadyOnboarded) {
    redirect(routes.home);
  }

  return (
    <HydrateClient>
      <div className="flex flex-1 flex-col items-center justify-center">
        {!userAlreadyOnboarded && (
          <Card>
            <CardHeader>
              <CardTitle>
                Welcome to {site.name}, {user?.user?.name?.split(" ")[0]}
              </CardTitle>
              <CardDescription>{"Let's get you started."}</CardDescription>
            </CardHeader>
            <CardContent>
              <OnboardingForm />
            </CardContent>
          </Card>
        )}
      </div>
    </HydrateClient>
  );
}
