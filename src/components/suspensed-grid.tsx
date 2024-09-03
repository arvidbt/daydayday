import { Skeleton } from "@/components/ui/skeleton";

export function SuspensedGrid() {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="grid grid-cols-14 gap-3 md:grid-cols-24 lg:grid-cols-36">
        {Array.from({ length: 4000 }).map((_, index) => (
          <Skeleton className="h-4 w-4 rounded-full" key={index} />
        ))}
      </div>
    </div>
  );
}
