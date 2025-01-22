import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Terminal, Code, Palette, Box, Sparkles, ArrowRight, Globe, Database, Coffee } from 'lucide-react';
import './HeroSection.css'
import ProfileImage from '../images/mypic.png';

const roles = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Software Architect",
  "Mobile App Developer"
];

const codeSnippets = [
  '{ design, code } = await createMagic();',
  'while(true) { keepInnovating(); }',
  'export const passion = "unlimited";',
  'function solve(problem) { return magic; }'
];

const HeroSection = ({ setIsPopupOpen }) => {
  const [activeBox, setActiveBox] = useState(0);
  const [codeSnippet, setCodeSnippet] = useState(0);
  const [currentRole, setCurrentRole] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isInView, setIsInView] = useState(false);

  const handlePopupOpen = useCallback(() => {
    setIsPopupOpen(true);
  }, [setIsPopupOpen]);

  const handleScrollToContact = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - window.innerHeight - 150, // 100 is the offset above the bottom
      behavior: 'smooth',
    });
  }, []);
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const heroElement = document.querySelector('.hero-container');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBox((prev) => (prev + 1) % 4);
      setCodeSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const currentText = roles[roleIndex];

      if (!isDeleting) {
        setCurrentRole(currentText.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentText.length) {
          isDeleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        setCurrentRole(currentText.substring(0, charIndex));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      timeout = setTimeout(type, isDeleting ? 50 : 100);
    };

    timeout = setTimeout(type, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`hero-container ${isInView ? 'fade-in' : ''}`}>


      <div className="hero-content">
        <div className="hero-left">
          <div className="tech-badge">
            <span className="pulse-dot" />
            <div className="typing-container">
              {currentRole}
              <span className="typing-cursor" />
            </div>
          </div>

          <h1 className="hero-title">
            <span className="title-top">Hello, I'm</span>
            <span className="title-main">
              Daud Bin Nasar <br />
              <span className="gradient-text">Building Dreams</span>
            </span>
          </h1>


          

          <div className="stats-grid">
            <div className="stat-item">
              <Globe className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">30+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
            </div>
            <div className="stat-item">
              <Database className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">30k+</span>
                <span className="stat-label">Lines of Code</span>
              </div>
            </div>
            <div className="stat-item">
              <Coffee className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">∞</span>
                <span className="stat-label">Cups of Tea</span>
              </div>
            </div>
          </div>

          <div className="code-editor">
            <div className="editor-header">
              <div className="editor-controls">
                <span />
                <span />
                <span />
              </div>
              <div className="editor-tabs">
                <span className="active">magic.js</span>
              </div>
            </div>
            <div className="editor-content">
              <div className="line-numbers">
                <span>1</span>
              </div>
              <div className="code-content">
                <p className="code-line">
                  {codeSnippets[codeSnippet]}
                  <span className="cursor" />
                </p>
              </div>
            </div>
          </div>

          <div className="cta-group">
            <button onClick={handlePopupOpen} className="primary-btn">
              About Me
            </button>
            <button onClick={handleScrollToContact} className="secondary-btn">
              Let's Connect
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="image-container">
            <div className="image-frame">
              <div className="frame-decoration top" />
              <div className="frame-decoration right" />
              <div className="frame-decoration bottom" />
              <div className="frame-decoration left" />

              <div className="profile-wrapper">
                <div className="profile-background" />
                <Image
                  src={ProfileImage}
                  alt="Developer Profile"
                  width={400}
                  height={480}
                  priority
                  className="profile-image"
                />
              </div>

              <div className="floating-card top-card">
                <Box className="card-icon" size={20} />
                <div className="card-content">
                  <span className="card-title">Clean Code</span>
                  <span className="card-subtitle">Professional & Scalable</span>
                </div>
              </div>

              <div className="floating-card bottom-card">
                <Sparkles className="card-icon" size={20} />
                <div className="card-content">
                  <span className="card-title">Creative Design</span>
                  <span className="card-subtitle">Modern & Intuitive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;