import { useState, createContext, useContext } from "react";

export const UserContext = createContext(undefined);

export const UserContextProvider = (props) => {
  const session = props.session;

  if (!session) {
    throw new Error("No session found");
  }

  const [user, setUser] = useState(session.user);

  return <UserContext.Provider value={user} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
