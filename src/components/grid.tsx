import { cachedGenerateDateArray } from "@/lib/date.server";
import { VirtualisedList } from "./virtualised-list";

export default async function Grid() {
  const dateArray = await cachedGenerateDateArray();

  if (!dateArray) {
    return <div>could not load</div>;
  }

  return <VirtualisedList dateArray={dateArray} />;
}
