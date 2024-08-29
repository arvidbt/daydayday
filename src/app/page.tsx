import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>
        <div className="text-xl font-black">DayDayDay</div>
      </main>
    </HydrateClient>
  );
}
