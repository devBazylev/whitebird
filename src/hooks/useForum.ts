import { useContext } from 'react';
import { ForumContext } from '../context/ForumContextDef';

export const useForum = () => {
  const context = useContext(ForumContext);
  if (context === undefined) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
};
