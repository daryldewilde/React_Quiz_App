
import { UserContextType } from "../types/types";
import { createContext, useState, ReactNode } from "react";


export const UserContext = createContext({});

export function UserContextProvider({ children }: { children: ReactNode }) {

  const userName = localStorage.getItem("name") || ""
  const [user, setUser] = useState<string>(userName);
  
  let value:UserContextType = {
    user,
    setUser
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}