import { cn } from "@/lib/utils";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DaySchema = z.object({
  date: z.date(),
  today: z.boolean(),
  past: z.boolean(),
  birthday: z.boolean(),
  summary: z.string().optional(),
  category: z.string().optional(),
  url: z.string().url().optional(),
});

export type DayProps = z.infer<typeof DaySchema>;

export function Day({
  date,
  today,
  past,
  birthday,
  summary,
  category,
  url,
}: DayProps) {
  if (today) {
    return <div className={cn("h-4 w-4 rounded-full", "bg-orange-500")}></div>;
  }

  if (birthday) {
    return <div className={cn("h-4 w-4", "bg-black")}></div>;
  }

  if (past) {
    return <div className={cn("h-4 w-4 rounded-full", "bg-gray-400")}></div>;
  }

  return <div className={cn("h-4 w-4 rounded-full", "bg-gray-200")}></div>;
}
