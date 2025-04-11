import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import './Header.css';
import { ButtonLogin } from '@react-monorepo/shared';

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onLogout }) => {
  const userName = useSelector((state: RootState) => state.user.name);

  console.log('Header component rendered', userName);

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <span className="header-user">Welcome, {userName || 'User'}</span>
        <ButtonLogin
          text={'Logout'}
          onClick={onLogout}
          appearance="solid"
          sentiment="negative"
          className="full-width"
        />
      </div>
    </header>
  );
};

export default Header;
