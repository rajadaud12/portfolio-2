'use client'; // Add this at the top

import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import ProfileImage from '../images/dAY6.png';
import Popup from './sub-components/Popup';
import Image from "next/image";

function HeroSection({ setIsPopupOpen }) {
    const [isMounted, setIsMounted] = useState(false);
    const roles = ['Web Developer', 'UI/UX Designer', 'Mobile App Developer'];
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(200);
    const [showCursor, setShowCursor] = useState(true);

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    useEffect(() => {
        // Ensure client-side rendering
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Only run typing animation on client-side
        if (!isMounted) return;

        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            if (isDeleting) {
                setText((prevText) => fullText.substring(0, prevText.length - 1));
                setTypingSpeed(40);
            } else {
                setText((prevText) => fullText.substring(0, prevText.length + 1));
                setTypingSpeed(100);
            }

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, typingSpeed, loopNum, roles, isMounted]);

    // Cursor blinking effect
    useEffect(() => {
        // Only run cursor effect on client-side
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
                <h2>
                    I'm a <span className="role">{text}<span className={`cursor ${showCursor ? 'show' : ''}`}>|</span></span>
                </h2>
                <p>
                    I'm Daud bin Nasar, a developer adept at turning ideas into reality. With a passion for programming, I craft innovative software solutions with a creative touch.
                </p>
                <div className="social-icons">
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="icon" />
                    </a>
                    <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="icon" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="icon" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="icon" />
                    </a>
                </div>
                <div className="hero-buttons">
                    <button className="btn hire-btn" onClick={handlePopupOpen}>About</button>
                    <button className="btn contact-btn">Contact</button>
                </div>
            </div>
            <div className="hero-image-container">
                <Image 
                    src={ProfileImage} 
                    alt="Daud bin Nasar" 
                    className="profile-image" 
                    width={500} 
                    height={500} 
                    priority // Added to ensure early loading
                />
            </div>
        </div>
    );
}

export default HeroSection;