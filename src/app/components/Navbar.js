// Navbar.js
import React from 'react';
import { Link } from 'react-scroll';
import { FaHome, FaUniversity, FaChartBar, FaBriefcase, FaCommentDots } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ activeSection }) {
  return (
    <section className='nav-container'>
    <nav className="navbar">
      <ul className="navbar-links">
        <li className="navbar-item">
          <Link
            to="home"
            smooth={true}
            duration={500}
            offset={5}
            className={`navbar-link ${activeSection === 'home' ? 'active' : ''}`}
          >
            <FaHome className="icon" />
            <span className="tooltip">Home</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="education"
            smooth={true}
            duration={500}
            offset={-70}
            className={`navbar-link ${activeSection === 'education' ? 'active' : ''}`}
          >
            <FaUniversity className="icon" />
            <span className="tooltip">Education</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="projects"
            smooth={true}
            duration={500}
            offset={-70}
            className={`navbar-link ${activeSection === 'projects' ? 'active' : ''}`}
          >
            <FaChartBar className="icon" />
            <span className="tooltip">Projects</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="work"
            smooth={true}
            duration={500}
            offset={-70}
            className={`navbar-link ${activeSection === 'work' ? 'active' : ''}`}
          >
            <FaBriefcase className="icon" />
            <span className="tooltip">Work</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="messages"
            smooth={true}
            duration={500}
            offset={-70}
            className={`navbar-link ${activeSection === 'messages' ? 'active' : ''}`}
          >
            <FaCommentDots className="icon" />
            <span className="tooltip">Messages</span>
          </Link>
        </li>
      </ul>
    </nav>
    </section>
  );
}

export default Navbar;
