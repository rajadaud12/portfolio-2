import React, { useState, useRef, useEffect } from 'react';
import './Timeline.css';

const Timeline = () => {
    const sectionRef = useRef(null);
    const [isSectionVisible, setIsSectionVisible] = useState(false);

    // Lock horizontal scroll function
    const lockHorizontalScroll = () => {
    };

    // Unlock horizontal scroll function
    const unlockHorizontalScroll = () => {
        document.body.classList.remove('no-horizontal-scroll');
    };

    useEffect(() => {
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
        if (isSectionVisible) {
            // Lock horizontal scrolling
            lockHorizontalScroll();

            // Sequentially show each timeline item with a delay
            const items = document.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');

                    // Check if all items have been animated, then unlock horizontal scroll
                    if (index === items.length - 1) {
                        setTimeout(unlockHorizontalScroll, 500); // Delay to ensure the last item animation completes
                    }
                }, index * 500); // Adjust delay as needed
            });
        }
    }, [isSectionVisible]);

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
