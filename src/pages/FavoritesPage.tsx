import React, { useState } from 'react';
import styled from 'styled-components';
import { useForum } from '../hooks/useForum';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';

const FavoritesPage: React.FC = () => {
  const { posts, categories, stats, user, handleToggleFavorite, handleLogout } = useForum();
  const [selectedCategory, setSelectedCategory] = useState<string>('');



  const favoritePosts = posts.filter(post => post.isFavorite);

  const filteredPosts = selectedCategory
    ? favoritePosts.filter(post => {
        const category = categories.find(cat => cat.id === selectedCategory);
        return category && post.category === category.name;
      })
    : favoritePosts;

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
  };

  const handlePostClick = (postId: string) => {
    // TODO: Navigate to post detail page
    console.log('Navigating to post:', postId);
  };

  return (
    <PageContainer>
      <Header user={user} onLogout={handleLogout} />
      
      <MainContent>
        <ContentWrapper>
          <PostsSection>
            <SectionHeader>
              <SectionTitle>
                {selectedCategory 
                  ? `Избранное в категории "${categories.find(cat => cat.id === selectedCategory)?.name}"`
                  : 'Моё избранное'
                }
              </SectionTitle>
              <PostCount>{filteredPosts.length} избранных тем</PostCount>
            </SectionHeader>
            
            {favoritePosts.length === 0 ? (
              <EmptyState>
                <EmptyIcon>💔</EmptyIcon>
                <EmptyTitle>У вас пока нет избранных тем</EmptyTitle>
                <EmptyText>
                  Добавляйте понравившиеся темы в избранное, нажимая на сердечко ❤️
                </EmptyText>
                <EmptyAction href="/">Перейти к темам</EmptyAction>
              </EmptyState>
            ) : filteredPosts.length === 0 ? (
              <EmptyState>
                <EmptyIcon>🔍</EmptyIcon>
                <EmptyTitle>В выбранной категории нет избранных тем</EmptyTitle>
                <EmptyText>
                  Попробуйте выбрать другую категорию или посмотрите все избранные темы
                </EmptyText>
                <EmptyAction onClick={() => setSelectedCategory('')}>
                  Показать все избранное
                </EmptyAction>
              </EmptyState>
            ) : (
              <PostsList>
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onClick={() => handlePostClick(post.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </PostsList>
            )}
          </PostsSection>
          
          <Sidebar
            categories={categories}
            stats={stats}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const MainContent = styled.main`
  padding: 2rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const PostsSection = styled.section`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const PostCount = styled.span`
  background: #ff4757;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #333;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  margin: 0 0 2rem 0;
  line-height: 1.6;
`;

const EmptyAction = styled.a`
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background: #5a6fd8;
  }
`;

export default FavoritesPage;
