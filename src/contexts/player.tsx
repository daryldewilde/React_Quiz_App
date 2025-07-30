import type { PlayerContextType } from "../types/types";
import { createContext, useState, type ReactNode } from "react";

// Create the context with proper typing
export const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerContextProvider({ children }: { children: ReactNode }) {
  // Get player name from localStorage when app starts
  const playerName = localStorage.getItem("name") || "";
  const [player, setPlayer] = useState<string>(playerName);
  
  // Create the context value with player data and setter function
  const value: PlayerContextType = {
    player,
    setPlayer
  };
  
  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}
