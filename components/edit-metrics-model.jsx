"use client";

import { Drawer } from "vaul";
import { LuSettings2 } from "react-icons/lu";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function ModelContent() {



  return (
    <>
      <div>
        <div className="text-lg font-bold">Edit Risk Metrics</div>
        <div className="text-md text-muted-foreground">
          Make sure you have the right metrics to analyze your account.
        </div>
      </div>
      <div className="grid gap-4 py-4">
        <div className="grid items-center gap-2">
          <Label htmlFor="name" className="font-semibold">
            Daily Drawdown Limit
          </Label>
          <Input id="name" className="" />
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="name" className="font-semibold">
            Max Loss (per trade)
          </Label>
          <Input id="name" className="" />
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="name" className="font-semibold">
            Max Exposure (per trade)
          </Label>
          <Input id="name" className="" />
        </div>
      </div>
      <div className="flex ml-auto w-full justify-end">
        <Button type="submit">Save changes</Button>
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
