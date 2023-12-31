"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "./ui/button";
import Headline from "@/components/headline";

const words = ["Trade.", "Manage.", "Excel."];
const gradients = [
  "from-green-400 to-blue-500",
  "from-pink-500 to-yellow-500",
  "from-purple-500 to-red-500",
];

export default function Hero() {
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIndex((prev) => (prev + 1) % words.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <Headline words={words} gradients={gradients} currIndex={currIndex} />
      <div className="px-12">
        <p className="text-muted-foreground text-center text-2xl">
          Empowering Traders, One Click at a Time
        </p>
      </div>
      <div className="flex gap-4 m-auto flex-col md:flex-row">
        <Button className="font-semibold text-md" size="lg">
          Learn More
        </Button>
        <Button
          className={`text-white bg-gradient-to-r ${gradients[currIndex]} transition-all duration-500 ease-in-out font-semibold text-md hover:opacity-70`}
          size="lg"
          onClick={() => {
            signIn("credentials", {
              email: "demo@meta-planner.com",
              password: "demo@1234",
              callbackUrl: "/dashboard",
            });
          }}
        >
          Login with Demo Account
        </Button>
      </div>
    </div>
  );
}
