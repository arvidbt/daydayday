"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
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
import { doOnboard } from "@/server/actions/do-onboard";

export const onboardingFormSchema = z.object({
  lifeExpectancy: z
    .number()
    .max(100, { message: "Maxiumum life expectancy allowed is 100." })
    .nonnegative(),
  birthday: z.string().date(),
});

export function OnboardingForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      lifeExpectancy: 85,
      birthday: "yyyy-mm-dd",
    },
  });

  async function onSubmit(data: z.infer<typeof onboardingFormSchema>) {
    const res = await doOnboard(data);

    if (res !== undefined) {
      const { errors } = res;
      toast({
        variant: "destructive",
        title: "Something went wrong :(",
        description: errors.birthday,
      });
    } else {
      toast({
        variant: "default",
        title: "Onboarding completed!",
      });
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
                <Input {...field} type="date" />
              </FormControl>
              <FormDescription>
                Note that you cannot change your birthday when set.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {form.formState.isLoading ? "Loading" : "Save"}
        </Button>
      </form>
    </Form>
  );
}
