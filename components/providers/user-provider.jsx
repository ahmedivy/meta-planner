"use client";

import { UserContextProvider } from "@/lib/hooks/useUser";

function UserProvider({ session, children }) {
  return (
    <UserContextProvider session={session}>{children}</UserContextProvider>
  );
}

export default UserProvider;
