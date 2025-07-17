
import { ThemeContextType } from "../types/types";
import { createContext, useState, ReactNode } from "react";

// Create the context with proper typing
export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  // Get theme preference from localStorage or use default
  let themePreference = localStorage.getItem("theme");
  
  if (!themePreference) {
    themePreference = "light";
    localStorage.setItem("theme", themePreference);
  }

  const [theme, setTheme] = useState<string>(themePreference);
  
  // Create the context value with theme data and setter function
  const value: ThemeContextType = {
    theme,
    setTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}