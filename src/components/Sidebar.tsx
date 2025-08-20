import React from 'react';
import styled from 'styled-components';
import type { Category, ForumStats } from '../types';

interface SidebarProps {
  categories: Category[];
  stats: ForumStats;
  selectedCategory?: string;
  onCategorySelect?: (categoryId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  categories, 
  stats, 
  selectedCategory, 
  onCategorySelect 
}) => {
  return (
    <SidebarContainer>
      <Section>
        <SectionTitle>📊 Статистика форума</SectionTitle>
        <StatsGrid>
          <StatCard>
            <StatNumber>{stats.totalUsers}</StatNumber>
            <StatLabel>Пользователей</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.totalPosts}</StatNumber>
            <StatLabel>Тем</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.totalComments}</StatNumber>
            <StatLabel>Комментариев</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.activeUsers}</StatNumber>
            <StatLabel>Онлайн</StatLabel>
          </StatCard>
        </StatsGrid>
      </Section>

      <Section>
        <SectionTitle>📁 Категории</SectionTitle>
        <CategoryList>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              $isSelected={selectedCategory === category.id}
              onClick={() => onCategorySelect?.(category.id)}
            >
              <CategoryIcon color={category.color}>{category.icon}</CategoryIcon>
              <CategoryInfo>
                <CategoryName>{category.name}</CategoryName>
                <CategoryCount>{category.postsCount} тем</CategoryCount>
              </CategoryInfo>
            </CategoryItem>
          ))}
        </CategoryList>
      </Section>

      <Section>
        <SectionTitle>🔥 Активность</SectionTitle>
        <ActivityItem>
          <ActivityIcon>📈</ActivityIcon>
          <ActivityText>Новых тем сегодня: {stats.newPostsToday}</ActivityText>
        </ActivityItem>
        <ActivityItem>
          <ActivityIcon>👥</ActivityIcon>
          <ActivityText>Активных пользователей: {stats.activeUsers}</ActivityText>
        </ActivityItem>
      </Section>

      <Section>
        <SectionTitle>💡 Быстрые действия</SectionTitle>
        <QuickActions>
          <QuickActionButton href="/new-post">
            ✏️ Новая тема
          </QuickActionButton>
          <QuickActionButton href="/search">
            🔍 Поиск
          </QuickActionButton>
          <QuickActionButton href="/rules">
            📋 Правила
          </QuickActionButton>
        </QuickActions>
      </Section>
    </SidebarContainer>
  );
};

// Styled Components
const SidebarContainer = styled.aside`
  width: 280px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;

  @media (max-width: 1024px) {
    width: 100%;
    position: static;
    margin-bottom: 2rem;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.9;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$isSelected ? '#f0f8ff' : 'transparent'};
  border: 1px solid ${props => props.$isSelected ? '#667eea' : 'transparent'};

  &:hover {
    background: ${props => props.$isSelected ? '#e6f3ff' : '#f8f9fa'};
    transform: translateX(4px);
  }
`;

const CategoryIcon = styled.span<{ color: string }>`
  width: 32px;
  height: 32px;
  background: ${props => props.color};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

const CategoryCount = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ActivityIcon = styled.span`
  font-size: 1.2rem;
`;

const ActivityText = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const QuickActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

export default Sidebar;
