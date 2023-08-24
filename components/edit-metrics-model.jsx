"use client";

import * as z from "zod";
import { Drawer } from "vaul";
import { useForm } from "react-hook-form";
import { LuSettings2 } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "@/lib/hooks/useUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editMetrics } from "@/lib/actions/editMetrics";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  dailyDrawdownLimit: z.number().min(0, {
    message: "Daily drawdown limit must be greater than 0",
  }),
  maxLossLimit: z.number().min(0, {
    message: "Max loss must be greater than 0",
  }),
  maxExposureLimit: z.number().min(0, {
    message: "Max exposure must be greater than 0",
  }),
});

function ModelContent() {
  const { user, revalidateUser } = useUser();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dailyDrawdownLimit: user?.dailyDrawdownLimit,
      maxLossLimit: user?.maxLossLimit,
      maxExposureLimit: user?.maxExposureLimit,
    },
  });

  function onSumit(values) {
    editMetrics(values, user.id);
    revalidateUser();

    toast({
      description: "Risk metrics updated successfully",
    });
  }

  return (
    <>
      <div>
        <div className="text-lg font-bold">Edit Risk Metrics</div>
        <div className="text-md text-muted-foreground">
          Make sure you have the right metrics to analyze your account.
        </div>
      </div>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumit)} className="space-y-4">
            <FormField
              control={form.control}
              name="dailyDrawdownLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Drawdown Limit</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={event => field.onChange(+event.target.value)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxLossLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Loss</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={event => field.onChange(+event.target.value)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxExposureLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Exposure</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={event => field.onChange(+event.target.value)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="">
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default function EditMetricsModel() {
  return (
    <>
      {/* For desktop */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="font-bold hidden lg:flex">
            <LuSettings2 className="h-5 w-5 mr-2" />
            Configure Risk Metrics
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <ModelContent />
        </DialogContent>
      </Dialog>

      {/* For mobile */}
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <Button size="icon" className="font-bold lg:hidden">
            <LuSettings2 className="h-5 w-5" />
          </Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
          <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[76%] mt-24 fixed bottom-0 left-0 right-0 ">
            <div className="p-6 rounded-t-[10px] flex-1 w-full">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
              <div className="max-w-md w-full">
                <ModelContent />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
