'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import ColorThemeSwitcher from './components/ColorThemeSwitcher';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import Popup from './components/sub-components/Popup';
import ContactSection from './components/ContactSection';

// Dynamically load react-scroll's Element
const Element = dynamic(() => import('react-scroll').then((mod) => mod.Element), { ssr: false });

function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const homeRef = useRef(null);
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const workRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    // Only run on client-side
    setIsMounted(true);

    const handleScroll = () => {
      // Ensure we're on the client side
      if (typeof window === 'undefined') return;

      const scrollPosition = window.scrollY;
      const sections = [
        { ref: homeRef, id: 'home' },
        { ref: educationRef, id: 'education' },
        { ref: projectsRef, id: 'projects' },
        { ref: workRef, id: 'work' },
        { ref: messagesRef, id: 'messages' },
      ];

      const sortedSections = sections
        .filter((section) => section.ref.current)
        .map((section) => ({
          ...section,
          top: section.ref.current.getBoundingClientRect().top + scrollPosition,
        }))
        .sort((a, b) => a.top - b.top);

      // Ensure we have sections before processing
      if (sortedSections.length > 0) {
        const currentSection = sortedSections.reduce((prev, current) => {
          if (scrollPosition >= current.top - window.innerHeight * 0.3) {
            return current;
          }
          return prev;
        }, sortedSections[0]);

        setActiveSection(currentSection.id);
      }
    };

    // Only add event listener on client-side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []); // Empty dependency array ensures this runs only once after mount

  // Prevent rendering on server-side to avoid hydration mismatches
  if (!isMounted) {
    return null;
  }

  return (
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
          <ContactSection />
        </Element>
      </div>

      {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
}

export default Home;