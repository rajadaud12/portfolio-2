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
      <div className="nameLogo" style={{color: themes.find(t => t.name === currentTheme).primary}}>
        <svg 
          width="7356" 
          height="11978" 
          viewBox="0 0 7356 11978" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
          className="dynamic-logo"
        >
          <path d="M43 8100V3876H1915V8100H43Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="30"/>
          <path d="M30 69V3493H1886V1765L30 69Z" fill="currentColor"/>
          <path d="M15 3493V3508H30H1886H1901V3493V1765V1758.39L1896.12 1753.93L40.1186 57.9269L15 34.9737V69V3493Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="30"/>
          <path d="M30 11909V8485H1886V10213L30 11909Z" fill="currentColor"/>
          <path d="M15 8485V8470H30H1886H1901V8485V10213V10219.6L1896.12 10224.1L40.1186 11920.1L15 11943V11909V8485Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="30"/>
          <path d="M4958 1797H2238V3557H4126L5534 5093V7013L4126 8389H2238V10117H4958L7326 7781V4101L4958 1797Z" fill="currentColor"/>
          <path d="M2238 1782H2223V1797V3557V3572H2238H4119.4L5519 5098.83V7006.69L4119.89 8374H2238H2223V8389V10117V10132H2238H4958H4964.15L4968.53 10127.7L7336.53 7791.68L7341 7787.27V7781V4101V4094.67L7336.46 4090.25L4968.46 1786.25L4964.09 1782H4958H2238Z" stroke="currentColor" strokeOpacity="0.4" strokeWidth="30"/>
        </svg>
      </div>
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
