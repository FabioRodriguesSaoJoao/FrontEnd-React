// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <h1 className="header-title" onClick={() => navigate('/home')}>Home</h1>
      <button className="header-logout-button" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
