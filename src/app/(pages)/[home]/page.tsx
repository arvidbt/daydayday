// import { Day } from "@/components/day";
// import { cachedGenerateDateArray } from "@/lib/date.server";
import { SuspensedGrid } from "@/components/suspensed-grid";
import { HydrateClient } from "@/trpc/server";
import { Suspense, lazy } from "react";

const Grid = lazy(() => import("@/components/grid"));

export default async function Home() {
  return (
    <HydrateClient>
      <Suspense fallback={<SuspensedGrid />}>
        <Grid />
      </Suspense>
    </HydrateClient>
  );
}
