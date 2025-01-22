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
import image10 from "../images/talesic.png"

const projectsData = [
  {
    image: image10,
    title: 'Talesic UI: Where Stories Come Alive',
    date: 'Jun 2023 - Jul 2023',
    description: 'Presenting the UI of Talesic, a platform designed for writers to create and manage their stories.',
    techStack: ["figma", "adobe xd"],
    category: "web",
    isDesign: true,
    link: 'https://dribbble.com/shots/25516770-Talesic-Crafting-Stories-Redefining-Creativity'
  },
    {
      image: image3,
      title: 'Sekiro Characters App UI',
      date: 'Jun 2023 - Jul 2023',
      description: 'App UI design for displaying all character details and their attributes in Video Game Sekiro.',
      techStack: ["figma", "adobe xd"],
      category: "mobile",
      isDesign: true,
      link: 'https://dribbble.com/shots/24756539-Sekiro-Shadow-Die-Twice-Character-Codex-UI-Design'
    },
    {
      image: image2,
      title: 'Faithzy: Responsive Web Design',
      date: 'Jun 2023 - Jul 2023',
      description: 'Faithzy UI offers a responsive design for easy access to religious services and products.',
      techStack: ["figma", "adobe xd"],
      category: "web",
      isDesign: true,
      link: 'https://dribbble.com/shots/24755015-Faithzy-Web-UI-A-Modern-Take-on-Religious-Services-and-Products'
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
      link: 'https://dribbble.com/shots/24751713-Match-Made-in-UI-WowCouple\'s-Elegant-Design?utm_source=Clipboard_Shot&utm_campaign=daudnasar&utm_content=Match%20Made%20in%20UI%3A%20WowCouple\'s%20Elegant%20Design&utm_medium=Social_Share',
      devLink: 'https://www.linkedin.com/posts/daud-bin-nasar_appdevelopment-flutter-wowcouple-activity-7229295513773199361-VS38?utm_source=share&utm_medium=member_desktop'
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
      link: 'https://dribbble.com/shots/25234292-Digital-Bites-AR-Food-Menu-Design?utm_source=Clipboard_Shot&utm_campaign=daudnasar&utm_content=Digital%20Bites%20-%20AR%20Food%20Menu%20Design%20%F0%9F%8D%94%F0%9F%93%B1&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=daudnasar&utm_content=Digital%20Bites%20-%20AR%20Food%20Menu%20Design%20%F0%9F%8D%94%F0%9F%93%B1&utm_medium=Social_Share',
      devLink: 'https://github.com/rajadaud12/DigitalBitesApp',
    },
    {
      image: image4,
      title: 'Intelli-Quest',
      date: 'Oct 2022 - Present',
      description: 'Smart Quiz Application that changes difficulty automatically while progressing',
      techStack: ["html", "css", "js" ,"flask"],
      category: "web",
      isDev: true,
      devLink: 'https://daud-quiz-application.vercel.app'
    },
    {
      image: image5,
      title: 'Dodie-AI',
      date: 'Oct 2022 - Present',
      description: 'Chat AI with Gemini API, featuring memory, local chat storage, and predefined questions',
      techStack: ["react"],
      category: "web",
      isDev: true,
      devLink: 'https://daud-dodieai.vercel.app'
    },
    {
      image: image6,
      title: 'Chess Game',
      date: 'Oct 2022 - Present',
      description: 'A JavaFX chess game featuring an interactive GUI, player vs. player mode, and an AI-powered opponent.',
      techStack: ["java"],
      category: "web",
      isDev: true,
      devLink: 'https://github.com/rajadaud12/Chess-game-in-java-fx'
    },
    {
      image: image7,
      title: 'React Notes App',
      date: 'Oct 2022 - Present',
      description: 'A React-based notes app with a clean UI, enabling users to create, edit, delete, and organize their notes easily.',
      techStack: ["react"],
      category: "web",
      isDev: true,
      devLink: 'https://daud-notesapp.vercel.app'
    },
    {
      image: image8,
      title: 'Tenzies Game',
      date: 'Oct 2022 - Present',
      description: 'Tenzies is a game where you match all ten dice to the same number by freezing and rolling strategically.',
      techStack: ["react"],
      category: "web",
      isDev: true,
      devLink: 'https://daud-tenzies.vercel.app'
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
    { id: 'web', label: 'Web/Desktop App' },
    { id: 'mobile', label: 'Mobile App' }
  ];

  useEffect(() => {
    let projects = projectsData;
    
    if (isDesign) {
      projects = projectsData.filter(project => project.isDesign === true);
    } else {
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
        <h2 className="section-heading-2">{isDesign ? 'Designs' : 'Applications'}</h2>
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
            link={isDesign?project.link:project.devLink}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;