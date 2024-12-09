import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { FaLinkedin, FaGithub, FaInstagram, FaDribbble } from 'react-icons/fa';
import ProfileImage from '../images/mypic.png';
import Image from "next/image";

function HeroSection({ setIsPopupOpen }) {
    const [isMounted, setIsMounted] = useState(false);
    const roles = ['Web Developer', 'UI/UX Designer', 'Mobile App Developer'];
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100);
    const [showCursor, setShowCursor] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    const handlePopupOpen = () => {
        console.log('Popup open clicked');
        setIsPopupOpen(true);
    };
    
    const handleScrollToContact = () => {
        console.log('Contact scroll clicked');
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth', 
        });
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        // Pause logic
        if (isPaused) {
            const pauseTimer = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 500); // Very brief pause of 500ms
            return () => clearTimeout(pauseTimer);
        }

        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            if (isDeleting) {
                // Deleting phase
                setText((prevText) => fullText.substring(0, prevText.length - 1));
                setTypingSpeed(50);
                
                if (text === '') {
                    // When text is fully deleted
                    setIsDeleting(false);
                    setLoopNum(prevNum => (prevNum + 1) % roles.length);
                    setTypingSpeed(100);
                }
            } else {
                // Typing phase
                setText((prevText) => fullText.substring(0, prevText.length + 1));
                setTypingSpeed(100);
                
                if (text === fullText) {
                    // When full text is typed
                    setIsPaused(true);
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, typingSpeed, loopNum, roles, isMounted, isPaused]);

    // Cursor blinking effect
    useEffect(() => {
        if (!isMounted) return;

        const cursorBlink = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorBlink);
    }, [isMounted]);

    // Prevent rendering on server
    if (!isMounted) {
        return null;
    }

    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>
                    Hi, It's <span className="highlight">Daud</span>
                </h1>
                <h2 className="typing-container">
                    I'm a <span className="role">{text}<span className={`cursor ${showCursor ? 'show' : ''}`}>|</span></span>
                </h2>
                <p>
                    I'm Daud bin Nasar, a developer from <span className="country-highlight">Pakistan</span> adept at turning ideas into reality. With a passion for programming, I craft innovative software solutions with a creative touch.
                </p>
                <div className="social-icons">
                    <a href="https://www.linkedin.com/in/daud-bin-nasar" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="icon" />
                    </a>
                    <a href="https://github.com/rajadaud12" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="icon" />
                    </a>
                    <a href="https://www.instagram.com/daudbinnasar/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="icon" />
                    </a>
                    <a href="https://dribbble.com/daudnasar" target="_blank" rel="noopener noreferrer">
                        <FaDribbble className="icon" />
                    </a>
                </div>
                <div className="hero-buttons">
                    <button className="btn hire-btn" onClick={handlePopupOpen}>About</button>
                    <button className="btn contact-btn" onClick={handleScrollToContact}>Contact</button>
                </div>
            </div>
            <div className="hero-image-container">
                <Image 
                    src={ProfileImage} 
                    alt="Daud bin Nasar" 
                    className="profile-image" 
                    width={500} 
                    height={500} 
                    priority 
                />
            </div>
        </div>
    );
}

export default HeroSection;