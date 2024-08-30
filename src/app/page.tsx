import { auth } from "@/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const user = await auth();
  console.log(user);

  return (
    <HydrateClient>
      <main>
        <div className="text-xl font-black">DayDayDay</div>

        <div className="grid-cols-24 relative grid max-w-xl gap-2"></div>
      </main>
    </HydrateClient>
  );
}
