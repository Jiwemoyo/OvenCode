import React from "react";

export const Header = () => {
  return (
    <header id="header">
      <div className="title">
      <img src="/ovenCodeLogo.png" alt="OvenCodeLogo" id="header-img" />
      <h1>Oven Code</h1>
      </div>
      <nav id="nav-bar">
        <a href="#about" className="nav-link">
          About
        </a>
        <a href="#services" className="nav-link">
          Service
        </a>
        <a href="#contact" className="nav-link">
          Contat Us
        </a>
      </nav>
    </header>
  );
};
