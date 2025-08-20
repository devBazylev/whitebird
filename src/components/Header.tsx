import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { User } from '../types';

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderLeft>
          <Logo>ForumApp</Logo>
          <Nav>
            <NavLink as={Link} to="/">Главная</NavLink>
            <NavLink as={Link} to="/favorites">Избранное</NavLink>
            <NavLink as={Link} to="/categories">Категории</NavLink>
            <NavLink as={Link} to="/users">Пользователи</NavLink>
            <NavLink as={Link} to="/about">О форуме</NavLink>
          </Nav>
        </HeaderLeft>

        <HeaderCenter>
          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Поиск по форуму..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              🔍
            </SearchButton>
          </SearchForm>
        </HeaderCenter>

        <HeaderRight>
          {user ? (
            <UserMenu>
              <UserButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {user.avatar ? (
                  <UserAvatar
                    src={user.avatar}
                    alt={user.username}
                  />
                ) : (
                  <UserAvatar
                    as="div"
                    alt={user.username}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </UserAvatar>
                )}
                <Username>{user.username}</Username>
              </UserButton>
              
              {isMenuOpen && (
                <DropdownMenu>
                  <DropdownItem as={Link} to="/profile">Профиль</DropdownItem>
                  <DropdownItem as={Link} to="/settings">Настройки</DropdownItem>
                  <DropdownItem as={Link} to="/new-post">Новая тема</DropdownItem>
                  <DropdownItemLogout onClick={onLogout}>
                    Выйти
                  </DropdownItemLogout>
                </DropdownMenu>
              )}
            </UserMenu>
          ) : (
            <AuthButtons>
              <ButtonOutline as={Link} to="/login">Войти</ButtonOutline>
              <ButtonPrimary as={Link} to="/register">Регистрация</ButtonPrimary>
            </AuthButtons>
          )}
        </HeaderRight>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

// Styled Components
const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 1024px) {
    padding: 0.75rem 0;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0;
  }
`;

const HeaderWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.25rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    flex-direction: column;
    align-items: center;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  display: inline-block;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const HeaderCenter = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;

  @media (max-width: 1024px) {
    margin: 0;
    max-width: 100%;
    order: 3;
  }

  @media (max-width: 480px) {
    max-width: 90%;
  }
`;

const SearchForm = styled.form`
  display: flex;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    background: white;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1024px) {
    justify-content: center;
    order: 2;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const Button = styled.a`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;
`;

const ButtonOutline = styled(Button)`
  color: white;
  border-color: white;

  &:hover {
    background: white;
    color: #667eea;
  }
`;

const ButtonPrimary = styled(Button)`
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;

  &:hover {
    background: #45a049;
    border-color: #45a049;
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: white;
`;

const Username = styled.span`
  font-weight: 500;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  z-index: 1000;
`;

const DropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: #f5f5f5;
  }
`;

const DropdownItemLogout = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  color: #e74c3c;
  text-decoration: none;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;
  border-top: 1px solid #eee;
  margin-top: 0.5rem;
  padding-top: 1rem;

  &:hover {
    background: #fdf2f2;
  }
`;

export default Header;
