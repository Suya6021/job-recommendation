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
const objSchema = z.object({
  College: z.string(),
  Course: z.string(),
  location: z.string(),
  duration: z.string(),
});

const formSchema = z.array(objSchema);
const page = () => {
  const data = useStore((state) => state);
  const form = useForm<z.infer<typeof objSchema>>({
    resolver: zodResolver(objSchema),
    defaultValues: {
      College: "",
      Course: "",
      location: "",
      duration: "",
    },
  });
  function onSubmit(values: z.infer<typeof objSchema>) {
    let temp = data?.Qualifications?.concat([values]);
    data?.update({ Qualifications: temp! });
  }
  let isChanged = () => {
    if (
      Object.values(form?.getValues()).filter((ele) => {
        return ele != "";
      }).length == 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        {data?.Qualifications?.map((elem, ind) => {
          return (
            <div
              key={ind}
              className="w-full flex flex-col bg-slate-200 rounded-md p-4 "
            >
              <div className="flex  justify-between gap-4 w-full">
                <div className="flex justify-between w-full lg:flex-row flex-col">
                  <div>
                    <div className="text-2xl font-semibold">{elem?.Course}</div>
                    <div className="text-slate-500 text-lg ">
                      {elem?.College}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">
                      {elem?.location}
                    </div>
                    <div>{elem?.duration}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button className="bg-green-600 font-semibold tracking-wider ">
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      let temp = data?.Qualifications?.filter((element) => {
                        return element != elem;
                      });
                      // console.log(temp);
                      data?.update({ Qualifications: temp });
                    }}
                    className="bg-red-600 font-semibold tracking-wider "
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <h2 className="text-3xl font-semibold">Qualifications</h2>
          <FormField
            control={form.control}
            name="College"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter the college/School Name"
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
            name="Course"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter the Course Name"
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Location"
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
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Duration"
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
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default page;
