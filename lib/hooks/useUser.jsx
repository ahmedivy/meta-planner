import { useState, useContext, createContext, useEffect, useCallback } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ session, children }) => {
  const [user, setUser] = useState(null);
  const id = session?.user?.id;

  const revalidateUser = useCallback(() => {
    fetch(`api/users/${id}`)
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, [id]);

  useEffect(() => {
    if (session) {
      revalidateUser();
    }
  }, [session, revalidateUser])

  return (
    <UserContext.Provider value={{ user, revalidateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
