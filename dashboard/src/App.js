import React, { useState } from 'react';
import './style.css';
import About from './About';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';

function App() {
  const [visibleAbout, setAboutVisible] = useState(true);
  const [visibleEducation, setEducationVisible] = useState(false);
  const [visibleExperience, setExperienceVisible] = useState(false);
  const [visibleSkills, setSkillsVisible] = useState(false);
  const [visibleProjects, setProjectsVisible] = useState(false);
  const handleSidebarClick = (section) => {
    setAboutVisible(section === 'about');
    setEducationVisible(section === 'education');
    setExperienceVisible(section === 'experience');
    setSkillsVisible(section === 'skills');
    setProjectsVisible(section === 'projects');
  };
  return (
    <body>
      <div className="sidebar">
        <a href="#" className="active">
          Dashboard
        </a>
        <a href="#" onClick={() => handleSidebarClick('about')}>
          About
        </a>
        {visibleAbout &&
        <div className="dropdown-content">
          <a href="#">- photo</a>
          <a href="#">- description</a>
        </div>
        }
        <a href="#" onClick={() => handleSidebarClick('education')}>
          Education
        </a>
        {visibleEducation &&
        <div className="dropdown-content">
          <a href="#">- degree</a>
          <a href="#">- date</a>
          <a href="#">- place</a>
        </div>
        }
        <a href="#" onClick={() => handleSidebarClick('experience')}>
          Experience
        </a>
        {visibleExperience &&
        <div className="dropdown-content">
          <a href="#">- position</a>
          <a href="#">- description</a>
          <a href="#">- date</a>
          <a href="#">- place</a>
        </div>
        }
        <a href="#" onClick={() => handleSidebarClick('skills')}>
          Skills
        </a>
        {visibleSkills && 
        <div className="dropdown-content">
          <a href="#">- skill image</a>
          <a href="#">- skill name</a>
        </div>
        }
        <a href="#" onClick={() => handleSidebarClick('projects')}>
          Projects
        </a>
        {visibleProjects && 
        <div className="dropdown-content">
          <a href="#">- photo</a>
          <a href="#">- description</a>
        </div>
        }
      </div>
      <div class="Content">
        {visibleAbout && <About/>}
        {visibleEducation && <Education/>}
        {visibleExperience && <Experience/>}
        {visibleSkills && <Skills/>}
        {visibleProjects && <Projects/>}
      </div>
    </body>
  );
}

export default App;
