'use client'; // Add this at the top

import React, { useState, useRef, useEffect } from 'react';
import './Timeline.css';

const Timeline = () => {
    const sectionRef = useRef(null);
    const [isSectionVisible, setIsSectionVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Lock horizontal scroll function
    const lockHorizontalScroll = () => {
        if (typeof document !== 'undefined') {
            document.body.classList.add('no-horizontal-scroll');
        }
    };

    // Unlock horizontal scroll function
    const unlockHorizontalScroll = () => {
        if (typeof document !== 'undefined') {
            document.body.classList.remove('no-horizontal-scroll');
        }
    };

    useEffect(() => {
        // Only run on client-side
        setIsMounted(true);

        // Ensure we're in a browser environment
        if (typeof window === 'undefined' || typeof document === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsSectionVisible(true);
                    }
                });
            },
            { threshold: 0.3 } 
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Only run on client-side and when section is visible
        if (!isMounted || typeof document === 'undefined') return;

        if (isSectionVisible) {
            // Lock horizontal scrolling
            lockHorizontalScroll();

            // Sequentially show each timeline item with a delay
            const items = document.querySelectorAll('.timeline-item');
            const animationPromises = Array.from(items).map((item, index) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        item.classList.add('show');
                        resolve();
                    }, index * 500);
                });
            });

            // Wait for all animations to complete before unlocking scroll
            Promise.all(animationPromises).then(() => {
                setTimeout(unlockHorizontalScroll, 500);
            });
        }
    }, [isSectionVisible, isMounted]);

    // Prevent rendering on server
    if (!isMounted) {
        return null;
    }

    return (
        <div className={`timeline-section ${isSectionVisible ? 'fade-in' : ''}`} ref={sectionRef}>
            <div className="headings-container">
                <h2 className="section-heading-1">Education</h2>
                <h2 className="section-heading-2">History</h2>
            </div>

            <div className="timeline">
                <div className="timeline-item">
                    <div className="year">2022</div>
                    <div className="timeline-content">
                        <h4>University</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="year">2023</div>
                    <div className="timeline-content">
                        <h4>Internship</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div className="timeline-item">
                    <div className="year">2024</div>
                    <div className="timeline-content">
                        <h4>Job 1</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Timeline;