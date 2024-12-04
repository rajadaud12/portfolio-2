import React, { useState, useEffect } from 'react';
import { FaPalette } from 'react-icons/fa';
import './ColorThemeSwitcher.css';
import Image from 'next/image';  // Import Image from Next.js

const ColorThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('lightBlue');
  const themes = [
    { name: 'lightBlue', primary: '#00d8ff', secondary: '#041620' }, 
    { name: 'purple', primary: '#8A2BE2', secondary: '#1F1C26' },
    { name: 'green', primary: '#00FA9A', secondary: '#131D13' },
    { name: 'orange', primary: '#FFA500', secondary: '#001200' },
    { name: 'pink', primary: '#FF69B4', secondary: '#19000F' },
  ];

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    setIsOpen(false);
  };

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  useEffect(() => {
    const root = document.documentElement;
    const theme = themes.find(t => t.name === currentTheme);
    
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);

    const rgb = hexToRgb(theme.primary);
    root.style.setProperty('--primary-color-rgb', rgb);
  }, [currentTheme]);

  return (
    <div className="color-theme-switcher">
      {/* Use Next.js Image component */}
      <Image
        src="/images/Logo.svg" // Assuming the logo is in the public folder
        alt="Logo"
        width={100} // Adjust width as needed
        height={100} // Adjust height as needed
        className="nameLogo"
      />
      <button className="theme-toggle" onClick={toggleOverlay}>
        <FaPalette size={20} />
      </button>
      {isOpen && (
        <div className="theme-overlay">
          {themes.map((theme) => (
            <button
              key={theme.name}
              className="theme-option"
              style={{ backgroundColor: theme.primary }}
              onClick={() => changeTheme(theme.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorThemeSwitcher;
