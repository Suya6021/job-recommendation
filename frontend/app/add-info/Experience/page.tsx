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
  Company: z.string(),
  Position: z.string(),
  location: z.string(),
  desc: z.string().min(10),
  duration: z.string(),
});

const formSchema = z.array(objSchema);
const page = () => {
  const form = useForm<z.infer<typeof objSchema>>({
    resolver: zodResolver(objSchema),
    defaultValues: {
      Company: "",
      Position: "",
      location: "",
      desc: "",
      duration: "",
    },
  });
  const data = useStore((state) => state);

  function onSubmit(values: z.infer<typeof objSchema>) {
    let temp = {
      ...values,
    };
    data?.update({
      Experience: data?.Experience?.concat([temp]),
    });
    form.reset();
  }
  // data.update({
  //   FullName: "Sushant Rao",
  //   Title: "new",
  //   Summary: "",
  //   email: "String",
  // });
  // console.log(data);
  let tempData = [
    {
      Company: "Apple Inc.",
      Position: "Associate S?W Dev",
      location: "Pune",
      desc: `Developed a scalable and efficient web application using NodeJS & Express for user`,
      duration: "2021-2023",
    },
    {
      Company: "Apple Inc.",
      Position: "Associate S?W Dev",
      location: "Pune",
      desc: `Developed a scalable and efficient web application using NodeJS & Express for user`,
      duration: "2021-2023",
    },
  ];
  return (
    <div className="p-4 flex  flex-col gap-12">
      <div className="flex flex-col gap-3">
        {tempData?.map((elem, ind) => {
          return (
            <div
              key={ind}
              className="w-full flex flex-col bg-slate-200 rounded-md p-4 "
            >
              <div className="flex  justify-between gap-4 w-full">
                <div className="flex justify-between w-full">
                  <div>
                    <div className="text-2xl font-semibold">
                      {elem?.Position}
                    </div>
                    <div className="text-slate-500 text-lg ">
                      {elem?.Company}
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
                  <Button className="bg-green-600">Update</Button>
                  <Button className="bg-red-600">Delete</Button>
                </div>
              </div>
              <div className="col-span-2">{elem?.desc}</div>
            </div>
          );
        })}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <h2 className="text-3xl font-semibold">Add More</h2>
          <FormField
            control={form.control}
            name="Company"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Company"
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
            name="Position"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Position"
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
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Description"
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
          <div className="flex gap-4">
            <Button className="w-full">Add</Button>
            <Button type="submit" className="w-full">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
