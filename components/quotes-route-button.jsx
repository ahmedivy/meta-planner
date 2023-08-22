"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

function QuotesRouteButton() {
  const router = useRouter();

  return (
    <Button
      className="font-bold"
      size="lg"
      onClick={() => {
        router.push("/quotes");
        router.refresh();
      }}
    >
      Back to Quotes
    </Button>
  );
}

export default QuotesRouteButton;
