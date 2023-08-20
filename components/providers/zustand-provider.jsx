"use client";

import { Provider } from "zustand";
import { useUser } from "@/lib/stores";

export default function ZustandProvider({ children }) {
  return <Provider createStore={useUser}>{children}</Provider>;
}
