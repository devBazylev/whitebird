import React from 'react';
import styled from 'styled-components';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
  onToggleFavorite?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, onToggleFavorite }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <Card onClick={onClick}>
      <CardHeader>
        <PostInfo>
          <Title>{post.title}</Title>
          <Meta>
            <AuthorInfo>
              <AuthorAvatar src={post.author.avatar || '/default-avatar.png'} alt={post.author.username} />
              <AuthorName>{post.author.username}</AuthorName>
            </AuthorInfo>
            <DateInfo>{formatDate(post.createdAt)}</DateInfo>
          </Meta>
        </PostInfo>
        <CategoryBadge color={getCategoryColor(post.category)}>
          {post.category}
        </CategoryBadge>
      </CardHeader>

      <Content>{post.content.substring(0, 150)}...</Content>

      <CardFooter>
        <Tags>
          {post.tags.slice(0, 3).map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </Tags>
        
        <Stats>
          <StatItem>
            <StatIcon>👁️</StatIcon>
            <StatValue>{formatNumber(post.views)}</StatValue>
          </StatItem>
          <StatItem>
            <StatIcon>💬</StatIcon>
            <StatValue>{formatNumber(post.commentsCount)}</StatValue>
          </StatItem>
          <StatItem>
            <StatIcon>👍</StatIcon>
            <StatValue>{formatNumber(post.likes)}</StatValue>
          </StatItem>
        </Stats>
      </CardFooter>

      <FavoriteButton
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onToggleFavorite?.(post.id);
        }}
        $isFavorite={post.isFavorite}
        title={post.isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
      >
        {post.isFavorite ? '❤️' : '🤍'}
      </FavoriteButton>


    </Card>
  );
};

// Helper function to get category color
const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    'Общие': '#667eea',
    'Технологии': '#4CAF50',
    'Спорт': '#FF9800',
    'Культура': '#9C27B0',
    'Политика': '#F44336',
    'Наука': '#2196F3'
  };
  return colors[category] || '#666';
};

// Styled Components
const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid #f0f0f0;
  position: relative;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const PostInfo = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorName = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const DateInfo = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

const CategoryBadge = styled.span<{ color: string }>`
  background: ${props => props.color};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  margin-right: 3rem;
`;

const Content = styled.p`
  color: #555;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StatIcon = styled.span`
  font-size: 1rem;
`;

const StatValue = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.$isFavorite ? '#ff4757' : 'rgba(255, 255, 255, 0.9)'};
  border: 2px solid ${props => props.$isFavorite ? '#ff4757' : '#ddd'};
  color: ${props => props.$isFavorite ? 'white' : '#666'};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export default PostCard;
