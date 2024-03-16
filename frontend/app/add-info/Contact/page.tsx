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
import { useState } from "react";
import Resume from "../(components)/Resume";
const objSchema = z.object({
  mobile: z.string(),
  email: z.string(),
  linkedin: z.string(),
  portfolio: z.string(),
});

const page = () => {
  let [ready, setReady] = useState(false);
  const store = useStore((state) => state);
  const form = useForm<z.infer<typeof objSchema>>({
    resolver: zodResolver(objSchema),
    defaultValues: {
      mobile: store?.mobile || "",
      email: store?.email || "",
      linkedin: store?.linkedin || "",
      portfolio: store?.portfolio || "",
    },
  });

  function onSubmit(values: z.infer<typeof objSchema>) {
    store?.update({ ...values });
    setReady(true);
  }
  function isChanged() {
    let { mobile, email, linkedin, portfolio } = form.watch();
    if (
      mobile == store.mobile &&
      email == store.email &&
      linkedin == store.linkedin &&
      portfolio == store.portfolio
    ) {
      return true;
    }
    return false;
  }

  return (
    <>
      {!ready ? (
        <Resume></Resume>
      ) : (
        <div className="p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <h2 className="text-3xl font-semibold">Qualifications</h2>
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Phone Number"
                        className="border-2 border-slate-400"
                        // {...field}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Email"
                        className="border-2 border-slate-400"
                        {...field}
                        // {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your linkedin username"
                        className="border-2 border-slate-400"
                        {...field}
                        // {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter the live link of your portfolio"
                        className="border-2 border-slate-400"
                        {...field}
                        // {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isChanged()} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
};

export default page;
