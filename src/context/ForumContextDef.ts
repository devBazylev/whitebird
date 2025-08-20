import { createContext } from 'react';
import type { Post, Category, ForumStats, User } from '../types';

export interface ForumContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  categories: Category[];
  stats: ForumStats;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  handleToggleFavorite: (postId: string) => void;
  handleLogout: () => void;
}

export const ForumContext = createContext<ForumContextType | undefined>(undefined);
