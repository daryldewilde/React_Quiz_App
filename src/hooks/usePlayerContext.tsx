import { useContext } from 'react';
import { PlayerContext } from '../contexts/player';
import type { PlayerContextType } from '../types/types';

// Custom hook to use player context safely
export function usePlayerContext(): PlayerContextType {
  const context = useContext(PlayerContext);
  
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerContextProvider');
  }
  
  return context;
}
