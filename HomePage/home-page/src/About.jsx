import './App2.css';
import React, { useEffect, useRef, useState } from 'react';

const About = ({ image, description }) => {
  const [aboutData, setAboutData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = () => {
    fetch('http://localhost:5000/About/get')
      .then((response) => response.json())
      .then((data) => setAboutData(data.data))
      .catch((error) => console.log(error));
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <nav className={`navoptions ${isMenuOpen ? 'open' : ''}`} id="navoptions">
          <ul className="nav-list">
            <li>
              <a href="#about" className="navelements">
                About
              </a>
            </li>
        <li>
          <a href="#education" className="navelements">
            Education
          </a>
        </li>
        <li>
          <a href="#experience" className="navelements">
            Experience
          </a>
        </li>
        <li>
          <a href="#Skills" className="navelements">
            Skills
          </a>
        </li>
        <li>
          <a href="#projects" className="navelements">
            Projects
          </a>
        </li>
        <li>
          <a href="#contact" className="navelements">
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
              <a href="/path/to/your/cv.pdf" download="JihanShamasCV.pdf">
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
