import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import ColorThemeSwitcher from './components/ColorThemeSwitcher';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import { Element } from 'react-scroll';
import Popup from './components/sub-components/Popup';
import ContactSection from './components/ContactSection';
import LatestDesigns from './components/LatestDesigns';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // References to each section
  const homeRef = useRef(null);
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const workRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
    
      const sections = [
        { ref: homeRef, id: 'home' },
        { ref: educationRef, id: 'education' },
        { ref: projectsRef, id: 'projects' },
        { ref: workRef, id: 'work' },
        { ref: messagesRef, id: 'messages' }
      ];
  
      // Sort sections by their top position
      const sortedSections = sections
        .filter(section => section.ref.current)
        .map(section => ({
          ...section,
          top: section.ref.current.getBoundingClientRect().top + scrollPosition
        }))
        .sort((a, b) => a.top - b.top);
  
      // Find the section that is currently most in view
      const currentSection = sortedSections.reduce((prev, current) => {
        if (scrollPosition >= current.top - window.innerHeight * 0.3) {
          return current;
        }
        return prev;
      }, sortedSections[0]);
  
      setActiveSection(currentSection.id);
    };
  
    window.addEventListener('scroll', handleScroll);
    // Initial call to set correct active section on page load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="App">
        <ColorThemeSwitcher />
        <BackgroundCanvas />
        <Navbar activeSection={activeSection} />

        <div id="home" ref={homeRef}>
          <Element name="home">
            <HeroSection setIsPopupOpen={setIsPopupOpen} />
          </Element>
        </div>

        <div id="education" ref={educationRef}>
          <Element name="education">
            <Timeline />
          </Element>
        </div>

        <div id="projects" ref={projectsRef}>
          <Element name="projects">
            <Projects isDesign={false} />
          </Element>
        </div>

        <div id="work" ref={workRef}>
          <Element name="work">
          <Projects isDesign={true} />

          </Element>
        </div>

        <div id="messages" ref={messagesRef}>
          <Element name="messages">
           <ContactSection/>
          </Element>
        </div>

        {/* Render Popup at top */}
        {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
      </div>
    </Router>
  );
}

export default App;