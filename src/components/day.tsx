import { z } from "zod";

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

export function Day({}: DayProps) {
  return <div></div>;
}
