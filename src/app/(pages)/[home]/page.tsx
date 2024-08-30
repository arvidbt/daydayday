import { generateDateArray } from "@/lib/date";
import { HydrateClient } from "@/trpc/server";

export default async function Onboarding() {
  const dateArray = await generateDateArray();
  console.log(dateArray);
  return (
    <HydrateClient>
      <div>
        <div className="text-xl font-black">Home</div>
        <div className="md:grid-cols-24 lg:grid-cols-36 grid grid-cols-12"></div>
      </div>
    </HydrateClient>
  );
}
