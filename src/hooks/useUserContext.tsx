import { useContext } from 'react';
import { UserContext } from '../contexts/user';
import { UserContextType } from '../types/types';

// Custom hook to use user context safely
export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  
  return context;
}
