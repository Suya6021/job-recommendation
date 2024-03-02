"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/zustand";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  FullName: z.string().min(2).max(50),
  Title: z.string().min(3),
  Summary: z.string().min(10),
  // LName: z.string().min(2).max(40),
  // mobile: z.string().min(10),
  // email: z.string().email(),
  // linkedin: z.string().url(),
});

const page = () => {
  let store = useStore((state) => state);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FullName: store?.FullName || "",
      Title: store?.Title || "",
      Summary: store?.Summary || "",
    },
  });
  const Router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    store.update({ ...values });
    Router.push("/add-info/Experience");
  }
  console.log(store?.FullName);
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-3xl font-semibold">Basic Information</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            // control={form.control}
            name="FullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    className="border-2 border-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Title"
                    className="border-2 border-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Summary"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Summary"
                    className="border-2 border-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default page;
