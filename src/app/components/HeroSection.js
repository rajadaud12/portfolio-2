import React, { useState, useEffect ,useCallback} from 'react';
import { Terminal, Code, Sparkles, ArrowRight } from 'lucide-react';
import './HeroSection.css'
import Image from 'next/image';
import image from '../images/myphoto2.png';

const HeroSection = ({ setIsPopupOpen }) => {
  const [activeSkill, setActiveSkill] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const skills = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Software Architect",
    "Mobile Developer"
  ];
  const handlePopupOpen = useCallback(() => {
    setIsPopupOpen(true);
  }, [setIsPopupOpen]);

  const handleScrollToContact = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - window.innerHeight - 450, // 100 is the offset above the bottom
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let timeout;

    const type = () => {
      const currentSkill = skills[activeSkill];
      
      if (!isDeleting && currentText.length < currentSkill.length) {
        currentText = currentSkill.slice(0, currentText.length + 1);
        setDisplayText(currentText);
        timeout = setTimeout(type, 100);
      } else if (!isDeleting && currentText.length === currentSkill.length) {
        timeout = setTimeout(() => {
          isDeleting = true;
          type();
        }, 2000);
      } else if (isDeleting && currentText.length > 0) {
        currentText = currentSkill.slice(0, currentText.length - 1);
        setDisplayText(currentText);
        timeout = setTimeout(type, 50);
      } else if (isDeleting && currentText.length === 0) {
        isDeleting = false;
        setActiveSkill((prev) => (prev + 1) % skills.length);
        timeout = setTimeout(type, 200);
      }
    };

    timeout = setTimeout(type, 200);
    return () => clearTimeout(timeout);
  }, [activeSkill]);

  return (
    <div className={`hero-wrapper ${isVisible ? 'visible' : ''}`}>
      

      <div className="hero-content">
        <div className="hero-left">
          <div className="skill-badge">
            <span className="skill-dot"></span>
            <span className="skill-text">
              {displayText}
              <span className="typing-cursor"></span>
            </span>
          </div>

          <div className="hero-title">
            <span className="title-intro">Hello, I'm</span>
            <h1 className="title-name">Daud Bin Nasar</h1>
            <span className="title-tagline">Building Dreams</span>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <Terminal className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">30+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>

            <div className="stat-card">
              <Code className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">30k+</span>
                <span className="stat-label">Lines of Code</span>
              </div>
            </div>

            <div className="stat-card">
              <Sparkles className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">∞</span>
                <span className="stat-label">Cups of Tea</span>
              </div>
            </div>
          </div>

          <div className="cta-container">
            <button  onClick={handlePopupOpen} className="cta-primary">
              About Me
              <ArrowRight className="cta-icon" />
            </button>
            <button onClick= {handleScrollToContact} className="cta-secondary">
              Let's Connect
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="profile-container">
            <div className="profile-frame">
              <div className="profile-image-wrapper">
              <Image
                  src={image}
                  alt="Developer Profile"
                  width={400}
                  height={480}
                  priority
                  className="profile-image"
                />
                              </div>
              
              <div className="floating-card card-top">
                <Code className="card-icon" />
                <div className="card-content">
                  <span className="card-title">Clean Code</span>
                  <span className="card-subtitle">Professional & Scalable</span>
                </div>
              </div>

              <div className="floating-card card-bottom">
                <div className="card-content">
                  <span className="card-title">Creative Design</span>
                  <span className="card-subtitle">Modern & Intuitive</span>
                </div>
                <Sparkles className="card-icon" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


