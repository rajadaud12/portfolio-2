import React, { useState, useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';
import image1 from "../images/cover.png"
import image2 from "../images/Faithzy.png"
import image3 from "../images/Sekiro.png"
import image4 from "../images/Intelli-quest.png"
import image5 from "../images/Dodie-Ai.png"
import image6 from "../images/Chess.png"
import image7 from "../images/Thumb 7.1.png"
import image8 from "../images/Tenzies.png"
import image9 from "../images/DigitalBites.png"
const projectsData = [
  {
    image: image3,
    title: 'Sekiro Characters App UI',
    date: 'Jun 2023 - Jul 2023',
    description: 'App UI design for displaying all character details and their attributes in Video Game Sekiro.',
    techStack: ["figma", "adobe xd"],
    category: "mobile",
    isDesign: true
  },
  {
    image: image2,
    title: 'Faithzy: Responsive Web Design',
    date: 'Jun 2023 - Jul 2023',
    description: 'Faithzy UI offers a responsive design for easy access to religious services and products.',
    techStack: ["figma", "adobe xd"],
    category: "web",
    isDesign: true
  },
  {
    image: image1,
    title: 'Wow Couple',
    date: 'Apr 2023 - May 2023',
    description: 'Developed a full-stack web application that allows users to search for, play, and pause their...',
    techStack: ["figma", "flutter", "firebase"],
    category: "mobile",
    isDesign: true,
    isDev: true,
  },
  {
    image: image9,
    title: 'Digital Bites',
    date: 'Oct 2022 - Present',
    description: 'Digital Bites features a clean, modern design with AR visuals, intuitive navigation, and vibrant menu layouts.',
    techStack: ["figma","flutter"],
    category: "mobile",
    isDesign: true,
    isDev: true,
  },
  {
    image: image4,
    title: 'Intelli-Quest',
    date: 'Oct 2022 - Present',
    description: 'Smart Quiz Application that changes difficulty automatically while progressing',
    techStack: ["html", "css", "js" ,"flask"],
    category: "web",
    isDev: true,
  },
  {
    image: image5,
    title: 'Dodie-AI',
    date: 'Oct 2022 - Present',
    description: 'Chat AI with Gemini API, featuring memory, local chat storage, and predefined questions',
    techStack: ["react"],
    category: "web",
    isDev: true,
  },
  {
    image: image6,
    title: 'Chess Game',
    date: 'Oct 2022 - Present',
    description: 'Chat AI with Gemini API, featuring memory, local chat storage, and predefined questions',
    techStack: ["java"],
    category: "web",
    isDev: true,
  },
  {
    image: image7,
    title: 'React Notes App',
    date: 'Oct 2022 - Present',
    description: 'Chat AI with Gemini API, featuring memory, local chat storage, and predefined questions',
    techStack: ["react"],
    category: "web",
    isDev: true,
  },
  {
    image: image8,
    title: 'Tenzies Game',
    date: 'Oct 2022 - Present',
    description: 'Tenzies is a game where you match all ten dice to the same number by freezing and rolling strategically.',
    techStack: ["react"],
    category: "web",
    isDev: true,
  }
];

function Projects({isDesign}) {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('web');
  const [isVisible, setIsVisible] = useState(false);
  const [activeWidth, setActiveWidth] = useState(0);
  const [activeLeft, setActiveLeft] = useState(0);
  const sectionRef = useRef(null);
  const buttonRefs = useRef({});

  const filters = [
    { id: 'web', label: 'Web App' },
    { id: 'mobile', label: 'Mobile App' }
  ];

  useEffect(() => {
    // Filter projects based on isDesign prop
    let projects = projectsData;
    
    if (isDesign) {
      // If isDesign is true, show only design projects
      projects = projectsData.filter(project => project.isDesign === true);
    } else {
      // If isDesign is false, show only development projects
      projects = projectsData.filter(project => project.isDev === true);
      
      // Additionally filter by category when in dev mode
      projects = projects.filter(project => project.category === activeFilter);
    }

    setFilteredProjects(projects);
  }, [isDesign, activeFilter]);

  useEffect(() => {
    if (!isDesign) {
      const activeButton = buttonRefs.current[activeFilter];
      if (activeButton) {
        setActiveWidth(activeButton.offsetWidth);
        setActiveLeft(activeButton.offsetLeft);
      }
    }
  }, [activeFilter, isDesign]);

  const filterProjects = (category) => {
    if (!isDesign) {
      setActiveFilter(category);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
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
    const section = sectionRef.current;
    if (section && isVisible) {
      const handleTransitionEnd = () => {
        section.style.visibility = 'visible';
      };
      section.addEventListener('transitionend', handleTransitionEnd);
      return () => {
        section.removeEventListener('transitionend', handleTransitionEnd);
      };
    }
  }, [isVisible]);

  return (
    <div className={`projects-section ${isVisible ? 'fade-in' : ''}`} ref={sectionRef}>
      <div className="headings-container">
        <h2 className="section-heading-1">Latest</h2>
        <h2 className="section-heading-2">{isDesign ? 'Designs' : 'Devs'}</h2>
      </div>
      {!isDesign && (
        <div className="filter-container">
          <div 
            className="active-background" 
            style={{ 
              width: activeWidth, 
              left: activeLeft 
            }} 
          />
          {filters.map((filter) => (
            <button
              key={filter.id}
              ref={el => buttonRefs.current[filter.id] = el}
              className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => filterProjects(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={index} 
            title={project.title}
            description={project.description}
            image={project.image}
            techStack={project.techStack}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;