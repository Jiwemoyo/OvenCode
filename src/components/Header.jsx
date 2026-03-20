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
        <img src="/ovenLogo.png" alt="OvenCodeLogo" id="header-img" />
        <h1>OvenCode</h1>
      </div>
      <nav id="nav-bar" className={isMenuOpen ? 'active' : ''}>
        <a href="#about" className="nav-link">About <span className="code-accent">_01</span></a>
        <a href="#services" className="nav-link">Services <span className="code-accent">_02</span></a>
        <a href="#contact" className="btn-nav">{"// CONNECT"}</a>
      </nav>
    </header>
  );
};
