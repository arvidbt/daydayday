import { auth } from "@/auth";
import { site } from "@/config/site";
import { HydrateClient } from "@/trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OnboardingForm } from "./onboarding-form";

export default async function Onboarding() {
  const user = await auth();
  return (
    <HydrateClient>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div>
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
        </div>
      </div>
    </HydrateClient>
  );
}
