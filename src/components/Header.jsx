import { useState } from 'react';
import '../assets/styles/header.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header id="header">
      <div className="title">
        <img src="/ovenCodeLogo.png" alt="OvenCodeLogo" id="header-img" />
        <h1>Oven Code</h1>
      </div>
      <nav id="nav-bar" className={isMenuOpen ? 'active' : ''}>
        <a href="#about" className="nav-link">About</a>
        <a href="#services" className="nav-link">Service</a>
        <a href="#contact" className="nav-link">Contact Us</a>
      </nav>
    </header>
  );
};
