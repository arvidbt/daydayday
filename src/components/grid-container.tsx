import { cachedGenerateDateArray } from "@/lib/date.server";
import { VirtualisedGrid } from "./virtualised-grid";

export default async function GridContainer() {
  const dateArray = await cachedGenerateDateArray();

  if (!dateArray) {
    return <div>could not load</div>;
  }

  return <VirtualisedGrid dateArray={dateArray} />;
}
