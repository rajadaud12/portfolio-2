import React, { useEffect } from 'react';
import { FaFigma, FaPython, FaWordpress, FaAngular, FaReact, FaNodeJs, FaHtml5, FaCss3, FaAndroid } from 'react-icons/fa';
import { SiAdobephotoshop, SiFlutter, SiFirebase, SiMongodb, SiExpress, SiAdobeillustrator } from 'react-icons/si';
import './Popup.css';

function Popup({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            const bars = document.querySelectorAll('.progress');
            bars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 100); // Delay the animation slightly for a smoother effect
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="popup-inner">
                    <div className="popup-left">
                        <h2>About Me</h2>
                        <p>I’m Daud bin Nasar, the digital architect who turns imagination into innovation. I don’t just code apps—I craft experiences that resonate. With Flutter as my brush and the MERN stack as my canvas, I paint vibrant, intuitive software solutions that bring ideas to life. My passion lies in the perfect blend of creativity and precision, ensuring that every line of code is purposeful and every project tells a captivating story. If you’ve got a vision that needs a spark of ingenuity and a touch of magic, I’m here to turn your concepts into something unforgettable.</p>
                        <button className="download-cv-btn">Download CV</button>
                    </div>
                    <div className="popup-right">
                        <h2>Technical Skills</h2>
                        <div className="skill-bar">
                            <span>Full Stack Web Development <span className="percentage">75%</span></span>
                            <div className="bar"><div className="progress" data-width="75"></div></div>
                        </div>
                        <div className="skill-bar">
                            <span>Android App Development <span className="percentage">85%</span></span>
                            <div className="bar"><div className="progress" data-width="85"></div></div>
                        </div>
                        <div className="skill-bar">
                            <span>UI/UX Design <span className="percentage">90%</span></span>
                            <div className="bar"><div className="progress" data-width="90"></div></div>
                        </div>
                        <div className="skill-bar">
                            <span>Graphic Design <span className="percentage">80%</span></span>
                            <div className="bar"><div className="progress" data-width="80"></div></div>
                        </div>
                    </div>
                </div>
                <div className="popup-bottom">
                    <h2>Tools and Technologies I Use</h2>
                    <div className="tools-container">
                         <div className="tool-card"><SiFlutter /><span>Flutter</span></div>
                         <div className="tool-card"><FaHtml5 /><span>HTML</span></div>
                        <div className="tool-card"><FaCss3 /><span>CSS</span></div>
                        <div className="tool-card"><FaReact /><span>React.js</span></div>
                        <div className="tool-card"><FaNodeJs /><span>Node.js</span></div>
                        <div className="tool-card"><SiExpress /><span>Express.js</span></div>
                        <div className="tool-card"><SiMongodb /><span>MongoDB</span></div>
                        <div className="tool-card"><FaFigma /><span>Figma</span></div>
                        <div className="tool-card"><SiAdobephotoshop /><span>Photoshop</span></div>
                        <div className="tool-card"><SiAdobeillustrator /><span>Illustrator</span></div>
                        <div className="tool-card"><FaWordpress /><span>WordPress</span></div>
                        <div className="tool-card"><FaAngular /><span>Angular</span></div>
                        <div className="tool-card"><FaPython /><span>Python</span></div>
                        <div className="tool-card"><FaAndroid /><span>Android Studio</span></div>
                        <div className="tool-card"><SiFirebase /><span>Firebase</span></div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;
