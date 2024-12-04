import React from 'react';
import { 
  FaReact, 
  FaFigma, 
  FaCss3Alt, 
  FaHtml5, 
  FaJava, 
  FaJs
} from 'react-icons/fa';
import { 
  SiAdobexd, 
  SiFlask, 
  SiFirebase, 
  SiFlutter 
} from 'react-icons/si';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';  // Import the Image component from next/image
import './ProjectCard.css';

const iconMap = {
  react: FaReact,
  figma: FaFigma,
  css: FaCss3Alt,
  html: FaHtml5,
  js: FaJs,
  java: FaJava,
  firebase: SiFirebase,
  flutter: SiFlutter,
  "adobe xd": SiAdobexd,
  flask: SiFlask
};

const ProjectCard = ({
  title,
  description,
  image,
  techStack = []
}) => {
  return (
    <div className="project-card">
      <div className="card-inner">
        <div className="card-image-container">
          <div className="card-image">
            {/* Replace img with Next.js Image component */}
            <Image 
              src={image} 
              alt={title} 
              layout="responsive" // Optional: Use responsive layout for better scaling
              width={500} // You can adjust the width and height as needed
              height={300} // Adjust the height proportionally
            />
          </div>
        </div>
        
        <div className="card-content">
          <div className='card-row'>
            <h3>{title}</h3>
            <div className="tech-stack">
              {techStack.map((tech, index) => {
                const IconComponent = iconMap[tech.toLowerCase()];
                return IconComponent ? (
                  <span key={index} className="tech-icon">
                    <IconComponent />
                  </span>
                ) : null;
              })}
            </div>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
