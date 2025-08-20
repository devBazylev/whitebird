import type { Post, Category, ForumStats, User } from '../types';

// Mock data
export const mockUser: User = {
  id: '1',
  username: 'Admin',
  email: 'admin@forum.com',
  joinDate: new Date('2024-01-01'),
  postsCount: 42,
  reputation: 1000
};

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Общие',
    description: 'Общие темы для обсуждения',
    icon: '💬',
    postsCount: 156,
    color: '#667eea'
  },
  {
    id: '2',
    name: 'Технологии',
    description: 'Обсуждение технологий и IT',
    icon: '💻',
    postsCount: 89,
    color: '#4CAF50'
  },
  {
    id: '3',
    name: 'Спорт',
    description: 'Спортивные темы',
    icon: '⚽',
    postsCount: 67,
    color: '#FF9800'
  },
  {
    id: '4',
    name: 'Культура',
    description: 'Культура и искусство',
    icon: '🎭',
    postsCount: 45,
    color: '#9C27B0'
  },
  {
    id: '5',
    name: 'Политика',
    description: 'Политические обсуждения',
    icon: '🏛️',
    postsCount: 23,
    color: '#F44336'
  },
  {
    id: '6',
    name: 'Наука',
    description: 'Научные темы',
    icon: '🔬',
    postsCount: 34,
    color: '#2196F3'
  }
];

export const mockStats: ForumStats = {
  totalUsers: 1250,
  totalPosts: 456,
  totalComments: 2340,
  activeUsers: 89,
  newPostsToday: 12
};

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Добро пожаловать на наш форум!',
    content: 'Это первая тема на нашем форуме. Здесь вы можете обсуждать различные темы, задавать вопросы и делиться своими мыслями. Добро пожаловать в наше сообщество!',
    author: mockUser,
    category: 'Общие',
    tags: ['приветствие', 'новости'],
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:00:00'),
    likes: 25,
    dislikes: 2,
    views: 156,
    commentsCount: 8,
    isFavorite: false
  },
  {
    id: '2',
    title: 'Новые технологии в 2024 году',
    content: 'Обсуждаем самые интересные технологические тренды этого года. Искусственный интеллект, квантовые вычисления, метавселенные - что вас больше всего интересует?',
    author: mockUser,
    category: 'Технологии',
    tags: ['технологии', '2024', 'AI'],
    createdAt: new Date('2024-01-14T15:30:00'),
    updatedAt: new Date('2024-01-14T15:30:00'),
    likes: 18,
    dislikes: 1,
    views: 89,
    commentsCount: 12,
    isFavorite: false
  },
  {
    id: '3',
    title: 'Лучшие фильмы 2023 года',
    content: 'Поделитесь своими впечатлениями о фильмах, которые вы посмотрели в прошлом году. Какие фильмы произвели на вас самое сильное впечатление?',
    author: mockUser,
    category: 'Культура',
    tags: ['кино', '2023', 'обзор'],
    createdAt: new Date('2024-01-13T20:15:00'),
    updatedAt: new Date('2024-01-13T20:15:00'),
    likes: 32,
    dislikes: 3,
    views: 234,
    commentsCount: 19,
    isFavorite: false
  }
];
