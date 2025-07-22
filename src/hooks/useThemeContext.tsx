import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import type { ThemeContextType } from '../types/types';

// Custom hook to use theme context safely
export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  
  return context;
}
