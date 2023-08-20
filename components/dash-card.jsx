"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DashCard({ title, value, currency, icon = null, description = "" }) {
  return (
    <Card className="shadow-none rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-semibold">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="w-full flex flex-col items-end">
        <div className="text-4xl font-black leading-10">
          {value}
          <span className="pl-2 text-xs text-muted-foreground font-medium">
            {currency}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default DashCard;
