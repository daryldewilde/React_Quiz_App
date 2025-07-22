
import type { UserContextType } from "../types/types";
import { createContext, useState, type ReactNode } from "react";

// Create the context with proper typing
export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  // Get user name from localStorage when app starts
  const userName = localStorage.getItem("name") || "";
  const [user, setUser] = useState<string>(userName);
  
  // Create the context value with user data and setter function
  const value: UserContextType = {
    user,
    setUser
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}