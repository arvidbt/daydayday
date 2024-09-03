import { auth } from "@/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const user = await auth();
  console.log(user);

  return (
    <HydrateClient>
      <main>
        <div className="text-xl font-black">DayDayDay</div>
        <div>
          Inspired by https://days.rory.codes/ and
          https://busterbenson.com/life-in-weeks
        </div>
      </main>
    </HydrateClient>
  );
}
