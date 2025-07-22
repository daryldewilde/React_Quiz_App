
import type { ThemeContextType } from "../types/types";
import { createContext, useState, type ReactNode } from "react";

// Create the theme context with proper typing
export const ThemeContext = createContext<ThemeContextType | null>(null);

// Theme context provider component
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