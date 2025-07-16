
import { ThemeContextType } from "../types/types";
import { createContext, useState, ReactNode } from "react";


export const ThemeContext = createContext({});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  let  themePreference = localStorage.getItem("theme") 
  
  if (!themePreference) {
    themePreference = "light"
    localStorage.setItem("theme", themePreference)
  }

  const [theme, setTheme] = useState<string>(themePreference);
  
  let value:ThemeContextType = {
    theme,
    setTheme
  }
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}