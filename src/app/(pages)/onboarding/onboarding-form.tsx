"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { doOnboard } from "./do-onboard";

export const onboardingFormSchema = z.object({
  lifeExpectancy: z
    .number()
    .max(100, { message: "Maxiumum life expectancy allowed is 100." })
    .nonnegative(),
  birthday: z.string().date(),
});

export function OnboardingForm() {
  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      lifeExpectancy: 85,
    },
  });

  function onSubmit(values: z.infer<typeof onboardingFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className="space-y-8" action={doOnboard}>
        <FormField
          control={form.control}
          name="lifeExpectancy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Life Expectancy</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your life expectancy. The default life expectancy is 85
                years.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Your birthday in the format YYYY-MM-DD.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
