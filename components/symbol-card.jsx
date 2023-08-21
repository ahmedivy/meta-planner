"use client";

import { Switch } from "./ui/switch";
import { Card, CardContent } from "@/components/ui/card";

function SymbolCard({ name, isOn = false, onToggle = () => {} }) {
  return (
    <Card className="shadow-none rounded-lg">
      <CardContent className="w-full flex justify-between p-8">
        <p className="text-xl font-semibold">{name}</p>
        <Switch checked={isOn} onCheckedChange={onToggle} />
      </CardContent>
    </Card>
  );
}

export default SymbolCard;
