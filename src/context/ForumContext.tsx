import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type { Post, User } from '../types';
import { mockUser, mockCategories, mockStats, mockPosts } from '../data/mockData';
import { ForumContext, type ForumContextType } from './ForumContextDef';

export const ForumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Загружаем сохраненные избранные посты из localStorage
  const getInitialPosts = (): Post[] => {
    const savedFavorites = localStorage.getItem('forum-favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      return mockPosts.map(post => ({
        ...post,
        isFavorite: favoriteIds.includes(post.id)
      }));
    }
    return mockPosts;
  };

  const [posts, setPosts] = useState<Post[]>(getInitialPosts);
  const [user, setUser] = useState<User | undefined>(mockUser);

  const handleToggleFavorite = (postId: string) => {
    setPosts(prevPosts => {
      const newPosts = prevPosts.map(post => 
        post.id === postId 
          ? { ...post, isFavorite: !post.isFavorite }
          : post
      );
      
      // Сохраняем избранные посты в localStorage
      const favoriteIds = newPosts.filter(post => post.isFavorite).map(post => post.id);
      localStorage.setItem('forum-favorites', JSON.stringify(favoriteIds));
      
      return newPosts;
    });
  };

  const handleLogout = () => {
    setUser(undefined);
  };

  const value: ForumContextType = {
    posts,
    setPosts,
    categories: mockCategories,
    stats: mockStats,
    user,
    setUser,
    handleToggleFavorite,
    handleLogout
  };

  return (
    <ForumContext.Provider value={value}>
      {children}
    </ForumContext.Provider>
  );
};


