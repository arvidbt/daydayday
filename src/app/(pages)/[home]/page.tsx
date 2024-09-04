import { SuspensedGrid } from "@/components/suspensed-grid";
import { HydrateClient } from "@/trpc/server";
import { Suspense, lazy } from "react";

const GridContainer = lazy(() => import("@/components/grid-container"));

export default async function Home() {
  return (
    <HydrateClient>
      <Suspense fallback={<SuspensedGrid />}>
        <GridContainer />
      </Suspense>
    </HydrateClient>
  );
}
