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

  const router = useRouter();
  return (
    <div className="p-4 flex  flex-col gap-12">
      <div className="flex flex-col gap-3">
        {data?.Experience?.map((elem, ind) => {
          return (
            <div
              key={ind}
              className="w-full flex flex-col bg-slate-200 rounded-md p-4 "
            >
              <div className="flex  justify-between gap-4 w-full">
                <div className="flex justify-between w-full lg:flex-row flex-col">
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
                  <Button className="bg-green-600 font-semibold tracking-wider ">
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      let temp = data?.Experience?.filter((element) => {
                        return element != elem;
                      });
                      console.log(temp);
                      data?.update({ Experience: temp });
                    }}
                    className="bg-red-600 font-semibold tracking-wider "
                  >
                    Delete
                  </Button>
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
            <Button type="submit" disabled={isChanged()} className="w-full">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
