// Type definitions for the forum app

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  postsCount: number;
  reputation: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  dislikes: number;
  views: number;
  commentsCount: number;
  isFavorite: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  dislikes: number;
  parentId?: string; // для вложенных комментариев
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  postsCount: number;
  color: string;
}

export interface ForumStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  activeUsers: number;
  newPostsToday: number;
}
