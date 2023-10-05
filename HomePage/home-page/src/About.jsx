import './App2.css';
import React, { useEffect, useRef, useState } from 'react';


const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = () => {
    fetch('https://jihan-shamas2397.onrender.com/About/get')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.data) {
          setAboutData(data.data);
        } else {
          console.error('Invalid data format received from the server');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <div className="navbar">
        <div className="jihane">
          <h1 className="Jihanname">Jihan Shamas</h1>
        </div>
        {/* Hamburger Menu Icon */}
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} id="hamburger" onClick={handleMenuClick}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <nav className={`nav-list ${isMenuOpen ? 'open' : ''}`}id="navoptions">
          <ul className="nav-list">
            <li>
              <a href="#about" id="navoptions"className="navelements">
                About
              </a>
            </li>
            <li>
              <a href="#education" id="navoptions"className="navelements">
                Education
              </a>
            </li>
        <li>
          <a href="#experience" id="navoptions"className="navelements">
            Experience
          </a>
        </li>
        <li>
          <a href="#Skills" id="navoptions"className="navelements">
            Skills
          </a>
        </li>
        <li>
          <a href="#projects" id="navoptions"className="navelements">
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" id="navoptions"className="navelements">
            Contact
          </a>
        </li>
      

          </ul>
        </nav>
      </div>
      {/* About section */}
      {aboutData.map((item, index) => (
        <div key={index}>
          <div className="aboutmain" id="about">
            <div className="aboutdiv1">
              <h3 className="aboutme-text" style={{ fontSize: 35, color: 'aliceblue' }}>
                About <span style={{ color: '#68E0CF' }}>me</span>
              </h3>
              <div className="imgcontainer">
                <img src={item.image} className="picture" alt="Profile" />
              </div>
              <a href="https://i.ibb.co/Gv5yJrq/Jihan-Shamas-Resume.jpg" download="Jihan-Shamas-Resume.jpg">
                  <button className="downloadcv">Download CV</button>
              </a>

            </div>
            <div className="aboutdiv2">
              <div className="background">
                <p className="textdesign">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
