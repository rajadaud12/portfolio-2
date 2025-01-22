import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaDribbble } from 'react-icons/fa';

import './HeroSection.css'
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
        setIsPopupOpen(true);
    };
    
    const handleScrollToContact = () => {
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

        if (isPaused) {
            const pauseTimer = setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 500);
            return () => clearTimeout(pauseTimer);
        }

        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            if (isDeleting) {
                setText((prevText) => fullText.substring(0, prevText.length - 1));
                setTypingSpeed(50);
                
                if (text === '') {
                    setIsDeleting(false);
                    setLoopNum(prevNum => (prevNum + 1) % roles.length);
                    setTypingSpeed(100);
                }
            } else {
                setText((prevText) => fullText.substring(0, prevText.length + 1));
                setTypingSpeed(100);
                
                if (text === fullText) {
                    setIsPaused(true);
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, typingSpeed, loopNum, roles, isMounted, isPaused]);

    useEffect(() => {
        if (!isMounted) return;

        const cursorBlink = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorBlink);
    }, [isMounted]);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="hero-section">
            <div className="background-grid"></div>
            <div className="hero-content">
                <div className="letter-container">
                    {/* Letter D */}
                    <div className="letter">
                        <div className="circuit circuit-1"></div>
                        <div className="circuit circuit-2"></div>
                        <div className="d-vertical letter-part"></div>
                        <div className="d-curve"></div>
                        <div className="tech-detail tech-detail-top">&lt;dev&gt;</div>
                        <div className="tech-detail tech-detail-bottom">class="d"</div>
                    </div>
                    
                    {/* Letter A */}
                    <div className="letter">
                        <div className="circuit circuit-1"></div>
                        <div className="circuit circuit-2"></div>
                        <div className="a-left letter-part"></div>
                        <div className="a-right letter-part"></div>
                        <div className="a-middle letter-part"></div>
                        <div className="tech-detail tech-detail-top">sudo</div>
                        <div className="tech-detail tech-detail-bottom">chmod +x</div>
                    </div>
                    
                    {/* Letter U */}
                    <div className="letter">
                        <div className="circuit circuit-1"></div>
                        <div className="circuit circuit-2"></div>
                        <div className="u-left letter-part"></div>
                        <div className="u-right letter-part"></div>
                        <div className="u-bottom letter-part"></div>
                        <div className="tech-detail tech-detail-top">git::</div>
                        <div className="tech-detail tech-detail-bottom">push -u</div>
                    </div>
                    
                    {/* Letter D */}
                    <div className="letter">
                        <div className="circuit circuit-1"></div>
                        <div className="circuit circuit-2"></div>
                        <div className="d-vertical letter-part"></div>
                        <div className="d-curve"></div>
                        <div className="tech-detail tech-detail-top">/dev/</div>
                        <div className="tech-detail tech-detail-bottom">&lt;/dev&gt;</div>
                    </div>
                </div>

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
        </div>
    );
}

export default HeroSection;